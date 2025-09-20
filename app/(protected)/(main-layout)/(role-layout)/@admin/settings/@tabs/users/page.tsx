import { NotImplemented } from '@/components/layouts/not-implemnted';
import { rolePage } from '@/components/layouts/role-page';
import { RolesEnum } from 'ecap-lib/dist/constants';

function TabUsers() {
  return <NotImplemented />;
}

export default rolePage(TabUsers, [RolesEnum.SUPER_ADMIN]);
