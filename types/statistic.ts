import { AcademicYear } from "./school";
import { TrackLearningPeriod } from "./track";

export type DashboardStats = {
  beforeThePreviousOne: TrackLearningPeriod[];
  previousLP: TrackLearningPeriod[];
  currentLP: TrackLearningPeriod[];
  upcomingLP: TrackLearningPeriod[];
  currentCompliance: number;
  upcomingCompliance: number;
  academicYear: AcademicYear;
};
