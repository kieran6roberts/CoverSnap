import { CSSVariableKey } from '~/shared/types/styles';
import type { DownloadSizeWidths, DownloadSizeHeights, DownloadSizeAspectRatios } from '~/shared/consts';

export const updateCSSVariables = (variables: Partial<Record<CSSVariableKey, string>>) => {
  const root = document.documentElement;
  (Object.entries(variables) as [CSSVariableKey, string][]).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

export const getAspectRatioData = (
  value: `${string}:${DownloadSizeAspectRatios}:${DownloadSizeWidths}x${DownloadSizeHeights}`
) => {
  const id = value.split(':')[0];
  const aspectRatio = value.split(':')[1];
  const size = value.split(':')[2];
  const width = size.split('x')[0];
  const height = size.split('x')[1];
  return { id, aspectRatio, width, height };
};
