import { SortableIcon } from '@/components/table/sortable-header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ISample } from '@/types';
import { getUserName, sampleCategoryToText } from '@/utils';
import { ActionButton } from '../action-button';
import { DirectorSampleStatus } from '../statuses';

interface SamplesTableProps {
  samples: ISample[];
}

export const DirectorSamplesTable = ({ samples = [] }: SamplesTableProps) => {
  return (
    <Table className="overflow-auto">
      <TableHeader>
        <TableRow>
          <TableHead>
            Sample Name
            <SortableIcon<ISample> name="student_lp_enrollment_assignment.assignment.name" />
          </TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>
            Student ID
            <SortableIcon<ISample> name="student_lp_enrollment_assignment.student_lp_enrollment.student_id" />
          </TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>
            Flag Category
            <SortableIcon<ISample> name="status" />
          </TableHead>
          <TableHead>
            Sample Status
            <SortableIcon<ISample> name="status" />
          </TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {samples.map((sample) => (
          <TableRow key={`${sample.id}`}>
            <TableCell>{sample.student_lp_enrollment_assignment.assignment.name}</TableCell>
            <TableCell>{sample.student_lp_enrollment_assignment.assignment.course.name}</TableCell>
            <TableCell>
              {getUserName(
                sample.student_lp_enrollment_assignment.student_lp_enrollment.student.user
              )}
            </TableCell>
            <TableCell>
              {sample.student_lp_enrollment_assignment.student_lp_enrollment.student_id}
            </TableCell>
            <TableCell>
              {sample.student_lp_enrollment_assignment.student_lp_enrollment.student_grade}
            </TableCell>
            <TableCell>{sampleCategoryToText(sample.flag_category)}</TableCell>
            <TableCell>
              <DirectorSampleStatus sample={sample} />
            </TableCell>
            <TableCell>
              <ActionButton sample={sample} />
            </TableCell>
          </TableRow>
        ))}
        {samples.length === 0 && (
          <TableRow className="h-80">
            <TableCell colSpan={8} className="text-center">
              No samples found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
