import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { useEffect } from 'react';
import { get, set, del } from 'idb-keyval';
import { toast } from 'sonner';
import { Check } from 'iconoir-react';

import { updateCSSVariables } from '~/utils/styles';
import { DEFAULT_EDITOR_STATE, TEMPLATES } from '~/consts/editor';

interface TextState {
  content: string;
  color: string;
  fontSize: number | string;
  font: string;
}

interface CoverState {
  id: string;
  width: number;
  height: number;
  aspectRatio: number;
}

interface BackgroundState {
  image: string | null;
  color: string;
  pattern: {
    url: string | null;
    name: string | null;
    color: string;
    opacity: number;
  };
}

interface EditorState {
  template: string;
  primaryText: TextState;
  secondaryText: TextState;
  background: BackgroundState;
  cover: CoverState;
}

type EditorActions = {
  setHasHydrated: (state: boolean) => void;
  updatePrimaryText: (updates: Partial<TextState>) => void;
  updateSecondaryText: (updates: Partial<TextState>) => void;
  updateBackground: (updates: Partial<BackgroundState>) => void;
  updateCover: (updates: CoverState) => void;
  updateTemplate: (templateId: string) => void;
  resetEditor: () => void;
};

const defaultState: EditorState = DEFAULT_EDITOR_STATE;

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

      updatePrimaryText: (updates) => {
        set((state) => {
          return {
            primaryText: { ...state.primaryText, ...updates }
          };
        });

        const cssUpdates: Record<string, string> = {};

        if (updates.color) {
          cssUpdates['--cover-primary-text-color'] = updates.color;
        }
        if (updates.fontSize) {
          cssUpdates['--cover-primary-text-font-size'] = `${updates.fontSize}px`;
        }
        if (updates.font) {
          cssUpdates['--cover-primary-text-font'] = updates.font;
        }

        if (Object.keys(cssUpdates).length > 0) {
          updateCSSVariables(cssUpdates);
        }
      },

      updateSecondaryText: (updates) => {
        set((state) => {
          return {
            secondaryText: { ...state.secondaryText, ...updates }
          };
        });

        const cssUpdates: Record<string, string> = {};

        if (updates.color) {
          cssUpdates['--cover-secondary-text-color'] = updates.color;
        }
        if (updates.fontSize) {
          cssUpdates['--cover-secondary-text-font-size'] = `${updates.fontSize}px`;
        }
        if (updates.font) {
          cssUpdates['--cover-secondary-text-font'] = updates.font;
        }

        if (Object.keys(cssUpdates).length > 0) {
          updateCSSVariables(cssUpdates);
        }
      },

      updateBackground: (updates) => {
        set((state) => {
          const newState = {
            background: { ...state.background, ...updates }
          };

          // Clear pattern when setting image
          if (updates.image) {
            newState.background.pattern = {
              name: null,
              url: null,
              color: state.background.pattern.color,
              opacity: state.background.pattern.opacity
            };
          }
          return newState;
        });

        if (updates.color) {
          updateCSSVariables({
            '--cover-background-color': updates.color
          });
        }
      },

      updateCover: (updates) => {
        set((state) => {
          return {
            cover: { ...state.cover, ...updates }
          };
        });

        updateCSSVariables({ '--cover-aspect-ratio': `${updates.aspectRatio}` });
      },

      updateTemplate: (templateId) => {
        set((state) => {
          const template = TEMPLATES.find((t) => t.id === templateId);
          if (!template) return state;

          updateCSSVariables(template.styles);

          return {
            ...state,
            template: templateId
          };
        });
      },

      resetEditor: () => {
        const state = useEditor.getState();
        if (state.background.image?.startsWith('blob:')) {
          URL.revokeObjectURL(state.background.image);
        }

        toast.success('Cover reset.', {
          id: 'reset-cover',
          icon: <Check width={24} height={24} color="var(--mantine-primary-color-8)" />
        });

        updateCSSVariables({
          /* Cover Wrapper */
          '--cover-display': 'flex',
          '--cover-justify-content': 'center',
          '--cover-align-items': 'center',
          '--cover-flex-direction': 'column',

          /* Cover Primary Text */
          '--cover-primary-text-color': defaultState.primaryText.color,
          '--cover-primary-text-font-size': `${defaultState.primaryText.fontSize}px`,
          '--cover-primary-text-font': defaultState.primaryText.font,
          '--cover-primary-text-align': 'center',

          /* Cover Primary Text */
          '--cover-secondary-text-color': defaultState.secondaryText.color,
          '--cover-secondary-text-font-size': `${defaultState.secondaryText.fontSize}px`,
          '--cover-secondary-text-font': defaultState.secondaryText.font,
          '--cover-secondary-text-align': 'center',
          '--cover-secondary-bottom': 'unset',
          '--cover-secondary-right': 'unset',
          '--cover-secondary-left': 'unset',
          '--cover-secondary-position': 'relative',

          /* Cover Background (overlay) */
          '--cover-color-overlay-opacity': '0%',
          '--cover-background-color': defaultState.background.color
        });

        set({ _hasHydrated: true, ...defaultState });
      }
    }),
    {
      name: 'editor-storage',
      storage: createJSONStorage(() => indexDBStorage),
      // @ts-expect-error fix: todo
      partialize: (state) => ({
        template: state.template,
        primaryText: state.primaryText,
        secondaryText: state.secondaryText,
        background: {
          color: state.background.color,
          pattern: state.background.pattern
        },
        cover: state.cover
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

export function EditorHydration({ children, skeleton }: { children: React.ReactNode; skeleton?: React.ReactNode }) {
  const hasHydrated = useEditor((state) => state._hasHydrated);

  useEffect(() => {
    if (hasHydrated) {
      const state = useEditor.getState();
      const template = TEMPLATES.find((t) => t.id === state.template);

      updateCSSVariables({
        /* Cover Primary Text */
        '--cover-primary-text-color': state.primaryText.color,
        '--cover-primary-text-font-size': `${state.primaryText.fontSize}px`,
        '--cover-primary-text-font': state.primaryText.font,

        /* Cover Secondary Text */
        '--cover-secondary-text-color': state.secondaryText.color,
        '--cover-secondary-text-font-size': `${state.secondaryText.fontSize}px`,
        '--cover-secondary-text-font': state.secondaryText.font,

        /* 
          Cover Background (overlay)

          Note: For now the image & bg opacity is not persisted.
         */
        '--cover-background-color': state.background.color,

        /*
        '--cover-align-items
        '--cover-primary-text-align
        '--cover-secondary-position
        '--cover-secondary-bottom
        '--cover-secondary-right
        '--cover-secondary-left
        '--cover-secondary-text-align
        */
        ...template?.styles,
        /* Cover Aspect Ratio */
        '--cover-aspect-ratio': `${(state.cover.width / state.cover.height).toFixed(1)}`
      });
    }
  }, [hasHydrated]);

  if (!hasHydrated) {
    return skeleton ?? null;
  }

  return <>{children}</>;
}
