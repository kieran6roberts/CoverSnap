import { TEXT_ALIGNMENT_OPTIONS } from '~/consts/editor';

export type EditorLoaderData = {
  openItems: string[];
  hasVisited: boolean;
  sidebarState: 'open' | 'closed';
};

export type TextAlignment = keyof typeof TEXT_ALIGNMENT_OPTIONS;

export type Template = {
  id: string;
  name: string;
  styles: Record<string, string>;
  preview: ({ isSelected }: { isSelected: boolean }) => React.ReactNode;
};
