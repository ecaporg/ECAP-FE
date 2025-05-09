import { BaseApi } from "../base-api";
import { apiFetch } from "../fetch";
import { Track } from "@/types"; // Assuming Track type will be defined in @/types

export const trackServerApi = new BaseApi<Track, undefined>(
  "/tracks", // Endpoint for tracks
  apiFetch
);
