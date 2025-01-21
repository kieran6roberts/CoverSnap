import { PREVIEW_VARIABLE_NAMES } from '~/config/consts/styles';

type NestedValue<T> = T extends object ? NestedValue<T[keyof T]> : T;

export type CSSVariableKey = NestedValue<typeof PREVIEW_VARIABLE_NAMES>;
