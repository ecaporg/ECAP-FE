'use client';
import { BaseApi } from '@/lib/base-api';
import { apiClientFetch } from '@/lib/client-fetch';
import { Semester } from '@/types';
import { Track, TrackLearningPeriod } from '@/types/track';
import { validationMessages, formatTrackDateWithShortMonth } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOptimistic, useState, useTransition, Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const semesterClientApi = new BaseApi<Semester, undefined>(
  '/track-semesters',
  apiClientFetch
);

export type StepSemester = Semester & {
  disabled?: boolean;
};

type UpdateSemesterType = {
  action: 'add' | 'edit' | 'delete';
  semester: StepSemester;
};

const semesterFormSchema = z
  .object({
    name: z.string().min(1, validationMessages.required('Semester Name')),
    start_date: z.date({
      message: validationMessages.required('Start Date'),
    }),
    end_date: z.date({
      message: validationMessages.required('End Date'),
    }),
  })
  .refine(
    ({ start_date = new Date(), end_date }) => {
      if (!start_date || !end_date) return true;
      return end_date >= start_date;
    },
    {
      message: 'End date must be after start date',
      path: ['end_date'],
    }
  );
type SemesterForm = z.infer<typeof semesterFormSchema>;

const semesterReducer = (prev: Semester[], updated: UpdateSemesterType) => {
  updated.semester.disabled = true;
  switch (updated.action) {
    case 'add':
      return [updated.semester, ...prev];
    case 'edit':
    case 'delete':
      return prev.map((s) => (s.id === updated.semester.id ? updated.semester : s));
  }
};

export const useStep6Track = (defaultTracks: Track[]) => {
  const [tracks, setTracks] = useState<Track[]>(defaultTracks);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const handleSelectTrack = (track: Track) => () => {
    setSelectedTrack(track);
  };

  const handleBackToTracks = () => {
    setSelectedTrack(null);
  };

  return {
    tracks,
    handleSelectTrack,
    handleBackToTracks,
    selectedTrack,
    setTracks,
    setSelectedTrack,
  };
};

const getSemesterName = (track: Track) => {
  return `Semester ${track.semesters.length + 1}`;
};

export const getSemesterStartDate = (track: Track) => {
  if (track.semesters.length === 0) {
    return new Date(track.start_date);
  }
  const endDate = new Date(track.semesters[track.semesters.length - 1].end_date);
  return new Date(endDate.setDate(endDate.getDate() + 1));
};

export const getSemesterEndDate = (track: Track) => {
  const endDate = new Date(track.end_date);
  return new Date(endDate.setDate(endDate.getDate() + 1));
};

const getDefaultValues = (track: Track) => {
  return {
    name: getSemesterName(track),
    start_date: getSemesterStartDate(track),
    end_date: undefined as any,
  };
};

export const useStep6Semesters = (track: Track, setTrack: Dispatch<SetStateAction<Track>>) => {
  const [_, startTransition] = useTransition();
  const [optimisticSemesters, setOptimisticSemesters] = useOptimistic(
    track.semesters,
    semesterReducer
  );
  const [semesterToEdit, setSemesterToEdit] = useState<Semester | null>(null);
  const form = useForm<SemesterForm>({
    resolver: zodResolver(semesterFormSchema),
    defaultValues: getDefaultValues(track),
  });

  const addSemester = async (semester: Semester) => {
    try {
      setOptimisticSemesters({ action: 'add', semester });

      const res = await semesterClientApi.post({
        ...semester,
        track_id: track.id,
      });
      setTrack((prev) => {
        const newSemesters = [...prev.semesters, res.data!];

        const newTrack = {
          ...prev,
          semesters: newSemesters,
        };

        form.reset(getDefaultValues(newTrack));

        return newTrack;
      });

      toast.success('Semester added successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add semester');
      throw error;
    }
  };

  const editSemester = async (semester: Semester) => {
    try {
      setOptimisticSemesters({ action: 'edit', semester });

      const res = await semesterClientApi.put(semester.id.toString(), semester);
      setTrack((prev) => {
        const newSemesters = prev.semesters.map((s) =>
          s.id === semester.id ? res.data! : s
        );

        const newTrack = {
          ...prev,
          semesters: newSemesters,
        };

        form.reset(getDefaultValues(newTrack));
        return newTrack;
      });

      toast.success('Semester updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to edit semester');
      throw error;
    }
  };

  const deleteSemester = async (semester: Semester) => {
    try {
      toast.info('Deleting semester...');
      setOptimisticSemesters({ action: 'delete', semester });

      await semesterClientApi.delete(semester.id.toString());
      setTrack((prev) => {
        const newSemesters = prev.semesters.filter((s) => s.id !== semester.id);

        const newTrack = {
          ...prev,
          semesters: newSemesters,
        };

        form.reset(getDefaultValues(newTrack));
        return newTrack;
      });
      toast.success('Semester deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete semester');
    }
  };

  const onAddClick = (values: SemesterForm) => {
    form.reset(getDefaultValues(track));
    startTransition(async () => {
      try {
        if (semesterToEdit) {
          toast.info('Updating semester...');
          await editSemester({
            ...semesterToEdit,
            ...values,
          });
          setSemesterToEdit(null);
        } else {
          toast.info('Adding semester...');
          await addSemester({
            ...values,
          } as Semester);
        }
      } catch (error) {
        form.setValue('name', values.name);
        form.setValue('start_date', values.start_date);
        form.setValue('end_date', values.end_date);
      }
    });
  };

  const onEditClick = (semester: Semester) => {
    if (semesterToEdit?.id === semester.id) {
      setSemesterToEdit(null);
      form.reset(getDefaultValues(track));
    } else {
      setSemesterToEdit(semester);
      form.setValue('name', semester.name);
      form.setValue('start_date', new Date(semester.start_date));
      form.setValue('end_date', new Date(semester.end_date));
    }
  };

  const onDeleteClick = (semester: Semester) => {
    startTransition(async () => {
      await deleteSemester(semester);
    });
  };

  return {
    semesters: optimisticSemesters,
    onAddClick,
    onEditClick,
    onDeleteClick,
    form,
    editingSemesterId: semesterToEdit?.id,
    track,
  };
};
