import { rolePage } from '@/components/layouts/role-page';
import { TabStudents } from '@/roles/@admin/compliance/[id]/@tabs/students/component';
import { RolesEnum } from 'ecap-lib/dist/constants';

export default rolePage(TabStudents, [RolesEnum.DIRECTOR]);
