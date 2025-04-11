'use server';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth';
import { routes } from '@/constants/routes';
import { setAuthTokens } from '@/lib/auth';
import { apiFetch } from '@/lib/fetch';
import { AuthResponse, SignInDTO } from '@/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signInAction(data: SignInDTO) {
  const response = await apiFetch<AuthResponse>('/auth/sign-in', {
    method: 'POST',
    body: JSON.stringify(data),
    withoutAuth: true,
  });

  if (!response.data) {
    return {
      ok: false,
      error: response.error,
    };
  }

  await setAuthTokens(response.data);

  return {
    ok: true,
    data: response.data.user,
  };
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN);
  cookieStore.delete(REFRESH_TOKEN);
  redirect(routes.auth.signIn);
}
