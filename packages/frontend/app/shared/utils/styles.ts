import { CSSVariableKey } from '~/shared/types/styles';
import type { DownloadSizeInfo } from '~/shared/consts';

export const updateCSSVariables = (variables: Partial<Record<CSSVariableKey, string>>) => {
  const root = document.documentElement;
  (Object.entries(variables) as [CSSVariableKey, string][]).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

export const getAspectRatioData = (value: DownloadSizeInfo) => {
  const [id, aspectRatio, size] = value.split(':');
  const [width, height] = size.split('x');
  return {
    id,
    aspectRatio: Number(aspectRatio),
    width: Number(width),
    height: Number(height)
  };
};
