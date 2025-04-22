import { Sample } from "@/types";
import { apiFetch } from "./fetch";

export const getSampleById = async (id: string) => {
  const response = await apiFetch<Sample>(`/samples/${id}`);
  return response.data;
};
