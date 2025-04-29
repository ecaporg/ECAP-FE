import {
  LoadingFilters,
  LoadingTableSection,
} from "@/components/table/loading";
import { PaginationSection } from "@/components/table/pagination-section";
import { DEFAULT_FILTERS_KEYS } from "@/constants/filter";
import { routes } from "@/constants/routes";
import {
  getComplianceStudentSamples,
  getComplianceStudents,
  getComplianceTeachers,
} from "@/lib/compliance";
import type { Sample, Tenant, TrackLearningPeriod } from "@/types";
import {
  assignDefaultLearningPeriod,
  getDueDate,
  getStatusForTable,
} from "@/utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SamplesFilters } from "./filters";
import { SamplesTable, StudentsTable, TeachersTable } from "./tables";

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
    <Suspense
      fallback={<LoadingTableSection columns={8} />}
      key={new URLSearchParams(props.param as any).toString()}
    >
      <Students {...props} />
    </Suspense>
  );
};

export const SamplesSection = (props: SectionWithTableProps) => {
  return (
    <Suspense
      fallback={
        <>
          <LoadingFilters className="pt-20" />
          <LoadingTableSection columns={9} />
        </>
      }
      key={new Date().getTime()}
    >
      <Samples {...props} />
    </Suspense>
  );
};

export const TeacherSection = (props: SectionWithTableProps) => {
  return (
    <Suspense
      fallback={<LoadingTableSection columns={8} />}
      key={new URLSearchParams(props.param as any).toString()}
    >
      <Teachers {...(props as any)} />
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
  const totalItems = assignment?.meta?.totalItems ?? 0;
  const completedCount = assignment?.meta?.completedCount ?? 0;

  const status = getStatusForTable(completedCount, totalItems, dueDate);

  return (
    <>
      <PaginationSection
        totalPages={totalPages}
        learningPeriod={learningPeriod?.name ?? ""}
        dueDate={dueDate.toLocaleDateString()}
        completedString={`${completedCount} / ${totalItems} Students Completed`}
        status={status}
      />
      <StudentsTable
        assignments={assignment?.data}
        currentLearningPeriod={learningPeriod as TrackLearningPeriod}
      />
    </>
  );
};

const Samples = async ({ param, tenant }: SectionWithTableProps) => {
  if (!param[DEFAULT_FILTERS_KEYS.STUDENT_ID]) {
    return redirect(routes.compliance.root);
  }

  const mergedLP = assignDefaultLearningPeriod(tenant, param);
  const assignmentPeriods = await getComplianceStudentSamples(
    new URLSearchParams(param as any).toString(),
    param.student_id
  );

  const learningPeriod = mergedLP.find(
    (learningPeriod) => learningPeriod.id == param.learning_period_id
  );

  const dueDate = getDueDate(learningPeriod);

  const samples = assignmentPeriods.data?.flatMap(
    (assignment) => assignment.samples
  );

  const rows = Object.entries(
    (assignmentPeriods.data || [])
      ?.flatMap(({ samples }) => samples)
      .reduce((acc, sample) => {
        if (acc[sample.subject_id]) {
          acc[sample.subject_id].push(sample);
        } else {
          acc[sample.subject_id] = [sample];
        }
        return acc;
      }, {} as Record<number, Sample[]>)
  ).map(([_, samples = []]) => ({
    sample_1: samples[0],
    sample_2: samples[1],
    subject: samples[0].subject,
  }));

  const completeCount = rows.filter(
    (row) => row?.sample_2?.done_by && row?.sample_1?.done_by
  ).length;

  const totalItems = rows.length;

  const status = getStatusForTable(completeCount, totalItems, dueDate);

  return (
    <>
      <SamplesFilters
        tenant={tenant}
        samples={samples || []}
        student={
          assignmentPeriods.data?.[0]?.samples?.[0]?.assignment_period.student
        }
        defaultName={param.name}
      />
      <PaginationSection
        totalPages={0}
        learningPeriod={learningPeriod?.name ?? ""}
        dueDate={dueDate.toLocaleDateString()}
        completedString={`${completeCount} / ${totalItems} Subjects Completed`}
        status={status}
      />
      <SamplesTable rows={rows} />
    </>
  );
};

const Teachers = async ({
  param,
  tenant,
}: SectionWithTableProps & {
  param: { [DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR]: string };
}) => {
  const mergedLP = assignDefaultLearningPeriod(tenant, param);
  const assignment = await getComplianceTeachers(
    new URLSearchParams(param as any).toString()
  );
  const totalPages = assignment?.meta?.totalPages ?? 0;
  const learningPeriod = mergedLP.find(
    (learningPeriod) => learningPeriod.id == param.learning_period_id
  );

  const dueDate = getDueDate(learningPeriod);
  const totalItems = assignment?.meta?.totalItems ?? 0;
  const completedCount = assignment?.meta?.completedCount ?? 0;

  const status = getStatusForTable(0, totalItems, dueDate);

  return (
    <>
      <PaginationSection
        totalPages={totalPages}
        learningPeriod={learningPeriod?.name ?? ""}
        dueDate={dueDate.toLocaleDateString()}
        completedString={`${completedCount} / ${totalItems} Teachers Completed`}
        status={status}
      />
      <TeachersTable
        assignments={assignment?.data ?? []}
        currentLearningPeriod={learningPeriod as TrackLearningPeriod}
      />
    </>
  );
};
