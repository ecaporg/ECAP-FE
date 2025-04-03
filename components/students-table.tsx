'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

interface Student {
  id: string;
  name: string;
  studentId: string;
  school: string;
  academy: 'Virtual' | 'Homeschool' | 'Flex';
  track: 'Track A' | 'Track B';
  grade: string;
  completion: 'complete' | 'in-progress';
  progress: number;
}

export function StudentsTable() {
  // Mock data for the table
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Student Name',
      studentId: '123456789',
      school: 'Lucerne',
      academy: 'Virtual',
      track: 'Track A',
      grade: 'Grade 8',
      completion: 'in-progress',
      progress: 20,
    },
    {
      id: '2',
      name: 'Student Name',
      studentId: '123456789',
      school: 'Mountain Empire',
      academy: 'Homeschool',
      track: 'Track B',
      grade: 'Grade 6',
      completion: 'in-progress',
      progress: 20,
    },
    {
      id: '3',
      name: 'Student Name',
      studentId: '123456789',
      school: 'Lucerne',
      academy: 'Flex',
      track: 'Track B',
      grade: 'Grade 1',
      completion: 'complete',
      progress: 100,
    },
    {
      id: '4',
      name: 'Student Name',
      studentId: '123456789',
      school: 'Mountain Empire',
      academy: 'Homeschool',
      track: 'Track A',
      grade: 'Grade 6',
      completion: 'in-progress',
      progress: 20,
    },
    {
      id: '5',
      name: 'Student Name',
      studentId: '123456789',
      school: 'Lucerne',
      academy: 'Flex',
      track: 'Track B',
      grade: 'Grade 11',
      completion: 'in-progress',
      progress: 20,
    },
    {
      id: '6',
      name: 'Student Name',
      studentId: '123456789',
      school: 'Mountain Empire',
      academy: 'Virtual',
      track: 'Track B',
      grade: 'Grade 2',
      completion: 'complete',
      progress: 100,
    },
    {
      id: '7',
      name: 'Student Name',
      studentId: '123456789',
      school: 'Mountain Empire',
      academy: 'Flex',
      track: 'Track A',
      grade: 'Grade 6',
      completion: 'in-progress',
      progress: 20,
    },
    {
      id: '8',
      name: 'Student Name',
      studentId: '123456789',
      school: 'Mountain Empire',
      academy: 'Flex',
      track: 'Track B',
      grade: 'Grade 9',
      completion: 'in-progress',
      progress: 20,
    },
    {
      id: '9',
      name: 'Student Name',
      studentId: '123456789',
      school: 'Lucerne',
      academy: 'Homeschool',
      track: 'Track B',
      grade: 'Grade 5',
      completion: 'in-progress',
      progress: 20,
    },
    {
      id: '10',
      name: 'Student Name',
      studentId: '123456789',
      school: 'Lucerne',
      academy: 'Flex',
      track: 'Track A',
      grade: 'Grade 3',
      completion: 'in-progress',
      progress: 20,
    },
    {
      id: '11',
      name: 'Student Name',
      studentId: '123456789',
      school: 'Mountain Empire',
      academy: 'Flex',
      track: 'Track B',
      grade: 'Grade 12',
      completion: 'in-progress',
      progress: 20,
    },
    {
      id: '12',
      name: 'Student Name',
      studentId: '123456789',
      school: 'Mountain Empire',
      academy: 'Homeschool',
      track: 'Track B',
      grade: 'Grade 5',
      completion: 'in-progress',
      progress: 20,
    },
    {
      id: '13',
      name: 'Student Name',
      studentId: '123456789',
      school: 'Mountain Empire',
      academy: 'Virtual',
      track: 'Track A',
      grade: 'Grade 10',
      completion: 'in-progress',
      progress: 20,
    },
    {
      id: '14',
      name: 'Student Name',
      studentId: '123456789',
      school: 'Lucerne',
      academy: 'Virtual',
      track: 'Track B',
      grade: 'Grade 4',
      completion: 'in-progress',
      progress: 20,
    },
    {
      id: '15',
      name: 'Student Name',
      studentId: '123456789',
      school: 'Mountain Empire',
      academy: 'Flex',
      track: 'Track B',
      grade: 'Grade 7',
      completion: 'in-progress',
      progress: 20,
    },
  ]);

  return (
    <div className="w-full">
      <div className="bg-[#3f3f4e] text-white p-3 rounded-t-lg flex items-center">
        <div className="h-5 w-5 bg-purple-500 rounded-md mr-2" />
        <h2 className="text-lg font-medium">Student Table</h2>
      </div>

      <div className="border-2 border-purple-500 rounded-b-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white border-b border-purple-200">
              <TableRow className="hover:bg-white">
                <TableHead className="text-black font-medium border-r border-purple-200">
                  Student Name <span className="text-purple-500">↓</span>
                </TableHead>
                <TableHead className="text-black font-medium border-r border-purple-200">
                  Student ID <span className="text-purple-500">↓</span>
                </TableHead>
                <TableHead className="text-black font-medium border-r border-purple-200">
                  School <span className="text-purple-500">↓</span>
                </TableHead>
                <TableHead className="text-black font-medium border-r border-purple-200">
                  Academy <span className="text-purple-500">↓</span>
                </TableHead>
                <TableHead className="text-black font-medium border-r border-purple-200">
                  Track
                </TableHead>
                <TableHead className="text-black font-medium border-r border-purple-200">
                  Grade
                </TableHead>
                <TableHead className="text-black font-medium border-r border-purple-200">
                  Completion <span className="text-purple-500">↓</span>
                </TableHead>
                <TableHead className="text-black font-medium">
                  Progress (%) <span className="text-purple-500">↓</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student.id}
                  className="hover:bg-purple-50 border-b border-purple-200"
                >
                  <TableCell className="border-r border-purple-200">{student.name}</TableCell>
                  <TableCell className="border-r border-purple-200">{student.studentId}</TableCell>
                  <TableCell className="border-r border-purple-200">{student.school}</TableCell>
                  <TableCell className="border-r border-purple-200">{student.academy}</TableCell>
                  <TableCell className="border-r border-purple-200">{student.track}</TableCell>
                  <TableCell className="border-r border-purple-200">{student.grade}</TableCell>
                  <TableCell className="border-r border-purple-200">
                    <div
                      className={cn(
                        'flex items-center text-xs rounded-full px-2 py-1 w-fit',
                        student.completion === 'complete'
                          ? 'text-green-600 bg-green-50'
                          : 'text-amber-500 bg-amber-50'
                      )}
                    >
                      {student.completion === 'complete' ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Complete
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3 mr-1" />
                          In progress
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{student.progress}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="h-4" />

      <div className="border-2 border-purple-500 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white border-b border-purple-200">
              <TableRow className="hover:bg-white">
                <TableHead className="text-black font-medium border-r border-purple-200">
                  Student Name <span className="text-purple-500">↓</span>
                </TableHead>
                <TableHead className="text-black font-medium border-r border-purple-200">
                  Student ID <span className="text-purple-500">↓</span>
                </TableHead>
                <TableHead className="text-black font-medium border-r border-purple-200">
                  School <span className="text-purple-500">↓</span>
                </TableHead>
                <TableHead className="text-black font-medium border-r border-purple-200">
                  Academy <span className="text-purple-500">↓</span>
                </TableHead>
                <TableHead className="text-black font-medium border-r border-purple-200">
                  Track
                </TableHead>
                <TableHead className="text-black font-medium border-r border-purple-200">
                  Grade
                </TableHead>
                <TableHead className="text-black font-medium border-r border-purple-200">
                  Completion <span className="text-purple-500">↓</span>
                </TableHead>
                <TableHead className="text-black font-medium">
                  Progress (%) <span className="text-purple-500">↓</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.slice(0, 8).map((student) => (
                <TableRow
                  key={`second-${student.id}`}
                  className="hover:bg-purple-50 border-b border-purple-200"
                >
                  <TableCell className="border-r border-purple-200">{student.name}</TableCell>
                  <TableCell className="border-r border-purple-200">{student.studentId}</TableCell>
                  <TableCell className="border-r border-purple-200">{student.school}</TableCell>
                  <TableCell className="border-r border-purple-200">{student.academy}</TableCell>
                  <TableCell className="border-r border-purple-200">{student.track}</TableCell>
                  <TableCell className="border-r border-purple-200">{student.grade}</TableCell>
                  <TableCell className="border-r border-purple-200">
                    <div
                      className={cn(
                        'flex items-center text-xs rounded-full px-2 py-1 w-fit',
                        student.completion === 'complete'
                          ? 'text-green-600 bg-green-50'
                          : 'text-amber-500 bg-amber-50'
                      )}
                    >
                      {student.completion === 'complete' ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Complete
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3 mr-1" />
                          In progress
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{student.progress}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
