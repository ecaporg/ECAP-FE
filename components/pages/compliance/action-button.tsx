'use client';
import { Button } from '@/components/ui/button';
import { routes } from '@/constants/routes';
import { SampleFlagCategory, SampleStatus, User, type Sample } from '@/types';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import {
  FlagCompleteSampleInfoModal,
  FlagMissingWorkSampleInfoModal,
  FlagMissingWorkSampleModal,
  FlagRejectSampleInfoModal,
} from './modals';
import { useAuth } from '@/providers/auth';
import { hasPermission } from '@/lib/permissions';
import { isAdminOrDirector, isAnyAdmin } from '@/utils';

interface ActionButtonProps {
  sample: Sample;
}

const getText = (sample: Sample, user: User) => {
  const text = (isAllowed: boolean, action: string) => (isAllowed ? action : 'Review');

  switch (sample.status) {
    case SampleStatus.PENDING:
      return text(hasPermission(user, 'samples', 'approve'), 'Approve');
    case SampleStatus.ERRORS_FOUND:
      return text(hasPermission(user, 'samples', 'correct'), 'Correct');
    case SampleStatus.MISSING_SAMPLE:
      return text(hasPermission(user, 'samples', 'flag'), 'Flag');
    case SampleStatus.FLAGGED_TO_ADMIN:
      if (isAnyAdmin(user)) {
        return 'Approve';
      }
    case SampleStatus.COMPLETED:
    case SampleStatus.REASON_REJECTED:
      return text(hasPermission(user, 'samples', 'review'), 'Review');
    default:
      return text(false, 'Review');
  }
};

type onClickOptionProps = {
  redirectUrl: string;
  router: ReturnType<typeof useRouter>;
};

const getOnClick = (sample: Sample, options: onClickOptionProps) => {
  switch (sample.status) {
    case SampleStatus.COMPLETED:
    case SampleStatus.PENDING:
    case SampleStatus.ERRORS_FOUND:
    case SampleStatus.FLAGGED_TO_ADMIN:
      if (sample.flag_category === SampleFlagCategory.MISSING_SAMPLE) {
        return undefined;
      }
      return () => options.router.push(options.redirectUrl);
    default:
      return undefined;
  }
};

const getWrapper = (sample: Sample | undefined, user: User) => {
  if (!sample) {
    return (props: any) => <Fragment children={props.children} />;
  }

  if (sample.status === SampleStatus.FLAGGED_TO_ADMIN && sample.flag_missing_work) {
    return FlagMissingWorkSampleInfoModal;
  }

  if (sample.status === SampleStatus.MISSING_SAMPLE) {
    return FlagMissingWorkSampleModal;
  }

  if (sample.status === SampleStatus.REASON_REJECTED) {
    return FlagRejectSampleInfoModal;
  }

  if (sample.status === SampleStatus.COMPLETED && sample.flag_missing_work) {
    return FlagCompleteSampleInfoModal;
  }

  return (props: any) => <Fragment children={props.children} />;
};

const getIsDisabled = (sample: Sample, user: User) => {
  return sample.status === SampleStatus.MISSING_SAMPLE && isAdminOrDirector(user);
};

const useActionButton = (sample: Sample) => {
  const { user } = useAuth();
  const router = useRouter();

  if (!sample)
    return {
      text: '',
      onClick: () => {},
      Wrapper: getWrapper(sample, user),
      isDisabled: true,
    };
  const redirectUrl = routes.compliance.viewSample.replace(':id', sample.id.toString());

  return {
    text: getText(sample, user),
    onClick: getOnClick(sample, {
      router,
      redirectUrl,
    }),
    Wrapper: getWrapper(sample, user),
    isDisabled: getIsDisabled(sample, user),
  };
};

export function ActionButton({ sample }: ActionButtonProps) {
  const { text, onClick, Wrapper, isDisabled } = useActionButton(sample);

  return (
    <Wrapper sample={sample}>
      <Button
        variant="secondary"
        size="sm"
        onClick={onClick}
        className="bg-transparent disabled:bg-transparent"
        disabled={isDisabled}
      >
        {text}
      </Button>
    </Wrapper>
  );
}
