import { rolePage } from '@/components/layouts/role-page';

import { SettingsTabs } from '@/components/pages/setting/tabs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
};

function SettingsPage() {
  return <SettingsTabs />;
}

export default rolePage(SettingsPage, ['SUPER_ADMIN']);
