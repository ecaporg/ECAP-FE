import { GenericEntity } from './shared';

export type Role = 'TEACHER' | 'DIRECTOR' | 'ADMIN' | 'SUPER_ADMIN';

export type User = GenericEntity & {
  email: string;
  firstname: string;
  lastname: string;
  role: Role;
  isActive: boolean;
  emailVerified: boolean;
};
