"use server";
import { routes } from "@/constants/routes";
import {
  flagCompletedSample,
  flagMissingWorkSample,
  flagRejectedSample,
  flagSample,
  updateSample,
} from "@/lib/api/sample";
import type { ApiResponse } from "@/lib/fetch";
import {
  type ISample,
  type ISampleFlagCompleted,
  type ISampleFlagError,
  type ISampleFlagMissingWork,
  type ISampleFlagRejected,
  type IUser,
} from "@/types";
import { getUserName, isAnyAdmin } from "@/utils";
import { SampleStatus } from "ecap-lib/dist/constants";
import { revalidatePath, revalidateTag } from "next/cache";
import { RedirectType, redirect } from "next/navigation";

const revalidatePathAndTag = (sample: ISample) => {
  const path = `${routes.compliance.samples}?student_id=${
    sample.student_lp_enrollments[0].student.user.id
  }&name=${getUserName(
    sample.student_lp_enrollments[0].student.user
  )}&learning_period_id=${sample.student_lp_enrollments[0].learning_period.id}`;

  revalidateTag(`samples-${sample.student_lp_enrollments[0].student.user.id}`);
  revalidatePath(path);

  return path;
};

const executeAction = async (
  func: (
    id: ISample["id"],
    data: any
  ) => Promise<ApiResponse<ISample, undefined>>,
  sample: ISample,
  data: any
) => {
  const res = await func(sample.id, data);

  if (res.error) {
    throw new Error(res.message);
  }

  return res;
};

export const approveSampleAction = async (sample: ISample, done_by: IUser) => {
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
  sample: ISample,
  data: ISampleFlagError
) => {
  await executeAction(flagSample, sample, data);

  const path = revalidatePathAndTag(sample);

  redirect(path, RedirectType.replace);
};

export const flagMissingWorkSampleAction = async (
  sample: ISample,
  data: ISampleFlagMissingWork
) => {
  await executeAction(flagMissingWorkSample, sample, data);

  revalidatePathAndTag(sample);
};

export const updateSampleAction = async (
  sample: ISample,
  data: Partial<ISample>
) => {
  const result = await updateSample(sample.id, {
    ...data,
    status: SampleStatus.PENDING,
  });

  revalidateTag(`samples-${sample.student_lp_enrollments[0].student.user.id}`);

  return result;
};

export const approveAdminSampleAction = async (
  sample: ISample,
  done_by: IUser,
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
  sample: ISample,
  data: ISampleFlagRejected,
  path: string
) {
  await executeAction(flagRejectedSample, sample, data);
  revalidatePathAndTag(sample);
  revalidatePath(path);
  revalidateTag(`compliance-admin-samples`);
  redirect(path, RedirectType.replace);
}

export const flagCompletedSampleAction = async (
  sample: ISample,
  data: ISampleFlagCompleted
) => {
  await executeAction(flagCompletedSample, sample, data);
};
