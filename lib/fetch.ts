import { routes } from '@/constants/routes';
import { redirect } from 'next/navigation';

import { getAuthToken, refresh } from './auth';

// Типи для відповіді
export type ApiResponse<T = any, D = undefined> = {
  data?: T;
  error?: string;
  message?: string;
  details?: Record<string, any>;
  meta?: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    path: string;
    totalItems: number;
    totalPages: number;
    additionalData: D;
  };
};

export interface ApiAdditionalInit {
  withoutAuth?: boolean;
  tags?: string[];
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080/api';

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const RETRIES = 3;
export const RETRY_DELAY = 10000;

export async function apiFetch<T = any, D = undefined>(
  endpoint: string,
  init?: RequestInit & ApiAdditionalInit
): Promise<ApiResponse<T, D>> {
  let authHeaders = {};

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  console.info(url)

  if (!init?.withoutAuth) {
    const token = await getAuthToken();
    if (token) {
      authHeaders = {
        Authorization: `Bearer ${token}`,
      };
    }
  }

  async function executeFetch(attempt = 1): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        cache: 'no-cache',
        next: {
          revalidate: 60,
          tags: [...(init?.tags || [])],
        },
        ...init,
        headers: {
          'Content-Type': 'application/json',
          ...init?.headers,
          ...authHeaders,
        },
      });

      if (response.status === 401) {
        if (await refresh()) {
          return await executeFetch(attempt + 1);
        }

        const callbackUrl = encodeURIComponent(window?.location?.href);
        redirect(`${routes.auth.signIn}?callbackUrl=${callbackUrl}`);
      } else if (response.status === 403) {
      }

      const data = await response.json();
      console.log(data);
      return data as ApiResponse<T>;
    } catch (error) {
      console.error(error);
      if (attempt <= RETRIES) {
        await wait(RETRY_DELAY * attempt);
        return executeFetch(attempt + 1);
      }

      return {
        error: (error as Error).message,
      };
    }
  }

  return executeFetch() as Promise<ApiResponse<T, D>>;
}
