import {
  AcademySortIcon,
  SortableIcon,
} from "@/components/table/sortable-header";
import {
  Span,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DEFAULT_FILTERS_KEYS } from "@/constants/filter";
import { routes } from "@/constants/routes";
import type {
  IAcademicYear,
  ITeacherCompliance,
  ITrackLearningPeriod,
} from "@/types";
import { getCompletionStatus } from "@/utils";
import Link from "next/link";
import { CompletionStatusForTable } from "../statuses";
interface TeachersTableProps {
  assignments: ITeacherCompliance[];
  currentLearningPeriod?: ITrackLearningPeriod;
  currentAcademicYear?: IAcademicYear;
}

export const TeachersTable = ({
  assignments = [],
  currentLearningPeriod,
  currentAcademicYear,
}: TeachersTableProps) => {
  const getPath = (assignment: ITeacherCompliance) =>
    `${routes.compliance.teacher.replace(
      ":id",
      assignment.teacher_id.toString()
    )}?${DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID}=${
      currentLearningPeriod?.id
    }&${DEFAULT_FILTERS_KEYS.TEACHER_ID}=${assignment.teacher_id}&${
      DEFAULT_FILTERS_KEYS.ACADEMY_ID
    }=${assignment.academy_id}&${DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR}=${
      currentAcademicYear?.id
    }`;

  return (
    <Table
      className="overflow-x-auto lg:max-h-max lg:overflow-x-clip"
      autoHeight
    >
      <TableHeader>
        <TableRow>
          <TableHead className="max-w-28 lg:max-w-44 " title="Teacher Name">
            <Span>Teacher Name</Span>
            <SortableIcon<ITeacherCompliance> name="teacher_name" />
          </TableHead>
          <TableHead className="max-w-28 lg:max-w-44 " title="Academy">
            Academy
            <AcademySortIcon<ITeacherCompliance> name="academy_name" />
          </TableHead>
          <TableHead className="max-w-28 lg:max-w-44 " title="Students">
            Students
            <SortableIcon<ITeacherCompliance> name="student_count" />
          </TableHead>
          <TableHead
            className="max-w-28 lg:max-w-28 2xl:max-w-28"
            title="Flagged Samples"
          >
            <Span>Flagged Samples</Span>
            <SortableIcon<ITeacherCompliance> name="flagged_count" />
          </TableHead>
          <TableHead
            className="max-w-28 lg:max-w-28 2xl:max-w-28"
            title="Completed Samples"
          >
            <Span>Completed Samples</Span>
            <SortableIcon<ITeacherCompliance> name="completed_count" />
          </TableHead>
          <TableHead
            className="max-w-28 lg:max-w-28 2xl:max-w-28"
            title="Incomplete Samples"
          >
            <Span>Incomplete Samples</Span>
            <SortableIcon<ITeacherCompliance> name="incompleted_count" />
          </TableHead>
          <TableHead className="max-w-28 lg:max-w-44 " title="Completion">
            <Span>Completion</Span>
            <SortableIcon<ITeacherCompliance> name="is_complated" />
          </TableHead>
          <TableHead className="lg:max-w-44 " title="Progress">
            Progress
            <SortableIcon<ITeacherCompliance> name="completion_percentage" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments.map((assignment) => (
          <TableRow key={`${assignment.teacher_id}-${assignment.academy_id}`}>
            <Link className="contents" href={getPath(assignment)}>
              <TableCell className="max-w-28 lg:max-w-44 ">
                {assignment.teacher_name}
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
              <TableCell className="text-center">
                {Number(assignment.completion_percentage).toFixed(0)}%
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
