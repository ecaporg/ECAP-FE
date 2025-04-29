import { DEFAULT_FILTERS_KEYS } from "@/constants/filter";
import { BaseFilter } from "./base";
import { Semester } from "@/types";

interface SemesterFilterProps {
  slug?: string;
  availableSemesters: Semester[];
}

export function SemesterFilter({
  slug = DEFAULT_FILTERS_KEYS.SEMESTER,
  availableSemesters = [],
}: SemesterFilterProps) {
  const map = new Map();

  availableSemesters.forEach((semester) => {
    map.set(semester.id, semester.name);
  });

  return (
    <BaseFilter
      label="Semester"
      slug={slug}
      options={Array.from(map.entries()).map(([key, value]) => ({
        label: value,
        value: key.toString(),
      }))}
      multiple
      hasSearch={true}
    />
  );
}
