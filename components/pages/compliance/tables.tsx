'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { routes } from '@/constants/routes';
import type { AssignmentPeriod, Sample, Student, Subject, TrackLearningPeriod } from '@/types';
import { getCompletionStatus, getProgressValue, getUserName } from '@/utils';
import { useRouter } from 'next/navigation';
import { ActionButton } from './action-button';
import { CompletionStatusForTable, SapmleStatus } from './statuses';
import { Avatar, AvatarFallback, getInitials } from '@/components/ui/avatar';
import { SortableIcon } from '@/components/table/sortable-header';

interface TableProps {
  assignments?: AssignmentPeriod[];
  currentLearningPeriod: TrackLearningPeriod;
}

export const SamplesTable = ({
  rows = [],
}: {
  rows: {
    sample_1: Sample;
    sample_2: Sample;
    subject: Subject;
  }[];
}) => {
  const AvatarColumn = ({ sample }: { sample: Sample }) => {
    return (
      <Avatar title={sample?.done_by ? getUserName(sample.done_by) : ''}>
        <AvatarFallback>
          {sample?.done_by ? getInitials(getUserName(sample.done_by)) : '--'}
        </AvatarFallback>
      </Avatar>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Subject</TableHead>
          <TableHead>Assignment Title</TableHead>
          <TableHead>Sample Status</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Done By</TableHead>
          <TableHead>Assignment Title</TableHead>
          <TableHead>Sample Status</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Done By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={`${row.sample_1.id}`}>
            <TableCell>{row.subject.name}</TableCell>
            <TableCell>{row.sample_1.assignment_title}</TableCell>
            <TableCell>
              <SapmleStatus status={row.sample_1.status || null} />
            </TableCell>
            <TableCell>
              <ActionButton sample={row.sample_1} />
            </TableCell>
            <TableCell>
              <AvatarColumn sample={row.sample_1} />
            </TableCell>
            <TableCell>{row.sample_2?.assignment_title}</TableCell>
            <TableCell>
              <SapmleStatus status={row.sample_2?.status || null} />
            </TableCell>
            <TableCell>
              <ActionButton sample={row.sample_2} />
            </TableCell>
            <TableCell>
              <AvatarColumn sample={row.sample_2} />
            </TableCell>
          </TableRow>
        ))}
        {rows.length === 0 && (
          <TableRow>
            <TableCell colSpan={9} className="text-center">
              No samples found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export const StudentsTable = ({ assignments = [], currentLearningPeriod }: TableProps) => {
  const router = useRouter();

  const handleClick = (student: Student) => {
    return () => {
      router.push(
        `${routes.compliance.samples}?student_id=${
          student.user.id
        }&learning_period_id=${currentLearningPeriod.id}&name=${getUserName(student.user)}`
      );
    };
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[200px]">
            Student Name
            <SortableIcon<AssignmentPeriod> name="student.user.firstname" />
          </TableHead>
          <TableHead>
            Student ID
            <SortableIcon<AssignmentPeriod> name="student_id" />
          </TableHead>
          <TableHead>
            School
            <SortableIcon<AssignmentPeriod> name="student.school.name" />
          </TableHead>
          <TableHead>
            Academy
            <SortableIcon<AssignmentPeriod> name="student.academy.name" />
          </TableHead>
          <TableHead>
            Track
            <SortableIcon<AssignmentPeriod> name="student.track.name" />
          </TableHead>
          <TableHead>
            Grade
            <SortableIcon<AssignmentPeriod> name="student.grade" />
          </TableHead>
          <TableHead>
            Completion Status
            <SortableIcon<AssignmentPeriod> name="completed" />
          </TableHead>
          <TableHead>Progress (%)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments.map((assignment) => (
          <TableRow
            key={`${assignment.student.id}-${currentLearningPeriod.id}`}
            onClick={handleClick(assignment.student)}
          >
            <TableCell>{getUserName(assignment.student.user)}</TableCell>
            <TableCell>{assignment.student.id}</TableCell>
            <TableCell>{assignment.student.school?.name}</TableCell>
            <TableCell>{assignment.student.academy?.name}</TableCell>
            <TableCell>{assignment.student.track?.name}</TableCell>
            <TableCell>{assignment.student.grade}</TableCell>
            <TableCell>
              <CompletionStatusForTable
                variant={getCompletionStatus(assignment, currentLearningPeriod)}
              />
            </TableCell>
            <TableCell>{getProgressValue(assignment)}%</TableCell>
          </TableRow>
        ))}
        {assignments.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              No students found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
