"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Sample } from "@/types";
import { getUserName } from "@/utils";
import { ActionButton } from "../action-button";
import { SapmleStatus } from "../statuses";

interface SamplesTableProps {
  samples: Sample[];
}

export const DirectorSamplesTable = ({ samples = [] }: SamplesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sample Name</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>Student ID</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Flag Category</TableHead>
          <TableHead>Sample Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {samples.map((sample) => (
          <TableRow key={`${sample.id}`}>
            <TableCell>{sample.assignment_title}</TableCell>
            <TableCell>{sample.subject.name}</TableCell>
            <TableCell>
              {getUserName(sample.assignment_period.student.user)}
            </TableCell>
            <TableCell>{sample.assignment_period.student_id}</TableCell>
            <TableCell>{sample.assignment_period.student.grade}</TableCell>
            <TableCell>flag category</TableCell>
            <TableCell>
              <SapmleStatus status={sample?.status || null} />
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
