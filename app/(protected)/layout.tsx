import type React from 'react';
import { MainLayout } from '@/components/layouts/main-layout';
import { AuthProvider } from '@/providers/auth';
import { getUser } from '@/lib/get-user';
import { redirect } from 'next/navigation';
import { routes } from '@/constants/routes';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  if (!user) {
    redirect(routes.auth.signIn);
  }

  return (
    <AuthProvider user={user}>
      <MainLayout>{children}</MainLayout>
    </AuthProvider>
  );
}
