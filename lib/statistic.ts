import { TrackLearningPeriod } from "@/types";
import { apiFetch } from "./fetch";

type DashboardStats = {
  previousLP: TrackLearningPeriod[];
  currentLP: TrackLearningPeriod[];
  upcomingLP: TrackLearningPeriod[];
};

const getDashboardStats = async () => {
  return await apiFetch<DashboardStats>("/dashboard/stats");
};
