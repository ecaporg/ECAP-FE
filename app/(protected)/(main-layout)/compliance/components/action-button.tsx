"use client";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { SampleStatus, type Sample } from "@/types";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { FlagMissingWorkSamplerModal } from "./modals";

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
      return () => options.router.push(options.redirectUrl);
    default:
      return undefined;
  }
};

const useActionButton = (sample: Sample) => {
  if (!sample) return { text: "", onClick: () => {}, Wrapper: Fragment };
  const router = useRouter();
  const redirectUrl = routes.compliance.viewSample.replace(
    ":id",
    sample.id.toString()
  );
  const Wrapper =
    sample.status === SampleStatus.MISSING_SAMPLE
      ? FlagMissingWorkSamplerModal
      : Fragment;

  return {
    text: getText(sample),
    onClick: getOnClick(sample, {
      router,
      redirectUrl,
    }),
    Wrapper,
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
