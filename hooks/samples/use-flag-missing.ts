import { flagMissingWorkSampleAction } from "@/app/(protected)/(with-out-layout)/samples/[id]/actions";
import { Sample } from "@/types";
import { validationMessages } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const flagMissingWorkSampleSchema = z.object({
  reason: z.string().min(1, { message: validationMessages.required("Reason") }),
});

export function useFlagMissingWorkSample({ sample }: { sample: Sample }) {
  const [openSuccessfullyModal, setOpenSuccessfullyModal] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof flagMissingWorkSampleSchema>>({
    resolver: zodResolver(flagMissingWorkSampleSchema),
    defaultValues: {
      reason: "Reason",
    },
  });

  const onSubmit = () => {
    setOpenSuccessfullyModal(true);
  };

  const submitSuccessfully = async () => {
    const formData = form.getValues();
    console.log(formData);
    await flagMissingWorkSampleAction(sample);
  };

  return {
    openSuccessfullyModal,
    setOpenSuccessfullyModal,
    submitSuccessfully,
    onSubmit,
    form,
  };
}
