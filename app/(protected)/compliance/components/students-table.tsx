import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Student } from '@/types';

type Props = {
  students: Student[];
};

export const StudentsTable = ({ students }: Props) => {
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
            <TableRow key={student.user.id}>
              <TableCell>
                {student.user.firstname} {student.user.lastname}
              </TableCell>
              <TableCell>{student.user.id}</TableCell>
              <TableCell>{student.school.name}</TableCell>
              <TableCell>{student.academy.name}</TableCell>
              <TableCell>{student.track.name}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>In Progress</TableCell>
              <TableCell>0%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
};

export default StudentsTable;
