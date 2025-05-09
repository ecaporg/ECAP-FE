import {
  Sample,
  SampleFlagCompleted,
  SampleFlagError,
  SampleFlagMissingWork,
  SampleFlagRejected,
} from "@/types";
import { apiFetch } from "../fetch";
import { revalidateTag } from "next/cache";

export const getSampleById = async (id: Sample["id"]) => {
  return await apiFetch<Sample>(`/samples/${id}`, {
    tags: [`sample-${id}`],
  });
};

export const updateSample = async (id: Sample["id"], data: Partial<Sample>) => {
  revalidateTag(`sample-${id}`);
  return await apiFetch<Sample>(`/samples/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const flagSample = async (id: Sample["id"], data: SampleFlagError) => {
  revalidateTag(`sample-${id}`);
  return await apiFetch<Sample>(`/samples/${id}/flag-error`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const flagMissingWorkSample = async (
  id: Sample["id"],
  data: SampleFlagMissingWork
) => {
  revalidateTag(`sample-${id}`);
  return await apiFetch<Sample>(`/samples/${id}/flag-missing-work`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getComplianceAdminSamples = async (param: string) => {
  return await apiFetch<
    Sample[],
    {
      completedCount: number;
    }
  >(`/samples/flagged?${param}`, {
    tags: [`compliance-admin-samples`],
  });
};

export const flagRejectedSample = async (
  id: Sample["id"],
  data: SampleFlagRejected
) => {
  revalidateTag(`sample-${id}`);
  return await apiFetch<Sample>(`/samples/${id}/flag-rejected`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const flagCompletedSample = async (
  id: Sample["id"],
  data: SampleFlagCompleted
) => {
  revalidateTag(`sample-${id}`);
  return await apiFetch<Sample>(`/samples/${id}/flag-completed`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
