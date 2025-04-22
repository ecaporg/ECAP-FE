import { CompletionStatus, type CompletionStatusProps } from '@/components/table/complation-status';
import { SampleStatus } from '@/types';
import { cn } from '@/utils';
import { getSampleStatus } from '@/utils/sample';
import { CheckCircleIcon, CircleAlertIcon } from 'lucide-react';

export interface SapmleStatusProps extends CompletionStatusProps {
  status: SampleStatus | null;
}

const getVariantSampleStatus = (status: SampleStatus): CompletionStatusProps['variant'] => {
  switch (status) {
    case SampleStatus.COMPLETED:
      return 'Complete';
    case SampleStatus.FLAGGED_TO_ADMIN:
      return 'Overdue';
    case SampleStatus.PENDING:
      return 'Pending';
    case SampleStatus.ERRORS_FOUND:
      return 'In Progress';
    case SampleStatus.MISSING_SAMPLE:
      return 'In Progress';
    case SampleStatus.REASON_REJECTED:
      return 'In Progress';
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
    <CompletionStatus
      variant={getVariantSampleStatus(status)}
      className={cn('flex items-center gap-2 w-full px-4 py-2 h-auto text-xs', className)}
      {...props}
    >
      {getIconSampleStatus(status)}
      {getSampleStatus(status)}
    </CompletionStatus>
  );
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
      return 'In Progress';
  }
};

function CompletionStatusForTable({ variant, className, ...props }: CompletionStatusProps) {
  return (
    <CompletionStatus
      variant={getVariantCompletionStatus(variant)}
      className={cn('flex items-center gap-2 w-full px-4 py-2 h-auto text-xs', className)}
      {...props}
    >
      {getIconCompletionStatus(variant)}
      {getLabelCompletionStatus(variant)}
    </CompletionStatus>
  );
}

export { SapmleStatus, CompletionStatusForTable };
