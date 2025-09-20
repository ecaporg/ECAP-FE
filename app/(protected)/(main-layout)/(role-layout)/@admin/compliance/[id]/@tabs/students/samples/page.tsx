import { rolePage } from '@/components/layouts/role-page';
import { RolesEnum } from 'ecap-lib/dist/constants';
import { TabStudentsSamples } from './component';

export default rolePage(TabStudentsSamples, [RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN]);
