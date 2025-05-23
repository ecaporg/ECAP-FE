'use server';
import { routes } from '@/constants/routes';
import {
  flagCompletedSample,
  flagMissingWorkSample,
  flagRejectedSample,
  flagSample,
  updateSample,
} from '@/lib/api/sample';
import type { ApiResponse } from '@/lib/fetch';
import {
  type Sample,
  type SampleFlagCompleted,
  type SampleFlagError,
  type SampleFlagMissingWork,
  type SampleFlagRejected,
  SampleStatus,
  type User,
} from '@/types';
import { getUserName, isAnyAdmin } from '@/utils';
import { revalidatePath, revalidateTag } from 'next/cache';
import { RedirectType, redirect } from 'next/navigation';

const revalidatePathAndTag = (sample: Sample) => {
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
  func: (id: Sample['id'], data: any) => Promise<ApiResponse<Sample, undefined>>,
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

  revalidateTag('samples');
  const path = revalidatePathAndTag(sample);

  if (!isAnyAdmin(done_by)) {
    redirect(path, RedirectType.replace);
  }
};

export const flagSampleAction = async (sample: Sample, data: SampleFlagError) => {
  await executeAction(flagSample, sample, data);

  const path = revalidatePathAndTag(sample);

  redirect(path, RedirectType.replace);
};

export const flagMissingWorkSampleAction = async (sample: Sample, data: SampleFlagMissingWork) => {
  await executeAction(flagMissingWorkSample, sample, data);

  revalidatePathAndTag(sample);
};

export const updateSampleAction = async (sample: Sample, data: Partial<Sample>) => {
  const result = await updateSample(sample.id, {
    ...data,
    status: SampleStatus.PENDING,
  });

  revalidateTag(`samples-${sample.student_lp_enrollments[0].student.user.id}`);

  return result;
};

export const approveAdminSampleAction = async (sample: Sample, done_by: User, path: string) => {
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

export const flagCompletedSampleAction = async (sample: Sample, data: SampleFlagCompleted) => {
  await executeAction(flagCompletedSample, sample, data);
};
