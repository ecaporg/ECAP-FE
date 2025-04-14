import { Track } from '@/types';
import { BaseFilter } from './base';

export interface TrackFilterProps {
  availableTracks: Track[];
  slug?: string;
}

export function TrackFilter({ availableTracks, slug = 'track_id' }: TrackFilterProps) {
  return (
    <BaseFilter
      label="Track"
      slug={slug}
      options={availableTracks.map((track) => ({ label: track.name, value: track.id }))}
      multiple
    />
  );
}
