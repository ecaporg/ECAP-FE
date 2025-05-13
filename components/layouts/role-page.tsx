import { getUser } from '@/lib/get-user';
import { Role } from '@/types';
import type { ComponentType } from 'react';

/**
 * A higher-order component that checks user role and renders the page
 * component only if the user has one of the allowed roles.
 *
 * @param PageComponent The page component to render if user has permission
 * @param allowedRoles Array of roles that are allowed to access the page
 * @returns A new component that conditionally renders the page
 */
export function rolePage<P extends object>(PageComponent: ComponentType<P>, allowedRoles: Role[]) {
  // Return a new component
  return async function RoleProtectedPage(props: P) {
    const user = await getUser();

    // If user doesn't have an allowed role, return null
    if (!user?.role || !allowedRoles.includes(user.role as Role)) {
      return null;
    }

    // User has an allowed role, render the page component
    return <PageComponent {...props} />;
  };
}
