import type { Academy, AssignmentPeriod, School } from './school';
import type { DatedEntity, GenericEntity } from './shared';
import type { Subject, Track } from './track';
import type { User } from './user';

export type Student = DatedEntity & {
  id: number;
  school_id: number;
  academy_id: number | null;
  track_id: number | null;
  grade: string;
  school: School;
  user: User;
  academy: Academy | null;
  track: Track | null;
  assignment_periods: AssignmentPeriod[];
};

export enum SampleStatus {
  COMPLETED = 'COMPLETED',
  FLAGGED_TO_ADMIN = 'FLAGGED_TO_ADMIN',
  PENDING = 'PENDING',
  ERRORS_FOUND = 'ERRORS_FOUND',
  MISSING_SAMPLE = 'MISSING_SAMPLE',
  REASON_REJECTED = 'REASON_REJECTED',
}

export enum SampleFlagCategory {
  ERROR_IN_SAMPLE = 'ERROR_IN_SAMPLE',
  MISSING_SAMPLE = 'MISSING_SAMPLE',
  REASON_REJECTED = 'REASON_REJECTED',
}

export type SampleFlagError = GenericEntity & {
  user_id: number;
  user: User;
  comment: string;
};

export type SampleFlagMissingWork = GenericEntity & {
  user_id: number;
  reason: string;
  user: User;
};

export type SampleFlagRejected = GenericEntity & {
  user_id: number;
  reason: string;
  user: User;
};

export type SampleFlagCompleted = GenericEntity & {
  user_id: number;
  message: string;
  user: User;
};

export type Sample = GenericEntity & {
  assignment_title: string;
  status: SampleStatus;
  flag_category: SampleFlagCategory;
  done_by_id: number | null;
  assignment_period_id: number;
  subject_id: number;
  subject: Subject;
  grade: string;
  assignment_period: AssignmentPeriod;
  done_by: User | null;
  flag_errors: SampleFlagError | null;
  flag_missing_work: SampleFlagMissingWork | null;
  flag_rejected: SampleFlagRejected | null;
  flag_completed: SampleFlagCompleted | null;
};
