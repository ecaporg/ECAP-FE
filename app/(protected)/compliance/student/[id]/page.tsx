'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/lib/auth';
import { getStudentAssignments, getStudentGrades, mockStudents } from '@/lib/mock-data';
import { hasPermission } from '@/lib/permissions';
import type { Assignment, Grade, Student } from '@/lib/types';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function StudentPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (id && typeof id === 'string') {
      // Get student data
      const studentData = mockStudents.find((s) => s.id === id);
      if (studentData) {
        setStudent(studentData);
      }

      // Get assignments for this student
      const studentAssignments = getStudentAssignments(id);
      setAssignments(studentAssignments);

      // Get grades for this student
      const studentGrades = getStudentGrades(id);
      setGrades(studentGrades);
    }
  }, [id]);

  // Check if user has permission to view this student
  if (user && student && !hasPermission(user, 'students', 'view', student)) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="mt-2">You don't have permission to view this student's information.</p>
        </div>
      </div>
    );
  }

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      searchTerm === '' ||
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchTerm.toLowerCase());

    // For status filtering, we would normally filter by a status field
    // Since our mock data doesn't have status, we'll just return true for now
    const matchesStatus = statusFilter === 'all' || true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Student: {student?.firstname} {student?.lastname}
        </h1>
        <p className="text-muted-foreground">View and manage student assignments and grades</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium">Name</p>
              <p className="text-lg">
                {student?.firstname} {student?.lastname}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Class ID</p>
              <p className="text-lg">{student?.classId}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex flex-1 items-center space-x-2">
              <Input
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No assignments found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAssignments.map((assignment) => {
                    // Find grade for this assignment
                    const grade = grades.find((g) => g.assignmentId === assignment.id);

                    return (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">{assignment.title}</TableCell>
                        <TableCell>{format(new Date(assignment.dueDate), 'MMM d, yyyy')}</TableCell>
                        <TableCell>{grade ? `${grade.score}/100` : 'Not graded'}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div
                              className={`h-2.5 w-2.5 rounded-full mr-2 ${
                                grade
                                  ? 'bg-green-500'
                                  : new Date(assignment.dueDate) < new Date()
                                    ? 'bg-red-500'
                                    : 'bg-yellow-500'
                              }`}
                            />
                            {grade
                              ? 'Completed'
                              : new Date(assignment.dueDate) < new Date()
                                ? 'Overdue'
                                : 'Pending'}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            {grade ? 'Update Grade' : 'Add Grade'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
