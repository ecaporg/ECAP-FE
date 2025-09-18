import { rejectMissingWorkSampleAction } from "@/app/(protected)/(with-out-layout)/samples/[id]/actions";
import type { ISample, ISampleFlagRejected } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  reason: string;
};

export function useRejectMissingSample({ sample }: { sample: ISample }) {
  const [openSuccessfullyModal, setOpenSuccessfullyModal] = useState(false);
  const path = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<FormData>({
    defaultValues: {
      reason: "",
    },
  });

  const submitSuccessfully = async () => {
    const reason = form.getValues("reason");
    await rejectMissingWorkSampleAction(
      sample,
      {
        reason,
      } as ISampleFlagRejected,
      `${path}?${new URLSearchParams(searchParams).toString()}`
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const onSubmit = async () => {
    setOpenSuccessfullyModal(false);
  };

  return {
    form,
    onSubmit,
    openSuccessfullyModal,
    setOpenSuccessfullyModal,
    submitSuccessfully,
  };
}
