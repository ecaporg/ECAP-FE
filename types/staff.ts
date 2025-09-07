import type { TeacherSchoolYearEnrollment } from './enrollment';
import type { Academy, School, Tenant } from './school';
import type { DatedEntity } from './shared';
import type { User } from './user';

export type Staff = DatedEntity & {
  id: number;
  user: User;
};

export type Teacher = Staff & {
  teacher_school_year_enrollments: TeacherSchoolYearEnrollment[];
};

export type Director = Admin & {
  academy_id: number;
  academy: Academy;
};

export type Admin = Staff & {
  tenant_id: number;
  tenant: Tenant;
};

export type StaffUser = User & {
  director?: Director;
  admin?: Admin;
  teacher?: Teacher;
};
