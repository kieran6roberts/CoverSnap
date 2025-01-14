export const updateCSSVariables = (variables: Record<string, string>) => {
  Object.entries(variables).forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, value);
  });
};
