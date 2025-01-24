import { LAYOUT_TEMPLATES, BACKGROUND_TEMPLATES } from './templates';

export const PRIMARY_TEXT_LENGTH = 100;
export const SECONDARY_TEXT_LENGTH = 80;
export const PRIMARY_TEXT_FONT_SIZE_MIN = 10;
export const PRIMARY_TEXT_FONT_SIZE_MAX = 60;
export const SECONDARY_TEXT_FONT_SIZE_MIN = 6;
export const SECONDARY_TEXT_FONT_SIZE_MAX = 40;

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
];

const DEFAULT_PRIMARY_TEXT_CONTENT = '5 Simple Tips/Good Practises to Level Up Your React Codebase';
const DEFAULT_SECONDARY_TEXT_CONTENT = 'by Kieran Roberts';
const DEFAULT_PRIMARY_TEXT_COLOR = 'rgba(255, 255, 255, 1)';
const DEFAULT_SECONDARY_TEXT_COLOR = 'rgba(255, 255, 255, 1)';
const DEFAULT_PRIMARY_TEXT_FONT = fonts[0];
const DEFAULT_SECONDARY_TEXT_FONT = fonts[0];
const DEFAULT_PRIMARY_TEXT_FONT_SIZE = 45;
const DEFAULT_SECONDARY_TEXT_FONT_SIZE = 28;

const DEFAULT_PATTERN_COLOR = '#ffffff';
const DEFAULT_PATTERN_OPACITY = 0.1;

export const DEFAULT_PATTERN = {
  url: '',
  name: '',
  color: DEFAULT_PATTERN_COLOR,
  opacity: DEFAULT_PATTERN_OPACITY
};

export const TEXT_ALIGNMENT_OPTIONS = {
  left: 'left',
  center: 'center',
  right: 'right'
} as const;

export const DEFAULT_EDITOR_STATE = {
  template: {
    layoutId: LAYOUT_TEMPLATES[0].id,
    backgroundId: BACKGROUND_TEMPLATES[0].id
  },
  primaryText: {
    content: DEFAULT_PRIMARY_TEXT_CONTENT,
    color: DEFAULT_PRIMARY_TEXT_COLOR,
    fontSize: DEFAULT_PRIMARY_TEXT_FONT_SIZE,
    font: DEFAULT_PRIMARY_TEXT_FONT
  },
  secondaryText: {
    content: DEFAULT_SECONDARY_TEXT_CONTENT,
    color: DEFAULT_SECONDARY_TEXT_COLOR,
    fontSize: DEFAULT_SECONDARY_TEXT_FONT_SIZE,
    font: DEFAULT_SECONDARY_TEXT_FONT
  },
  background: {
    image: null,
    colors: {
      color1: 'rgba(204, 93, 232, 1)',
      color2: 'rgba(51, 51, 51, 1)'
    },
    pattern: DEFAULT_PATTERN
  },
  cover: {
    id: 'hashnode',
    width: 1600,
    height: 840,
    aspectRatio: 1.9
  }
};

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
};
