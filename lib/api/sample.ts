import type {
  Sample,
  SampleFlagCompleted,
  SampleFlagError,
  SampleFlagMissingWork,
  SampleFlagRejected,
} from '@/types';
import { revalidateTag } from 'next/cache';
import { apiFetch } from '../fetch';
import { tenantKeysServerApi } from './tenant-keys';

export const getSampleById = async (id: Sample['id']) => {
  return await apiFetch<Sample>(`/samples/${id}`, {
    tags: [`sample-${id}`],
  });
};

export const updateSample = async (id: Sample['id'], data: Partial<Sample>) => {
  revalidateTag(`sample-${id}`);
  return await apiFetch<Sample>(`/samples/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export const flagSample = async (id: Sample['id'], data: SampleFlagError) => {
  revalidateTag(`sample-${id}`);
  return await apiFetch<Sample>(`/samples/${id}/flag-error`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const flagMissingWorkSample = async (id: Sample['id'], data: SampleFlagMissingWork) => {
  revalidateTag(`sample-${id}`);
  return await apiFetch<Sample>(`/samples/${id}/flag-missing-work`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getComplianceAdminSamples = async (param: string) => {
  return await apiFetch<
    Sample[],
    {
      completedCount: number;
    }
  >(`/samples/flagged?${param}`, {
    tags: ['compliance-admin-samples'],
  });
};

export const flagRejectedSample = async (id: Sample['id'], data: SampleFlagRejected) => {
  revalidateTag(`sample-${id}`);
  return await apiFetch<Sample>(`/samples/${id}/flag-rejected`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const flagCompletedSample = async (id: Sample['id'], data: SampleFlagCompleted) => {
  revalidateTag(`sample-${id}`);
  return await apiFetch<Sample>(`/samples/${id}/flag-completed`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

async function refreshSessionToken(refreshURL: string) {
  try {
    console.log('Starting browser automation for session refresh');

    const puppeteer = await import('puppeteer-core');
    
    // For Vercel serverless environment, use @sparticuz/chromium
    let executablePath: string | undefined;
    let args: string[] = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ];

    if (process.env.VERCEL) {
      // Running on Vercel - use @sparticuz/chromium
      // @ts-ignore - @sparticuz/chromium may not have proper types
      const chromium = await import('@sparticuz/chromium');
      executablePath = await chromium.executablePath();
      args = [...args, ...chromium.args];
    } else {
      // Local development - let puppeteer find Chrome
      executablePath = undefined;
    }

    const browser = await puppeteer.default.launch({
      args,
      executablePath,
      defaultViewport: { width: 1, height: 1 },
      headless: true,
    });

    try {
      const page = await browser.newPage();

      await page.goto(refreshURL, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });

      const cookies = await page.cookies();
      console.log('Retrieved cookies:', cookies.length);

      const legacyNormandySessionCookie = cookies.find(
        (cookie: { name: string; value: string }) => cookie.name === '_legacy_normandy_session'
      );

      if (legacyNormandySessionCookie?.value) {
        console.log('Session cookie found');

        await tenantKeysServerApi.refreshSessionToken(legacyNormandySessionCookie.value);
        console.log('Session token updated successfully');

        return legacyNormandySessionCookie.value;
      } else {
        console.warn('Legacy normandy session cookie not found');
        return null;
      }
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error('Browser automation failed:', error);
    throw error;
  }
}

export const getSampleViewFromCanvas = async (sample: Sample) => {
  const key = (await tenantKeysServerApi.getAccessToken()).data!;
  let refreshURL: string | null = null;
  if (new Date(key.updatedAt) < new Date(Date.now() - 1000 * 60 * 60 * 24)) {
    const endpoint = new URL(`${key.url}/login/session_token`);
    const headers = {
      Authorization: `Bearer ${key.access_token}`,
    };

    const urlResponse = await fetch(endpoint.toString(), {
      headers,
    });

    const { session_url } = await urlResponse.json();
    refreshURL = session_url;
  }
  let cookie = `_legacy_normandy_session=${key.session_token}`;

  if (refreshURL) {
    try {
      const sessionToken = await refreshSessionToken(refreshURL);
      if (sessionToken) {
        cookie = `_legacy_normandy_session=${sessionToken}`;
      }
    } catch (error) {
      console.error('Failed to refresh session token:', error);
    }
  }

  const response = await fetch(sample.preview_url!, {
    headers: {
      cookie,
    },
  });

  return { html: await response.text() };
};
