import type { StatsItem, ITrackLearningPeriod } from "@/types";
import { getDueDate, getShortLearningPeriodName } from "./learning-period";
export type LPStatusForDashboard =
  | "Overdue"
  | "Complete"
  | "Upcoming"
  | "In Progress";

export const getStatusForDashboard = (
  item: StatsItem
): LPStatusForDashboard => {
  const dueDate = getDueDate(item.learningPeriods[0]);
  const now = new Date();

  if (now > dueDate && !item.completed) {
    return "Overdue";
  }
  if (item.completed) {
    return "Complete";
  }
  if (now < new Date(item.learningPeriods[0].start_date)) {
    return "Upcoming";
  }
  return "In Progress";
};

export const getStatusColorForDashboard = (status: LPStatusForDashboard) => {
  if (status === "Overdue") {
    return "text-red-accent";
  }
  if (status === "Complete") {
    return "text-success";
  }
  if (status === "Upcoming") {
    return "text-darker-gray";
  }
  return "text-primary";
};

export const getCardColorForDashboard = (status: LPStatusForDashboard) => {
  if (status === "In Progress") {
    return "border-primary border";
  }
  return "";
};

export const getLPNameForDashboard = (
  learningPeriods: ITrackLearningPeriod[]
) => {
  return learningPeriods
    .map(
      (lp, index, arr) =>
        `<b>${`${lp.track.name}:`}</b> ${getShortLearningPeriodName(lp.name)}`
    )
    .join(", ");
};
