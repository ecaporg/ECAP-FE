'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const TABS = {
  setup: 'setup',
  users: 'users',
};

export function SettingsTabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = pathname.includes(TABS.setup)
    ? TABS.setup
    : pathname.includes(TABS.users)
      ? TABS.users
      : undefined;

  const newSearchParams = new URLSearchParams(searchParams);
  const setup = `${
    (tab ? pathname.split(tab)[0] : pathname + '/') + TABS.setup
  }?${newSearchParams.toString()}`;

  const users = `${
    (tab ? pathname.split(tab)[0] : pathname + '/') + TABS.users
  }?${newSearchParams.toString()}`;

  return (
    <Tabs defaultValue={tab || TABS.setup}>
      <TabsList>
        <Link href={setup}>
          <TabsTrigger value={TABS.setup}>System Setup</TabsTrigger>
        </Link>
        <Link href={users}>
          <TabsTrigger value={TABS.users}>User Permissions</TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
