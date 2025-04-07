import { cookies } from 'next/headers';
import type { User } from '@/types';
import { getUserFromToken } from './auth-server';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth';

export async function getUser(): Promise<User | null> {
  const cookiesList = await cookies();
  const token = cookiesList.get(ACCESS_TOKEN)?.value;
  const refreshToken = cookiesList.get(REFRESH_TOKEN)?.value;

  console.log('token', token, refreshToken);
  if(!token) {
    return null;
  }

  return getUserFromToken(token, refreshToken);
}
