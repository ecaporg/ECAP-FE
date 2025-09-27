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
import type {
  ISample,
  IStudentLPEnrollment,
  IStudentLPEnrollmentAssignment,
  ICourse as Subject,
} from '@/types';
import { getUserName } from '@/utils';
import { ActionButton } from '../action-button';
import { SampleStatus } from '../statuses';

interface SamplesTableProps {
  rows: {
    sample_1?: IStudentLPEnrollmentAssignment;
    sample_2?: IStudentLPEnrollmentAssignment;
    subject: Subject;
  }[];
}

const AvatarColumn = ({ sample }: { sample?: ISample }) => {
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
    <Table className="overflow-auto">
      <TableHeader>
        <TableRow>
          <TableHead>
            Subject
            <SortableIcon<IStudentLPEnrollment> name="assignments.assignment.course.name" />
          </TableHead>
          <TableHead>Assignment Title</TableHead>
          <TableHead>
            ISample Status
            <SortableIcon<IStudentLPEnrollment> name="assignments.sample.status" />
          </TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Done By</TableHead>
          <TableHead>Assignment Title</TableHead>
          <TableHead>
            ISample Status
            <SortableIcon<IStudentLPEnrollment> name="assignments.sample.status" />
          </TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Done By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={`${row.sample_1?.student_lp_enrollment_id}-${row.sample_1?.assignment_id}`}
          >
            <TableCell className="max-w-28 truncate 2xl:max-w-48">{row.subject?.name}</TableCell>
            <TableCell className="max-w-28 truncate 2xl:max-w-48">
              {row.sample_1?.assignment?.name}
            </TableCell>
            <TableCell className="max-w-28 truncate 2xl:max-w-48">
              <SampleStatus status={row.sample_1?.sample?.status || null} />
            </TableCell>
            <TableCell className="max-w-28">
              <ActionButton sample={row.sample_1?.sample} />
            </TableCell>
            <TableCell className="max-w-28">
              <AvatarColumn sample={row.sample_1?.sample} />
            </TableCell>
            <TableCell className="max-w-28 truncate 2xl:max-w-48">
              {row.sample_2?.assignment?.name}
            </TableCell>
            <TableCell className="max-w-28 truncate 2xl:max-w-48">
              <SampleStatus status={row.sample_2?.sample?.status || null} />
            </TableCell>
            <TableCell className="max-w-28">
              <ActionButton sample={row.sample_2?.sample} />
            </TableCell>
            <TableCell className="max-w-28">
              <AvatarColumn sample={row.sample_2?.sample} />
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
