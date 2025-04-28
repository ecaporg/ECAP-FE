'use server';
import { flagMissingWorkSample, flagSample, updateSample } from '@/lib/sample';
import { type Sample, SampleFlagError, SampleFlagMissingWork, SampleStatus, User } from '@/types';
import { redirect, RedirectType } from 'next/navigation';
import { routes } from '@/constants/routes';
import { getUserName } from '@/utils';
import { revalidatePath, revalidateTag } from 'next/cache';
import { ApiResponse } from '@/lib/fetch';

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

  redirect(path, RedirectType.replace);
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

export const updateSampleAction = async (sample: Sample) => {
  const result = await updateSample(sample.id, {
    ...sample,
    status: SampleStatus.PENDING,
  });

  revalidateTag(`samples-${sample.assignment_period.student.user.id}`);

  return result;
};
