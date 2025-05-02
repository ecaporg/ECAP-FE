import {
  CompletionStatus,
  type CompletionStatusProps,
} from "@/components/table/complation-status";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Sample, SampleFlagCategory, SampleStatus } from "@/types";
import { cn } from "@/utils";
import { getSampleStatus } from "@/utils/sample";
import { CheckCircleIcon, CircleAlertIcon } from "lucide-react";

export interface SapmleStatusProps extends BadgeProps {
  status: SampleStatus | null;
}

const getVariantSampleStatus = (
  status: SampleStatus
): BadgeProps["variant"] => {
  switch (status) {
    case SampleStatus.COMPLETED:
      return "success";
    case SampleStatus.PENDING:
    case SampleStatus.FLAGGED_TO_ADMIN:
      return "amber";
    case SampleStatus.ERRORS_FOUND:
    case SampleStatus.MISSING_SAMPLE:
    case SampleStatus.REASON_REJECTED:
      return "red";
  }
};

const getIconSampleStatus = (status: SampleStatus) => {
  switch (status) {
    case SampleStatus.COMPLETED:
      return <CheckCircleIcon className="size-4" />;
    default:
      return <CircleAlertIcon className="size-4" />;
  }
};

function SapmleStatus({ status, className, ...props }: SapmleStatusProps) {
  if (!status) {
    return null;
  }

  return (
    <Badge variant={getVariantSampleStatus(status)} {...props}>
      {getIconSampleStatus(status)}
      {getSampleStatus(status)}
    </Badge>
  );
}

type DirectorSampleStatusProps = Omit<SapmleStatusProps, "status"> & {
  sample: Sample;
};

function DirectorSampleStatus({
  sample,
  className,
  ...props
}: DirectorSampleStatusProps) {
  if (!sample) {
    return null;
  }
  let status = sample.status;

  if (sample.flag_category === SampleFlagCategory.MISSING_SAMPLE) {
    status = SampleStatus.MISSING_SAMPLE;
  }
  if (sample.flag_category === SampleFlagCategory.ERROR_IN_SAMPLE) {
    status = SampleStatus.ERRORS_FOUND;
  }

  return <SapmleStatus status={status} className={className} {...props} />;
}

const getIconCompletionStatus = (variant: CompletionStatusProps["variant"]) => {
  switch (variant) {
    case "Complete":
      return <CheckCircleIcon className="size-4" />;
    default:
      return <CircleAlertIcon className="size-4" />;
  }
};

const getVariantCompletionStatus = (
  variant: CompletionStatusProps["variant"]
) => {
  switch (variant) {
    case "Complete":
      return "Complete";
    case "Overdue":
      return "Overdue";
    default:
      return "Pending";
  }
};

const getLabelCompletionStatus = (
  variant: CompletionStatusProps["variant"]
) => {
  switch (variant) {
    case "Complete":
      return "Complete";
    case "Overdue":
      return "Overdue";
    default:
      return "In Progress";
  }
};

function CompletionStatusForTable({
  variant,
  className,
  ...props
}: CompletionStatusProps) {
  return (
    <CompletionStatus
      variant={getVariantCompletionStatus(variant)}
      className={cn(
        "flex items-center gap-2 w-full px-4 py-2 h-auto text-xs",
        className
      )}
      {...props}
    >
      {getIconCompletionStatus(variant)}
      {getLabelCompletionStatus(variant)}
    </CompletionStatus>
  );
}

export { SapmleStatus, CompletionStatusForTable, DirectorSampleStatus };
