"use server";
import { updateSample } from "@/lib/sample";
import { type Sample, SampleStatus } from "@/types";
import { redirect } from "next/navigation";
import { routes } from "@/constants/routes";

export const approveSampleAction = async (sample: Sample) => {
  const res = await updateSample(sample.id, {
    status: SampleStatus.COMPLETED,
  });
  if (res.error) {
    throw new Error(res.message);
  }
  redirect(routes.compliance.root);
};

export const flagSampleAction = async (sample: Sample) => {
  return await updateSample(sample.id, {
    status: SampleStatus.FLAGGED_TO_ADMIN,
  });
};
