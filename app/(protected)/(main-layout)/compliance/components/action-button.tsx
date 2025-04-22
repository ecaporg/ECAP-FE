"use client";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { SampleStatus, type Sample } from "@/types";
import { useRouter } from "next/navigation";

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
  onOpenModal: (sample: Sample) => void;
};

const getOnClick = (sample: Sample, options: onClickOptionProps) => {
  switch (sample.status) {
    case SampleStatus.COMPLETED:
    case SampleStatus.PENDING:
    case SampleStatus.ERRORS_FOUND:
      return () => options.router.push(options.redirectUrl);
    case SampleStatus.MISSING_SAMPLE:
    case SampleStatus.FLAGGED_TO_ADMIN:
    case SampleStatus.REASON_REJECTED:
      return () => options.onOpenModal(sample);
    default:
      return () => options.router.push(options.redirectUrl);
  }
};

const useActionButton = (sample: Sample) => {
  if (!sample) return { text: "", onClick: () => {} };
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
      onOpenModal: () => {},
    }),
  };
};

export function ActionButton({ sample }: ActionButtonProps) {
  const { text, onClick } = useActionButton(sample);

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={onClick}
      className="bg-transparent"
    >
      {text}
    </Button>
  );
}
