import { GenericEntity } from './shared';
import { Admin, Director, Teacher } from './staff';
import { Sample, Student } from './student';
import { Subject, Track, TrackLearningPeriod } from './track';

export type Tenant = GenericEntity & {
  name: string;

  schools: School[];

  admins: Admin[];

  academies: Academy[];

  tracks: Track[];
};

export type Academy = GenericEntity & {
  name: string;
  tenant: Tenant;
};

export type Semester = {
  school_id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  school: School;
};

export type School = GenericEntity & {
  name: string;

  tenant_id: number;

  tenant: Tenant;

  semesters: Semester[];

  students: Student[];

  teachers: Teacher[];

  directors: Director[];
};

export type AcademicYear = GenericEntity & {
  from: number;

  to: number;

  semesters: Semester[];

  learningPeriods: TrackLearningPeriod[];

  assignments: Assignment[];
};

export type Assignment = GenericEntity & {
  school_id: number;

  teacher_id: number;

  subject_id: number;

  academic_year_id: number;

  school: School;

  teacher: Teacher;

  subject: Subject;

  academic_year: AcademicYear;

  assignment_periods: AssignmentPeriod[];
};

export type AssignmentPeriod = GenericEntity & {
  subject_assignment_id: number;

  student_id: number;

  learning_period_id: number;

  completed: boolean;

  learning_period: TrackLearningPeriod;

  assignment: Assignment;

  student: Student;

  samples: Sample[];
};
