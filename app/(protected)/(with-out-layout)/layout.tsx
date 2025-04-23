import { routes } from '@/constants/routes';
import { getUser } from '@/lib/get-user';
import { AuthProvider } from '@/providers/auth';
import { redirect } from 'next/navigation';
import type React from 'react';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect(routes.auth.signIn);
  }

  return (
    <AuthProvider user={user}>
      <main className="overflow-x-hidden bg-white overflow-y-auto">{children}</main>
    </AuthProvider>
  );
}
