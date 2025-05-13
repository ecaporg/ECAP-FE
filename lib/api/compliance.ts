import type { AssignmentPeriod, TeacherCompliance, Tenant } from '@/types';
import { apiFetch } from '../fetch';

export const getComplianceTeacherFilter = async () => {
  const response = await apiFetch<Tenant>(`/students-table/filters`, {
    tags: [`teacher-filter`],
    cache: 'force-cache',
  });
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data!;
};

export const getComplianceStudents = async (queryParams: string) => {
  const response = await apiFetch<
    AssignmentPeriod[],
    {
      completedCount: number;
    }
  >(`/students-table?${queryParams}`);
  return response;
};

export const getComplianceStudentSamples = async (queryParams: string, tag_id: string) => {
  const response = await apiFetch<AssignmentPeriod[]>(`/students-table/subjects?${queryParams}`, {
    tags: [`samples-${tag_id}`, `samples`],
  });
  return response;
};

export const getComplianceAdminFilter = async () => {
  const response = await apiFetch<Tenant>(`/teachers-table/filters`, {
    tags: [`admin-filter`],
    cache: 'force-cache',
  });
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data!;
};

export const getComplianceTeachers = async (queryParams: string) => {
  const response = await apiFetch<
    TeacherCompliance[],
    {
      completedCount: number;
    }
  >(`/teachers-table?${queryParams}`);
  return response;
};
