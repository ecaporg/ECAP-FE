"use client";

import { Academy, School, Track } from "@/types";
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
import { useState } from "react";
import { StepAcademy, useStep2 } from "@/hooks/settings/steps/use-step2";
import { StepTrack, useStep3 } from "@/hooks/settings/steps/use-step3";
import { formatTrackDate } from "@/utils";
import { useWatch } from "react-hook-form";

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
              <TableCell>{formatTrackDate(track.start_date)}</TableCell>
              <TableCell>{formatTrackDate(track.end_date)}</TableCell>
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
