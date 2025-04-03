'use client';

import type React from 'react';

import { AuthProvider } from '@/lib/auth';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen items-center justify-center bg-[#1E88E5]">{children}</div>
    </AuthProvider>
  );
}
