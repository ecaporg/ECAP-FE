import type { ITrack, ITrackCalendar } from '@/types'; // Assuming ITrack type will be defined in @/types
import { BaseApi } from '../base-api';
import { type ApiResponse, apiFetch } from '../fetch';

class TrackServerApi extends BaseApi<ITrack, undefined> {
  constructor() {
    super('/tracks', apiFetch);
  }

  async findAllWithLearningPeriods() {
    return this.get('periods') as ApiResponse<ITrack[], undefined>;
  }

  async findAllWithSemesters() {
    return this.get('semesters') as ApiResponse<ITrack[], undefined>;
  }
}

export const trackServerApi = new TrackServerApi();

export const calendarServerApi = new BaseApi<ITrackCalendar, undefined>(
  '/track-calendars',
  apiFetch
);
