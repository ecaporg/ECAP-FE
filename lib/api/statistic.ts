import type { DashboardStats } from '@/types';
import { apiFetch } from '../fetch';

export const getDashboardStats = async () => {
  const res = await apiFetch<DashboardStats>('/dashboard/stats', {
    tags: ['dashboard-stats'],
  });
  if (res.error) {
    throw new Error(res.error);
  }
  return res.data!;
};
