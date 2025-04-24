import type { AssignmentPeriod, Tenant } from "@/types";
import { type ApiResponse, apiFetch } from "./fetch";

export const getComplianceTeacherFilter = async () => {
  const response = await apiFetch<Tenant>(`/teacher-compliance-tasks/filters`);
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
    `/teacher-compliance-tasks?${queryParams}`
  );
  return response as ComplianceStudentsResponse;
};

export const getComplianceStudentSamples = async (
  queryParams: string,
  tag_id: string
) => {
  const response = await apiFetch<AssignmentPeriod[]>(
    `/teacher-compliance-tasks/student-samples?${queryParams}`,
    {
      tags: [`samples-${tag_id}`],
    }
  );
  return response;
};
