import { Subject, Track, TrackLearningPeriod } from './track';
import { Academy, School } from './school';
import { User } from './user';
import { Teacher } from './staff';

export type Student = {
  school_id: number;

  user_id: number;

  academy_id: number;

  track_id: number;

  grade: string;

  school: School;

  user: User;

  academy: Academy;

  samples: Sample[];

  track: Track;
};

export type Sample = {
  student_id: number;

  subject_id: number;

  teacher_id: number;

  assignment_title: string;

  status: string;

  learning_period_id: number;

  student: Student;

  subject: Subject;

  teacher: Teacher;

  learningPeriod: TrackLearningPeriod;
};
