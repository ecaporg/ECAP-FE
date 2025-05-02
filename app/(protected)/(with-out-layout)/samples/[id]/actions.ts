"use server";
import {
  flagCompletedSample,
  flagMissingWorkSample,
  flagRejectedSample,
  flagSample,
  updateSample,
} from "@/lib/sample";
import {
  type Sample,
  SampleFlagCompleted,
  SampleFlagError,
  SampleFlagMissingWork,
  SampleFlagRejected,
  SampleStatus,
  User,
} from "@/types";
import { redirect, RedirectType } from "next/navigation";
import { routes } from "@/constants/routes";
import { getUserName, isAnyAdmin } from "@/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { ApiResponse } from "@/lib/fetch";

const revalidatePathAndTag = (sample: Sample) => {
  const path = `${routes.compliance.samples}?student_id=${
    sample.assignment_period.student.user.id
  }&name=${getUserName(
    sample.assignment_period.student.user
  )}&learning_period_id=${sample.assignment_period.learning_period.id}`;

  revalidateTag(`samples-${sample.assignment_period.student.user.id}`);
  revalidatePath(path);

  return path;
};

const executeAction = async (
  func: (
    id: Sample["id"],
    data: any
  ) => Promise<ApiResponse<Sample, undefined>>,
  sample: Sample,
  data: any
) => {
  const res = await func(sample.id, data);

  if (res.error) {
    throw new Error(res.message);
  }

  return res;
};

export const approveSampleAction = async (sample: Sample, done_by: User) => {
  await executeAction(updateSample, sample, {
    status: SampleStatus.COMPLETED,
    done_by_id: done_by.id as number,
  });

  revalidateTag("samples");
  const path = revalidatePathAndTag(sample);

  if (!isAnyAdmin(done_by)) {
    redirect(path, RedirectType.replace);
  }
};

export const flagSampleAction = async (
  sample: Sample,
  data: SampleFlagError
) => {
  await executeAction(flagSample, sample, data);

  const path = revalidatePathAndTag(sample);

  redirect(path, RedirectType.replace);
};

export const flagMissingWorkSampleAction = async (
  sample: Sample,
  data: SampleFlagMissingWork
) => {
  await executeAction(flagMissingWorkSample, sample, data);

  revalidatePathAndTag(sample);
};

export const updateSampleAction = async (
  sample: Sample,
  data: Partial<Sample>
) => {
  const result = await updateSample(sample.id, {
    ...data,
    status: SampleStatus.PENDING,
  });

  revalidateTag(`samples-${sample.assignment_period.student.user.id}`);

  return result;
};

export const approveAdminSampleAction = async (
  sample: Sample,
  done_by: User,
  path: string
) => {
  await executeAction(updateSample, sample, {
    status: SampleStatus.COMPLETED,
    done_by_id: done_by.id as number,
  });
  revalidatePathAndTag(sample);
  revalidatePath(path);
  revalidateTag(`compliance-admin-samples`);
  redirect(path, RedirectType.replace);
};

export async function rejectMissingWorkSampleAction(
  sample: Sample,
  data: SampleFlagRejected,
  path: string
) {
  await executeAction(flagRejectedSample, sample, data);
  revalidatePathAndTag(sample);
  revalidatePath(path);
  revalidateTag(`compliance-admin-samples`);
  redirect(path, RedirectType.replace);
}

export const flagCompletedSampleAction = async (
  sample: Sample,
  data: SampleFlagCompleted
) => {
  await executeAction(flagCompletedSample, sample, data);
};
