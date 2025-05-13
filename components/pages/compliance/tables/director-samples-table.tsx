import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Sample } from '@/types';
import { getUserName, sampleCategoryToText } from '@/utils';
import { ActionButton } from '../action-button';
import { DirectorSampleStatus } from '../statuses';
import { SortableIcon } from '@/components/table/sortable-header';

interface SamplesTableProps {
  samples: Sample[];
}

export const DirectorSamplesTable = ({ samples = [] }: SamplesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Sample Name
            <SortableIcon<Sample> name="assignment_title" />
          </TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>
            Student ID
            <SortableIcon<Sample> name="assignment_period.student_id" />
          </TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>
            Flag Category
            <SortableIcon<Sample> name="status" />
          </TableHead>
          <TableHead>
            Sample Status
            <SortableIcon<Sample> name="status" />
          </TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {samples.map((sample) => (
          <TableRow key={`${sample.id}`}>
            <TableCell>{sample.assignment_title}</TableCell>
            <TableCell>{sample.subject.name}</TableCell>
            <TableCell>{getUserName(sample.assignment_period.student.user)}</TableCell>
            <TableCell>{sample.assignment_period.student_id}</TableCell>
            <TableCell>{sample.assignment_period.student.grade}</TableCell>
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
