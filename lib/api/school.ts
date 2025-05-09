import { BaseApi } from "../api";
import { apiFetch } from "../fetch";
import { apiClientFetch } from "../client-fetch";

export const schoolServerApi = new BaseApi("/schools", apiFetch);

export const schoolClientApi = new BaseApi("/schools", apiClientFetch);
