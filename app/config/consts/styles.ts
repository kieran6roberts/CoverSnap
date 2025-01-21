export const PREVIEW_VARIABLE_NAMES = {
  primaryText: {
    color: '--cover-primary-text-color',
    fontSize: '--cover-primary-text-font-size',
    font: '--cover-primary-text-font',
    align: '--cover-primary-text-align'
  },
  secondaryText: {
    color: '--cover-secondary-text-color',
    fontSize: '--cover-secondary-text-font-size',
    font: '--cover-secondary-text-font',
    align: '--cover-secondary-text-align',
    bottom: '--cover-secondary-bottom',
    right: '--cover-secondary-right',
    left: '--cover-secondary-left',
    position: '--cover-secondary-position'
  },
  background: {
    color1: '--cover-background-color-1',
    color2: '--cover-background-color-2',
    opacity: '--cover-color-overlay-opacity'
  },
  cover: {
    aspectRatio: '--cover-aspect-ratio',
    display: '--cover-display',
    justifyContent: '--cover-justify-content',
    alignItems: '--cover-align-items',
    flexDirection: '--cover-flex-direction'
  }
} as const;
