import type {
  Sample,
  SampleFlagCompleted,
  SampleFlagError,
  SampleFlagMissingWork,
  SampleFlagRejected,
} from '@/types';
import { revalidateTag } from 'next/cache';
import { cache } from 'react';
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

export const getSampleViewFromCanvas = async (sample: Sample): Promise<string> => {
  const res = await tenantKeysServerApi.getAccessToken();
  const { url, headers, cookie } = await generateCanvasSessionUrl(
    res.data?.access_token!,
    res.data?.url!,
    sample.preview_url
  )!;

  console.log('url', url);

  const response = await fetch(url, {
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      cookie: `_legacy_normandy_session=${res.data?.session_token}`,
      ...headers,
    },
  });

  return await response.text();
};

interface CanvasSessionTokenResponse {
  session_url: string;
}

export const generateCanvasSessionUrl = cache(
  async (accessToken: string, url: string, returnTo: string) => {
    try {
      const endpoint = new URL(`${url}/login/session_token?return_to=${returnTo}`);
      const response = await fetch(endpoint.toString(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = (await response.json()) as CanvasSessionTokenResponse;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
      };

      // const getSessionResponse = await fetch(data.session_url, { headers });
      // console.log(getSessionResponse.redirected, 'is redirected');
      // const cookie = Array.from(getSessionResponse.headers.values())
      //   .filter((el) => el?.includes('_legacy_normandy_session'))
      //   .map((cookie) => {
      //     const parsed = cookie.split(';')[0].trim();
      //     console.log('Parsing cookie: -> extracted:', cookie);
      //     return parsed;
      //   })
      //   .join('; ');
      // console.log('cookie', cookie, cookie.length);
      return { url: data.session_url, headers, cookie: '' };
    } catch (error) {
      console.error('Error generating Canvas session URL:', error);
      return { url: '', headers: {}, cookie: '' };
    }
  }
);
