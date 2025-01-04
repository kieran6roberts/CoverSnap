export const updateCSSVariable = ({ name, value }: { name: string; value: string }) => {
  document.documentElement.style.setProperty(name, value);
};

export const updateCSSVariables = (variables: Record<string, string>) => {
  Object.entries(variables).forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, value);
  });
};
