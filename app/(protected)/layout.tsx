'use client';

import type React from 'react';

import { AuthGuard } from '@/components/auth-guard';
import { MainLayout } from '@/components/main-layout';
import { AuthProvider } from '@/lib/auth';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <MainLayout>{children}</MainLayout>
      </AuthGuard>
    </AuthProvider>
  );
}
