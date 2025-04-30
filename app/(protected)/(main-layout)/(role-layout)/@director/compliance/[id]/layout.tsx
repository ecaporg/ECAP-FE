import { LoadingTableSectionWithFilters } from "@/components/table/loading";
import { Suspense } from "react";

export default function TeacherLayout({
  children,
  tabs,
}: {
  children: React.ReactNode;
  tabs: React.ReactNode;
}) {
  return (
    <>
      {children}

      {tabs}
    </>
  );
}
