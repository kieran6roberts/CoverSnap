import classnames from 'classnames';
import classes from '~/components/DrawerEditing/TemplatePreview.module.css';
import * as patterns from 'hero-patterns';

export const PRIMARY_TEXT_LENGTH = 100;
export const SECONDARY_TEXT_LENGTH = 80;
export const PRIMARY_TEXT_FONT_SIZE_MIN = 10;
export const PRIMARY_TEXT_FONT_SIZE_MAX = 60;
export const SECONDARY_TEXT_FONT_SIZE_MIN = 10;
export const SECONDARY_TEXT_FONT_SIZE_MAX = 40;

export const fonts = [
  'Arial',
  'Helvetica',
  'Verdana',
  'Tahoma',
  'Trebuchet MS',
  'Times New Roman',
  'Georgia',
  'Courier New'
];

export const TEMPLATES = [
  {
    id: 'hero',
    name: 'Hero',
    styles: {
      '--cover-align-items': 'center',
      '--cover-primary-text-align': 'center',
      '--cover-secondary-position': 'relative',
      '--cover-secondary-text-align': 'center',
      '--cover-secondary-bottom': 'unset',
      '--cover-secondary-right': 'unset',
      '--cover-secondary-left': 'unset'
    } as Record<string, string>,
    previewStyles: {
      cover: classnames(classes['previewContainer--centered'])
    },
    preview: ({ children }: { children: React.ReactNode }) => children
  },
  {
    id: 'left-handed',
    name: 'Left Handed',
    styles: {
      '--cover-align-items': 'flex-start',
      '--cover-primary-text-align': 'left',
      '--cover-secondary-position': 'relative',
      '--cover-secondary-bottom': 'unset',
      '--cover-secondary-right': 'unset',
      '--cover-secondary-left': 'unset',
      '--cover-secondary-text-align': 'left'
    } as Record<string, string>,
    previewStyles: {
      cover: classnames(classes['previewContainer--left'])
    },
    preview: ({ children }: { children: React.ReactNode }) => children
  },
  {
    id: 'right-handed',
    name: 'Right Handed',
    styles: {
      '--cover-align-items': 'flex-end',
      '--cover-primary-text-align': 'right',
      '--cover-secondary-position': 'relative',
      '--cover-secondary-bottom': 'unset',
      '--cover-secondary-right': 'unset',
      '--cover-secondary-left': 'unset',
      '--cover-secondary-text-align': 'right'
    } as Record<string, string>,
    previewStyles: {
      cover: classnames(classes['previewContainer--right'])
    },
    preview: ({ children }: { children: React.ReactNode }) => children
  },
  {
    id: 'right-footed',
    name: 'Right Footed',
    styles: {
      '--cover-align-items': 'center',
      '--cover-primary-text-align': 'center',
      '--cover-secondary-position': 'absolute',
      '--cover-secondary-bottom': '1rem',
      '--cover-secondary-right': '1rem',
      '--cover-secondary-left': 'unset',
      '--cover-secondary-text-align': 'right'
    } as Record<string, string>,
    previewStyles: {
      cover: classnames(classes['previewContainer--centered']),
      primaryText: classnames(classes['previewBar--wide']),
      secondaryText: classnames(classes['previewBar--bottom-right'])
    },
    preview: ({ children }: { children: React.ReactNode }) => children
  },
  {
    id: 'left-footed',
    name: 'Left Footed',
    styles: {
      '--cover-align-items': 'center',
      '--cover-primary-text-align': 'center',
      '--cover-secondary-position': 'absolute',
      '--cover-secondary-bottom': '1rem',
      '--cover-secondary-left': '1rem',
      '--cover-secondary-right': 'unset',
      '--cover-secondary-text-align': 'left'
    } as Record<string, string>,
    previewStyles: {
      cover: classnames(classes['previewContainer--centered']),
      primaryText: classnames(classes['previewBar--wide']),
      secondaryText: classnames(classes['previewBar--bottom-left'])
    },
    preview: ({ children }: { children: React.ReactNode }) => children
  }
];

const DEFAULT_PRIMARY_TEXT_CONTENT = 'Tutorial: Implement a Scroll-Translated, Dynamic Sticky Navbar in React.';
const DEFAULT_SECONDARY_TEXT_CONTENT = 'by Kieran Roberts';
const DEFAULT_PRIMARY_TEXT_COLOR = 'rgba(255, 255, 255, 1)';
const DEFAULT_SECONDARY_TEXT_COLOR = 'rgba(255, 255, 255, 1)';
const DEFAULT_PRIMARY_TEXT_FONT = fonts[0];
const DEFAULT_SECONDARY_TEXT_FONT = fonts[0];
const DEFAULT_PRIMARY_TEXT_FONT_SIZE = 38;
const DEFAULT_SECONDARY_TEXT_FONT_SIZE = 28;
const DEFAULT_TEMPLATE = TEMPLATES[0].id;
const DEFAULT_BACKGROUND_COLOR = 'rgba(81, 133, 196, 1)';
const DEFAULT_PATTERN_COLOR = '#ffffff';
const DEFAULT_PATTERN_OPACITY = 0.1;

export const DEFAULT_PATTERN = {
  url: patterns.architect(DEFAULT_PATTERN_COLOR, DEFAULT_PATTERN_OPACITY),
  name: 'architect',
  color: DEFAULT_PATTERN_COLOR,
  opacity: DEFAULT_PATTERN_OPACITY
};

export const TEXT_ALIGNMENT_OPTIONS = {
  left: 'left',
  center: 'center',
  right: 'right'
} as const;

export const DEFAULT_EDITOR_STATE = {
  template: DEFAULT_TEMPLATE,
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
    color: DEFAULT_BACKGROUND_COLOR,
    pattern: DEFAULT_PATTERN
  },
  cover: {
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
