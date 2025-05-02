import type { CompletionStatusProps } from "@/components/table/complation-status";
import { SAMPLE_STATUS } from "@/constants/sample";
import type {
  AssignmentPeriod,
  SampleStatus,
  TrackLearningPeriod,
} from "@/types";
import { getDueDate } from "./learning-period";

export const getSampleStatus = (status: SampleStatus) => {
  return SAMPLE_STATUS[status] ?? status;
};

export const getProgressValue = (assignment: AssignmentPeriod) => {
  if (assignment.samples.length === 0) {
    return 0;
  }

  return (
    (assignment.samples.filter(
      (sample) => sample.status.toLowerCase() == "completed"
    ).length /
      assignment.samples.length) *
    100
  ).toFixed(2);
};

export const getCompletionStatus = (
  assignment: AssignmentPeriod | boolean,
  currentLearningPeriod?: TrackLearningPeriod
): CompletionStatusProps["variant"] => {
  if (!currentLearningPeriod) {
    return "Overdue";
  }

  const isCompleted =
    typeof assignment === "object" && "completed" in assignment
      ? assignment.completed
      : assignment;

  if (isCompleted) {
    return "Complete";
  }

  if (!isCompleted && getDueDate(currentLearningPeriod) < new Date()) {
    return "Overdue";
  }

  return "In Progress";
};
