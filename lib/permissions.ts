import type { Permissions, RolesWithPermissions, User } from "@/types";

// Mock classes for permission checks
const classes = [] as any;

export const ROLES = {
  DIRECTOR: {
    samples: {
      flag: false,
      approve: false,
      correct: false,
      review: true,
    },
  },
  TEACHER: {
    samples: {
      flag: true,
      approve: true,
      correct: true,
      review: true,
    },
  },
  ADMIN: {
    samples: {
      flag: true,
      approve: true,
      correct: true,
      review: true,
    },
  },
  SUPER_ADMIN: {
    samples: {
      flag: true,
      approve: true,
      correct: true,
      review: true,
    },
  },
  STUDENT: {
    samples: {
      flag: false,
      approve: false,
      correct: false,
      review: false,
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
