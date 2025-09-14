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

async function refreshSessionToken(refreshURL: string): Promise<string | null> {
  try {
    const response = await fetch(refreshURL, {
      method: 'GET',
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ECAPBot/1.0)',
      },
    });

    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader && setCookieHeader.includes('canvas_session')) {
      const match = setCookieHeader.match(/canvas_session=([^;]+)/);
      if (match && match[1]) {
        console.log('Fallback session extraction successful', match[1]);
        await tenantKeysServerApi.refreshSessionToken(match[1]);
        return match[1];
      }
    }

    console.warn('Fallback session extraction failed');
    return null;
  } catch (fallbackError) {
    console.error('Fallback method also failed:', fallbackError);
    return null;
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
  let cookie = `canvas_session=${key.session_token}`;

  if (refreshURL) {
    const sessionToken = await refreshSessionToken(refreshURL);
    if (sessionToken) {
      cookie = `canvas_session=${sessionToken}`;
    }
  }

  console.log(sample.preview_url);
  const headers = {
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    priority: 'u=0, i',
    'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    cookie,
  };

  const response = await fetch(sample.preview_url!, {
    headers,
  });

  return { html: await response.text() };
};
