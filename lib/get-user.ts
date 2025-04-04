import { cookies } from 'next/headers';
import type { User } from '@/types';
import { getUserFromToken } from './auth-server';

// Функція, яка отримує поточного користувача з cookies на стороні сервера
export async function getCurrentUser(): Promise<User | null> {
  const cookiesList = await cookies();
  const token = cookiesList.get('accessToken')?.value;

  if (!token) {
    return null;
  }

  return getUserFromToken(token);
}
