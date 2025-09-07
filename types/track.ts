import type { AcademicYear, Semester, StudentLPEnrollment, Tenant } from './school';
import type { GenericEntity } from './shared';
import type { Sample, Student } from './student';
import type { Course } from './course';

export type Subject = Course;

export type TrackCalendarDay = {
  day: Date | string;
  type: string;
};

export type TrackCalendar = GenericEntity & {
  days: TrackCalendarDay[];
  track: Track;
};

export type TrackLearningPeriod = GenericEntity & {
  track_id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  track: Track;
  student_lp_enrollments: StudentLPEnrollment[];
};

export type Track = GenericEntity & {
  tenant_id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  academic_year_id: number;
  academicYear: AcademicYear;
  tenant: Tenant;
  calendar: TrackCalendar;
  learningPeriods: TrackLearningPeriod[];
  studentLPEnrollments: StudentLPEnrollment[];
  semesters: Semester[];
};
