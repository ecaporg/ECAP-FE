import { DEFAULT_FILTERS_KEYS } from "@/constants/filter";
import { BaseFilter } from "./base";

const COMPLETION_OPTIONS = [
  { label: "Complete", value: "true" },
  { label: "Incomplete", value: "false" },
];

export function CompletionFilter({
  slug = DEFAULT_FILTERS_KEYS.COMPLETED,
}: {
  slug?: string;
}) {
  return (
    <BaseFilter
      label="Completion"
      slug={slug}
      options={COMPLETION_OPTIONS}
      multiple
    />
  );
}
