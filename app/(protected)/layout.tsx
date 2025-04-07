import type React from 'react';
import { MainLayout } from '@/components/main-layout';
import { AuthProvider } from '@/providers/auth';
import { getUser } from '@/lib/get-user';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {

  
  const user = await getUser();

  return (
    <AuthProvider user={user!}>
      <MainLayout>{children}</MainLayout>
    </AuthProvider>
  );
}
