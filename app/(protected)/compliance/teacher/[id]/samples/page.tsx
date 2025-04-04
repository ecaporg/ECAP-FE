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
import { useAuth } from '@/providers/auth';
import { hasPermission } from '@/lib/permissions';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from '@/types';

export default function TeacherSamplesPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [teacher, setTeacher] = useState<User | null>(null);
  const [samples, setSamples] = useState<Assignment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    if (id && typeof id === 'string') {
      // Get teacher data
      const teacherData = mockUsers.find((u) => u.id === id);
      if (teacherData) {
        setTeacher(teacherData);
      }

      // Get samples (assignments) for this teacher
      const teacherSamples = getTeacherSamples(id);
      setSamples(teacherSamples);
    }
  }, [id]);

  // Check if user has permission to view this teacher's data
  if (user && teacher && !hasPermission(user, 'users', 'view', teacher)) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="mt-2">You don't have permission to view this teacher's information.</p>
        </div>
      </div>
    );
  }

  const filteredSamples = samples.filter((sample) => {
    const matchesSearch =
      searchTerm === '' ||
      sample.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.description.toLowerCase().includes(searchTerm.toLowerCase());

    // For type filtering, we would normally filter by a type field
    // Since our mock data doesn't have type, we'll just return true for now
    const matchesType = typeFilter === 'all' || true;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Teacher: {teacher?.firstname} {teacher?.lastname}
        </h1>
        <p className="text-muted-foreground">Review teacher's assignments and compliance</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teacher Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium">Name</p>
              <p className="text-lg">
                {teacher?.firstname} {teacher?.lastname}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-lg">{teacher?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Samples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex flex-1 items-center space-x-2">
              <Input
                placeholder="Search samples..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="homework">Homework</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSamples.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No samples found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSamples.map((sample) => (
                    <TableRow key={sample.id}>
                      <TableCell className="font-medium">{sample.title}</TableCell>
                      <TableCell>Class {sample.classId}</TableCell>
                      <TableCell>{format(new Date(sample.createdAt), 'MMM d, yyyy')}</TableCell>
                      <TableCell>{format(new Date(sample.dueDate), 'MMM d, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
