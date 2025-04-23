import { getSampleById } from '@/lib/sample';

import { SampleInputs, SampleActionButtons } from '../components/sample-meta';
import { Skeleton } from '@/components/ui/skeleton';
export default async function SampleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: sample, message, error } = await getSampleById(params.id);

  if (error) {
    throw new Error(message || error);
  }

  return (
    <>
      <div className="p-6 absolute inset-0">
        <SampleInputs
          data={{
            assignmentTitle: 'test data ',
            courseTitle: 'test data ',
            studentName: 'test data ',
            grade: 10,
            date: new Date().toLocaleDateString(),
          }}
        />
        <Skeleton className="w-full h-[90vh]" />
        <SampleActionButtons sample={sample!} />
      </div>
    </>
  );
}
