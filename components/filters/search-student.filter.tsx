'use client';
import { apiClientFetch } from '@/lib/client-fetch';
import { SearchFilter } from './search';
import { getUserName } from '@/utils';
import { Student } from '@/types';

export const SearchStudentFilter = () => {
  const getStudentOptions = async (value: string) => {
    const response = await apiClientFetch<Student[]>(`/api/students-table/students/${value}`);

    console.log(response);
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
