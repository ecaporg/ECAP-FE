"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TeacherCompliance, TrackLearningPeriod } from "@/types";
import { getCompletionStatus } from "@/utils";
import { CompletionStatusForTable } from "../statuses";
import { SortableIcon } from "@/components/table/sortable-header";

interface TeachersTableProps {
  assignments: TeacherCompliance[];
  currentLearningPeriod: TrackLearningPeriod;
}

export const TeachersTable = ({
  assignments = [],
  currentLearningPeriod,
}: TeachersTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Teacher Name
            <SortableIcon<TeacherCompliance> name="teacher_firstname" />
          </TableHead>
          <TableHead>
            Academy
            <SortableIcon<TeacherCompliance> name="academy_name" />
          </TableHead>
          <TableHead>
            Students
            <SortableIcon<TeacherCompliance> name="student_count" />
          </TableHead>
          <TableHead>
            Flagged Samples
            <SortableIcon<TeacherCompliance> name="flagged_count" />
          </TableHead>
          <TableHead>
            Completed Samples
            <SortableIcon<TeacherCompliance> name="completed_count" />
          </TableHead>
          <TableHead>
            Incomplete Samples
            <SortableIcon<TeacherCompliance> name="incompleted_count" />
          </TableHead>
          <TableHead>
            Completion Status
            <SortableIcon<TeacherCompliance> name="is_complated" />
          </TableHead>
          <TableHead>
            Completion Percentage
            <SortableIcon<TeacherCompliance> name="completion_percentage" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments.map((assignment) => (
          <TableRow key={assignment.teacher_id}>
            <TableCell>
              {assignment.teacher_firstname} {assignment.teacher_lastname}
            </TableCell>
            <TableCell>{assignment.academy_name}</TableCell>
            <TableCell>{assignment.student_count}</TableCell>
            <TableCell>{assignment.flagged_count}</TableCell>
            <TableCell>{assignment.completed_count}</TableCell>
            <TableCell>{assignment.incompleted_count}</TableCell>
            <TableCell>
              <CompletionStatusForTable
                variant={getCompletionStatus(
                  assignment.is_complated,
                  currentLearningPeriod
                )}
              />
            </TableCell>
            <TableCell>
              {Number(assignment.completion_percentage).toFixed(2)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
