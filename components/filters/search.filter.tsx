'use client';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { routes } from '@/constants/routes';
import { apiClientFetch } from '@/lib/client-fetch';
import type { Student, Teacher } from '@/types';
import { getUserName } from '@/utils';
import Link from 'next/link';
import { SearchFilter } from './search';
import { getSessionCache, setSessionCache } from '@/utils/session-cache';

export const SearchStudentFilter = () => {
  const getStudentOptions = async (value: string) => {
    const key = `/students-table/students/${value}`;
    let data = getSessionCache<Student[]>(key);
    if (!data) {
      const response = await apiClientFetch<Student[]>(key);
      data = response.data || []
      setSessionCache(key, data);
    }

    return (
      data.map((student) => ({
        label: getUserName(student.user),
        value: student.id.toString(),
      })) ?? []
    );
  };

  return <SearchFilter label="Search for a student by name/ID" getOptions={getStudentOptions} />;
};

export const SearchTeacherFilter = ({
  currentLearningPeriodId,
}: { currentLearningPeriodId: string }) => {
  const getTeacherOptions = async (value: string) => {
    const key = `/teachers-table/teachers/${value}`;
    let data = getSessionCache<Teacher[]>(key);
    if (!data) {
      const response = await apiClientFetch<Teacher[]>(key);
      data = response.data || []
      setSessionCache(key, data);
    }

    return (
      data.map((teacher) => ({
        label: (
          <Link
            href={`${routes.compliance.teacher.replace(':id', teacher.id.toString())}?${currentLearningPeriodId ? `${DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID}=${currentLearningPeriodId}` : ''}`}
          >
            {getUserName(teacher.user)}
          </Link>
        ) as unknown as string,
        value: teacher.id.toString(),
      })) ?? []
    );
  };

  return <SearchFilter label="Search for a teacher by name/ID" getOptions={getTeacherOptions} />;
};
