'use client';
import { SortableIcon } from '@/components/table/sortable-header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { routes } from '@/constants/routes';
import { hasPermission } from '@/lib/permissions';
import { useAuth } from '@/providers/auth';
import type { IStudentLPEnrollment, ITrackLearningPeriod, IUser } from '@/types';
import { getCompletionStatus, getUserName } from '@/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { CompletionStatusForTable } from '../statuses';

interface StudentsTableProps {
  assignments?: IStudentLPEnrollment[];
  currentLearningPeriod: ITrackLearningPeriod;
}

export const StudentsTable = ({ assignments = [], currentLearningPeriod }: StudentsTableProps) => {
  const pathname = usePathname();
  const teacher_id = useSearchParams().get(DEFAULT_FILTERS_KEYS.TEACHER_ID);
  const { user } = useAuth();

  const getPath = (user: IUser) =>
    `${pathname}${routes.samples.root}?${DEFAULT_FILTERS_KEYS.STUDENT_ID}=${
      user.id
    }&${DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID}=${currentLearningPeriod.id}&${
      teacher_id ? `${DEFAULT_FILTERS_KEYS.TEACHER_ID}=${teacher_id}` : ''
    }&name=${getUserName(user)}`;

  return (
    <Table className="overflow-x-auto lg:max-h-max lg:overflow-x-clip" autoHeight>
      <TableHeader>
        <TableRow>
          <TableHead className="max-w-32 2xl:max-w-44">
            Student Name
            <SortableIcon<IStudentLPEnrollment> name="student.user.name" />
          </TableHead>
          <TableHead>
            Student ID
            <SortableIcon<IStudentLPEnrollment> name="student_id" />
          </TableHead>
          <TableHead className="max-w-32 2xl:max-w-44">
            School
            <SortableIcon<IStudentLPEnrollment> name="student.school.name" />
          </TableHead>
          <TableHead>
            Academy
            {hasPermission(user, 'sorting', 'sort:academy') && (
              <SortableIcon<IStudentLPEnrollment> name="student.academy.name" />
            )}
          </TableHead>
          <TableHead>
            Track
            <SortableIcon<IStudentLPEnrollment> name="learning_period.track.name" />
          </TableHead>
          <TableHead>
            Grade
            <SortableIcon<IStudentLPEnrollment> name="student_grade" />
          </TableHead>
          <TableHead className="max-w-[9.375rem] 2xl:max-w-[12.5rem]">
            Completion Status
            <SortableIcon<IStudentLPEnrollment> name="completed" />
          </TableHead>
          <TableHead>
            Progress (%)
            <SortableIcon<IStudentLPEnrollment> name="percentage" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments.map((assignment) => (
          <TableRow key={`${assignment.student.id}-${currentLearningPeriod.id}`}>
            <Link className="contents" href={getPath(assignment.student.user)}>
              <TableCell className="max-w-32 2xl:max-w-44">
                {getUserName(assignment.student.user)}
              </TableCell>
              <TableCell>{assignment.student.id}</TableCell>
              <TableCell className="lg:max-w-24 2xl:max-w-44">
                {assignment.student.school?.name}
              </TableCell>
              <TableCell>{assignment.student.academy?.name}</TableCell>
              <TableCell>{assignment.learning_period.track?.name}</TableCell>
              <TableCell>{assignment.student_grade}</TableCell>
              <TableCell>
                <CompletionStatusForTable
                  variant={getCompletionStatus(assignment, currentLearningPeriod)}
                />
              </TableCell>
              <TableCell className="text-center">
                {Number(assignment.percentage).toFixed(0)}%
              </TableCell>
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
