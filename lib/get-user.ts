import type { User } from '@/types';
import { apiFetch } from './fetch';

export async function getUser(): Promise<User | null> {
  const response = await apiFetch('/auth/me');

  if (!response.data) {
    return null;
  }

  return response.data;
}
