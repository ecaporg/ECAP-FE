import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TeacherCompliance, TrackLearningPeriod } from "@/types";
import { getCompletionStatus, getUserName } from "@/utils";
import { CompletionStatusForTable } from "../statuses";
import { SortableIcon } from "@/components/table/sortable-header";
import { routes } from "@/constants/routes";
import {
  DEFAULT_FILTERS_KEYS,
  SPECIFIC_PAGE_FILTER_KEYS,
} from "@/constants/filter";
import Link from "next/link";

interface TeachersTableProps {
  assignments: TeacherCompliance[];
  currentLearningPeriod: TrackLearningPeriod;
}

export const TeachersTable = ({
  assignments = [],
  currentLearningPeriod,
}: TeachersTableProps) => {
  const getPath = (assignment: TeacherCompliance) =>
    `${routes.compliance.teacher.replace(
      ":id",
      assignment.teacher_id.toString()
    )}?${DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID}=${currentLearningPeriod.id}&${
      DEFAULT_FILTERS_KEYS.TEACHER_ID
    }=${assignment.teacher_id}&${
      SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.DIRECTOR.ACADEMY_ID
    }=${assignment.academy_id}`;

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
          <TableRow key={`${assignment.teacher_id}-${assignment.academy_id}`}>
            <Link className="contents" href={getPath(assignment)}>
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
            </Link>
          </TableRow>
        ))}
        {assignments.length === 0 && (
          <TableRow className="h-80">
            <TableCell colSpan={8} className="text-center">
              No teachers found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
