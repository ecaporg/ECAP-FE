import { LoadingTableSection } from "@/components/table/loading";
import { PaginationSection } from "@/components/table/pagination-section";
import { DEFAULT_FILTERS_KEYS } from "@/constants/filter";
import { getComplianceTeachers } from "@/lib/api/compliance";
import type { IAcademicYear, ITenant, ITrackLearningPeriod } from "@/types";
import {
  assignDefaultLearningPeriod,
  getDueDate,
  getStatusForTable,
} from "@/utils";
import { Suspense } from "react";
import { TeachersTable } from "../tables";

export interface SectionWithTableProps {
  param: {
    [DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID]: string;
    [DEFAULT_FILTERS_KEYS.STUDENT_ID]: string;
    name?: string;
  };
  tenant: ITenant;
}

export type TeachersSectionProps = SectionWithTableProps & {
  param: { [DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR]: string };
  academicYearIds: string[];
};

export const TeacherSection = (props: TeachersSectionProps) => {
  return (
    <Suspense
      fallback={<LoadingTableSection columns={8} />}
      key={new URLSearchParams(props.param as any).toString()}
    >
      <Teachers {...props} />
    </Suspense>
  );
};

const Teachers = async ({
  param,
  tenant,
  academicYearIds,
}: TeachersSectionProps) => {
  const mergedLP = assignDefaultLearningPeriod(tenant, param, academicYearIds);
  const assignment = await getComplianceTeachers(
    new URLSearchParams(param as any).toString()
  );
  const totalPages = assignment?.meta?.totalPages ?? 0;
  const learningPeriod = mergedLP.find(
    //@ts-expect-error
    (learningPeriod) => learningPeriod.id == param.learning_period_id
  );

  const dueDate = getDueDate(learningPeriod);
  const totalItems = assignment?.meta?.totalItems ?? 0;
  const completedCount = assignment?.meta?.additionalData?.completedCount ?? 0;

  const status = getStatusForTable(0, totalItems, dueDate);

  return (
    <>
      <PaginationSection
        totalPages={totalPages}
        learningPeriod={learningPeriod}
        dueDate={dueDate}
        completedString={`${completedCount} / ${totalItems} Teachers Completed`}
        status={status}
      />
      <TeachersTable
        assignments={assignment?.data ?? []}
        currentLearningPeriod={learningPeriod as ITrackLearningPeriod}
        currentAcademicYear={
          { id: academicYearIds[0] } as unknown as IAcademicYear
        }
      />
    </>
  );
};
