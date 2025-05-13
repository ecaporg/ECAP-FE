import { BaseApi } from "../base-api";
import { apiFetch, ApiResponse } from "../fetch";
import { Track, TrackCalendar } from "@/types"; // Assuming Track type will be defined in @/types

class TrackServerApi extends BaseApi<Track, undefined> {
  constructor() {
    super("/tracks", apiFetch);
  }

  async findAllWithLearningPeriods() {
    return this.get("periods") as ApiResponse<Track[], undefined>;
  }
}

export const trackServerApi = new TrackServerApi();

export const calendarServerApi = new BaseApi<TrackCalendar, undefined>(
  "/track-calendars",
  apiFetch
);
