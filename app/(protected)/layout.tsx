'use client';

import type React from 'react';
import { MainLayout } from '@/components/main-layout';
import { AuthProvider } from '@/providers/auth';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <MainLayout>{children}</MainLayout>
    </AuthProvider>
  );
}
