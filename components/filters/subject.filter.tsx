import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { BaseFilter } from './base';
import { Subject } from '@/types';

interface SubjectFilterProps {
  slug?: string;
  availableSubjects: Subject[];
}

export function SubjectFilter({
  slug = DEFAULT_FILTERS_KEYS.SUBJECT,
  availableSubjects = [],
}: SubjectFilterProps) {
  const map = new Map();

  availableSubjects.forEach((subject) => {
    map.set(subject.id, subject.name);
  });

  return (
    <BaseFilter
      label="Subject"
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
