import { getSampleById } from "@/lib/sample";

import { SampleActionButtons } from "../components/sample-meta";
import { Skeleton } from "@/components/ui/skeleton";
import { SampleInputs } from "../components/sample-inputs";
export default async function SampleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: sample, message, error } = await getSampleById(params.id);

  if (error || !sample) {
    throw new Error(message || error);
  }

  return (
    <>
      <div className="p-6 absolute inset-0">
        <SampleInputs sample={sample} />
        <Skeleton className="w-full h-[90vh]" />
        <SampleActionButtons sample={sample} />
      </div>
    </>
  );
}
