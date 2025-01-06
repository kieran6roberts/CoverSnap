import { MantineColorScheme } from '@mantine/core';

export const GITHUB_URL = 'https://github.com/kieran6roberts/CoverSnap';
export const PORTFOLIO_URL = 'https://kieranroberts.dev';

export const PREVIEW_PARAM = 'preview';
export const CREATE_ROUTE = '/create';

type AVAILABLE_THEMES = Exclude<MantineColorScheme, 'auto'>;

export const TEXT_ALIGNMENT_OPTIONS = {
  left: 'left',
  center: 'center',
  right: 'right'
} as const;

export const SITE_THEMES: Record<AVAILABLE_THEMES, AVAILABLE_THEMES> = {
  light: 'light',
  dark: 'dark'
};
