import { mockClasses } from '@/lib/mock-data';
import type { Permissions, RolesWithPermissions, User } from '@/lib/types';

// Mock classes for permission checks
const classes = mockClasses;

export const ROLES = {
  superadmin: {
    classes: { view: true, create: true, update: true, delete: true },
    students: { view: true, create: true, update: true, delete: true },
    assignments: { view: true, create: true, update: true, delete: true },
    grades: { view: true, create: true, update: true, delete: true },
    users: { view: true, create: true, update: true, delete: true },
  },
  admin: {
    classes: { view: true, create: true, update: true, delete: true },
    students: { view: true, create: true, update: true, delete: true },
    assignments: { view: true, create: true, update: true, delete: true },
    grades: { view: true, create: true, update: true, delete: true },
    users: {
      view: true,
      create: (user: User, targetUser: User) => targetUser.roles.includes('teacher'),
      update: (user: User, targetUser: User) => targetUser.roles.includes('teacher'),
      delete: (user: User, targetUser: User) => targetUser.roles.includes('teacher'),
    },
  },
  director: {
    classes: { view: true, create: true, update: true, delete: false },
    students: { view: true, create: true, update: true, delete: false },
    assignments: { view: true, create: false, update: false, delete: false },
    grades: { view: true, create: false, update: false, delete: false },
    users: {
      view: (user: User, targetUser: User) => targetUser.roles.includes('teacher'),
      create: false,
      update: false,
      delete: false,
    },
  },
  teacher: {
    classes: {
      view: true,
      create: false,
      update: (user: User, classItem: any) => classItem.teacherId === user.id,
      delete: false,
    },
    students: {
      view: (user: User, student: any) => {
        // Can view students in their classes
        const teacherClasses = classes.filter((c) => c.teacherId === user.id);
        return teacherClasses.some((c) => c.id === student.classId);
      },
      create: false,
      update: false,
      delete: false,
    },
    assignments: {
      view: (user: User, assignment: any) => assignment.teacherId === user.id,
      create: true,
      update: (user: User, assignment: any) => assignment.teacherId === user.id,
      delete: (user: User, assignment: any) => assignment.teacherId === user.id,
    },
    grades: {
      view: (user: User, grade: any) => grade.teacherId === user.id,
      create: true,
      update: (user: User, grade: any) => grade.teacherId === user.id,
      delete: (user: User, grade: any) => grade.teacherId === user.id,
    },
    users: { view: false, create: false, update: false, delete: false },
  },
} as const satisfies RolesWithPermissions;

export function hasPermission<Resource extends keyof Permissions>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]['action'],
  data?: Permissions[Resource]['dataType']
) {
  return user.roles.some((role) => {
    const permission = (ROLES as RolesWithPermissions)[role][resource]?.[action];
    if (permission == null) return false;

    if (typeof permission === 'boolean') return permission;
    return data != null && permission(user, data);
  });
}
