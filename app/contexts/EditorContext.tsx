import { createContext, useContext, ReactNode, useState } from 'react';

type EditorState = {
  primaryTitle: string;
  secondaryTitle: string;
  background: string;
};

type EditorContextType = {
  state: EditorState;
  setPrimaryTitle: (title: string) => void;
  setSecondaryTitle: (title: string) => void;
  setBackground: (background: string) => void;
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EditorState>({
    primaryTitle: 'Best practises for Remix state management',
    secondaryTitle: '',
    background: '#ffffff'
  });

  const setPrimaryTitle = (title: string) => {
    setState((prev) => ({ ...prev, primaryTitle: title }));
  };

  const setSecondaryTitle = (title: string) => {
    setState((prev) => ({ ...prev, secondaryTitle: title }));
  };

  const setBackground = (background: string) => {
    setState((prev) => ({ ...prev, background }));
  };

  return (
    <EditorContext.Provider
      value={{
        state,
        setPrimaryTitle,
        setSecondaryTitle,
        setBackground
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
