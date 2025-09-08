'use client';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { routes } from '@/constants/routes';
import { apiClientFetch } from '@/lib/client-fetch';
import type { Student, Teacher } from '@/types';
import { getUserName } from '@/utils';
import Link from 'next/link';
import { SearchFilter } from './search';

export const SearchStudentFilter = () => {
  const getStudentOptions = async (value: string) => {
    const response = await apiClientFetch<Student[]>(`/students-table/students/${value}`, {
      cache: 'force-cache',
      tags: [`students-${value}`],
    });

    if (!response.data) {
      return [];
    }
    return (
      response.data?.map((student) => ({
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
    const response = await apiClientFetch<Teacher[]>(`/teachers?search=${value}`, {
      cache: 'force-cache',
      tags: [`teachers-${value}`],
    });

    if (!response.data) {
      return [];
    }
    return (
      response.data?.map((teacher) => ({
        label: (
          <Link
            href={`${routes.compliance.teacher.replace(':id', teacher.id.toString())}?${DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID}=${currentLearningPeriodId}`}
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
