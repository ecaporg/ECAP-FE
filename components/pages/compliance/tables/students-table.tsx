"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { routes } from "@/constants/routes";
import type { AssignmentPeriod, Student, TrackLearningPeriod } from "@/types";
import { getCompletionStatus, getProgressValue, getUserName } from "@/utils";
import { useRouter } from "next/navigation";
import { CompletionStatusForTable } from "../statuses";
import { SortableIcon } from "@/components/table/sortable-header";

interface StudentsTableProps {
  assignments?: AssignmentPeriod[];
  currentLearningPeriod: TrackLearningPeriod;
}

export const StudentsTable = ({
  assignments = [],
  currentLearningPeriod,
}: StudentsTableProps) => {
  const router = useRouter();

  const handleClick = (student: Student) => {
    return () => {
      router.push(
        `${routes.compliance.samples}?student_id=${
          student.user.id
        }&learning_period_id=${currentLearningPeriod.id}&name=${getUserName(
          student.user
        )}`
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
          <TableRow  className="h-80">
            <TableCell colSpan={8} className="text-center">
              No students found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
