import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { useEffect } from 'react';
import { get, set, del } from 'idb-keyval';
import { toast } from 'react-hot-toast';

import { updateCSSVariable, updateCSSVariables } from '~/utils/styles';

type EditorState = {
  // Text
  primaryTitle: string;
  primaryTitleColor: string;
  primaryTitleFontSize: number | string;
  subTitle: string;
  subTitleColor: string;
  subTitleFontSize: number | string;
  // Background
  backgroundImage: string | null;
  backgroundColor: string;
};

type EditorActions = {
  setHasHydrated: (state: boolean) => void;
  // Text
  setPrimaryTitle: (title: string) => void;
  setPrimaryTitleColor: (color: string) => void;
  setPrimaryTitleFontSize: (size: number | string) => void;
  setSubTitle: (title: string) => void;
  setSubTitleColor: (color: string) => void;
  setSubTitleFontSize: (size: number | string) => void;
  // Background
  setBackgroundColor: (color: string) => void;
  setBackgroundImage: (url: string | null) => void;
  // Reset
  resetEditor: () => void;
};

const defaultState: EditorState = {
  // Text
  primaryTitle: '10 Tips/Principles For Cleaner React Code.',
  primaryTitleColor: 'rgba(255, 255, 255, 1)',
  primaryTitleFontSize: 28,
  subTitle: '',
  subTitleColor: 'rgba(255, 255, 255, 1)',
  subTitleFontSize: 20,
  // Background
  backgroundColor: 'rgba(51, 51, 51, 1)',
  backgroundImage: null
};

const indexDBStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) ?? null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  }
};

export const useEditor = create(
  persist<EditorState & EditorActions & { _hasHydrated: boolean }>(
    (set) => ({
      _hasHydrated: false,
      ...defaultState,
      setHasHydrated: (state) => set({ _hasHydrated: state }),

      // Text
      setPrimaryTitle: (title) => set({ primaryTitle: title }),
      setPrimaryTitleColor: (color) => {
        set({ primaryTitleColor: color });
        updateCSSVariable({ name: '--cover-title-color', value: color });
      },
      setPrimaryTitleFontSize: (size) => {
        set({ primaryTitleFontSize: size });
        updateCSSVariable({ name: '--cover-title-font-size', value: `${size}px` });
      },
      setSubTitle: (title) => set({ subTitle: title }),
      setSubTitleColor: (color) => {
        set({ subTitleColor: color });
        updateCSSVariable({ name: '--cover-subtitle-color', value: color });
      },
      setSubTitleFontSize: (size) => {
        set({ subTitleFontSize: size });
        updateCSSVariable({ name: '--cover-subtitle-font-size', value: `${size}px` });
      },

      // Background
      setBackgroundColor: (color) => {
        set({ backgroundColor: color });
        updateCSSVariable({ name: '--cover-background-color', value: color });
      },
      setBackgroundImage: (url) => {
        set({ backgroundImage: url });
      },

      // Reset
      resetEditor: () => {
        const state = useEditor.getState();
        if (state.backgroundImage?.startsWith('blob:')) {
          URL.revokeObjectURL(state.backgroundImage);
        }

        toast.success('Cover reset.', {
          id: 'reset-cover'
        });

        // Reset CSS variables
        updateCSSVariables({
          '--cover-title-color': defaultState.primaryTitleColor,
          '--cover-subtitle-color': defaultState.subTitleColor,
          '--cover-title-font-size': `${defaultState.primaryTitleFontSize}px`,
          '--cover-subtitle-font-size': `${defaultState.subTitleFontSize}px`,
          '--cover-background-color': defaultState.backgroundColor,
          '--cover-color-overlay-opacity': '0%'
        });

        set({ _hasHydrated: true, ...defaultState });
      }
    }),
    {
      name: 'editor-storage',
      storage: createJSONStorage(() => indexDBStorage),
      // @ts-expect-error fix: todo
      partialize: (state) => ({
        primaryTitle: state.primaryTitle,
        primaryTitleColor: state.primaryTitleColor,
        primaryTitleFontSize: state.primaryTitleFontSize,
        subTitle: state.subTitle,
        subTitleColor: state.subTitleColor,
        subTitleFontSize: state.subTitleFontSize,
        backgroundColor: state.backgroundColor
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) {
          toast.error('Failed to hydrate editor state. Please refresh the page.');
          return;
        }
        state.setHasHydrated(true);
      }
    }
  )
);

// Wapper component for hydration
export function EditorHydration({ children, skeleton }: { children: React.ReactNode; skeleton?: React.ReactNode }) {
  const hasHydrated = useEditor((state) => state._hasHydrated);

  useEffect(() => {
    if (hasHydrated) {
      const state = useEditor.getState();
      updateCSSVariables({
        '--cover-title-color': state.primaryTitleColor,
        '--cover-subtitle-color': state.subTitleColor,
        '--cover-title-font-size': `${state.primaryTitleFontSize}px`,
        '--cover-subtitle-font-size': `${state.subTitleFontSize}px`,
        '--cover-background-color': state.backgroundColor
      });
    }
  }, [hasHydrated]);

  if (!hasHydrated) {
    return skeleton ?? null;
  }

  return <>{children}</>;
}
