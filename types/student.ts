import { Subject, Track } from './track';
import { Academy, AssignmentPeriod, School } from './school';
import { User } from './user';
import { Teacher } from './staff';
import { GenericEntity } from './shared';

export type Student = GenericEntity & {
  school_id: number;
  user_id: number;
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

export type Sample = GenericEntity & {
  assignment_title: string;
  status: SampleStatus;
  user_id: number | null;
  school_id: number | null;
  assignment_period_id: number;
  subject_id: number;
  subject: Subject;
  assignment_period: AssignmentPeriod;
  done_by_teacher: Teacher | null;
};
