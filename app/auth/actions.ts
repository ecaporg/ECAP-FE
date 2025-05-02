'use server';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth';
import { routes } from '@/constants/routes';
import { setAuthTokens } from '@/lib/auth';
import { apiFetch } from '@/lib/fetch';
import { USER_TAG } from '@/lib/get-user';
import type { AuthResponse, SignInDTO } from '@/types';
import { revalidateTag } from 'next/cache';
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
  revalidateTag(USER_TAG);
  return {
    ok: true,
    data: response.data,
  };
}

export async function signOutAction() {
  const cookieStore = await cookies();
  revalidateTag(USER_TAG);
  cookieStore.delete(ACCESS_TOKEN);
  cookieStore.delete(REFRESH_TOKEN);
  redirect(routes.auth.signIn);
}
