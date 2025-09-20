import { TabSamples } from '@/app/(protected)/(main-layout)/(role-layout)/@admin/compliance/[id]/@tabs/flagged-samples/compoment';
import { rolePage } from '@/components/layouts/role-page';
import { RolesEnum } from 'ecap-lib/dist/constants';

export default rolePage(TabSamples, [RolesEnum.DIRECTOR]);
