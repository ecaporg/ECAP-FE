import {
  SampleStatus,
  type Permissions,
  type RolesWithPermissions,
  type Sample,
  type User,
} from "@/types";

export const ROLES = {
  DIRECTOR: {
    samples: {
      flag: false,
      approve: false,
      correct: false,
      review: true,
      upload: false,
    },
  },
  TEACHER: {
    samples: {
      flag: true,
      approve: true,
      correct: true,
      review: true,
      upload: (user: User, data: Sample) => {
        return data.status != SampleStatus.COMPLETED;
      },
    },
  },
  ADMIN: {
    samples: {
      flag: false,
      approve: true,
      correct: true,
      review: true,
      upload: (user: User, data: Sample) => {
        return data.status != SampleStatus.COMPLETED;
      },
    },
  },
  SUPER_ADMIN: {
    samples: {
      flag: false,
      approve: true,
      correct: true,
      review: true,
      upload: (user: User, data: Sample) => {
        return data.status != SampleStatus.COMPLETED;
      },
    },
  },
  STUDENT: {
    samples: {
      flag: false,
      approve: false,
      correct: false,
      review: false,
      upload: false,
    },
  },
} as const satisfies RolesWithPermissions;

export function hasPermission<Resource extends keyof Permissions>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: Permissions[Resource]["dataType"]
) {
  const permission = (ROLES as RolesWithPermissions)[user.role!]?.[resource]?.[
    action
  ];
  if (permission == null) return false;

  if (typeof permission === "boolean") return permission;
  return data != null && permission(user, data);
}
