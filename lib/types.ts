export type Role = 'teacher' | 'director' | 'admin' | 'superadmin';

export type User = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  roles: Role[];
  blockedBy: string[];
};

export type Class = {
  id: string;
  name: string;
  teacherId: string;
  studentIds: string[];
};

export type Student = {
  id: string;
  firstname: string;
  lastname: string;
  classId: string;
};

export type Assignment = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  teacherId: string;
  classId: string;
  createdAt: Date;
};

export type Grade = {
  id: string;
  studentId: string;
  assignmentId: string;
  score: number;
  teacherId: string;
  createdAt: Date;
};

export type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: User, data: Permissions[Key]['dataType']) => boolean);

export type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]['action']]: PermissionCheck<Key>;
    }>;
  }>;
};

export type Permissions = {
  classes: {
    dataType: Class;
    action: 'view' | 'create' | 'update' | 'delete';
  };
  students: {
    dataType: Student;
    action: 'view' | 'create' | 'update' | 'delete';
  };
  assignments: {
    dataType: Assignment;
    action: 'view' | 'create' | 'update' | 'delete';
  };
  grades: {
    dataType: Grade;
    action: 'view' | 'create' | 'update' | 'delete';
  };
  users: {
    dataType: User;
    action: 'view' | 'create' | 'update' | 'delete';
  };
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type SignInDTO = {
  email: string;
  password: string;
};

export type CreateUserDTO = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};
