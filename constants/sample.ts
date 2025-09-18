import type { SampleStatus } from 'ecap-lib/dist/constants';

export const SAMPLE_STATUS: Record<SampleStatus, string> = {
  CREATED: 'Created',
  COMPLETED: 'Complete',
  FLAGGED_TO_ADMIN: 'Flagged to Admin',
  PENDING: 'Pending Approval',
  ERRORS_FOUND: 'Errors Found',
  MISSING_SAMPLE: 'Missing Sample',
  REASON_REJECTED: 'Reason Rejected',
};

export const FLAG_MISSING_WORK_SAMPLE_REASONS = [
  'Subject was not assigned during this LP',
  'No work completed in this subject during this LP',
];
