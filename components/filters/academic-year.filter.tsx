import { DEFAULT_FILTERS_KEYS } from "@/constants/filter";
import { BaseFilter } from "./base";
import { AcademicYear } from "@/types";

interface AcademicYearFilterProps {
  slug?: string;
  availableAcademicYears: AcademicYear[];
}

export function AcademicYearFilter({
  slug = DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR,
  availableAcademicYears = [],
}: AcademicYearFilterProps) {
  const map = new Map();

  availableAcademicYears.forEach((academicYear) => {
    map.set(academicYear.id, `${academicYear.from} / ${academicYear.to}`);
  });

  const disabled = availableAcademicYears.length === 0;

  return (
    <BaseFilter
      label="Academic Year"
      slug={slug}
      options={Array.from(map.entries()).map(([key, value]) => ({
        label: value,
        value: key.toString(),
      }))}
      disabled={disabled}
    />
  );
}
