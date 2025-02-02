// Make all properties (nested) of an object readonly
export type DeepReadonly<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>;
};

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

// Create a range of numbers from F to T
export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
