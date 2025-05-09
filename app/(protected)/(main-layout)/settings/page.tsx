import { rolePage } from "@/components/layouts/role-page";

import { SettingsTabs } from "@/components/pages/setting/tabs";

function SettingsPage() {
  return <SettingsTabs />;
}

export default rolePage(SettingsPage, ["SUPER_ADMIN"]);
