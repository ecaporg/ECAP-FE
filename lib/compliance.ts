import { Assignment, Tenant } from '@/types';
import { apiFetch } from './fetch';

export const getComplianceTeacherFilter = async () => {
  const response = await apiFetch<Tenant>(`/teacher-compliance-tasks/filters`);
  return response.data;
};

export const getComplianceStudents = async (queryParams: string) => {
  const response = await apiFetch<Assignment[]>(`/teacher-compliance-tasks?${queryParams}`);
  return response;
};
