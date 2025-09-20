import { rolePage } from '@/components/layouts/role-page';
import { RolesEnum } from 'ecap-lib/dist/constants';
import { TabSamples } from './compoment';

export default rolePage(TabSamples, [RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN]);
