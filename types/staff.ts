import { Academy, School, Tenant } from './school';
import { Sample } from './student';
import { User } from './user';

export type Director = {
  school_id: number;

  user_id: number;

  academy_id: number;

  user: User;

  school: School;

  academy: Academy;
};

export type Staff = {
  user_id: number;

  user: User;
};

export type Teacher = Staff & {
  school_id: number;

  school: School;

  samples: Sample[];
};

export type Admin = Staff & {
  tenant_id: number;

  tenant: Tenant;
};
