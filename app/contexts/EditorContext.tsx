import { createContext, useContext, ReactNode, useState } from 'react';

type EditorState = {
  primaryTitle: string;
  subTitle: string;
  backgroundColor: string;
  primaryTitleColor: string;
  subTitleColor: string;
};

type EditorContextType = {
  state: EditorState;
  setPrimaryTitle: (title: string) => void;
  setSubTitle: (title: string) => void;
  setBackgroundColor: (background: string) => void;
  setPrimaryTitleColor: (color: string) => void;
  setSubTitleColor: (color: string) => void;
  resetEditor: () => void;
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

const defaultState: EditorState = {
  primaryTitle: 'Best practises for Remix state management',
  subTitle: '',
  backgroundColor: '#333333',
  primaryTitleColor: '#ffffff',
  subTitleColor: '#ffffff'
};

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EditorState>(defaultState);

  const setPrimaryTitle = (title: string) => {
    setState((prev) => ({ ...prev, primaryTitle: title }));
  };

  const setSubTitle = (title: string) => {
    setState((prev) => ({ ...prev, subTitle: title }));
  };

  const setBackgroundColor = (background: string) => {
    setState((prev) => ({ ...prev, backgroundColor: background }));
  };

  const setPrimaryTitleColor = (color: string) => {
    setState((prev) => ({ ...prev, primaryTitleColor: color }));
  };

  const setSubTitleColor = (color: string) => {
    setState((prev) => ({ ...prev, subTitleColor: color }));
  };
  const resetEditor = () => {
    setState(defaultState);
  };

  return (
    <EditorContext.Provider
      value={{
        state,
        setPrimaryTitle,
        setSubTitle,
        setBackgroundColor,
        setPrimaryTitleColor,
        setSubTitleColor,
        resetEditor
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
