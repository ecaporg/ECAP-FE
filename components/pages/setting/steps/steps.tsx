"use client";

import {
  Academy,
  School,
  Track,
  TrackCalendar,
  TrackLearningPeriod,
} from "@/types";
import { Actions, InputWithButton } from "./form";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./table";
import { StepSchool, useStep1 } from "@/hooks/settings/steps/use-step1";
import { Dispatch, SetStateAction, useState } from "react";
import { StepAcademy, useStep2 } from "@/hooks/settings/steps/use-step2";
import { StepTrack, useStep3 } from "@/hooks/settings/steps/use-step3";
import { formatTrackDateWithShortMonth } from "@/utils";
import { useWatch } from "react-hook-form";
import {
  SetupCalendarButton,
  SetupLearningPeriodButton,
  TrackCard,
} from "./track-card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import {
  TrackCalendarWrapper,
  CalendarForTrack,
  CalendarButtons,
} from "./track-calendar";
import { useStep4 } from "@/hooks/settings/steps/use-step4";
import { ConfirmationModal } from "@/components/modals";
import {
  StepTrackLP,
  useStep5Track,
  useStep5LearningPeriod,
} from "@/hooks/settings/steps/use-step5";
export const Step1 = ({
  schools: schoolsFromProps = [],
}: {
  schools: School[];
}) => {
  const [_schools, setSchools] = useState<School[]>(schoolsFromProps);
  const {
    onAddClick,
    onEditClick,
    onDeleteClick,
    form,
    editingSchoolId,
    schools,
  } = useStep1(_schools, setSchools);

  return (
    <>
      <InputWithButton
        fields={[
          {
            label: { htmlFor: "school-name", children: "School Name" },
            input: {
              id: "school-name",
              ...form.register("name"),
            },
          },
        ]}
        button={{
          children: editingSchoolId ? "Update School Name" : "Add School",
          disabled: form.formState.isSubmitting || !form.formState.isValid,
        }}
        onSubmit={form.handleSubmit(onAddClick)}
        className="w-80"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>School</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schools.map((school) => (
            <TableRow
              key={school.id || "new-school"}
              className={
                (school as StepSchool).disabled
                  ? "opacity-50 pointer-events-none"
                  : ""
              }
            >
              <TableCell className="text-truncate max-w-80">
                {school.name}
              </TableCell>
              <TableCell>
                <Actions
                  edit={{ onClick: () => onEditClick(school) }}
                  deletе={{ onClick: () => onDeleteClick(school) }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export const Step2 = ({
  academies: academiesFromProps = [],
}: {
  academies: Academy[];
}) => {
  const [_academies, setAcademies] = useState<Academy[]>(academiesFromProps);
  const {
    onAddClick,
    onEditClick,
    onDeleteClick,
    form,
    editingAcademyId,
    academies,
  } = useStep2(_academies, setAcademies);

  return (
    <>
      <InputWithButton
        fields={[
          {
            label: { htmlFor: "academy-name", children: "Add Academies" },
            input: {
              id: "academy-name",
              ...form.register("name"),
            },
          },
        ]}
        button={{
          children: editingAcademyId ? "Update Academy Name" : "Add Academy",
          disabled: form.formState.isSubmitting || !form.formState.isValid,
        }}
        onSubmit={form.handleSubmit(onAddClick)}
        className="w-80"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Academy</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {academies.map((academy) => (
            <TableRow
              key={academy.id || "new-academy"}
              className={
                (academy as StepAcademy).disabled
                  ? "opacity-50 pointer-events-none"
                  : ""
              }
            >
              <TableCell className="text-truncate max-w-80">
                {academy.name}
              </TableCell>
              <TableCell>
                <Actions
                  edit={{ onClick: () => onEditClick(academy) }}
                  deletе={{ onClick: () => onDeleteClick(academy) }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export const Step3 = ({
  tracks: tracksFromProps = [],
}: {
  tracks: Track[];
}) => {
  const [_tracks, setTracks] = useState<Track[]>(tracksFromProps);
  const {
    onAddClick,
    onEditClick,
    onDeleteClick,
    form,
    editingTrackId,
    tracks,
  } = useStep3(_tracks, setTracks);

  const start_date = useWatch({ control: form.control, name: "start_date" });
  const end_date = useWatch({ control: form.control, name: "end_date" });

  return (
    <>
      <InputWithButton
        fields={[
          {
            label: { htmlFor: "track-name", children: "Track Name" },
            input: {
              id: "track-name",
              ...form.register("name"),
            },
            error: form.formState.errors.name?.message,
          },
          {
            label: { htmlFor: "track-start-date", children: "Start Date" },
            input: {
              id: "track-start-date",
              type: "date",
              className: "hidden",
              ...form.register("start_date"),
              min: new Date().toISOString(),
              value: start_date as any,
            },
            error: form.formState.errors.start_date?.message,
          },
          {
            label: { htmlFor: "track-end-date", children: "End Date" },
            input: {
              id: "track-end-date",
              type: "date",
              className: "hidden",
              ...form.register("end_date"),
              min: start_date
                ? start_date.toISOString()
                : new Date().toISOString(),
              value: end_date as any,
            },
            error: form.formState.errors.end_date?.message,
          },
        ]}
        button={{
          children: editingTrackId ? "Update Track Name" : "Add Track",
          disabled: form.formState.isSubmitting || !form.formState.isValid,
        }}
        onSubmit={form.handleSubmit(onAddClick)}
        className="w-80"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Track</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracks.map((track) => (
            <TableRow
              key={track.id || "new-track"}
              className={
                (track as StepTrack).disabled
                  ? "opacity-50 pointer-events-none"
                  : ""
              }
            >
              <TableCell className="text-truncate max-w-80">
                {track.name}
              </TableCell>
              <TableCell>
                {formatTrackDateWithShortMonth(track.start_date)}
              </TableCell>
              <TableCell>
                {formatTrackDateWithShortMonth(track.end_date)}
              </TableCell>
              <TableCell>
                <Actions
                  edit={{ onClick: () => onEditClick(track) }}
                  deletе={{ onClick: () => onDeleteClick(track) }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export const Step4 = ({
  calendars: defaultCalendars = [],
}: {
  calendars: TrackCalendar[];
}) => {
  const {
    selectedCalendar,
    handleSelectCalendar,
    handleBackToTracks,
    selectedDateRange,
    dayMap,
    assignDayType,
    onSave,
    onSelectDateRange,
    isOpenConfirmation,
    setIsOpenConfirmation,
    isDirty,
    calendars,
  } = useStep4(defaultCalendars);

  if (selectedCalendar) {
    return (
      <>
        <Button
          variant="outline"
          onClick={() => {
            if (isDirty) {
              setIsOpenConfirmation(true);
            } else {
              handleBackToTracks();
            }
          }}
          className="absolute -top-10 lg:top-10 lg:left-11 left-1"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Tracks
        </Button>
        <TrackCalendarWrapper track={selectedCalendar.track}>
          <CalendarForTrack
            calendar={selectedCalendar}
            selectedDateRange={selectedDateRange}
            onSelectDateRange={onSelectDateRange}
            dayMap={dayMap!}
          />
          <CalendarButtons onSave={onSave} assignDayType={assignDayType} />
        </TrackCalendarWrapper>
        <ConfirmationModal
          title="Are you sure you want to back to tracks? You will lose all changes."
          action={async () => {
            handleBackToTracks();
            setIsOpenConfirmation(false);
          }}
          open={isOpenConfirmation}
          onOpenChange={setIsOpenConfirmation}
        />
      </>
    );
  }

  return calendars.map((calendar) => (
    <TrackCard
      key={calendar.id}
      track={calendar.track}
      isCompleted={calendar.days.length > 0}
    >
      <SetupCalendarButton
        onClick={handleSelectCalendar(calendar)}
        isCompleted={calendar.days.length > 0}
      />
    </TrackCard>
  ));
};

export const Step5 = ({ tracks: defaultTracks = [] }: { tracks: Track[] }) => {
  const {
    tracks,
    handleSelectTrack,
    selectedTrack,
    setTracks,
    setSelectedTrack,
    handleBackToTracks,
  } = useStep5Track(defaultTracks);

  if (selectedTrack) {
    return (
      <>
        <Button
          variant="outline"
          onClick={handleBackToTracks}
          className=""
        >
          <ArrowLeftIcon className="size-4" />
          Back to Tracks
        </Button>
        <Step5LearningPeriod
          track={selectedTrack}
          setTrack={(fn: any) => {
            setSelectedTrack(fn);
            setTracks((prev) =>
              prev.map((track) =>
                track.id === selectedTrack.id ? fn?.(track) ?? fn : track
              )
            );
          }}
        />
      </>
    );
  }

  return (
    <div className="flex justify-center items-center gap-x-[7.5rem] flex-wrap gap-y-4 border border-border py-5 flex-1 h-full relative">
      {tracks.map((track) => (
        <TrackCard
          key={track.id}
          track={track}
          isCompleted={track.learningPeriods.length > 0}
        >
          <SetupLearningPeriodButton
            onClick={handleSelectTrack(track)}
            isCompleted={track.learningPeriods.length > 0}
          />
        </TrackCard>
      ))}
    </div>
  );
};

const Step5LearningPeriod = ({
  track,
  setTrack,
}: {
  track: Track;
  setTrack: Dispatch<SetStateAction<Track>>;
}) => {
  const {
    onAddClick,
    onEditClick,
    onDeleteClick,
    form,
    learningPeriods,
    editingLearningPeriodId,
  } = useStep5LearningPeriod(track, setTrack);
  const start_date = useWatch({ control: form.control, name: "start_date" });
  const end_date = useWatch({ control: form.control, name: "end_date" });

  return (
    <>
      <InputWithButton
        fields={[
          {
            label: {
              htmlFor: "learning-period-name",
              children: "Learning Period",
            },
            input: {
              id: "learning-period-name",
              ...form.register("name"),
            },
            error: form.formState.errors.name?.message,
          },
          {
            label: { htmlFor: "track-start-date", children: "Start Date" },
            input: {
              id: "learning-period-start-date",
              type: "date",
              className: "hidden",
              ...form.register("start_date"),
              min: new Date().toISOString(),
              value: start_date as any,
            },
            error: form.formState.errors.start_date?.message,
          },
          {
            label: { htmlFor: "track-end-date", children: "End Date" },
            input: {
              id: "learning-period-end-date",
              type: "date",
              className: "hidden",
              ...form.register("end_date"),
              min: start_date
                ? start_date.toISOString()
                : new Date().toISOString(),
              value: end_date as any,
            },
            error: form.formState.errors.end_date?.message,
          },
        ]}
        button={{
          children: editingLearningPeriodId
            ? "Update Learning Period"
            : "Add Learning Period",
          disabled: form.formState.isSubmitting || !form.formState.isValid,
        }}
        onSubmit={form.handleSubmit(onAddClick)}
        className="w-80"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Learning Period</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {learningPeriods.map((learningPeriod) => (
            <TableRow
              key={learningPeriod.id || "new-learning-period"}
              className={
                (learningPeriod as StepTrackLP).disabled
                  ? "opacity-50 pointer-events-none"
                  : ""
              }
            >
              <TableCell className="text-truncate max-w-80">
                {learningPeriod.name}
              </TableCell>
              <TableCell>
                {formatTrackDateWithShortMonth(learningPeriod.start_date)}
              </TableCell>
              <TableCell>
                {formatTrackDateWithShortMonth(learningPeriod.end_date)}
              </TableCell>
              <TableCell>
                <Actions
                  edit={{ onClick: () => onEditClick(learningPeriod) }}
                  deletе={{ onClick: () => onDeleteClick(learningPeriod) }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
