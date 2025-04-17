'use client';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { routes } from '@/constants/routes';
import { AssignmentPeriod, Sample, Student } from '@/types';
import { getUserName } from '@/utils';
import { useRouter } from 'next/navigation';

interface StudentWithSamples extends Student {
  samples: Sample[];
}

interface StudentsTableProps {
  assignments?: AssignmentPeriod[];
  currentLearningPeriodId: string;
}

export const SamplesTable = ({ assignments }: StudentsTableProps) => {

  const samples = assignments?.flatMap((assignment) => assignment.samples.map((sample) => {
    return {
      ...sample,
      subject: assignment.assignment.subject,
    }
  })) ?? [];
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Subject</TableHead>
          <TableHead>Assignment Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Done By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {samples.map((sample) => (
          <TableRow key={`${sample.id}`}>
            <TableCell>{sample.subject.name}</TableCell>
            <TableCell>{sample.assignment_title}</TableCell>
            <TableCell>{sample.status}</TableCell>
            <TableCell>{sample.done_by_teacher.user.email}</TableCell>
          </TableRow>
        ))}
        {samples.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No samples found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};



const getProgressValue = (student: StudentWithSamples) => {
  if (student.samples.length === 0) {
    return 0;
  }
  return (
    (student.samples.filter((sample) => sample.status.toLowerCase() == 'completed').length /
      student.samples.length) *
    100
  ).toFixed(2);
};

export const StudentsTable = ({ assignments, currentLearningPeriodId }: StudentsTableProps) => {
  let students: StudentWithSamples[] = [];
  const router = useRouter();
  
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
          <TableRow 
            key={`${student.id}`}
            onClick={() => {
              router.push(`${routes.compliance.samples}?student_id=${student.user.id}&learning_period_id=${currentLearningPeriodId}`);
            }}
          >
            <TableCell>{getUserName(student.user)}</TableCell>
            <TableCell>{student.id}</TableCell>
            <TableCell>{student.school?.name}</TableCell>
            <TableCell>{student.academy?.name}</TableCell>
            <TableCell>{student.track?.name}</TableCell>
            <TableCell>{student.grade}</TableCell>
            <TableCell>In Progress</TableCell>
            <TableCell>{getProgressValue(student)}%</TableCell>
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