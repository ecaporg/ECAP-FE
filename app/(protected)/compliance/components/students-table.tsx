'use client';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Assignment, Sample, Student, TrackLearningPeriod } from '@/types';

interface StudentWithSamples extends Student {
  samples: Sample[];
}

interface StudentsTableProps {
  assignments?: Assignment[];
  currentLearningPeriod?: TrackLearningPeriod;
}

const getAssignmentPeriod = (
  assignment: Assignment,
  currentLearningPeriod: TrackLearningPeriod
) => {
  return assignment.assignment_periods.find((assignment) =>
    currentLearningPeriod?.id?.toString().includes(assignment.learning_period_id.toString())
  )!;
};

const getPercentage = (student: StudentWithSamples) => {
  if (student.samples.length === 0) {
    return 0;
  }
  return (
    (student.samples.filter((sample) => sample.status.toLowerCase() == 'completed').length /
      student.samples.length) *
    100
  ).toFixed(2);
};

export const StudentsTable = ({ assignments, currentLearningPeriod }: StudentsTableProps) => {
  let students: StudentWithSamples[] = [];

  if (assignments && currentLearningPeriod) {
    students =
      assignments.map(
        (assignment) =>
          ({
            ...getAssignmentPeriod(assignment, currentLearningPeriod).student,
            samples: getAssignmentPeriod(assignment, currentLearningPeriod).samples,
          }) as StudentWithSamples
      ) ?? [];
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[200px]">Student Name</TableHead>
          <TableHead>Student ID</TableHead>
          <TableHead>School</TableHead>
          <TableHead>Academy</TableHead>
          <TableHead>Track</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Completion Status</TableHead>
          <TableHead>Progress (%)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={`${student.user.id}+${student.track.id}`}>
            <TableCell>
              {student.user.firstname} {student.user.lastname}
            </TableCell>
            <TableCell>{student.user.id}</TableCell>
            <TableCell>{student.school?.name}</TableCell>
            <TableCell>{student.academy?.name}</TableCell>
            <TableCell>{student.track?.name}</TableCell>
            <TableCell>{student.grade}</TableCell>
            <TableCell>In Progress</TableCell>
            <TableCell>{getPercentage(student)}%</TableCell>
          </TableRow>
        ))}
        {students.length === 0 && (
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
