import classnames from 'classnames';
import classes from '~/features/editor/styles/TemplatePreview.module.css';
import { CSSVariableKey } from '~/shared/types/styles';

export const LAYOUT_TEMPLATES = [
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
    } as Partial<Record<CSSVariableKey, string>>,
    previewStyles: {
      cover: classnames(classes['previewPaper-content--left'])
    }
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
    } as Partial<Record<CSSVariableKey, string>>,
    previewStyles: {
      cover: classnames(classes['previewPaper-content--right'])
    }
  },
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
    } as Partial<Record<CSSVariableKey, string>>,
    previewStyles: {
      cover: classnames(classes['previewPaper-content--centered'])
    }
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
    } as Partial<Record<CSSVariableKey, string>>,
    previewStyles: {
      cover: classnames(classes['previewPaper-content--centered']),
      primaryText: classnames(classes['previewBar--wide']),
      secondaryText: classnames(classes['previewBar--bottom-right'])
    }
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
    } as Partial<Record<CSSVariableKey, string>>,
    previewStyles: {
      cover: classnames(classes['previewPaper-content--centered']),
      primaryText: classnames(classes['previewBar--wide']),
      secondaryText: classnames(classes['previewBar--bottom-left'])
    }
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
    } as Partial<Record<CSSVariableKey, string>>,
    previewStyles: {
      cover: classnames(classes['previewPaper-content--top']),
      primaryText: classnames(classes['previewBar--thick'])
    }
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
    } as Partial<Record<CSSVariableKey, string>>,
    previewStyles: {
      cover: classnames(classes['previewPaper-content--centered-row']),
      primaryText: classnames(classes['previewBar--thick'])
    }
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
    } as Partial<Record<CSSVariableKey, string>>,
    previewStyles: {
      cover: classnames(classes['previewPaper-content--end']),
      primaryText: classnames(classes['previewBar--thick'])
    }
  }
];

export const BACKGROUND_TEMPLATES = [
  {
    id: 'window',
    name: 'Window',
    sections: [
      {
        clipPath: 'var(--clip-path-window-1)',
        backgroundColor: 'var(--cover-background-color-2)'
      },
      {
        clipPath: 'var(--clip-path-window-2)',
        backgroundColor: 'var(--cover-background-color-3)'
      },
      {
        clipPath: 'var(--clip-path-window-3)',
        backgroundColor: 'var(--cover-background-color-4)'
      }
    ]
  },
  {
    id: 'solid',
    name: 'Solid'
  },
  {
    id: 'vertical',
    name: 'Vertical Split',
    sections: [
      {
        clipPath: 'var(--clip-path-vertical-split-1)',
        backgroundColor: 'var(--cover-background-color-1)'
      }
    ]
  },
  {
    id: 'horizontal',
    name: 'Horizontal Split',
    sections: [
      {
        clipPath: 'var(--clip-path-horizontal-split-1)',
        backgroundColor: 'var(--cover-background-color-2)'
      }
    ]
  },
  {
    id: 'diagonal',
    name: 'Split',
    sections: [
      {
        clipPath: 'var(--clip-path-diagonal-split-1)',
        backgroundColor: 'var(--cover-background-color-2)'
      }
    ]
  },
  {
    id: 'cross',
    name: 'Cross',
    sections: [
      {
        clipPath: 'var(--clip-path-cross-1)',
        backgroundColor: 'var(--cover-background-color-2)'
      }
    ]
  },
  {
    id: 'cross-reverse',
    name: 'Cross (Reverse)',
    sections: [
      {
        clipPath: 'var(--clip-path-cross-reverse-1)',
        backgroundColor: 'var(--cover-background-color-2)'
      }
    ]
  },
  {
    id: 'diagonal-reverse',
    name: 'Split (Reverse)',
    sections: [
      {
        clipPath: 'var(--clip-path-diagonal-split-reverse-1)',
        backgroundColor: 'var(--cover-background-color-2)'
      }
    ]
  },
  {
    id: 'ticket',
    name: 'Ticket',
    sections: [
      {
        clipPath: 'var(--clip-path-ticket-1)',
        backgroundColor: 'var(--cover-background-color-2)'
      }
    ]
  },
  {
    id: 'ticket-reverse',
    name: 'Ticket (Reverse)',
    sections: [
      {
        clipPath: 'var(--clip-path-ticket-reverse-1)',
        backgroundColor: 'var(--cover-background-color-2)'
      }
    ]
  },
  {
    id: 'criss-cross',
    name: 'Criss Cross',
    sections: [
      {
        clipPath: 'var(--clip-path-criss-cross-1)',
        backgroundColor: 'var(--cover-background-color-2)'
      }
    ]
  },
  {
    id: 'frame',
    name: 'Frame',
    sections: [
      {
        clipPath: 'var(--clip-path-frame-1)',
        backgroundColor: 'var(--cover-background-color-2)'
      }
    ]
  },
  {
    id: 'sun-up',
    name: 'Sun Up',
    sections: [
      {
        clipPath: 'var(--clip-path-sun-up-1)',
        backgroundColor: 'var(--cover-background-color-2)'
      }
    ]
  },
  {
    id: 'sun-down',
    name: 'Sun Down',
    sections: [
      {
        clipPath: 'var(--clip-path-sun-down-1)',
        backgroundColor: 'var(--cover-background-color-2)'
      }
    ]
  },
  {
    id: 'bevel',
    name: 'Bevel',
    sections: [
      {
        clipPath: 'var(--clip-path-bevel-1)',
        backgroundColor: 'var(--cover-background-color-2)'
      }
    ]
  },
  {
    id: 'ellipse',
    name: 'Ellipse',
    sections: [
      {
        clipPath: 'var(--clip-path-ellipse-1)',
        backgroundColor: 'var(--cover-background-color-2)'
      }
    ]
  },
  {
    id: 'ellipse-reverse',
    name: 'Ellipse (Reverse)',
    sections: [
      {
        clipPath: 'var(--clip-path-ellipse-reverse-1)',
        backgroundColor: 'var(--cover-background-color-2)'
      }
    ]
  },
  {
    id: 'mountain',
    name: 'Mountain',
    sections: [
      {
        clipPath: 'var(--clip-path-mountain-1)',
        backgroundColor: 'var(--cover-background-color-2)'
      }
    ]
  },
  {
    id: 'mountain-reverse',
    name: 'Mountain (Reverse)',
    sections: [
      {
        clipPath: 'var(--clip-path-mountain-reverse-1)',
        backgroundColor: 'var(--cover-background-color-2)'
      }
    ]
  }
];
