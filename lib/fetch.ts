import { redirect } from 'next/navigation';
import { routes } from '@/constants/routes';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth';


// Типи для відповіді
type ApiResponse<T = any> = ({
  data?: T;
  error?: string;
  message?: string;
  details?: Record<string, any>;
})

interface ApiAdditionalInit {
  withoutAuth?: boolean;
}


// Базовий URL бекенду
const API_BASE_URL = process.env.BACKEND_URL || 'http://localhost:8080';

const getAuthToken = async () => {
  const cookiesList = await cookies();
  const token = cookiesList.get(ACCESS_TOKEN)?.value;
  return token;
}

const getRefreshToken = async () => {
  const cookiesList = await cookies();
  const refreshToken = cookiesList.get(REFRESH_TOKEN)?.value;
  return refreshToken;
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const RETRIES = 3;
const RETRY_DELAY = 1000;

// Основна функція для виконання запитів
export async function apiFetch<T = any>(
  endpoint: string,
  init?: RequestInit & ApiAdditionalInit,
): Promise<ApiResponse<T>> {
    let authHeaders = {};

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  if (!init?.withoutAuth) {
    const token = await getAuthToken();
    if (token) {
       authHeaders = {
        Authorization: `Bearer ${token}`,
       }
    }
  }

  async function executeFetch(attempt = 1): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        ...init,
        headers: {
          'Content-Type': 'application/json',
          ...init?.headers,
          ...authHeaders,
        },
      });

      // Обробка 401 помилки (неавторизований доступ)
      if (response.status === 401) {
          const callbackUrl = encodeURIComponent(window.location.href);
          redirect(`${routes.auth.signIn}?callbackUrl=${callbackUrl}`);
      }

      

      const data = await response.json();

      console.log('data', data);
      
      return data as ApiResponse<T>;
    } catch (error) {
      if (attempt < RETRIES) {
        await wait(RETRY_DELAY * attempt);
        return executeFetch(attempt + 1);
      }

      return {
        error: 'Network error. Please try again later.',
      };
    }
  }

  return executeFetch();
}