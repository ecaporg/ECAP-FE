import type { CanvasGenericEntity } from "./shared";
import type { Subject } from "./track";
import type { Sample } from "./student";
import type { StudentLPEnrollment } from "./school";

export type Course = CanvasGenericEntity & {
  name: string;
  assignments: Assignment[];
  subjects: Subject[];
};

export type Assignment = CanvasGenericEntity & {
  course_id: number;
  name: string;
  course: Course;
  enrollmentAssignments: StudentLPEnrollmentAssignment[];
};

export type StudentLPEnrollmentAssignment = {
  student_lp_enrollment_id: number;
  assignment_id: number;
  sample_id?: number;
  assignment: Assignment;
  sample: Sample | null;
  student_lp_enrollment: StudentLPEnrollment;
};
