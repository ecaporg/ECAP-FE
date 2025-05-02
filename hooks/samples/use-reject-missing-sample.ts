import { Sample, SampleFlagRejected } from "@/types";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { rejectMissingWorkSampleAction } from "@/app/(protected)/(with-out-layout)/samples/[id]/actions";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/auth";

type FormData = {
  reason: string;
};

export function useRejectMissingSample({ sample }: { sample: Sample }) {
  const [openSuccessfullyModal, setOpenSuccessfullyModal] = useState(false);
  const path = usePathname();

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
      } as SampleFlagRejected,
      path
    );
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
