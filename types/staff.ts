import type { Academy, Assignment, School, Tenant } from './school';
import type { DatedEntity } from './shared';
import type { User } from './user';

export type Staff = DatedEntity & {
  id: number;
  user: User;
};

export type Teacher = Staff & {
  assignments: Assignment[];
};

export type Director = Staff & {
  school_id: number;
  academy_id: number;
  school: School;
  academy: Academy;
};

export type Admin = Staff & {
  tenant_id: number;
  tenant: Tenant;
};
