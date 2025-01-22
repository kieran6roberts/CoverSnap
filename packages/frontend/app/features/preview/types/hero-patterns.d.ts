declare module 'hero-patterns' {
  type Pattern = (color?: string, opacity?: number) => string;
  const patterns: Record<string, Pattern>;
  export = patterns;
}
