import { flagMissingWorkSampleAction } from "@/app/(protected)/(with-out-layout)/samples/[id]/actions";
import type { ISample, ISampleFlagMissingWork } from "@/types";
import { validationMessages } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const flagMissingWorkSampleSchema = z.object({
  reason: z.string().min(1, { message: validationMessages.required("Reason") }),
});

export function useFlagMissingWorkSample({ sample }: { sample: ISample }) {
  const [openSuccessfullyModal, setOpenSuccessfullyModal] = useState(false);
  const form = useForm<z.infer<typeof flagMissingWorkSampleSchema>>({
    resolver: zodResolver(flagMissingWorkSampleSchema),
    defaultValues: {
      reason: "Select the reason the above work sample is missing",
    },
  });

  const onSubmit = () => {
    setOpenSuccessfullyModal(true);
  };

  const submitSuccessfully = async () => {
    const reason = form.getValues("reason");
    await flagMissingWorkSampleAction(sample, {
      reason,
    } as ISampleFlagMissingWork);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return {
    openSuccessfullyModal,
    setOpenSuccessfullyModal,
    submitSuccessfully,
    onSubmit,
    form,
  };
}
