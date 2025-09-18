import type { CompletionStatusProps } from '@/components/table/completion-status';
import { SAMPLE_STATUS } from '@/constants/sample';
import type { SampleStatus, StudentLPEnrollment, TrackLearningPeriod } from '@/types';
import { SampleFlagCategory } from '@/types/student';
import { getDueDate } from './learning-period';

export const getSampleStatus = (status: SampleStatus) => {
  return SAMPLE_STATUS[status] ?? status;
};

export const getProgressValue = (assignment: StudentLPEnrollment) => {
  // if (assignment.samples.length === 0) {
  //   return 0;
  // }
  // return (
  //   (assignment.samples.filter((sample) => sample.status.toLowerCase() === 'completed').length /
  //     assignment.samples.length) *
  //   100
  // ).toFixed(2);
};

export const getCompletionStatus = (
  assignment: StudentLPEnrollment | boolean,
  currentLearningPeriod?: TrackLearningPeriod
): CompletionStatusProps['variant'] => {
  if (!currentLearningPeriod) {
    return 'Overdue';
  }

  const isCompleted =
    assignment && typeof assignment === 'object' && 'completed' in assignment
      ? assignment.completed
      : assignment;

  if (isCompleted) {
    return 'Complete';
  }

  if (!isCompleted && getDueDate(currentLearningPeriod) < new Date()) {
    return 'Overdue';
  }

  return 'In Progress';
};

export const sampleCategoryToText = (category: SampleFlagCategory) => {
  switch (category) {
    case SampleFlagCategory.MISSING_SAMPLE:
      return 'Missing Sample';
    case SampleFlagCategory.ERROR_IN_SAMPLE:
      return 'Errors Found';
    case SampleFlagCategory.REASON_REJECTED:
      return 'Reason Rejected';
    default:
      return '';
  }
};
