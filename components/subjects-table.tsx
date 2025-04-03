'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AlertCircle, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface Subject {
  id: string;
  name: string;
  assignments: Assignment[];
}

interface Assignment {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected';
  doneBy?: string;
}

export function SubjectsTable() {
  // Mock data for the table
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Subject',
      assignments: [
        { id: '1', title: 'Assignment Title', status: 'pending', doneBy: 'NF' },
        { id: '2', title: 'Assignment Title', status: 'pending', doneBy: 'NF' },
      ],
    },
    {
      id: '2',
      name: 'Subject',
      assignments: [
        { id: '3', title: 'Assignment Title', status: 'pending', doneBy: 'NF' },
        { id: '4', title: 'Assignment Title', status: 'pending', doneBy: 'NF' },
      ],
    },
    {
      id: '3',
      name: 'Subject',
      assignments: [
        { id: '5', title: 'Assignment Title', status: 'pending', doneBy: 'NF' },
        { id: '6', title: 'Assignment Title', status: 'pending', doneBy: 'NF' },
      ],
    },
    {
      id: '4',
      name: 'Subject',
      assignments: [
        { id: '7', title: 'Assignment Title', status: 'pending', doneBy: 'NF' },
        { id: '8', title: 'Assignment Title', status: 'pending', doneBy: 'NF' },
      ],
    },
    {
      id: '5',
      name: 'Subject',
      assignments: [
        { id: '9', title: 'Assignment Title', status: 'pending', doneBy: 'NF' },
        { id: '10', title: 'Assignment Title', status: 'pending', doneBy: 'NF' },
      ],
    },
  ]);

  // Second set of subjects with user avatars
  const [subjectsWithUsers, setSubjectsWithUsers] = useState<Subject[]>([
    {
      id: '6',
      name: 'Subject',
      assignments: [
        { id: '11', title: 'Assignment Title', status: 'pending', doneBy: 'user' },
        { id: '12', title: 'Assignment Title', status: 'pending', doneBy: 'user' },
      ],
    },
    {
      id: '7',
      name: 'Subject',
      assignments: [
        { id: '13', title: 'Assignment Title', status: 'pending', doneBy: 'user' },
        { id: '14', title: 'Assignment Title', status: 'pending', doneBy: 'user' },
      ],
    },
    {
      id: '8',
      name: 'Subject',
      assignments: [
        { id: '15', title: 'Assignment Title', status: 'pending', doneBy: 'user' },
        { id: '16', title: 'Assignment Title', status: 'pending', doneBy: 'user' },
      ],
    },
    {
      id: '9',
      name: 'Subject',
      assignments: [
        { id: '17', title: 'Assignment Title', status: 'pending', doneBy: 'user' },
        { id: '18', title: 'Assignment Title', status: 'pending', doneBy: 'user' },
      ],
    },
    {
      id: '10',
      name: 'Subject',
      assignments: [
        { id: '19', title: 'Assignment Title', status: 'pending', doneBy: 'user' },
        { id: '20', title: 'Assignment Title', status: 'pending', doneBy: 'user' },
      ],
    },
  ]);

  const handleApprove = (subjectId: string, assignmentId: string) => {
    // Handle approval logic here
    console.log(`Approved assignment ${assignmentId} for subject ${subjectId}`);
  };

  return (
    <div className="w-full">
      <div className="bg-[#3f3f4e] text-white p-3 rounded-t-lg">
        <h2 className="text-lg font-medium">Subject Table</h2>
      </div>

      <div className="bg-white rounded-b-lg shadow-md overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[120px]">Subject</TableHead>
              <TableHead>Assignment Title</TableHead>
              <TableHead className="w-[140px]">
                Sample Status <HelpCircle className="inline h-4 w-4 ml-1" />
              </TableHead>
              <TableHead className="w-[100px]">Action</TableHead>
              <TableHead className="w-[80px]">Done By</TableHead>
              <TableHead>Assignment Title</TableHead>
              <TableHead className="w-[140px]">
                Sample Status <HelpCircle className="inline h-4 w-4 ml-1" />
              </TableHead>
              <TableHead className="w-[100px]">Action</TableHead>
              <TableHead className="w-[80px]">Done By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell>{subject.assignments[0]?.title}</TableCell>
                <TableCell>
                  <div className="flex items-center text-amber-500 bg-amber-50 rounded-full px-2 py-1 text-xs w-fit">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Pending Approval
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    className="text-blue-500 bg-transparent hover:bg-blue-50 hover:text-blue-600 p-0 h-auto font-medium"
                    onClick={() => handleApprove(subject.id, subject.assignments[0]?.id)}
                  >
                    Approve
                  </Button>
                </TableCell>
                <TableCell className="text-center">{subject.assignments[0]?.doneBy}</TableCell>
                <TableCell>{subject.assignments[1]?.title}</TableCell>
                <TableCell>
                  <div className="flex items-center text-amber-500 bg-amber-50 rounded-full px-2 py-1 text-xs w-fit">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Pending Approval
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    className="text-blue-500 bg-transparent hover:bg-blue-50 hover:text-blue-600 p-0 h-auto font-medium"
                    onClick={() => handleApprove(subject.id, subject.assignments[1]?.id)}
                  >
                    Approve
                  </Button>
                </TableCell>
                <TableCell className="text-center">{subject.assignments[1]?.doneBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="h-4 bg-gray-100" />

        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[120px]">Subject</TableHead>
              <TableHead>Assignment Title</TableHead>
              <TableHead className="w-[140px]">
                Sample Status <HelpCircle className="inline h-4 w-4 ml-1" />
              </TableHead>
              <TableHead className="w-[100px]">Action</TableHead>
              <TableHead className="w-[80px]">Done By</TableHead>
              <TableHead>Assignment Title</TableHead>
              <TableHead className="w-[140px]">
                Sample Status <HelpCircle className="inline h-4 w-4 ml-1" />
              </TableHead>
              <TableHead className="w-[100px]">Action</TableHead>
              <TableHead className="w-[80px]">Done By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjectsWithUsers.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell>{subject.assignments[0]?.title}</TableCell>
                <TableCell>
                  <div className="flex items-center text-amber-500 bg-amber-50 rounded-full px-2 py-1 text-xs w-fit">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Pending Approval
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    className="text-blue-500 bg-transparent hover:bg-blue-50 hover:text-blue-600 p-0 h-auto font-medium"
                    onClick={() => handleApprove(subject.id, subject.assignments[0]?.id)}
                  >
                    Approve
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <div className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                      <Image
                        src="/placeholder.svg?height=24&width=24"
                        width={24}
                        height={24}
                        alt="User avatar"
                        className="rounded-full"
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>{subject.assignments[1]?.title}</TableCell>
                <TableCell>
                  <div className="flex items-center text-amber-500 bg-amber-50 rounded-full px-2 py-1 text-xs w-fit">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Pending Approval
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    className="text-blue-500 bg-transparent hover:bg-blue-50 hover:text-blue-600 p-0 h-auto font-medium"
                    onClick={() => handleApprove(subject.id, subject.assignments[1]?.id)}
                  >
                    Approve
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <div className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                      <Image
                        src="/placeholder.svg?height=24&width=24"
                        width={24}
                        height={24}
                        alt="User avatar"
                        className="rounded-full"
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
