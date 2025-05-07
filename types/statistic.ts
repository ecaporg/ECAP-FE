import { AcademicYear } from "./school";
import { TrackLearningPeriod } from "./track";

export type StatsItem = {
  learningPeriods: TrackLearningPeriod[];
  compliance: number;
  completed: boolean;
};

export type AcademyStatItem = {
  academy_id: string;
  academy_name: string;
  compliance: number;
  yearToDateCompliance: number;
};

export type DashboardStats = {
  beforeThePreviousOne: StatsItem;
  previousLP: StatsItem;
  currentLP: StatsItem;
  upcomingLP: StatsItem;
  academicYear: AcademicYear;
  yearToDateCompliance?: number;
  academies?: AcademyStatItem[];
};
