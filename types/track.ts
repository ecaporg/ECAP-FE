import { Tenant } from './school';
import { Sample, Student } from './student';

export type Subject = {
  track_id: number;

  name: string;

  track: Track;

  samples: Sample[];
};

export type TrackCalendar = {
  track_id: number;

  date: Date;

  type: string;

  track: Track;
};

export type TrackLearningPeriod = {
  track_id: number;

  name: string;

  start_date: Date;

  end_date: Date;

  samples: Sample[];

  track: Track;
};

export type Track = {
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
