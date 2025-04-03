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
import { getComplianceData } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CompliancePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (user) {
      const complianceData = getComplianceData(user);
      setData(complianceData);
    }
  }, [user]);

  const handleRowClick = (id: string) => {
    if (user?.roles.includes('teacher')) {
      router.push(`/compliance/student/${id}`);
    } else {
      router.push(`/compliance/teacher/${id}/samples`);
    }
  };

  const filteredData = data.filter((item) => {
    const matchesSearch =
      searchTerm === '' ||
      item.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastname.toLowerCase().includes(searchTerm.toLowerCase());

    // For status filtering, we would normally filter by a status field
    // Since our mock data doesn't have status, we'll just return true for now
    const matchesStatus = statusFilter === 'all' || true;

    return matchesSearch && matchesStatus;
  });

  const isTeacher = user?.roles.includes('teacher');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Compliance Tasks</h1>
        <p className="text-muted-foreground">
          {isTeacher
            ? 'Manage your students and their assignments'
            : 'Monitor teacher compliance and review samples'}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isTeacher ? 'Student Management' : 'Teacher Management'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex flex-1 items-center space-x-2">
              <Input
                placeholder="Search..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  {isTeacher ? (
                    <>
                      <TableHead>Class</TableHead>
                      <TableHead>Assignments</TableHead>
                    </>
                  ) : (
                    <>
                      <TableHead>Email</TableHead>
                      <TableHead>Classes</TableHead>
                    </>
                  )}
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => (
                    <TableRow
                      key={item.id}
                      className="cursor-pointer"
                      onClick={() => handleRowClick(item.id)}
                    >
                      <TableCell>
                        {item.firstname} {item.lastname}
                      </TableCell>
                      {isTeacher ? (
                        <>
                          <TableCell>
                            {/* In a real app, we would fetch the class name */}
                            Class {item.classId}
                          </TableCell>
                          <TableCell>
                            {/* In a real app, we would count assignments */}
                            {Math.floor(Math.random() * 5) + 1}
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>
                            {/* In a real app, we would count classes */}
                            {Math.floor(Math.random() * 3) + 1}
                          </TableCell>
                        </>
                      )}
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />
                          Active
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
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
