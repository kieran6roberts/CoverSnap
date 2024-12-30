import { createContext, useContext, ReactNode, useState } from 'react';
import { colorTypeOptions } from '~/consts';

type EditorState = {
  primaryTitle: string;
  secondaryTitle: string;
  backgroundColor: string;
  colorFormat: (typeof colorTypeOptions)[number];
};

type EditorContextType = {
  state: EditorState;
  setPrimaryTitle: (title: string) => void;
  setSecondaryTitle: (title: string) => void;
  setBackgroundColor: (background: string) => void;
  setColorFormat: (format: (typeof colorTypeOptions)[number]) => void;
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EditorState>({
    primaryTitle: 'Best practises for Remix state management',
    secondaryTitle: '',
    backgroundColor: '#333333',
    colorFormat: 'hex'
  });

  const setPrimaryTitle = (title: string) => {
    setState((prev) => ({ ...prev, primaryTitle: title }));
  };

  const setSecondaryTitle = (title: string) => {
    setState((prev) => ({ ...prev, secondaryTitle: title }));
  };

  const setBackgroundColor = (background: string) => {
    setState((prev) => ({ ...prev, backgroundColor: background }));
  };

  const setColorFormat = (format: (typeof colorTypeOptions)[number]) => {
    setState((prev) => ({ ...prev, colorFormat: format }));
  };

  return (
    <EditorContext.Provider
      value={{
        state,
        setPrimaryTitle,
        setSecondaryTitle,
        setBackgroundColor,
        setColorFormat
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}
