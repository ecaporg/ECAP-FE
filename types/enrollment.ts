import type { AcademicYear, School, StudentLPEnrollment } from './school';
import type { GenericEntity } from './shared';
import type { Teacher } from './staff';

export type TeacherSchoolYearEnrollment = GenericEntity & {
  school_id: number;
  teacher_id: number;
  academic_year_id: number;
  school: School;
  teacher: Teacher;
  academic_year: AcademicYear;
  student_lp_enrollments: StudentLPEnrollment[];
};
