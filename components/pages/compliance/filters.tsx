import {
  AcademyFilter,
  ComplationFilter,
  GradeFilter,
  LearningPeriodFilter,
  SampleStatusFilter,
  SchoolFilter,
  TrackFilter,
} from "@/components/filters";
import { DoneByFilter } from "@/components/filters/done-by";
import { SPECIFIC_PAGE_FILTER_KEYS } from "@/constants/filter";
import { type Sample, type Student, type Tenant } from "@/types";
import { cn, getLearningPeriodFromTenant } from "@/utils";
import { BackToCompliance } from "./back-to";
import { SearchStudentFilter } from "@/components/filters/search.filter";
import { AcademicYearFilter } from "@/components/filters/academic-year.filter";
import { SemesterFilter } from "@/components/filters/semesrter.filter";
import { SubjectFilter } from "@/components/filters/subject.filter";
import { GradeSpanFilter } from "@/components/filters/grade-span.filter";

type FilterProps = {
  tenant: Tenant;
};

const FilterWrapper = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <section className={cn("flex flex-wrap gap-4 pt-9 pb-8", className)}>
      {children}
    </section>
  );
};

export function TeacherFilters({ tenant }: FilterProps) {
  return (
    <FilterWrapper>
      <LearningPeriodFilter
        availablePeriods={getLearningPeriodFromTenant(tenant)}
      />
      <SearchStudentFilter />
      <SchoolFilter
        availableSchools={tenant.schools}
        slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.SCHOOL_ID}
      />
      <AcademyFilter
        slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.ACADEMY_ID}
        availableAcademies={tenant.academies}
      />
      <TrackFilter
        slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.TRACK_ID}
        availableTracks={tenant.tracks}
      />
      <GradeFilter slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.GRADE} />
      <ComplationFilter />
    </FilterWrapper>
  );
}

type SamplesFiltersProps = FilterProps & {
  samples: Sample[];
  student?: Student;
  defaultName?: string;
};

export function SamplesFilters({
  tenant,
  samples,
  student,
  defaultName,
}: SamplesFiltersProps) {
  return (
    <FilterWrapper className="pt-0">
      <BackToCompliance
        student={
          student ??
          ({
            user: { firstname: defaultName, lastname: "" },
          } as Student)
        }
      />
      <LearningPeriodFilter
        availablePeriods={getLearningPeriodFromTenant(tenant)}
      />
      <SampleStatusFilter
        slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.SAMPLE_STATUS}
      />
      <DoneByFilter
        availableUsers={samples
          .map((sample) => sample.done_by)
          .filter((user) => user !== null)}
        slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.DONE_BY}
      />
    </FilterWrapper>
  );
}

export function DirectorFilters({ tenant }: FilterProps) {
  return (
    <FilterWrapper className="lg:grid lg:grid-cols-6 lg:[&_button]:w-full lg:[&_button:has(input)]:col-span-2">
      <AcademicYearFilter
        availableAcademicYears={tenant.tracks.map(
          (track) => track.academicYear
        )}
      />
      <LearningPeriodFilter
        availablePeriods={getLearningPeriodFromTenant(tenant)}
      />
      <SearchStudentFilter />

      <AcademyFilter
        slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.ACADEMY_ID}
        availableAcademies={tenant.academies}
      />
      <ComplationFilter />

      <SchoolFilter
        availableSchools={tenant.schools}
        slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.SCHOOL_ID}
      />
      <TrackFilter
        slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.TRACK_ID}
        availableTracks={tenant.tracks}
      />
      <SemesterFilter
        availableSemesters={tenant.tracks.flatMap(
          (track) => track.academicYear.semesters
        )}
      />
      <GradeSpanFilter />
      <SubjectFilter
        availableSubjects={tenant.tracks.flatMap((track) => track.subjects)}
      />
      <SampleStatusFilter />
    </FilterWrapper>
  );
}
