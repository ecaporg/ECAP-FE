'use client';
import { DEFAULT_FILTERS_KEYS, FILTER_SEPARATOR_FOR_MULTIPLE_VALUES } from '@/constants/filter';
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

  console.log(availableSubjects, 'availableSubjects');
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
        value: Array.from(value).join(FILTER_SEPARATOR_FOR_MULTIPLE_VALUES),
      }))}
      multiple
      combined
      hasSearch={true}
      render={(option) => <p className='w-[calc(100%_-_theme(space.6))] text-pretty'>{option.label}</p>}
    />
  );
}
