import { BaseApi } from "../base-api";
import { apiFetch } from "../fetch";
import { School } from "@/types";

export const schoolServerApi = new BaseApi<School, undefined>(
  "/schools",
  apiFetch
);
