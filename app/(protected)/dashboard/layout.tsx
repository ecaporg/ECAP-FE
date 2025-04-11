'use client';
import { useAuth } from "@/providers/auth";

export default function DashboardLayout({
  teacher,
  admin,
  director,
}: {
  teacher: React.ReactNode;
  admin: React.ReactNode;
  director: React.ReactNode;
}) {
  const {user} = useAuth();

  return <>{teacher}</>;
  

  // if (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') {
  //   return <>{admin}</>;
  // }

  // if (user?.role === 'TEACHER') {
  //   return <>{teacher}</>;
  // }

  // if (user?.role === 'DIRECTOR') {
  //   return <>{director}</>;
  // }

  // return <>{teacher}</>;
}
