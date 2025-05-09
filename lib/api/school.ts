import { BaseApi } from "../api";
import { apiFetch } from "../fetch";
import { apiClientFetch } from "../client-fetch";
import { School } from "@/types";

export const schoolServerApi = new BaseApi<School, undefined>(
  "/schools",
  apiFetch
);

export const schoolClientApi = new BaseApi<School, undefined>(
  "/schools",
  apiClientFetch
);
