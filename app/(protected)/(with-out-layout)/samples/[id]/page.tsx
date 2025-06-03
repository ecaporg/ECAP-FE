import { getSampleById, getSampleViewFromCanvas } from '@/lib/api/sample';

import { SampleBagde } from '@/components/pages/sample/badge';
import { SampleInputs } from '@/components/pages/sample/inputs';
import { SampleActionButtons } from '@/components/pages/sample/meta';
import { SampleView } from '@/components/pages/sample/sample-view';
import { Skeleton } from '@/components/ui/skeleton';
import type { Sample } from '@/types';
import { Suspense } from 'react';

export default async function SampleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { data: sample, message, error } = await getSampleById((await params).id);

  if (error || !sample) {
    throw new Error(message || error);
  }

  return (
    <section className="lg:w-[64rem] lg:mx-auto mx-16 absolute inset-0">
      <SampleBagde sample={sample} />
      <SampleInputs sample={sample} />
      <Suspense fallback={<Skeleton className="w-full h-[90vh]" />}>
        <View sample={sample} />
      </Suspense>
      <SampleActionButtons sample={sample} />
    </section>
  );
}

async function View({ sample }: { sample: Sample }) {
  const { html } = await getSampleViewFromCanvas(sample);
  return <SampleView html={html} />;
}
