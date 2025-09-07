import type { TeacherSchoolYearEnrollment } from './enrollment';
import type { GenericEntity } from './shared';
import type { Admin, Director, Teacher } from './staff';
import type { Sample, Student } from './student';
import type { Track, TrackLearningPeriod } from './track';
import type { Course, StudentLPEnrollmentAssignment } from './course';

export type Tenant = GenericEntity & {
  name: string;
  schools: School[];
  admins: Admin[];
  academies: Academy[];
  tracks: Track[];
  subjects: Course[];
  key: {
    access_token: string;
    session_token: string;
    url: string;
  } & GenericEntity;
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
  track_id: number;
  track: Track;
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
  teacher_school_year_enrollments: TeacherSchoolYearEnrollment[];
};

export type AcademicYear = GenericEntity & {
  from: number;
  to: number;
  tracks: Track[];
  teacher_school_year_enrollments: TeacherSchoolYearEnrollment[];
};

export type StudentLPEnrollment = GenericEntity & {
  student_id: number;
  learning_period_id: number;
  completed: boolean;
  percentage: number;
  student_grade: string;
  learning_period: TrackLearningPeriod;
  teacher_school_year_enrollments: TeacherSchoolYearEnrollment[];
  student: Student;
  assignments: StudentLPEnrollmentAssignment[];
};

export type TeacherCompliance = {
  teacher_school_year_enrollment_id: number;
  teacher_id: number;
  teacher_name: string;
  student_count: number;
  completed_count: number;
  flagged_count: number;
  incompleted_count: number;
  is_complated: boolean;
  completion_percentage: number;
  academy_id: number;
  academy_name: string;
};
