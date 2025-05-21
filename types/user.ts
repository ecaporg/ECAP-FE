import type { GenericEntity } from './shared';

export type Role = 'TEACHER' | 'DIRECTOR' | 'ADMIN' | 'SUPER_ADMIN' | 'STUDENT';

export type User = GenericEntity & {
  email: string;
  name: string;
  isActive: boolean;
  emailVerified: boolean;
  refreshToken?: string;
  role?: Role;
  password: string;
};

export const defaultUser: User = {
  name: 'N/A',
} as User;
