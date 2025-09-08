import type { GenericEntity } from './shared';
import type { Student } from './student';
import type { Teacher, Director, Admin } from './staff';
import { ROLES } from '@/constants/roles';

export type Role = (typeof ROLES)[number];

export type User = GenericEntity & {
  email: string;
  name: string;
  password: string;
  isActive: boolean;
  emailVerified: boolean;
  refreshToken?: string;
  role?: Role;
  canvas_additional_info?: Record<string, any>;
  student?: Student;
  teacher?: Teacher;
  director?: Director;
  admin?: Admin;
};

export const defaultUser: User = {
  name: 'N/A',
} as User;
