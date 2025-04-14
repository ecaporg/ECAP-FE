import { Subject, Track, TrackLearningPeriod } from './track';
import { Academy, AssignmentPeriod, School } from './school';
import { User } from './user';
import { Teacher } from './staff';
import { GenericEntity } from './shared';

export type Student = GenericEntity & {
  school_id: number;

  user_id: number;

  academy_id: number;

  track_id: number;

  grade: string;

  school: School;

  user: User;

  academy: Academy;

  track: Track;

  assignment_periods: AssignmentPeriod[];
};

export type Sample = GenericEntity & {
  assignment_title: string;

  status: string;

  user_id: number;

  school_id: number;

  assignment_period_id: number;

  assignment_period: AssignmentPeriod;

  done_by_teacher: Teacher;
};
