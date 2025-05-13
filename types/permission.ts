import { Sample } from './student';
import type { Role, User } from './user';

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
  samples: {
    dataType: Sample;
    action: 'flag' | 'approve' | 'correct' | 'review' | 'upload';
  };
  users: {
    dataType: User;
    action: 'view' | 'create' | 'update' | 'delete';
  };
};
