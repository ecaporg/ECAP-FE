import { updateSample } from '@/lib/sample';
import { type Sample, SampleStatus } from '@/types';

export const approveSampleAction = async (sample: Sample) => {
  return await updateSample(sample.id, {
    status: SampleStatus.COMPLETED,
  });
};

export const flagSampleAction = async (sample: Sample) => {
  return await updateSample(sample.id, {
    status: SampleStatus.FLAGGED_TO_ADMIN,
  });
};
