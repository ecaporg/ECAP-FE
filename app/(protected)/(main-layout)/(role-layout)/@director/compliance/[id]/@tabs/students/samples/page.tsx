import { rolePage } from '@/components/layouts/role-page';
import { TabStudentsSamples } from '@/roles/@admin/compliance/[id]/@tabs/students/samples/component';
import { RolesEnum } from 'ecap-lib/dist/constants';

export default rolePage(TabStudentsSamples, [RolesEnum.DIRECTOR]);
