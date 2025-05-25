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
  const canvas_id_cookie = await generateCanvasSessionUrl(
    res.data?.access_token!,
    res.data?.url!,
    new Date().toISOString().split('T')[0]
  )!;

  const response = await fetch(sample.preview_url, {
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
      priority: 'u=0, i',
      'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'none',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      cookie:
        '_legacy_normandy_session=GtmuU1GT7u8BwKYwOzQGkw+pPFYQEhyu_jQ7wIlhc-b-XL2x20ItbbikARUAYb1Tk-MNq7e3j9l085UcRKPk0xH37vXEQSg5e2oFwSGxOdiVqV1paKgFdmsKHODMPswZ0sdlSfvsRBlgN8eNUemIMMaisd6n8arQfcqMfCJCThwXvdzJLFNjeBhS3eJ-O9JJWi1G_PGIXUrXAg5uDSrw-8DOzNP6e_szYNkrQXOac3QOMjKjwszd0Ovmc5obg75zhiGzaa1ktbn3T2-pjvzSxUSVmKowgC-cKyXalahj-lZXUuZQjEHJSK73DXXdKnzrkWMNAUzYq1qTVafJDj8js-PrHc9TT8EPa-m15TUnKoOSwaYgUQmIjULvn4yz8hjCsrIhE-9oSci7i5ipq_hcDBpISj_UcWYBxAN5CCnj0z-4Q.GZki6ug-e34a4rjOoWxkqNdYpZY.aDNq2A',
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
  });

  return await response.text();
};

interface CanvasSessionTokenResponse {
  session_url: string;
}

export const generateCanvasSessionUrl = cache(
  async (accessToken: string, url: string, _today: string) => {
    try {
      const endpoint = new URL(`${url}/login/session_token`);

      const response = await fetch(endpoint.toString(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = (await response.json()) as CanvasSessionTokenResponse;

      console.log(data);
      // const getSessionUrl = await fetch(data.session_url, {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // });

      // const cookies = getSessionUrl.headers
      //   .getSetCookie()
      //   ?.filter((el) => el?.includes('_legacy_normandy_session'))
      //   ?.map((cookie) => {
      //     const parsed = cookie.split(';')[0].trim();
      //     console.log('Parsing cookie: -> extracted:', parsed);
      //     return parsed;
      //   })
      //   .join('; ');

      // console.log(cookies);

      // return cookies;
    } catch (error) {
      console.error('Error generating Canvas session URL:', error);
      return '';
    }
  }
);
