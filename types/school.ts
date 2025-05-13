import { Course } from './course';
import type { GenericEntity } from './shared';
import type { Admin, Director, Teacher } from './staff';
import type { Sample, Student } from './student';
import type { Track, TrackLearningPeriod } from './track';

export type Tenant = GenericEntity & {
  name: string;
  schools: School[];
  admins: Admin[];
  academies: Academy[];
  tracks: Track[];
  semesters: Semester[];
};

export type Academy = GenericEntity & {
  name: string;
  tenant_id: number;
  tenant: Tenant;
  directors: Director[];
};

export type Semester = GenericEntity & {
  tenant_id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  academic_year_id: number;
  academic_year: AcademicYear;
  tenant: Tenant;
};

export type School = GenericEntity & {
  name: string;

  tenant_id: number;

  tenant: Tenant;

  semesters: Semester[];

  students: Student[];

  teachers: Teacher[];

  directors: Director[];

  courses: Course[];
};

export type AcademicYear = GenericEntity & {
  from: number;

  to: number;

  semesters: Semester[];

  tracks: Track[];

  courses: Course[];
};

export type AssignmentPeriod = GenericEntity & {
  course_id: number;
  student_id: number;
  learning_period_id: number;
  completed: boolean;
  percentage: number;
  learning_period: TrackLearningPeriod;
  course: Course;
  student: Student;
  samples: Sample[];
};

export type TeacherCompliance = {
  course_id: number;
  teacher_id: number;
  teacher_firstname: string;
  teacher_lastname: string;
  student_count: number;
  completed_count: number;
  flagged_count: number;
  incompleted_count: number;
  is_complated: boolean;
  completion_percentage: number;
  academy_id: number;
  academy_name: string;
};
