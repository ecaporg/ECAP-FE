import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth';
import { AuthResponse } from '@/types';
import { cookies } from 'next/headers';

export async function getAuthToken() {
  const cookiesList = await cookies();
  const token = cookiesList.get(ACCESS_TOKEN)?.value;
  return token;
}

export async function getRefreshToken() {
  const cookiesList = await cookies();
  const refreshToken = cookiesList.get(REFRESH_TOKEN)?.value;
  return refreshToken;
}

export async function setAuthTokens(data: AuthResponse) {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN, data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });
  cookieStore.set(REFRESH_TOKEN, data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 днів
    path: '/',
  });
}

export async function refresh() {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    return false;
  }

  const dataWithRefresh = await fetch('/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (dataWithRefresh.ok) {
    const data = await dataWithRefresh.json();
    await setAuthTokens(data?.data);
    return true;
  }

  return false;
}
