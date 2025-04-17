import { PaginationSection } from "@/components/table/pagination-section";
import {
  getComplianceStudents,
  getComplianceStudentSamples,
} from "@/lib/compliance";
import { Sample, Tenant } from "@/types";
import { assignDefaultLearningPeriod, getDueDate } from "@/utils";
import { Suspense } from "react";
import {
  LoadingTable,
  LoadingTableSection,
  LoadingTableSectionWithFilters,
} from "@/components/table/loading";
import { SamplesTable, StudentsTable } from "./tables";
import { DEFAULT_FILTERS_KEYS } from "@/constants/filter";
import { routes } from "@/constants/routes";
import { redirect } from "next/navigation";
import { SamplesFilters } from "./filters";

export interface SectionWithTableProps {
  param: {
    [DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID]: string;
    [DEFAULT_FILTERS_KEYS.STUDENT_ID]: string;
    name?: string; // for student with samples
  };
  tenant: Tenant;
}

export const StudentsSection = (props: SectionWithTableProps) => {
  return (
    <SuspenseSection
      columns={8}
      trigger={new URLSearchParams(props.param as any).toString()}
    >
      <Students {...props} />
    </SuspenseSection>
  );
};

export const SamplesSection = (props: SectionWithTableProps) => {
  return (
    <SuspenseSection
      columns={9}
      trigger={new URLSearchParams(props.param as any).toString()}
      fallback={<LoadingTableSectionWithFilters columns={9} filters={3} />}
    >
      <Samples {...props} />
    </SuspenseSection>
  );
};

const SuspenseSection = ({
  children,
  columns,
  trigger,
  fallback,
}: React.PropsWithChildren<{
  columns: number;
  trigger: string;
  fallback?: React.ReactNode;
}>) => {
  return (
    <Suspense
      fallback={fallback ?? <LoadingTableSection columns={columns} />}
      key={trigger}
    >
      {children}
    </Suspense>
  );
};

const Students = async ({ param, tenant }: SectionWithTableProps) => {
  const mergedLP = assignDefaultLearningPeriod(tenant, param);
  const assignment = await getComplianceStudents(
    new URLSearchParams(param as any).toString()
  );

  const totalPages = assignment?.meta?.totalPages ?? 0;

  const learningPeriod = mergedLP.find(
    (learningPeriod) => learningPeriod.id == param.learning_period_id
  );

  const dueDate = getDueDate(learningPeriod);

  return (
    <>
      <PaginationSection
        totalPages={totalPages}
        learningPeriod={learningPeriod?.name ?? ""}
        dueDate={dueDate.toLocaleDateString()}
        completedString="5/50 students completed"
        status="In Progress"
      />
      <StudentsTable
        assignments={assignment?.data}
        currentLearningPeriodId={param.learning_period_id}
      />
    </>
  );
};

const Samples = async ({ param, tenant }: SectionWithTableProps) => {
  if (!param[DEFAULT_FILTERS_KEYS.STUDENT_ID]) {
    return redirect(routes.compliance.root);
  }

  const mergedLP = assignDefaultLearningPeriod(tenant, param);
  const samples = await getComplianceStudentSamples(
    new URLSearchParams(param as any).toString()
  );

  const learningPeriod = mergedLP.find(
    (learningPeriod) => learningPeriod.id === param.learning_period_id
  );

  const dueDate = getDueDate(learningPeriod);

  return (
    <>
      <SamplesFilters
        tenant={tenant}
        assignments={samples?.data ?? []}
        defaultName={param.name}
      />
      <PaginationSection
        totalPages={0}
        learningPeriod={learningPeriod?.name ?? ""}
        dueDate={dueDate.toLocaleDateString()}
        completedString="5/50 samples completed"
        status="In Progress"
      />
      <SamplesTable
        assignments={samples?.data}
        currentLearningPeriodId={param.learning_period_id}
      />
    </>
  );
};
