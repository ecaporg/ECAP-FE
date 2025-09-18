import { RolesEnum } from "ecap-lib/dist/constants";
import type { IUser, ISample } from "ecap-lib/dist/domain";

export type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((IUser: IUser, data: Permissions[Key]["dataType"]) => boolean);

export type RolesWithPermissions = {
  [R in RolesEnum]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]["action"]]: PermissionCheck<Key>;
    }>;
  }>;
};

export type Permissions = {
  samples: {
    dataType: ISample;
    action: "flag" | "approve" | "correct" | "review" | "upload";
  };
  users: {
    dataType: IUser;
    action: "view" | "create" | "update" | "delete";
  };
  sorting: {
    dataType: IUser;
    action: "sort:academy";
  };
  navigation: {
    dataType: string;
    action: "settings" | "profile";
  };
};
