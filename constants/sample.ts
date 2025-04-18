import { SampleStatus } from '@/types';

export const SAMPLE_STATUS: Record<SampleStatus, string> = {
  COMPLETED: 'Complete',
  FLAGGED_TO_ADMIN: 'Flagged to Admin',
  PENDING: 'Pending Approval',
  ERRORS_FOUND: 'Errors Found',
  MISSING_SAMPLE: 'Missing Sample',
  REASON_REJECTED: 'Reason Rejected',
};
