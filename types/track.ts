import { Assignment, Tenant } from './school';
import { GenericEntity } from './shared';
import { Sample, Student } from './student';

export type Subject = GenericEntity & {
  track_id: number;

  name: string;

  track: Track;

  assignments: Assignment[];
};

export type TrackCalendar = {
  track_id: number;

  date: Date;

  type: string;

  track: Track;
};

export type TrackLearningPeriod = GenericEntity & {
  track_id: number;

  name: string;

  start_date: Date;

  end_date: Date;

  samples: Sample[];

  track: Track;
};

export type Track = GenericEntity & {
  tenant_id: number;

  name: string;

  start_date: Date;

  end_date: Date;

  tenant: Tenant;

  calendar: TrackCalendar[];

  subjects: Subject[];

  learningPeriods: TrackLearningPeriod[];

  students: Student[];
};
