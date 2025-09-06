import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import type { Subject } from '@/types';
import { BaseFilter } from './base';

interface SubjectFilterProps {
  slug?: string;
  availableSubjects: Subject[];
}

export function SubjectFilter({
  slug = DEFAULT_FILTERS_KEYS.SUBJECT_ID,
  availableSubjects = [],
}: SubjectFilterProps) {
  const mergedOptions = new Map<string, Set<string>>();

  availableSubjects.forEach((subject) => {
    if (mergedOptions.has(subject.name)) {
      mergedOptions.get(subject.name)?.add(subject.id.toString());
    } else {
      mergedOptions.set(subject.name, new Set([subject.id.toString()]));
    }
  });

  return (
    <BaseFilter
      label="Subject"
      slug={slug}
      options={Array.from(mergedOptions.entries()).map(([label, value]) => ({
        label,
        value: Array.from(value).join(','),
      }))}
      multiple
      combined
      hasSearch={true}
    />
  );
}
