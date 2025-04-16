'use client';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {  AssignmentPeriod, Sample, Student, TrackLearningPeriod } from '@/types';

interface StudentWithSamples extends Student {
  samples: Sample[];
}

interface StudentsTableProps {
  assignments?: AssignmentPeriod[];
}

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

export const StudentsTable = ({ assignments }: StudentsTableProps) => {
  let students: StudentWithSamples[] = [];

  if (assignments) {
    students =
      assignments.map(
        (assignment) =>
          ({
            ...assignment.student,
            samples: assignment.samples,
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
