"use server";
import { updateSample } from "@/lib/sample";
import { type Sample, SampleStatus, User } from "@/types";
import { redirect, RedirectType } from "next/navigation";
import { routes } from "@/constants/routes";
import { getUserName } from "@/utils";
import { revalidatePath, revalidateTag } from "next/cache";

const sampleStatusActions = async (
  sample: Sample,
  newState: Partial<Sample>
) => {
  const res = await updateSample(sample.id, {
    ...newState,
  });

  if (res.error) {
    throw new Error(res.message);
  }

  const path = `${routes.compliance.samples}?student_id=${
    sample.assignment_period.student.user.id
  }&name=${getUserName(sample.assignment_period.student.user)}`;

  revalidateTag(`samples-${sample.assignment_period.student.user.id}`);
  revalidatePath(path);

  return path;
};

export const approveSampleAction = async (sample: Sample, done_by: User) => {
  const path = await sampleStatusActions(sample, {
    status: SampleStatus.COMPLETED,
    done_by_id: done_by.id as number,
  });

  redirect(path, RedirectType.replace);
};

export const flagSampleAction = async (sample: Sample) => {
  const path = await sampleStatusActions(sample, {
    status: SampleStatus.FLAGGED_TO_ADMIN,
  });

  redirect(path, RedirectType.replace);
};

export const flagMissingWorkSampleAction = async (sample: Sample) => {
  await sampleStatusActions(sample, {
    status: SampleStatus.FLAGGED_TO_ADMIN,
  });
};

export const updateSampleAction = async (sample: Sample) => {
  const result = await updateSample(sample.id, {
    ...sample,
    status: SampleStatus.PENDING,
  });

  revalidateTag(`samples-${sample.assignment_period.student.user.id}`);

  return result;
};
