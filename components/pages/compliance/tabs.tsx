'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const TABS = {
  samples: 'flagged-samples',
  students: 'students',
};

export function ComplianceTabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = pathname.includes(TABS.samples)
    ? TABS.samples
    : pathname.includes(TABS.students)
      ? TABS.students
      : undefined;

  const newSearchParams = new URLSearchParams(searchParams);
  const studentRoute = `${
    (tab ? pathname.split(tab)[0] : pathname + '/') + TABS.students
  }?${newSearchParams.toString()}`;

  const sampleRoute = `${
    (tab ? pathname.split(tab)[0] : pathname + '/') + TABS.samples
  }?${newSearchParams.toString()}`;

  return (
    <Tabs defaultValue={tab || TABS.samples}>
      <TabsList>
        <Link href={sampleRoute}>
          <TabsTrigger value={TABS.samples}>Flagged Samples</TabsTrigger>
        </Link>
        <Link href={studentRoute}>
          <TabsTrigger value={TABS.students}>Students</TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
