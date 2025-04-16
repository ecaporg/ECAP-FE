import { AssignmentPeriod, Tenant } from '@/types';
import { apiFetch } from './fetch';

export const getComplianceTeacherFilter = async () => {
  const response = await apiFetch<Tenant>(`/teacher-compliance-tasks/filters`);
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data;
};

export const getComplianceStudents = async (queryParams: string) => {
  const response = await apiFetch<AssignmentPeriod[]>(`/teacher-compliance-tasks?${queryParams}`);
  return response;
};
