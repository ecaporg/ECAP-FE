export const DEFAULT_FILTERS_KEYS = {
  STUDENT_ID: 'student_id',
  LEARNING_PERIOD_ID: 'learning_period_id',
  SCHOOL_ID: 'school_id',
  ACADEMY_ID: 'academy_id',
  TRACK_ID: 'track_id',
  ACADEMIC_YEAR: 'academic_year',
  SEMESTER: 'semester',
  SUBJECT: 'subject',
  GRADE: 'student.grade',
  SEARCH: 'search',
  COMPLETED: 'completed',
  SAMPLE_STATUS: 'sample_status',
  DONE_BY: 'done_by',
  ASSIGNMENT_PERIODS_LEARNING_PERIOD_ID: 'assignment_periods.learning_period_id',
} as const;

export const SPECIFIC_PAGE_FILTER_KEYS = {
  COMPLIANCE: {
    ACADEMY_ID: 'student.academy_id',
    TRACK_ID: 'student.track_id',
    GRADE: 'student.grade',
    SCHOOL_ID: 'course.school_id',
    SAMPLE_STATUS: 'samples.status',
    DONE_BY: 'samples.done_by_id',
  },
  COMPLAIANCE_SAMPLES: {
    // keys here
  },
  //page keys here
} as const;
