export type Role = 'TEACHER' | 'DIRECTOR' | 'ADMIN' | 'SUPER_ADMIN';

export type User = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: Role;
  isActive: boolean;
  emailVerified: boolean;
};
