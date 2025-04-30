"use client";
import { apiClientFetch } from "@/lib/client-fetch";
import { SearchFilter } from "./search";
import { getUserName } from "@/utils";
import { Student, Teacher } from "@/types";

export const SearchStudentFilter = () => {
  const getStudentOptions = async (value: string) => {
    const response = await apiClientFetch<Student[]>(
      `/students-table/students/${value}`
    );

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

  return (
    <SearchFilter
      label="Search for a student by name/ID"
      getOptions={getStudentOptions}
    />
  );
};

export const SearchTeacherFilter = () => {
  const getTeacherOptions = async (value: string) => {
    const response = await apiClientFetch<Teacher[]>(
      `/teachers-table/teachers/${value}`
    );

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

  return (
    <SearchFilter
      label="Search for a teacher by name/ID"
      getOptions={getTeacherOptions}
    />
  );
};
