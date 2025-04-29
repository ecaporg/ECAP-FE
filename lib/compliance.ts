import type { AssignmentPeriod, TeacherCompliance, Tenant } from "@/types";
import { type ApiResponse, apiFetch } from "./fetch";

export const getComplianceTeacherFilter = async () => {
  const response = await apiFetch<Tenant>(`/students-table/filters`);
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data!;
};

type ComplianceStudentsResponse = ApiResponse<AssignmentPeriod[]> & {
  meta: { completedCount: number };
};

export const getComplianceStudents = async (
  queryParams: string
): Promise<ComplianceStudentsResponse> => {
  const response = await apiFetch<AssignmentPeriod[]>(
    `/students-table?${queryParams}`
  );
  return response as ComplianceStudentsResponse;
};

export const getComplianceStudentSamples = async (
  queryParams: string,
  tag_id: string
) => {
  const response = await apiFetch<AssignmentPeriod[]>(
    `/students-table/subjects?${queryParams}`,
    {
      tags: [`samples-${tag_id}`, `samples`],
    }
  );
  return response;
};

export const getComplianceAdminFilter = async () => {
  const response = await apiFetch<Tenant>(`/teachers-table/filters`);
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data!;
};

export const getComplianceTeachers = async (queryParams: string) => {
  const response = await apiFetch<TeacherCompliance[]>(
    `/teachers-table?${queryParams}`
  );
  return response as ApiResponse<TeacherCompliance[]> & {
    meta: { completedCount: number };
  };
};
