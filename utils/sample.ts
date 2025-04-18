import { SampleStatus } from '@/types';
import { SAMPLE_STATUS } from '@/constants/sample';

export const getSampleStatus = (status: SampleStatus) => {
  return SAMPLE_STATUS[status] ?? status;
};
