import type { IUser } from "@/types";
import { apiFetch } from "./fetch";

export const USER_TAG = "me";

export async function getUser(): Promise<IUser | null> {
  const response = await apiFetch("/auth/me", {
    tags: [USER_TAG],
    cache: "force-cache",
  });

  if (!response.data) {
    return null;
  }

  return response.data;
}
