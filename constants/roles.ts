export const ROLES = ['TEACHER', 'DIRECTOR', 'ADMIN', 'SUPER_ADMIN', 'STUDENT'] as const;

export const MAP_TO_STRING: Record<(typeof ROLES)[number], string> = {
  TEACHER: 'Teacher',
  DIRECTOR: 'Director',
  ADMIN: 'Admin',
  SUPER_ADMIN: 'Super Admin',
  STUDENT: 'Student',
};
