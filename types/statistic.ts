import { TrackLearningPeriod } from "@/types";

export type DashboardStats = {
  beforeThePreviousOne?: TrackLearningPeriod[];
  previousLP?: TrackLearningPeriod[];
  currentLP: TrackLearningPeriod[];
  upcomingLP: TrackLearningPeriod[];
};
