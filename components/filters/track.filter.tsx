import { Track } from '@/types';
import { BaseFilter } from './base';

export interface TrackFilterProps {
  availableTracks: Track[];
}

export function TrackFilter({ availableTracks }: TrackFilterProps) {
  return (
    <BaseFilter
      label="Track"
      slug="track"
      options={availableTracks.map((track) => ({ label: track.name, value: track.id }))}
      multiple
    />
  );
}
