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
  // Check if we're in a serverless environment (Vercel)
  const isServerless = process.env.VERCEL || process.env.NODE_ENV === 'production';
  
  if (isServerless) {
    console.log('Serverless environment detected, skipping browser automation');
    // In serverless environments, we can't use browser automation
    // Return null to use the existing session token
    return null;
  }

  try {
    console.log('Starting browser automation for session refresh');

    let chromium;
    try {
      const playwright = await import('playwright');
      chromium = playwright.chromium;
    } catch (importError) {
      console.error('Playwright not available:', importError);
      console.log('Falling back to existing session token');
      return null;
    }

    const browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    try {
      const context = await browser.newContext({
        viewport: { width: 1, height: 1 },
      });
      const page = await context.newPage();

      await page.goto(refreshURL, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      const cookies = await context.cookies();
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
    console.log('Falling back to existing session token');
    return null;
  }
}

export const getSampleViewFromCanvas = async (sample: Sample) => {
  const key = (await tenantKeysServerApi.getAccessToken()).data!;
  let refreshURL: string | null = null;
  
  // Check if session token is older than 24 hours
  if (new Date(key.updatedAt) < new Date(Date.now() - 1000 * 60 * 60 * 24)) {
    const endpoint = new URL(`${key.url}/login/session_token`);
    const headers = {
      Authorization: `Bearer ${key.access_token}`,
    };

    try {
      const urlResponse = await fetch(endpoint.toString(), {
        headers,
      });

      if (urlResponse.ok) {
        const { session_url } = await urlResponse.json();
        refreshURL = session_url;
      } else {
        console.warn('Failed to get session URL:', urlResponse.status);
      }
    } catch (error) {
      console.error('Error getting session URL:', error);
    }
  }
  
  let cookie = `_legacy_normandy_session=${key.session_token}`;

  if (refreshURL) {
    try {
      const sessionToken = await refreshSessionToken(refreshURL);
      if (sessionToken) {
        cookie = `_legacy_normandy_session=${sessionToken}`;
      } else {
        console.log('Using existing session token due to refresh failure or serverless environment');
      }
    } catch (error) {
      console.error('Failed to refresh session token:', error);
      console.log('Continuing with existing session token');
    }
  }

  try {
    const response = await fetch(sample.preview_url!, {
      headers: {
        cookie,
      },
    });

    if (!response.ok) {
      console.warn(`Preview URL returned ${response.status}: ${response.statusText}`);
      return { html: '<p>Preview unavailable</p>' };
    }

    return { html: await response.text() };
  } catch (error) {
    console.error('Error fetching preview:', error);
    return { html: '<p>Preview unavailable due to network error</p>' };
  }
};
