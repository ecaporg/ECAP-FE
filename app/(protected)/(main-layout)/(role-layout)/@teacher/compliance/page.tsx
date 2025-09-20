import { rolePage } from '@/components/layouts/role-page';
import { RolesEnum } from 'ecap-lib/dist/constants';
import type { Metadata } from 'next';
import { CompliancePage } from './component';

export const metadata: Metadata = {
  title: 'Compliance',
};

export default rolePage(CompliancePage, [RolesEnum.TEACHER]);
