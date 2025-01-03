import { createContext, useContext, ReactNode, useState } from 'react';
import { DEFAULT_CSS_VARIABLE_VALUES } from '~/consts';
import { updateCSSVariable } from '~/utils/styles';

type EditorState = {
  primaryTitle: string;
  subTitle: string;
};

type EditorContextType = {
  state: EditorState;
  setPrimaryTitle: (title: string) => void;
  setSubTitle: (title: string) => void;
  resetEditor: () => void;
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

const defaultState: EditorState = {
  primaryTitle: '10 Tips/Principles For Cleaner React Code.',
  subTitle: ''
};

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EditorState>(defaultState);

  const setPrimaryTitle = (title: string) => {
    setState((prev) => ({ ...prev, primaryTitle: title }));
  };

  const setSubTitle = (title: string) => {
    setState((prev) => ({ ...prev, subTitle: title }));
  };

  const resetEditor = () => {
    setState(defaultState);
    updateCSSVariable({ name: '--cover-title-color', value: DEFAULT_CSS_VARIABLE_VALUES['title-color'] });
    updateCSSVariable({ name: '--cover-subtitle-color', value: DEFAULT_CSS_VARIABLE_VALUES['subtitle-color'] });
    updateCSSVariable({
      name: '--cover-title-font-size',
      value: `${DEFAULT_CSS_VARIABLE_VALUES['title-font-size']}px`
    });
    updateCSSVariable({
      name: '--cover-subtitle-font-size',
      value: `${DEFAULT_CSS_VARIABLE_VALUES['subtitle-font-size']}px`
    });
    updateCSSVariable({ name: '--cover-background-color', value: DEFAULT_CSS_VARIABLE_VALUES['bg-color'] });
  };

  return (
    <EditorContext.Provider
      value={{
        state,
        setPrimaryTitle,
        setSubTitle,
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
