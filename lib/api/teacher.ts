import { Teacher } from "@/types";
import { apiFetch } from "./fetch";

export const searchTeacher = async (value: string) => {
  const response = await apiFetch<Teacher[]>(
    `/teachers-table/teachers/${value}`
  );
  return response.data || [];
};

export const getTeacher = async (id: string) => {
  const response = await apiFetch<Teacher>(`/teachers/${id}`);
  return response.data;
};
