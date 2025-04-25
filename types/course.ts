import type { AcademicYear, AssignmentPeriod, School } from "./school";
import type { GenericEntity } from "./shared";
import type { Teacher } from "./staff";

export type Course = GenericEntity & {
  school_id: number;
  teacher_id: number;
  academic_year_id: number;
  school: School;
  teacher: Teacher;
  academic_year: AcademicYear;
  assignment_periods: AssignmentPeriod[];
};
