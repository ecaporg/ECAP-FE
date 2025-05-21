export const DEFAULT_FILTERS_KEYS = {
  STUDENT_ID: 'student_id',
  LEARNING_PERIOD_ID: 'learning_period_id',
  SCHOOL_ID: 'school_id',
  ACADEMY_ID: 'academy_id',
  TRACK_ID: 'track_id',
  ACADEMIC_YEAR: 'academic_year',
  SEMESTER: 'semesters.id',
  SUBJECT: 'subject',
  GRADE: 'student_grade',
  SEARCH: 'search',
  COMPLETED: 'completed',
  SAMPLE_STATUS: 'status',
  DONE_BY: 'done_by',
  TEACHER_ID: 'teacher_school_year_enrollment.teacher_id',
  FLAG_CATEGORY: 'flag_category',
} as const;

export const SPECIFIC_PAGE_FILTER_KEYS = {
  COMPLIANCE: {
    ACADEMY_ID: 'student.academy_id',
    TRACK_ID: 'student.track_id',
    GRADE: 'student_grade',
    SCHOOL_ID: 'teacher_school_year_enrollment.school_id',
    SAMPLE_STATUS: 'samples.status',
    DONE_BY: 'samples.done_by_id',
    ADMIN: {
      LEARNING_PERIOD_ID: 'student_lp_enrollment.learning_period_id',
      TEACHER_ID: 'student_lp_enrollment.teacher_school_year_enrollment.teacher_id',
      ACADEMIC_YEAR: 'student_lp_enrollment.teacher_school_year_enrollment.academic_year_id',
      ACADEMY_ID: 'student_lp_enrollment.student.academy_id',
      SEMESTER_ID: 'student.track.semesters.id',
    },
  },
  COMPLAIANCE_SAMPLES: {
    // keys here
  },
  //page keys here
} as const;
