import type { ISchool } from "@/types";
import { BaseApi } from "../base-api";
import { apiFetch } from "../fetch";

export const schoolServerApi = new BaseApi<ISchool, undefined>(
  "/schools",
  apiFetch
);
