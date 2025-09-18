import type { IAcademicYear, ITrackLearningPeriod } from 'ecap-lib/dist/domain';

export type StatsItem = {
  learningPeriods: ITrackLearningPeriod[];
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
  academicYear: IAcademicYear;
  yearToDateCompliance?: number;
  academies?: AcademyStatItem[];
};
