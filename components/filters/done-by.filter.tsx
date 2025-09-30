"use client";
import { DEFAULT_FILTERS_KEYS } from "@/constants/filter";
import type { IUser } from "@/types";
import { getUserName } from "@/utils";
import { BaseFilter } from "./base";
import { useAuth } from "@/providers/auth";
interface DoneByFilterProps {
  availableUsers: IUser[];
  slug?: string;
}

export function DoneByFilter({
  availableUsers = [],
  slug = DEFAULT_FILTERS_KEYS.DONE_BY,
}: DoneByFilterProps) {
  const { user } = useAuth();
  const map = new Map();

  availableUsers.forEach((user) => {
    map.set(user.id, getUserName(user));
  });

  const disabled = availableUsers.length === 0;

  if (user && map.has(user.id)) {
    map.set(user.id, "You");
  }

  const options = Array.from(map.entries()).map(([key, value]) => ({
    label: value,
    value: key.toString(),
  }));
  return (
    <BaseFilter
      className="min-w-40"
      label="Done By"
      slug={slug}
      options={options}
      withBothOption
      disabled={disabled}
    />
  );
}
