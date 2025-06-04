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
      if (setCookieHeader && setCookieHeader.includes('_legacy_normandy_session')) {
        const match = setCookieHeader.match(/_legacy_normandy_session=([^;]+)/);
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
  let cookie = `_legacy_normandy_session=${key.session_token}`;

  if (refreshURL) {
      const sessionToken = await refreshSessionToken(refreshURL);
      if (sessionToken) {
        cookie = `_legacy_normandy_session=${sessionToken}`;
      }
  }

  console.log(sample.preview_url);
  const response = await fetch(sample.preview_url!, {
    headers: {
      cookie,
    },
  });

  return { html: await response.text() };
};
