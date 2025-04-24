import { Sample } from "@/types";
import { apiFetch } from "./fetch";
import { revalidateTag } from "next/cache";

export const getSampleById = async (id: Sample["id"]) => {
  return await apiFetch<Sample>(`/samples/${id}`, {
    tags: [`sample-${id}`],
  });
};

export const updateSample = async (id: Sample["id"], data: Partial<Sample>) => {
  revalidateTag(`sample-${id}`);
  return await apiFetch<Sample>(`/samples/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
