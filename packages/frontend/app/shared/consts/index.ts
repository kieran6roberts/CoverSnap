import { LAYOUT_TEMPLATES, BACKGROUND_TEMPLATES } from '~/features/editor/consts/templates';
import { IntRange } from '~/shared/types';

export const textLimits = {
  PRIMARY_TEXT_LENGTH: 120,
  SECONDARY_TEXT_LENGTH: 150,
  PRIMARY_TEXT_FONT_SIZE_MIN: 10,
  PRIMARY_TEXT_FONT_SIZE_MAX: 90,
  SECONDARY_TEXT_FONT_SIZE_MIN: 6,
  SECONDARY_TEXT_FONT_SIZE_MAX: 80
} as const;

export const fonts = [
  'Arial',
  'Arial Black',
  'Helvetica',
  'Verdana',
  'Tahoma',
  'Trebuchet MS',
  'Times New Roman',
  'Georgia',
  'Courier New',
  'Impact',
  'Palatino',
  'Garamond',
  'Comic Sans MS'
] as const;

export type RGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEXColor = `#${string}`;

export const IMAGE_DOWNLOAD_SIZES = {
  hashnode: {
    label: '(Hashnode)',
    value: 'hashnode:1.9:1600x840',
    width: 1600,
    height: 840,
    aspectRatio: 1.9
  },
  devto: {
    label: '(Dev)',
    value: 'dev:2.38:1000x420',
    width: 1000,
    height: 420,
    aspectRatio: 2.38
  },
  mediumRegular: {
    label: '(Medium: standard)',
    value: 'medium-regular:2:1500x750',
    width: 1500,
    height: 750,
    aspectRatio: 2
  },
  mediumLarge: {
    label: '(Medium: large)',
    value: 'medium-large:2:2500x1250',
    width: 2500,
    height: 1250,
    aspectRatio: 2
  }
} as const;

export type PrimaryFontSize = IntRange<
  typeof textLimits.PRIMARY_TEXT_FONT_SIZE_MIN,
  typeof textLimits.PRIMARY_TEXT_FONT_SIZE_MAX
>;
export type SecondaryFontSize = IntRange<
  typeof textLimits.SECONDARY_TEXT_FONT_SIZE_MIN,
  typeof textLimits.SECONDARY_TEXT_FONT_SIZE_MAX
>;

export const DRAWER_SECTIONS = {
  templates: 'templates',
  text: 'text',
  background: 'background',
  info: 'info'
} as const;

export type Fonts = (typeof fonts)[number];

export type TemplateSettings = {
  layoutId: string;
  backgroundId: string;
};

export type PrimaryTextSettings = {
  content: string;
  color: RGBAColor;
  font: Fonts;
  fontSize: PrimaryFontSize;
};

export type SecondaryTextSettings = {
  content: string;
  color: RGBAColor;
  font: Fonts;
  fontSize: SecondaryFontSize;
};

export type BackgroundColors = Record<`color${number}`, RGBAColor>;

type BackgroundPatternSettings = {
  url: string | null;
  name: string | null;
  color: HEXColor;
  opacity: number;
};

export type DownloadSizeInfo = `${string}:${string}:${string}x${string}`;

export type CoverSettings = {
  id: string;
  width: number;
  height: number;
  aspectRatio: number;
};

export type BackgroundSettings = {
  image: string | null;
  colors: BackgroundColors;
  pattern: BackgroundPatternSettings;
};

const defaultPrimaryTextSettings: PrimaryTextSettings = {
  content: 'How To Persist Style Changes Through Reloads Using Overrides In Dev Tools',
  color: 'rgba(20, 4, 4, 1)',
  font: fonts[0],
  fontSize: 40
};

const defaultSecondaryTextSettings: SecondaryTextSettings = {
  content: 'by Kieran Roberts',
  color: 'rgba(20, 4, 4, 1)',
  font: fonts[0],
  fontSize: 25
};

const defaultBackgroundColors: BackgroundColors = {
  color1: 'rgba(255, 255, 255, 1)',
  color2: 'rgba(230, 227, 227, 1)',
  color3: 'rgba(205, 203, 203, 1)',
  color4: 'rgba(176, 171, 171, 1)'
};

const defaultPatternSettings: BackgroundPatternSettings = {
  url: '',
  name: '',
  color: '#8f8888',
  opacity: 0.1
};

const defaultBackground: BackgroundSettings = {
  image: null,
  colors: defaultBackgroundColors,
  pattern: defaultPatternSettings
};

const defaultCoverSettings: CoverSettings = {
  id: 'hashnode',
  width: 1600,
  height: 840,
  aspectRatio: 1.9
};

export const DEFAULT_EDITOR_STATE = {
  template: {
    layoutId: LAYOUT_TEMPLATES[0].id,
    backgroundId: BACKGROUND_TEMPLATES[0].id
  },
  primaryText: defaultPrimaryTextSettings,
  secondaryText: defaultSecondaryTextSettings,
  background: defaultBackground,
  cover: defaultCoverSettings
};
