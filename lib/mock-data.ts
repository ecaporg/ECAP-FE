import type { Assignment, Class, Grade, Student, User } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@school.com',
    firstname: 'Admin',
    lastname: 'User',
    roles: ['admin'],
    blockedBy: [],
  },
  {
    id: '2',
    email: 'superadmin@school.com',
    firstname: 'Super',
    lastname: 'Admin',
    roles: ['superadmin'],
    blockedBy: [],
  },
  {
    id: '3',
    email: 'director@school.com',
    firstname: 'Director',
    lastname: 'User',
    roles: ['director'],
    blockedBy: [],
  },
  {
    id: '4',
    email: 'teacher1@school.com',
    firstname: 'Teacher',
    lastname: 'One',
    roles: ['teacher'],
    blockedBy: [],
  },
  {
    id: '5',
    email: 'teacher2@school.com',
    firstname: 'Teacher',
    lastname: 'Two',
    roles: ['teacher'],
    blockedBy: [],
  },
];

// Mock Classes
export const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Mathematics 101',
    teacherId: '4',
    studentIds: ['1', '2', '3', '4', '5'],
  },
  {
    id: '2',
    name: 'Physics 101',
    teacherId: '4',
    studentIds: ['1', '3', '5', '7', '9'],
  },
  {
    id: '3',
    name: 'Chemistry 101',
    teacherId: '5',
    studentIds: ['2', '4', '6', '8', '10'],
  },
  {
    id: '4',
    name: 'Biology 101',
    teacherId: '5',
    studentIds: ['1', '4', '7', '10'],
  },
];

// Mock Students
export const mockStudents: Student[] = Array.from({ length: 20 }, (_, i) => ({
  id: (i + 1).toString(),
  firstname: `Student${i + 1}`,
  lastname: `Lastname${i + 1}`,
  classId: mockClasses[i % mockClasses.length].id,
}));

// Mock Assignments
export const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Math Homework 1',
    description: 'Complete exercises 1-10 on page 25',
    dueDate: new Date(2023, 5, 15),
    teacherId: '4',
    classId: '1',
    createdAt: new Date(2023, 5, 1),
  },
  {
    id: '2',
    title: 'Physics Lab Report',
    description: 'Write a report on the pendulum experiment',
    dueDate: new Date(2023, 5, 20),
    teacherId: '4',
    classId: '2',
    createdAt: new Date(2023, 5, 5),
  },
  {
    id: '3',
    title: 'Chemistry Quiz Preparation',
    description: 'Study chapters 3-5 for the upcoming quiz',
    dueDate: new Date(2023, 5, 18),
    teacherId: '5',
    classId: '3',
    createdAt: new Date(2023, 5, 8),
  },
  {
    id: '4',
    title: 'Biology Research Paper',
    description: 'Write a 5-page paper on cell division',
    dueDate: new Date(2023, 5, 25),
    teacherId: '5',
    classId: '4',
    createdAt: new Date(2023, 5, 10),
  },
];

// Mock Grades
export const mockGrades: Grade[] = [];

// Generate some mock grades for each student and assignment
mockStudents.forEach((student) => {
  mockAssignments
    .filter((assignment) => assignment.classId === student.classId)
    .forEach((assignment) => {
      mockGrades.push({
        id: uuidv4(),
        studentId: student.id,
        assignmentId: assignment.id,
        score: Math.floor(Math.random() * 41) + 60, // Random score between 60-100
        teacherId: assignment.teacherId,
        createdAt: new Date(),
      });
    });
});

// Authentication mock functions
export async function mockSignIn(email: string, password: string) {
  // In a real app, you would validate credentials against a backend
  const user = mockUsers.find((u) => u.email === email);

  if (user && password === 'password') {
    // Simple mock password check
    return {
      accessToken: `mock-access-token-${user.id}`,
      refreshToken: `mock-refresh-token-${user.id}`,
      user,
    };
  }

  throw new Error('Invalid credentials');
}

// Mock function to get user by token
export async function getUserFromToken(token: string) {
  const userId = token.split('-').pop();
  return mockUsers.find((u) => u.id === userId);
}

// Mock function to get data based on user role
export function getComplianceData(user: User) {
  if (user.roles.includes('teacher')) {
    // Teachers see students in their classes
    const teacherClasses = mockClasses.filter((c) => c.teacherId === user.id);
    const studentIds = teacherClasses.flatMap((c) => c.studentIds);
    return mockStudents.filter((s) => studentIds.includes(s.id));
  } else {
    // Admins, directors, and superadmins see teachers
    return mockUsers.filter((u) => u.roles.includes('teacher'));
  }
}

// Get student assignments
export function getStudentAssignments(studentId: string) {
  const student = mockStudents.find((s) => s.id === studentId);
  if (!student) return [];

  return mockAssignments.filter((a) => a.classId === student.classId);
}

// Get teacher samples (assignments created by teacher)
export function getTeacherSamples(teacherId: string) {
  return mockAssignments.filter((a) => a.teacherId === teacherId);
}

// Get student grades
export function getStudentGrades(studentId: string) {
  return mockGrades.filter((g) => g.studentId === studentId);
}
