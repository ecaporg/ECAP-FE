export type Role = 'teacher' | 'director' | 'admin' | 'superadmin';

export type User = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: Role;
  isActive: boolean;
  emailVerified: boolean;
};
