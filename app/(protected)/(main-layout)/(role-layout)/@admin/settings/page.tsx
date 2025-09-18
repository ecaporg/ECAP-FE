import { rolePage } from '@/components/layouts/role-page';

import { SettingsTabs } from '@/components/pages/setting/tabs';
import { RolesEnum } from 'ecap-lib/dist/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
};

function SettingsPage() {
  return <SettingsTabs />;
}

export default rolePage(SettingsPage, [RolesEnum.SUPER_ADMIN]);
