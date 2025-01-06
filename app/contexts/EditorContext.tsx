import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { useEffect } from 'react';
import { get, set, del } from 'idb-keyval';
import { toast } from 'sonner';
import { Check } from 'iconoir-react';

import { updateCSSVariable, updateCSSVariables } from '~/utils/styles';
import type { TextAlignment } from '~/types/editor';
import { TEXT_ALIGNMENT_OPTIONS } from '~/consts';

interface BackgroundPattern {
  url: string | null;
  name: string | null;
  color: string;
  opacity: number;
}

type EditorState = {
  // Text
  primaryTitle: string;
  primaryTitleColor: string;
  primaryTitleFontSize: number | string;
  primaryTitleFont: string | null;
  primaryTitleAlign: TextAlignment;
  subTitle: string;
  subTitleColor: string;
  subTitleFontSize: number | string;
  subTitleFont: string | null;
  subTitleAlign: TextAlignment;
  // Background
  backgroundImage: string | null;
  backgroundColor: string;
  backgroundPattern: BackgroundPattern;
};

type EditorActions = {
  setHasHydrated: (state: boolean) => void;
  // Text
  setPrimaryTitle: (title: string) => void;
  setPrimaryTitleColor: (color: string) => void;
  setPrimaryTitleFontSize: (size: number | string) => void;
  setPrimaryTitleFont: (font: string | null) => void;
  setPrimaryTitleAlign: (align: TextAlignment) => void;
  setSubTitle: (title: string) => void;
  setSubTitleColor: (color: string) => void;
  setSubTitleFontSize: (size: number | string) => void;
  setSubTitleFont: (font: string | null) => void;
  setSubTitleAlign: (align: TextAlignment) => void;
  // Background
  setBackgroundColor: (color: string) => void;
  setBackgroundImage: (url: string | null) => void;
  setBackgroundPattern: (pattern: BackgroundPattern) => void;
  // Reset
  resetEditor: () => void;
};

const defaultState: EditorState = {
  // Text
  primaryTitle: '10 Tips/Principles For Cleaner React Code.',
  primaryTitleColor: 'rgba(255, 255, 255, 1)',
  primaryTitleFontSize: 28,
  primaryTitleFont: 'sans-serif (default)',
  primaryTitleAlign: TEXT_ALIGNMENT_OPTIONS.center,
  subTitle: '',
  subTitleColor: 'rgba(255, 255, 255, 1)',
  subTitleFontSize: 20,
  subTitleFont: 'sans-serif (default)',
  subTitleAlign: TEXT_ALIGNMENT_OPTIONS.center,
  // Background
  backgroundColor: 'rgba(51, 51, 51, 1)',
  backgroundImage: null,
  backgroundPattern: {
    url: null,
    color: '#ffffff',
    name: null,
    opacity: 1
  }
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
      setPrimaryTitleFont: (font) => {
        set({ primaryTitleFont: font });
        if (font) {
          updateCSSVariable({ name: '--cover-title-font', value: font });
        }
      },
      setPrimaryTitleAlign: (align) => {
        set({ primaryTitleAlign: align });
        updateCSSVariable({ name: '--cover-title-align', value: align });
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
      setSubTitleFont: (font) => {
        set({ subTitleFont: font });
        if (font) {
          updateCSSVariable({ name: '--cover-subtitle-font', value: font });
        }
      },
      setSubTitleAlign: (align) => {
        set({ subTitleAlign: align });
        updateCSSVariable({ name: '--cover-subtitle-align', value: align });
      },
      // Background
      setBackgroundColor: (color) => {
        set({ backgroundColor: color });
        updateCSSVariable({ name: '--cover-background-color', value: color });
      },
      setBackgroundImage: (url) => {
        set({ backgroundImage: url, backgroundPattern: { ...defaultState.backgroundPattern, url } });
      },
      setBackgroundPattern: (pattern) => {
        set({ backgroundPattern: pattern });
      },

      // Reset
      resetEditor: () => {
        const state = useEditor.getState();
        if (state.backgroundImage?.startsWith('blob:')) {
          URL.revokeObjectURL(state.backgroundImage);
        }

        toast.success('Cover reset.', {
          id: 'reset-cover',
          icon: <Check width={24} height={24} color="var(--mantine-primary-color-8)" />
        });

        // Reset CSS variables
        updateCSSVariables({
          '--cover-title-color': defaultState.primaryTitleColor,
          '--cover-subtitle-color': defaultState.subTitleColor,
          '--cover-title-font-size': `${defaultState.primaryTitleFontSize}px`,
          '--cover-subtitle-font-size': `${defaultState.subTitleFontSize}px`,
          '--cover-background-color': defaultState.backgroundColor,
          '--cover-color-overlay-opacity': '0%',
          '--cover-title-font': defaultState.primaryTitleFont ?? 'sans-serif',
          '--cover-subtitle-font': defaultState.subTitleFont ?? 'sans-serif',
          '--cover-title-align': defaultState.primaryTitleAlign,
          '--cover-subtitle-align': defaultState.subTitleAlign
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
        primaryTitleAlign: state.primaryTitleAlign,
        subTitle: state.subTitle,
        subTitleColor: state.subTitleColor,
        subTitleFontSize: state.subTitleFontSize,
        subTitleAlign: state.subTitleAlign,
        backgroundColor: state.backgroundColor,
        primaryTitleFont: state.primaryTitleFont,
        subTitleFont: state.subTitleFont,
        backgroundPattern: state.backgroundPattern
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          setTimeout(() => {
            toast.error('Failed to hydrate editor state. Please refresh the page.', {
              action: {
                label: 'Refresh',
                onClick: () => window.location.reload()
              }
            });
          }, 0);
          return;
        } else if (state) {
          state.setHasHydrated(true);
        }
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
        '--cover-background-color': state.backgroundColor,
        '--cover-title-font': state.primaryTitleFont ?? 'sans-serif',
        '--cover-subtitle-font': state.subTitleFont ?? 'sans-serif',
        '--cover-title-align': state.primaryTitleAlign,
        '--cover-subtitle-align': state.subTitleAlign
      });
    }
  }, [hasHydrated]);

  if (!hasHydrated) {
    return skeleton ?? null;
  }

  return <>{children}</>;
}
