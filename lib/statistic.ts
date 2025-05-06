import { DashboardStats } from "@/types";
import { apiFetch } from "./fetch";

export const getDashboardStats = async () => {
  return await apiFetch<DashboardStats>("/dashboard/stats");
};
