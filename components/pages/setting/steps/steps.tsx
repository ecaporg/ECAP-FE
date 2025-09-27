'use client';

import { ConfirmationModal } from '@/components/modals';
import { type StepSchool, useStep1 } from '@/hooks/settings/steps/use-step1';
import { type StepAcademy, useStep2 } from '@/hooks/settings/steps/use-step2';
import { type StepTrack, useStep3 } from '@/hooks/settings/steps/use-step3';
import { useStep4 } from '@/hooks/settings/steps/use-step4';
import {
  type StepTrackLP,
  getLearningPeriodEndDate,
  getLearningPeriodStartDate,
  useStep5LearningPeriod,
  useStep5Track,
} from '@/hooks/settings/steps/use-step5';
import {
  type StepSemester,
  getSemesterEndDate,
  getSemesterStartDate,
  useStep6Semesters,
  useStep6Track,
} from '@/hooks/settings/steps/use-step6';
import type { IAcademy, ISchool, ITrack, ITrackCalendar } from '@/types';
import { cn, formatTrackDateWithShortMonth } from '@/utils';
import { ArrowLeftIcon } from 'lucide-react';
import { type Dispatch, type SetStateAction, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { Actions, InputWithButton, NextButton, type NextButtonProps } from './form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { CalendarButtons, CalendarForTrack, TrackCalendarWrapper } from './track-calendar';
import {
  SetupCalendarButton,
  SetupLearningPeriodButton,
  SetupSemesterButton,
  TrackCard,
} from './track-card';

const DefaultWrapper = ({
  children,
  className,
  isLastStep = false,
  isNextAllowed = false,
  currentStep = 0,
  backButton,
  withBorder = false,
}: React.PropsWithChildren<
  {
    className?: string;
    withBorder?: boolean;
  } & NextButtonProps
>) => {
  return (
    <>
      <div
        className={cn(
          'flex size-full flex-1 flex-wrap items-center justify-center gap-x-[7.5rem] gap-y-4 py-10',
          className
        )}
      >
        {withBorder && (
          <div className="relative flex h-full flex-1 flex-wrap items-center justify-center gap-x-[7.5rem] gap-y-4 border border-border py-5">
            {children}
          </div>
        )}
        {!withBorder && children}
      </div>
      <NextButton
        currentStep={currentStep}
        isNextAllowed={isNextAllowed}
        isLastStep={isLastStep}
        backButton={backButton}
      />
    </>
  );
};

export const Step1 = ({
  schools: schoolsFromProps = [],
}: {
  schools: ISchool[];
}) => {
  const [_schools, setSchools] = useState<ISchool[]>(schoolsFromProps);
  const { onAddClick, onEditClick, onDeleteClick, form, editingSchoolId, schools } = useStep1(
    _schools,
    setSchools
  );

  return (
    <DefaultWrapper isNextAllowed={schools.length > 0} currentStep={0}>
      <InputWithButton
        fields={[
          {
            label: { htmlFor: 'school-name', children: 'School Name' },
            input: {
              id: 'school-name',
              ...form.register('name'),
            },
          },
        ]}
        button={{
          children: editingSchoolId ? 'Update School Name' : 'Add School',
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
              key={school.id || 'new-school'}
              className={(school as StepSchool).disabled ? 'pointer-events-none opacity-50' : ''}
            >
              <TableCell className="max-w-80 text-truncate">{school.name}</TableCell>
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
    </DefaultWrapper>
  );
};

export const Step2 = ({
  academies: academiesFromProps = [],
}: {
  academies: IAcademy[];
}) => {
  const [_academies, setAcademies] = useState<IAcademy[]>(academiesFromProps);
  const { onAddClick, onEditClick, onDeleteClick, form, editingAcademyId, academies } = useStep2(
    _academies,
    setAcademies
  );

  return (
    <DefaultWrapper isNextAllowed={academies.length > 0} currentStep={1}>
      <InputWithButton
        fields={[
          {
            label: { htmlFor: 'academy-name', children: 'Add Academies' },
            input: {
              id: 'academy-name',
              ...form.register('name'),
            },
          },
        ]}
        button={{
          children: editingAcademyId ? 'Update Academy Name' : 'Add Academy',
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
              key={academy.id || 'new-academy'}
              className={(academy as StepAcademy).disabled ? 'pointer-events-none opacity-50' : ''}
            >
              <TableCell className="max-w-80 text-truncate">{academy.name}</TableCell>
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
    </DefaultWrapper>
  );
};

export const Step3 = ({
  tracks: tracksFromProps = [],
}: {
  tracks: ITrack[];
}) => {
  const [_tracks, setTracks] = useState<ITrack[]>(tracksFromProps);
  const { onAddClick, onEditClick, onDeleteClick, form, editingTrackId, tracks } = useStep3(
    _tracks,
    setTracks
  );

  const start_date = useWatch({ control: form.control, name: 'start_date' });
  const end_date = useWatch({ control: form.control, name: 'end_date' });

  return (
    <DefaultWrapper isNextAllowed={tracks.length > 0} currentStep={2}>
      <InputWithButton
        fields={[
          {
            label: { htmlFor: 'track-name', children: 'Track Name' },
            input: {
              id: 'track-name',
              ...form.register('name'),
            },
            error: form.formState.errors.name?.message,
          },
          {
            label: { htmlFor: 'track-start-date', children: 'Start Date' },
            input: {
              id: 'track-start-date',
              type: 'date',
              className: 'hidden',
              ...form.register('start_date'),
              value: start_date as any,
            },
            error: form.formState.errors.start_date?.message,
          },
          {
            label: { htmlFor: 'track-end-date', children: 'End Date' },
            input: {
              id: 'track-end-date',
              type: 'date',
              className: 'hidden',
              ...form.register('end_date'),
              min: start_date ? start_date.toISOString() : undefined,
              value: end_date as any,
            },
            error: form.formState.errors.end_date?.message,
          },
        ]}
        button={{
          children: editingTrackId ? 'Update Track Name' : 'Add Track',
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
              key={track.id || 'new-track'}
              className={(track as StepTrack).disabled ? 'pointer-events-none opacity-50' : ''}
            >
              <TableCell className="max-w-80 text-truncate">{track.name}</TableCell>
              <TableCell>{formatTrackDateWithShortMonth(track.start_date)}</TableCell>
              <TableCell>{formatTrackDateWithShortMonth(track.end_date)}</TableCell>
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
    </DefaultWrapper>
  );
};

export const Step4 = ({
  calendars: defaultCalendars = [],
}: {
  calendars: ITrackCalendar[];
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
      <DefaultWrapper
        isNextAllowed={calendars.every((calendar) => calendar.days.length > 0)}
        currentStep={3}
        withBorder
        backButton={{
          className: 'lg:absolute lg:left-7 lg:top-20',
          variant: 'outline',
          onClick: () => {
            if (isDirty) {
              setIsOpenConfirmation(true);
            } else {
              handleBackToTracks();
            }
          },
          children: (
            <>
              <ArrowLeftIcon className="size-4" />
              Back to Tracks
            </>
          ),
        }}
      >
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
      </DefaultWrapper>
    );
  }

  return (
    <DefaultWrapper
      isNextAllowed={calendars.every((calendar) => calendar.days.length > 0)}
      currentStep={3}
      withBorder
    >
      {calendars.map((calendar) => (
        <TrackCard key={calendar.id} track={calendar.track} isCompleted={calendar.days.length > 0}>
          <SetupCalendarButton
            onClick={handleSelectCalendar(calendar)}
            isCompleted={calendar.days.length > 0}
          />
        </TrackCard>
      ))}
    </DefaultWrapper>
  );
};

export const Step5 = ({ tracks: defaultTracks = [] }: { tracks: ITrack[] }) => {
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
      <DefaultWrapper
        isNextAllowed={tracks.every((track) => track.learningPeriods.length > 0)}
        currentStep={4}
        backButton={{
          variant: 'outline',
          onClick: handleBackToTracks,
          children: (
            <>
              <ArrowLeftIcon className="size-4" />
              Back to Tracks
            </>
          ),
        }}
      >
        <Step5LearningPeriod
          track={selectedTrack}
          setTrack={(fn: any) => {
            setSelectedTrack(fn);
            setTracks((prev) =>
              prev.map((track) => (track.id === selectedTrack.id ? (fn?.(track) ?? fn) : track))
            );
          }}
        />
      </DefaultWrapper>
    );
  }

  return (
    <DefaultWrapper
      isNextAllowed={tracks.every((track) => track.learningPeriods.length > 0)}
      currentStep={4}
      withBorder
    >
      {tracks.map((track) => (
        <TrackCard key={track.id} track={track} isCompleted={track.learningPeriods.length > 0}>
          <SetupLearningPeriodButton
            onClick={handleSelectTrack(track)}
            isCompleted={track.learningPeriods.length > 0}
          />
        </TrackCard>
      ))}
    </DefaultWrapper>
  );
};

const Step5LearningPeriod = ({
  track,
  setTrack,
}: {
  track: ITrack;
  setTrack: Dispatch<SetStateAction<ITrack>>;
}) => {
  const { onAddClick, onEditClick, onDeleteClick, form, learningPeriods, editingLearningPeriodId } =
    useStep5LearningPeriod(track, setTrack);
  const start_date = useWatch({ control: form.control, name: 'start_date' });
  const end_date = useWatch({ control: form.control, name: 'end_date' });

  const minStartDate = getLearningPeriodStartDate(track) as any;
  const minEndDate = getLearningPeriodEndDate(track) as any;

  return (
    <>
      <InputWithButton
        fields={[
          {
            label: {
              htmlFor: 'learning-period-name',
              children: 'Learning Period',
            },
            input: {
              id: 'learning-period-name',
              ...form.register('name'),
            },
            error: form.formState.errors.name?.message,
          },
          {
            label: { htmlFor: 'track-start-date', children: 'Start Date' },
            input: {
              id: 'learning-period-start-date',
              type: 'date',
              className: 'hidden',
              ...form.register('start_date'),
              min: minStartDate,
              max: minEndDate,
              value: start_date as any,
            },
            error: form.formState.errors.start_date?.message,
          },
          {
            label: { htmlFor: 'track-end-date', children: 'End Date' },
            input: {
              id: 'learning-period-end-date',
              type: 'date',
              className: 'hidden',
              ...form.register('end_date'),
              min: minStartDate,
              max: minEndDate,
              value: end_date as any,
            },
            error: form.formState.errors.end_date?.message,
          },
        ]}
        button={{
          children: editingLearningPeriodId ? 'Update Learning Period' : 'Add Learning Period',
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
              key={learningPeriod.id || 'new-learning-period'}
              className={
                (learningPeriod as StepTrackLP).disabled ? 'pointer-events-none opacity-50' : ''
              }
            >
              <TableCell className="max-w-80 text-truncate">{learningPeriod.name}</TableCell>
              <TableCell>{formatTrackDateWithShortMonth(learningPeriod.start_date)}</TableCell>
              <TableCell>{formatTrackDateWithShortMonth(learningPeriod.end_date)}</TableCell>
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

export const Step6 = ({ tracks: defaultTracks = [] }: { tracks: ITrack[] }) => {
  const {
    tracks,
    handleSelectTrack,
    selectedTrack,
    setTracks,
    setSelectedTrack,
    handleBackToTracks,
  } = useStep6Track(defaultTracks);

  if (selectedTrack) {
    return (
      <DefaultWrapper
        isLastStep
        isNextAllowed={false}
        currentStep={5}
        backButton={{
          variant: 'outline',
          onClick: handleBackToTracks,
          children: (
            <>
              <ArrowLeftIcon className="size-4" />
              Back to Tracks
            </>
          ),
        }}
      >
        <Step6Semesters
          track={selectedTrack}
          setTrack={(fn: any) => {
            setSelectedTrack(fn);
            setTracks((prev) =>
              prev.map((track) => (track.id === selectedTrack.id ? (fn?.(track) ?? fn) : track))
            );
          }}
        />
      </DefaultWrapper>
    );
  }

  return (
    <DefaultWrapper isLastStep isNextAllowed={false} currentStep={5} withBorder>
      {tracks.map((track) => (
        <TrackCard key={track.id} track={track} isCompleted={track.semesters.length > 0}>
          <SetupSemesterButton
            onClick={handleSelectTrack(track)}
            isCompleted={track.semesters.length > 0}
          />
        </TrackCard>
      ))}
    </DefaultWrapper>
  );
};

const Step6Semesters = ({
  track,
  setTrack,
}: {
  track: ITrack;
  setTrack: Dispatch<SetStateAction<ITrack>>;
}) => {
  const { onAddClick, onEditClick, onDeleteClick, form, semesters, editingSemesterId } =
    useStep6Semesters(track, setTrack);
  const start_date = useWatch({ control: form.control, name: 'start_date' });
  const end_date = useWatch({ control: form.control, name: 'end_date' });

  const minStartDate = getSemesterStartDate(track) as any;
  const minEndDate = getSemesterEndDate(track) as any;

  return (
    <>
      <InputWithButton
        fields={[
          {
            label: {
              htmlFor: 'semester-name',
              children: 'Semester',
            },
            input: {
              id: 'semester-name',
              ...form.register('name'),
            },
            error: form.formState.errors.name?.message,
          },
          {
            label: { htmlFor: 'semester-start-date', children: 'Start Date' },
            input: {
              id: 'semester-start-date',
              type: 'date',
              className: 'hidden',
              ...form.register('start_date'),
              min: minStartDate,
              max: minEndDate,
              value: start_date as any,
            },
            error: form.formState.errors.start_date?.message,
          },
          {
            label: { htmlFor: 'track-end-date', children: 'End Date' },
            input: {
              id: 'semester-end-date',
              type: 'date',
              className: 'hidden',
              ...form.register('end_date'),
              min: minStartDate,
              max: minEndDate,
              value: end_date as any,
            },
            error: form.formState.errors.end_date?.message,
          },
        ]}
        button={{
          children: editingSemesterId ? 'Update Semester' : 'Add Semester',
          disabled: form.formState.isSubmitting || !form.formState.isValid,
        }}
        onSubmit={form.handleSubmit(onAddClick)}
        className="w-80"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Semester</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {semesters.map((semester) => (
            <TableRow
              key={semester.id || 'new-semester'}
              className={
                (semester as StepSemester).disabled ? 'pointer-events-none opacity-50' : ''
              }
            >
              <TableCell className="max-w-80 text-truncate">{semester.name}</TableCell>
              <TableCell>{formatTrackDateWithShortMonth(semester.start_date)}</TableCell>
              <TableCell>{formatTrackDateWithShortMonth(semester.end_date)}</TableCell>
              <TableCell>
                <Actions
                  edit={{ onClick: () => onEditClick(semester) }}
                  deletе={{ onClick: () => onDeleteClick(semester) }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
