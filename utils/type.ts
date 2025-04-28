export type NestedKeyOf<T, Depth extends number[] = [0, 1, 2, 3]> = Depth['length'] extends 0
  ? never
  : T extends Date
    ? never
    : T extends Array<infer U>
      ? {
          [K in keyof U]: K extends string ? K | `${K}.${NestedKeyOf<U[K], Tail<Depth>>}` : never;
        }[keyof U]
      : T extends object
        ? {
            [K in keyof T]: K extends string ? K | `${K}.${NestedKeyOf<T[K], Tail<Depth>>}` : never;
          }[keyof T]
        : never;

type Tail<T extends any[]> = T extends [infer _, ...infer Rest] ? Rest : never;
