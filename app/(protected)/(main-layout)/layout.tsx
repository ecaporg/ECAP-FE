import { MainLayout } from "@/components/layouts/main-layout";
import { routes } from "@/constants/routes";
import { getUser } from "@/lib/get-user";
import { AuthProvider } from "@/providers/auth";
import { redirect } from "next/navigation";
import type React from "react";

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
      <MainLayout>{children}</MainLayout>
    </AuthProvider>
  );
}
