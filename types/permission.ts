import { Role, User } from './user';

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
  //   classes: {
  //     dataType: Class;
  //     action: 'view' | 'create' | 'update' | 'delete';
  //   };
  //   students: {
  //     dataType: Student;
  //     action: 'view' | 'create' | 'update' | 'delete';
  //   };
  //   assignments: {
  //     dataType: Assignment;
  //     action: 'view' | 'create' | 'update' | 'delete';
  //   };
  //   grades: {
  //     dataType: Grade;
  //     action: 'view' | 'create' | 'update' | 'delete';
  //   };
  //   users: {
  //     dataType: User;
  //     action: 'view' | 'create' | 'update' | 'delete';
  //   };
};
