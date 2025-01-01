export const updateCSSVariable = ({ name, value }: { name: string; value: string }) => {
  document.documentElement.style.setProperty(name, value);
};
