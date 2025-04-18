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

interface TableProps {
  assignments?: AssignmentPeriod[];
  currentLearningPeriodId: string;
}

export const SamplesTable = ({ assignments = [] }: TableProps) => {
  const tableRows = Object.entries(
    assignments
      ?.flatMap(({ samples }) => samples)
      .reduce(
        (acc, sample) => {
          if (acc[sample.subject_id]) {
            acc[sample.subject_id].push(sample);
          } else {
            acc[sample.subject_id] = [sample];
          }
          return acc;
        },
        {} as Record<number, Sample[]>
      )
  ).map(([_, samples]) => ({
    sample_1: samples[0],
    sample_2: samples[1],
    subject: samples[0].subject,
  }));

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
        {tableRows.map((row) => (
          <TableRow key={`${row.sample_1.id}`}>
            <TableCell>{row.subject.name}</TableCell>
            <TableCell>{row.sample_1.assignment_title}</TableCell>
            <TableCell>{row.sample_1.status}</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>{row.sample_1.done_by_teacher?.user?.email}</TableCell>
            <TableCell>{row.sample_2?.assignment_title}</TableCell>
            <TableCell>{row.sample_2?.status}</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>{row.sample_2?.done_by_teacher?.user?.email}</TableCell>
          </TableRow>
        ))}
        {tableRows.length === 0 && (
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

export const StudentsTable = ({ assignments = [], currentLearningPeriodId }: TableProps) => {
  let students: StudentWithSamples[] = assignments.map(
    (assignment) =>
      ({
        ...assignment.student,
        samples: assignment.samples,
      }) as StudentWithSamples
  );

  const router = useRouter();

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
              router.push(
                `${routes.compliance.samples}?student_id=${
                  student.user.id
                }&learning_period_id=${currentLearningPeriodId}&name=${getUserName(student.user)}`
              );
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
