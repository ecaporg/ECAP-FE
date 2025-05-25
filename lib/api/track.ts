import type { Track, TrackCalendar } from '@/types'; // Assuming Track type will be defined in @/types
import { BaseApi } from '../base-api';
import { type ApiResponse, apiFetch } from '../fetch';

class TrackServerApi extends BaseApi<Track, undefined> {
  constructor() {
    super('/tracks', apiFetch);
  }

  async findAllWithLearningPeriods() {
    return this.get('periods') as ApiResponse<Track[], undefined>;
  }

  async findAllWithSemesters() {
    return this.get('semesters') as ApiResponse<Track[], undefined>;
  }
}

export const trackServerApi = new TrackServerApi();

export const calendarServerApi = new BaseApi<TrackCalendar, undefined>(
  '/track-calendars',
  apiFetch
);
