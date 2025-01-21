import { CSSVariableKey } from '~/shared/types/styles';

export const updateCSSVariables = (variables: Partial<Record<CSSVariableKey, string>>) => {
  const root = document.documentElement;
  (Object.entries(variables) as [CSSVariableKey, string][]).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};
