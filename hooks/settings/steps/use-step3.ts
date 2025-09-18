'use client';
import { BaseApi } from '@/lib/base-api';
import { apiClientFetch } from '@/lib/client-fetch';
import type { ITrack as Track } from '@/types';
import { formatTrackDateWithShortMonth, validationMessages } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOptimistic, useState, useTransition, Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const trackClientApi = new BaseApi<Track, undefined>('/tracks', apiClientFetch);

export type StepTrack = Track & {
  disabled?: boolean;
};

type UpdateTrackType = {
  action: 'add' | 'edit' | 'delete';
  track: StepTrack;
};

const trackFormSchema = z
  .object({
    name: z.string().min(1, validationMessages.required('Track Name')),
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
type TrackForm = z.infer<typeof trackFormSchema>;

const tracksReducer = (prev: Track[], updated: UpdateTrackType) => {
  updated.track.disabled = true;
  switch (updated.action) {
    case 'add':
      return [updated.track, ...prev];
    case 'edit':
    case 'delete':
      return prev.map((s) => (s.id === updated.track.id ? updated.track : s));
  }
};

export const useStep3 = (tracks: Track[] = [], setTracks: Dispatch<SetStateAction<Track[]>>) => {
  const [_, startTransition] = useTransition();
  const [optimisticTracks, setOptimisticTracks] = useOptimistic(tracks, tracksReducer);
  const [trackToEdit, setTrackToEdit] = useState<Track | null>(null);
  const form = useForm<TrackForm>({
    resolver: zodResolver(trackFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      start_date: undefined,
      end_date: undefined,
    },
  });

  const addTrack = async (track: Track) => {
    try {
      setOptimisticTracks({ action: 'add', track });

      const res = await trackClientApi.post(track);
      setTracks((prev) => [res.data!, ...prev]);

      toast.success('Track added successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add track');
      throw error;
    }
  };

  const editTrack = async (track: Track) => {
    try {
      setOptimisticTracks({ action: 'edit', track });

      const res = await trackClientApi.put(track.id.toString(), track);
      setTracks((prev) => prev.map((s) => (s.id === track.id ? res.data! : s)));

      toast.success('Track updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to edit track');
      throw error;
    }
  };

  const deleteTrack = async (track: Track) => {
    try {
      toast.info('Deleting track...');
      setOptimisticTracks({ action: 'delete', track });

      await trackClientApi.delete(track.id.toString());
      setTracks((prev) => prev.filter((s) => s.id !== track.id));

      toast.success('Track deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete track');
    }
  };

  const onAddClick = (values: TrackForm) => {
    form.reset();
    startTransition(async () => {
      try {
        if (trackToEdit) {
          toast.info('Updating track...');
          await editTrack({
            ...trackToEdit,
            ...values,
          });
          setTrackToEdit(null);
        } else {
          toast.info('Adding track...');
          await addTrack({
            ...values,
          } as Track);
        }
      } catch (error) {
        form.setValue('name', values.name);
        form.setValue('start_date', values.start_date);
        form.setValue('end_date', values.end_date);
      }
    });
  };

  const onEditClick = (track: Track) => {
    if (trackToEdit?.id === track.id) {
      setTrackToEdit(null);
      form.reset();
    } else {
      setTrackToEdit(track);
      form.setValue('name', track.name);
      form.setValue('start_date', new Date(track.start_date));
      form.setValue('end_date', new Date(track.end_date));
    }
  };

  const onDeleteClick = (track: Track) => {
    startTransition(async () => {
      await deleteTrack(track);
    });
  };

  return {
    tracks: optimisticTracks,
    onAddClick,
    onEditClick,
    onDeleteClick,
    form,
    editingTrackId: trackToEdit?.id,
  };
};
