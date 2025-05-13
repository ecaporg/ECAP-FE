import { BaseApi } from "../base-api";
import { apiFetch } from "../fetch";
import { Track, TrackCalendar } from "@/types"; // Assuming Track type will be defined in @/types

export const trackServerApi = new BaseApi<Track, undefined>(
  "/tracks", // Endpoint for tracks
  apiFetch
);

export const calendarServerApi = new BaseApi<TrackCalendar, undefined>(
  "/track-calendars",
  apiFetch
);
