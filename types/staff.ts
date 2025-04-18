import { Academy, School, Tenant, Assignment } from './school';
import { User } from './user';
import { DatedEntity } from './shared';

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
