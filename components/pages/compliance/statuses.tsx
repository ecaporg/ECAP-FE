import { CompletionStatus, type CompletionStatusProps } from '@/components/table/completion-status';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import type { ISample } from '@/types';
import { cn } from '@/utils';
import { getSampleStatus } from '@/utils/sample';
import { SampleFlagCategory, SampleStatus as SampleStatusEnum } from 'ecap-lib/dist/constants';
import { CheckCircleIcon, CircleAlertIcon } from 'lucide-react';

export interface SampleStatusProps extends BadgeProps {
  status: SampleStatusEnum | null;
}

const getVariantSampleStatus = (status: SampleStatusEnum): BadgeProps['variant'] => {
  switch (status) {
    case SampleStatusEnum.COMPLETED:
      return 'success';
    case SampleStatusEnum.PENDING:
    case SampleStatusEnum.FLAGGED_TO_ADMIN:
      return 'amber';
    case SampleStatusEnum.ERRORS_FOUND:
    case SampleStatusEnum.MISSING_SAMPLE:
    case SampleStatusEnum.REASON_REJECTED:
      return 'red';
  }
};

const getIconSampleStatus = (status: SampleStatusEnum) => {
  switch (status) {
    case SampleStatusEnum.COMPLETED:
      return <CheckCircleIcon className="size-4" />;
    default:
      return <CircleAlertIcon className="size-4" />;
  }
};

function SampleStatus({ status, className, ...props }: SampleStatusProps) {
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

type DirectorSampleStatusProps = Omit<SampleStatusProps, 'status'> & {
  sample: ISample;
};

function DirectorSampleStatus({ sample, className, ...props }: DirectorSampleStatusProps) {
  if (!sample) {
    return null;
  }
  let status = sample.status;

  if (
    status === SampleStatusEnum.FLAGGED_TO_ADMIN &&
    sample.flag_category === SampleFlagCategory.MISSING_SAMPLE
  ) {
    status = SampleStatusEnum.MISSING_SAMPLE;
  }
  if (
    status === SampleStatusEnum.FLAGGED_TO_ADMIN &&
    sample.flag_category === SampleFlagCategory.ERROR_IN_SAMPLE
  ) {
    status = SampleStatusEnum.ERRORS_FOUND;
  }

  return <SampleStatus status={status} className={className} {...props} />;
}

const getIconCompletionStatus = (variant: CompletionStatusProps['variant']) => {
  switch (variant) {
    case 'Complete':
      return <CheckCircleIcon className="size-4" />;
    default:
      return <CircleAlertIcon className="size-4" />;
  }
};

const getVariantCompletionStatus = (variant: CompletionStatusProps['variant']) => {
  switch (variant) {
    case 'Complete':
      return 'Complete';
    case 'Overdue':
      return 'Overdue';
    default:
      return 'Pending';
  }
};

const getLabelCompletionStatus = (variant: CompletionStatusProps['variant']) => {
  switch (variant) {
    case 'Complete':
      return 'Complete';
    case 'Overdue':
      return 'Overdue';
    default:
      return 'Incomplete';
  }
};

function CompletionStatusForTable({ variant, className, ...props }: CompletionStatusProps) {
  return (
    <CompletionStatus
      variant={getVariantCompletionStatus(variant)}
      className={cn('flex h-auto w-full items-center gap-2 px-4 py-2 text-xs', className)}
      {...props}
    >
      {getIconCompletionStatus(variant)}
      {getLabelCompletionStatus(variant)}
    </CompletionStatus>
  );
}

export { SampleStatus, CompletionStatusForTable, DirectorSampleStatus };
