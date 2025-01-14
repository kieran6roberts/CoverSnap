import { TEXT_ALIGNMENT_OPTIONS } from '~/consts';

export type EditorLoaderData = {
  openItems: string[];
  hasVisited: boolean;
};

export type TextAlignment = keyof typeof TEXT_ALIGNMENT_OPTIONS;

export type Template = {
  id: string;
  name: string;
  styles: Record<string, string>;
  preview: ({ isSelected }: { isSelected: boolean }) => React.ReactNode;
};
