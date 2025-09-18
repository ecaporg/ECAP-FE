import type { ITeacher } from '@/types';
import { apiFetch } from '../fetch';

export const searchTeacher = async (value: string) => {
  const response = await apiFetch<ITeacher[]>(`/teachers-table/teachers/${value}`);
  return response.data || [];
};

export const getTeacher = async (id: string) => {
  const response = await apiFetch<ITeacher>(`/teachers/${id}`);
  return response.data;
};
