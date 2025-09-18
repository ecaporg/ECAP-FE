'use client';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { routes } from '@/constants/routes';
import { apiClientFetch } from '@/lib/client-fetch';
import type { IStudent, ITeacher } from '@/types';
import { getUserName } from '@/utils';
import { getSessionCache, setSessionCache } from '@/utils/session-cache';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchFilter } from './search';

export const SearchStudentFilter = ({
  currentLearningPeriodId,
}: {
  currentLearningPeriodId: string;
}) => {
  const pathname = usePathname();
  const getStudentOptions = async (value: string) => {
    const key = `/students-table/students/${value}`;
    let data = getSessionCache<IStudent[]>(key);
    if (!data) {
      const response = await apiClientFetch<IStudent[]>(key);
      data = response.data || [];
      setSessionCache(key, data);
    }

    return (
      data.map((student) => ({
        label: (
          <Link
            href={`${pathname}${routes.samples.root}?${
              DEFAULT_FILTERS_KEYS.STUDENT_ID
            }=${student.id}&${DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID}=${
              currentLearningPeriodId || ''
            }&name=${getUserName(student.user)}`}
          >
            {getUserName(student.user)}
          </Link>
        ) as unknown as string,
        value: student.id.toString(),
      })) ?? []
    );
  };

  return <SearchFilter label="Search for a student by name/ID" getOptions={getStudentOptions} />;
};

export const SearchTeacherFilter = ({
  currentLearningPeriodId,
}: {
  currentLearningPeriodId: string;
}) => {
  const getTeacherOptions = async (value: string) => {
    const key = `/teachers-table/teachers/${value}`;
    let data = getSessionCache<ITeacher[]>(key);
    if (!data) {
      const response = await apiClientFetch<ITeacher[]>(key);
      data = response.data || [];
      setSessionCache(key, data);
    }

    return (
      data.map((teacher) => ({
        label: (
          <Link
            href={`${routes.compliance.teacher.replace(':id', teacher.id.toString())}?${
              currentLearningPeriodId
                ? `${DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID}=${currentLearningPeriodId}`
                : ''
            }`}
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
