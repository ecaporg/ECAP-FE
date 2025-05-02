import { getSampleById } from "@/lib/sample";

import { SampleActionButtons } from "@/components/pages/sample/meta";
import { Skeleton } from "@/components/ui/skeleton";
import { SampleInputs } from "@/components/pages/sample/inputs";
import { SampleBagde } from "@/components/pages/sample/badge";
export default async function SampleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {
    data: sample,
    message,
    error,
  } = await getSampleById((await params).id);

  if (error || !sample) {
    throw new Error(message || error);
  }

  return (
    <>
      <div className="p-6 absolute inset-0">
        <SampleBagde sample={sample} />
        <SampleInputs sample={sample} />
        <Skeleton className="w-full h-[90vh]" />
        <SampleActionButtons sample={sample} />
      </div>
    </>
  );
}
