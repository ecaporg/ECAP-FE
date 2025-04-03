'use client';

import type React from 'react';

import { useAuth } from '@/lib/auth';
import type { Role } from '@/lib/types';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      // If not authenticated and not on auth pages, redirect to sign in
      if (!user && !pathname.startsWith('/auth')) {
        router.push('/auth/signin');
        return;
      }

      // If authenticated but on auth pages, redirect to dashboard
      if (user && pathname.startsWith('/auth')) {
        router.push('/dashboard');
        return;
      }

      // If authenticated but doesn't have required roles
      if (
        user &&
        allowedRoles &&
        allowedRoles.length > 0 &&
        !user.roles.some((role) => allowedRoles.includes(role))
      ) {
        router.push('/dashboard');
        return;
      }
    }
  }, [user, loading, router, pathname, allowedRoles]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900" />
      </div>
    );
  }

  // For auth pages, show content if not authenticated
  if (pathname.startsWith('/auth') && !user) {
    return <>{children}</>;
  }

  // For protected pages, show content if authenticated and has required roles
  if (
    user &&
    (!allowedRoles ||
      allowedRoles.length === 0 ||
      user.roles.some((role) => allowedRoles.includes(role)))
  ) {
    return <>{children}</>;
  }

  // Default case - show loading
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900" />
    </div>
  );
}
