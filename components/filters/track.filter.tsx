import { Track } from "@/types";
import { BaseFilter } from "./base";
import { DEFAULT_FILTERS_KEYS } from "@/constants/filter";

export interface TrackFilterProps {
  availableTracks: Track[];
  slug?: string;
}

export function TrackFilter({
  availableTracks = [],
  slug = DEFAULT_FILTERS_KEYS.TRACK_ID,
}: TrackFilterProps) {
  return (
    <BaseFilter
      label="Track"
      slug={slug}
      options={availableTracks.map((track) => ({
        label: track.name,
        value: track.id.toString(),
      }))}
      multiple
    />
  );
}
