import { rolePage } from '@/components/layouts/role-page';
import { RolesEnum } from 'ecap-lib/dist/constants';
import { TabStudents } from './component';

export default rolePage(TabStudents, [RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN]);
