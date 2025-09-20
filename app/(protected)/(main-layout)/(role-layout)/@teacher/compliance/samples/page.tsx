import { rolePage } from '@/components/layouts/role-page';
import { RolesEnum } from 'ecap-lib/dist/constants';
import type { Metadata } from 'next';
import { ComplianceSamplesPage } from './component';

export const metadata: Metadata = {
  title: 'Compliance Samples',
};

export default rolePage(ComplianceSamplesPage, [RolesEnum.TEACHER]);
