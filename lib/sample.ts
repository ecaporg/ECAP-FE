import { Sample } from '@/types';
import { apiFetch } from './fetch';

export const getSampleById = async (id: Sample['id']) => {
  return await apiFetch<Sample>(`/samples/${id}`);
};

export const updateSample = async (id: Sample['id'], data: Partial<Sample>) => {
  return await apiFetch<Sample>(`/samples/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};
