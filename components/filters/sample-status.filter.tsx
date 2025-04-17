import { BaseFilter } from "./base";
import { Sample } from "@/types";
import { DEFAULT_FILTERS_KEYS } from "@/constants/filter";

interface SampleStatusFilterProps {
  slug?: string;
  samples: Sample[];
}

const SAMPLE_STATUS = {
  COMPLETED: "Completed",
  IN_PROGRESS: "In Progress",
  NOT_STARTED: "Not Started",
  PENDING: "Pending",
};

export function SampleStatusFilter({
  slug = DEFAULT_FILTERS_KEYS.SAMPLE_STATUS,
  samples,
}: SampleStatusFilterProps) {
  const statuses = [...new Set(samples.map((sample) => sample.status))].map(
    (status) => ({
      label: SAMPLE_STATUS[status as keyof typeof SAMPLE_STATUS],
      value: status,
    })
  );

  return (
    <BaseFilter
      label="Sample Status"
      slug={slug}
      options={statuses}
      multiple
      hasSearch={true}
    />
  );
}
