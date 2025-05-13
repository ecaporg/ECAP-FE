export const dayTypes = [
  "Schooldays",
  "Non-School Day",
  "HOL",
  "EMC",
  "OTH",
  "ACA",
] as const;

export const dayTypeMap = Object.fromEntries(
  dayTypes.map((type) => [type, type])
) as Record<(typeof dayTypes)[number], (typeof dayTypes)[number]>;
