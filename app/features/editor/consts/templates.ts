import classnames from 'classnames';
import classes from '~/features/editor/styles/TemplatePreview.module.css';

export const LAYOUT_TEMPLATES = [
  {
    id: 'hero',
    name: 'Hero',
    styles: {
      '--cover-flex-direction': 'column',
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
      '--cover-flex-direction': 'column',
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
      '--cover-flex-direction': 'column',
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
      '--cover-flex-direction': 'column',
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
      '--cover-flex-direction': 'column',
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
  },
  {
    id: 'high-life',
    name: 'The High Life',
    styles: {
      '--cover-align-items': 'flex-start',
      '--cover-flex-direction': 'row',
      '--cover-primary-text-align': 'left',
      '--cover-secondary-position': 'static',
      '--cover-secondary-top': 'unset',
      '--cover-secondary-right': 'unset',
      '--cover-secondary-text-align': 'right'
    } as Record<string, string>,
    previewStyles: {
      cover: classnames(classes['previewContainer--top']),
      primaryText: classnames(classes['previewBar--thick'])
    },
    preview: ({ children }: { children: React.ReactNode }) => children
  },
  {
    id: 'row-your-boat',
    name: 'Row Your Boat',
    styles: {
      '--cover-align-items': 'center',
      '--cover-flex-direction': 'row',
      '--cover-primary-text-align': 'left',
      '--cover-secondary-position': 'static',
      '--cover-secondary-top': 'unset',
      '--cover-secondary-right': 'unset',
      '--cover-secondary-text-align': 'right'
    } as Record<string, string>,
    previewStyles: {
      cover: classnames(classes['previewContainer--centered-row']),
      primaryText: classnames(classes['previewBar--thick'])
    },
    preview: ({ children }: { children: React.ReactNode }) => children
  },
  {
    id: 'the-deep',
    name: 'The Deep',
    styles: {
      '--cover-align-items': 'flex-end',
      '--cover-flex-direction': 'row',
      '--cover-primary-text-align': 'left',
      '--cover-secondary-position': 'static',
      '--cover-secondary-top': 'unset',
      '--cover-secondary-right': 'unset',
      '--cover-secondary-text-align': 'right'
    } as Record<string, string>,
    previewStyles: {
      cover: classnames(classes['previewContainer--end']),
      primaryText: classnames(classes['previewBar--thick'])
    },
    preview: ({ children }: { children: React.ReactNode }) => children
  }
];

export const BACKGROUND_TEMPLATES = [
  {
    id: 'diagonal',
    name: 'Diagonal Split',
    sections: [
      {
        clipPath: 'var(--clip-path-diagonal-split-1)'
      },
      {
        clipPath: 'var(--clip-path-diagonal-split-2)'
      }
    ],
    previewStyles: classes['previewSection--diagonal-left'],
    preview: ({ children }: { children: React.ReactNode }) => children
  },
  {
    id: 'diagonal-reverse',
    name: 'Diagonal Split (Reverse)',
    sections: [
      {
        clipPath: 'var(--clip-path-diagonal-split-reverse-1)'
      },
      {
        clipPath: 'var(--clip-path-diagonal-split-reverse-2)'
      }
    ],
    previewStyles: classes['previewSection--diagonal-left-reverse'],
    preview: ({ children }: { children: React.ReactNode }) => children
  },
  {
    id: 'solid',
    name: 'Solid',
    previewStyles: classes['previewSection--solid'],
    preview: ({ children }: { children: React.ReactNode }) => children
  },
  {
    id: 'horizontal',
    name: 'Horizontal Split',
    sections: [
      {
        clipPath: 'var(--clip-path-horizontal-split-1)'
      },
      {
        clipPath: 'var(--clip-path-horizontal-split-2)'
      }
    ],
    previewStyles: classes['previewSection--horizontal-top'],
    preview: ({ children }: { children: React.ReactNode }) => children
  },
  {
    id: 'vertical',
    name: 'Vertical Split',
    sections: [
      {
        clipPath: 'var(--clip-path-vertical-split-1)'
      },
      {
        clipPath: 'var(--clip-path-vertical-split-2)'
      }
    ],
    previewStyles: classes['previewSection--vertical-left'],
    preview: ({ children }: { children: React.ReactNode }) => children
  }
];
