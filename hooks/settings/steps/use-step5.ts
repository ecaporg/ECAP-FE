"use client";
import { BaseApi } from "@/lib/base-api";
import { apiClientFetch } from "@/lib/client-fetch";
import type {
  ITrack as Track,
  ITrackLearningPeriod as TrackLearningPeriod,
} from "@/types";
import { validationMessages, formatTrackDateWithShortMonth } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useOptimistic,
  useState,
  useTransition,
  Dispatch,
  SetStateAction,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const trackClientApi = new BaseApi<TrackLearningPeriod, undefined>(
  "/track-learning-periods",
  apiClientFetch
);

export type StepTrackLP = TrackLearningPeriod & {
  disabled?: boolean;
};

type UpdateTrackLPType = {
  action: "add" | "edit" | "delete";
  lp: StepTrackLP;
};

const trackLPFormSchema = z
  .object({
    name: z
      .string()
      .min(1, validationMessages.required("Learning Period Name")),
    start_date: z.date({
      message: validationMessages.required("Start Date"),
    }),
    end_date: z.date({
      message: validationMessages.required("End Date"),
    }),
  })
  .refine(
    ({ start_date = new Date(), end_date }) => {
      if (!start_date || !end_date) return true;
      return end_date >= start_date;
    },
    {
      message: "End date must be after start date",
      path: ["end_date"],
    }
  );
type TrackLPForm = z.infer<typeof trackLPFormSchema>;

const trackLPReducer = (
  prev: TrackLearningPeriod[],
  updated: UpdateTrackLPType
) => {
  updated.lp.disabled = true;
  switch (updated.action) {
    case "add":
      return [updated.lp, ...prev];
    case "edit":
    case "delete":
      return prev.map((s) => (s.id === updated.lp.id ? updated.lp : s));
  }
};

export const useStep5Track = (defaultTracks: Track[]) => {
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

const getLearningPeriodName = (track: Track) => {
  return `Learning Period ${track.learningPeriods.length + 1}`;
};

export const getLearningPeriodStartDate = (track: Track) => {
  if (track.learningPeriods.length === 0) {
    return new Date(track.start_date);
  }
  const endDate = new Date(
    track.learningPeriods[track.learningPeriods.length - 1].end_date
  );
  return new Date(endDate.setDate(endDate.getDate() + 1));
};

export const getLearningPeriodEndDate = (track: Track) => {
  const endDate = new Date(track.end_date);
  return new Date(endDate.setDate(endDate.getDate() + 1));
};

const getDefaultValues = (track: Track) => {
  return {
    name: getLearningPeriodName(track),
    start_date: getLearningPeriodStartDate(track),
    end_date: undefined as any,
  };
};

export const useStep5LearningPeriod = (
  track: Track,
  setTrack: Dispatch<SetStateAction<Track>>
) => {
  const [_, startTransition] = useTransition();
  const [optimisticLearningPeriods, setOptimisticLearningPeriods] =
    useOptimistic(track.learningPeriods, trackLPReducer);
  const [learningPeriodToEdit, setLearningPeriodToEdit] =
    useState<TrackLearningPeriod | null>(null);
  const form = useForm<TrackLPForm>({
    resolver: zodResolver(trackLPFormSchema),
    defaultValues: getDefaultValues(track),
  });

  const addTrack = async (lp: TrackLearningPeriod) => {
    try {
      setOptimisticLearningPeriods({ action: "add", lp });

      const res = await trackClientApi.post({
        ...lp,
        track_id: track.id,
      });
      setTrack((prev) => {
        const newLearningPeriods = [...prev.learningPeriods, res.data!];

        const newTrack = {
          ...prev,
          learningPeriods: newLearningPeriods,
        };

        form.reset(getDefaultValues(newTrack));

        return newTrack;
      });

      toast.success("Learning period added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add learning period");
      throw error;
    }
  };

  const editLearningPeriod = async (lp: TrackLearningPeriod) => {
    try {
      setOptimisticLearningPeriods({ action: "edit", lp });

      const res = await trackClientApi.put(lp.id.toString(), lp);
      setTrack((prev) => {
        const newLearningPeriods = prev.learningPeriods.map((s) =>
          s.id === lp.id ? res.data! : s
        );

        const newTrack = {
          ...prev,
          learningPeriods: newLearningPeriods,
        };

        form.reset(getDefaultValues(newTrack));
        return newTrack;
      });

      toast.success("Learning period updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to edit learning period");
      throw error;
    }
  };

  const deleteLearningPeriod = async (lp: TrackLearningPeriod) => {
    try {
      toast.info("Deleting track...");
      setOptimisticLearningPeriods({ action: "delete", lp });

      await trackClientApi.delete(lp.id.toString());
      setTrack((prev) => {
        const newLearningPeriods = prev.learningPeriods.filter(
          (s) => s.id !== lp.id
        );

        const newTrack = {
          ...prev,
          learningPeriods: newLearningPeriods,
        };

        form.reset(getDefaultValues(newTrack));
        return newTrack;
      });
      toast.success("Learning period deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete learning period");
    }
  };

  const onAddClick = (values: TrackLPForm) => {
    form.reset(getDefaultValues(track));
    startTransition(async () => {
      try {
        if (learningPeriodToEdit) {
          toast.info("Updating learning period...");
          await editLearningPeriod({
            ...learningPeriodToEdit,
            ...values,
          });
          setLearningPeriodToEdit(null);
        } else {
          toast.info("Adding learning period...");
          await addTrack({
            ...values,
          } as TrackLearningPeriod);
        }
      } catch (error) {
        form.setValue("name", values.name);
        form.setValue("start_date", values.start_date);
        form.setValue("end_date", values.end_date);
      }
    });
  };

  const onEditClick = (lp: TrackLearningPeriod) => {
    if (learningPeriodToEdit?.id === lp.id) {
      setLearningPeriodToEdit(null);
      form.reset(getDefaultValues(track));
    } else {
      setLearningPeriodToEdit(lp);
      form.setValue("name", lp.name);
      form.setValue("start_date", new Date(lp.start_date));
      form.setValue("end_date", new Date(lp.end_date));
    }
  };

  const onDeleteClick = (lp: TrackLearningPeriod) => {
    startTransition(async () => {
      await deleteLearningPeriod(lp);
    });
  };

  return {
    learningPeriods: optimisticLearningPeriods,
    onAddClick,
    onEditClick,
    onDeleteClick,
    form,
    editingLearningPeriodId: learningPeriodToEdit?.id,
    track,
  };
};
