import { SortableIcon } from '@/components/table/sortable-header';
import { Avatar, AvatarFallback, getInitials } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Sample, StudentLPEnrollment, Subject } from '@/types';
import { getUserName } from '@/utils';
import { ActionButton } from '../action-button';
import { SapmleStatus } from '../statuses';

interface SamplesTableProps {
  rows: {
    sample_1: Sample;
    sample_2: Sample;
    subject: Subject;
  }[];
}

const AvatarColumn = ({ sample }: { sample: Sample | undefined }) => {
  const user =
    sample?.done_by ||
    sample?.flag_missing_work?.user ||
    sample?.flag_errors?.user ||
    sample?.flag_rejected?.user;
  return (
    <Avatar title={user ? getUserName(user) : ''}>
      <AvatarFallback>
        {user ? (user.canvas_additional_info?.avatar_url ?? getInitials(getUserName(user))) : '--'}
      </AvatarFallback>
    </Avatar>
  );
};

export const SamplesTable = ({ rows = [] }: SamplesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Subject
            <SortableIcon<StudentLPEnrollment> name="samples.subject.name" />
          </TableHead>
          <TableHead>Assignment Title</TableHead>
          <TableHead>
            Sample Status
            <SortableIcon<StudentLPEnrollment> name="samples.status" />
          </TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Done By</TableHead>
          <TableHead>Assignment Title</TableHead>
          <TableHead>
            Sample Status
            <SortableIcon<StudentLPEnrollment> name="samples.status" />
          </TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Done By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={`${row.sample_1.id}`}>
            <TableCell className="2xl:max-w-48 max-w-28 truncate">{row.subject.name}</TableCell>
            <TableCell className="2xl:max-w-48 max-w-28 truncate">
              {row.sample_1.assignment_title}
            </TableCell>
            <TableCell className="2xl:max-w-48 max-w-28 truncate">
              <SapmleStatus status={row.sample_1.status || null} />
            </TableCell>
            <TableCell className="max-w-28">
              <ActionButton sample={row.sample_1} />
            </TableCell>
            <TableCell className="max-w-28">
              <AvatarColumn sample={row.sample_1} />
            </TableCell>
            <TableCell className="2xl:max-w-48 max-w-28 truncate">
              {row.sample_2?.assignment_title}
            </TableCell>
            <TableCell className="2xl:max-w-48 max-w-28 truncate">
              <SapmleStatus status={row.sample_2?.status || null} />
            </TableCell>
            <TableCell className="max-w-28">
              <ActionButton sample={row.sample_2} />
            </TableCell>
            <TableCell className="max-w-28">
              <AvatarColumn sample={row.sample_2} />
            </TableCell>
          </TableRow>
        ))}
        {rows.length === 0 && (
          <TableRow className="h-80">
            <TableCell colSpan={9} className="text-center">
              No samples found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
