'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { AssignmentPeriod, Student, TrackLearningPeriod, User } from '@/types';
import { getCompletionStatus, getProgressValue, getUserName } from '@/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { CompletionStatusForTable } from '../statuses';
import { SortableIcon } from '@/components/table/sortable-header';
import Link from 'next/link';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { hasPermission } from '@/lib/permissions';
import { useAuth } from '@/providers/auth';

interface StudentsTableProps {
  assignments?: AssignmentPeriod[];
  currentLearningPeriod: TrackLearningPeriod;
}

export const StudentsTable = ({ assignments = [], currentLearningPeriod }: StudentsTableProps) => {
  const pathname = usePathname();
  const teacher_id = useSearchParams().get(DEFAULT_FILTERS_KEYS.TEACHER_ID);
  const { user } = useAuth();

  const getPath = (user: User) =>
    `${pathname}/samples?${DEFAULT_FILTERS_KEYS.STUDENT_ID}=${user.id}&${
      DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID
    }=${currentLearningPeriod.id}&${
      teacher_id ? `${DEFAULT_FILTERS_KEYS.TEACHER_ID}=${teacher_id}` : ''
    }&name=${getUserName(user)}`;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
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
            {hasPermission(user, 'sorting', 'sort:academy') && (
              <SortableIcon<AssignmentPeriod> name="student.academy.name" />
            )}
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
          <TableHead>
            Progress (%)
            <SortableIcon<AssignmentPeriod> name="percentage" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments.map((assignment) => (
          <TableRow key={`${assignment.student.id}-${currentLearningPeriod.id}`}>
            <Link className="contents" href={getPath(assignment.student.user)}>
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
              <TableCell>{assignment.percentage}%</TableCell>
            </Link>
          </TableRow>
        ))}
        {assignments.length === 0 && (
          <TableRow className="h-80">
            <TableCell colSpan={8} className="text-center">
              No students found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
