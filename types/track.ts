import {
  type AcademicYear,
  Assignment,
  type AssignmentPeriod,
  type Tenant,
} from "./school";
import type { GenericEntity } from "./shared";
import type { Sample, Student } from "./student";

export type Subject = GenericEntity & {
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

export type TrackLearningPeriod = GenericEntity & {
  track_id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  track: Track;
  assignment_periods: AssignmentPeriod[];
};

export type Track = GenericEntity & {
  tenant_id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  academic_year_id: number;
  academicYear: AcademicYear;
  tenant: Tenant;
  calendar: TrackCalendar[];
  subjects: Subject[];
  learningPeriods: TrackLearningPeriod[];
  students: Student[];
};
