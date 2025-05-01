"use client";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { SampleStatus, type Sample } from "@/types";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import {
  FlagMissingWorkSamplerInfoModal,
  FlagMissingWorkSamplerModal,
} from "./modals";

interface ActionButtonProps {
  sample: Sample;
}

const getText = ({ status }: Sample) => {
  switch (status) {
    case SampleStatus.PENDING:
      return "Approve";
    case SampleStatus.ERRORS_FOUND:
      return "Correct";
    case SampleStatus.MISSING_SAMPLE:
      return "Flag";
    case SampleStatus.FLAGGED_TO_ADMIN:
    case SampleStatus.COMPLETED:
    case SampleStatus.REASON_REJECTED:
      return "Review";
    default:
      return "Action";
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
      if (sample.flag_missing_work) {
        return undefined;
      }
      return () => options.router.push(options.redirectUrl);
    default:
      return undefined;
  }
};

const getWrapper = (sample?: Sample) => {
  if (!sample) {
    return (props: any) => <Fragment children={props.children} />;
  }

  if (
    sample.status === SampleStatus.FLAGGED_TO_ADMIN &&
    sample.flag_missing_work
  ) {
    return FlagMissingWorkSamplerInfoModal;
  }
  if (sample.status === SampleStatus.MISSING_SAMPLE) {
    return FlagMissingWorkSamplerModal;
  }
  return (props: any) => <Fragment children={props.children} />;
};

const useActionButton = (sample: Sample) => {
  if (!sample)
    return {
      text: "",
      onClick: () => {},
      Wrapper: getWrapper(sample),
    };
  const router = useRouter();
  const redirectUrl = routes.compliance.viewSample.replace(
    ":id",
    sample.id.toString()
  );

  return {
    text: getText(sample),
    onClick: getOnClick(sample, {
      router,
      redirectUrl,
    }),
    Wrapper: getWrapper(sample),
  };
};

export function ActionButton({ sample }: ActionButtonProps) {
  const { text, onClick, Wrapper } = useActionButton(sample);

  return (
    <Wrapper sample={sample}>
      <Button
        variant="secondary"
        size="sm"
        onClick={onClick}
        className="bg-transparent"
      >
        {text}
      </Button>
    </Wrapper>
  );
}
