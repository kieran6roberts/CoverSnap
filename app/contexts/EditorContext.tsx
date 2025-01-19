import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { useEffect } from 'react';
import { get, set, del } from 'idb-keyval';
import { toast } from 'sonner';
import { Check } from 'iconoir-react';

import { updateCSSVariables } from '~/utils/styles';
import { BACKGROUND_TEMPLATES, DEFAULT_EDITOR_STATE, LAYOUT_TEMPLATES } from '~/consts/editor';

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
  colors: {
    color1: string;
    color2: string;
  };
  pattern: {
    url: string | null;
    name: string | null;
    color: string;
    opacity: number;
  };
}

interface TemplateState {
  layoutId: string;
  backgroundId: string;
}

interface EditorState {
  template: TemplateState;
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
  updateTemplate: (updates: Partial<TemplateState>) => void;
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

          if (updates.colors) {
            updateCSSVariables({
              ...(updates.colors?.color1 ? { '--cover-background-color-1': updates.colors.color1 } : {}),
              ...(updates.colors?.color2 ? { '--cover-background-color-2': updates.colors.color2 } : {})
            });
          }

          return newState;
        });
      },

      updateCover: (updates) => {
        set((state) => {
          return {
            cover: { ...state.cover, ...updates }
          };
        });

        updateCSSVariables({ '--cover-aspect-ratio': `${updates.aspectRatio}` });
      },

      updateTemplate: (updates) => {
        const state = useEditor.getState();
        const newState = { ...state };

        if (updates.backgroundId) {
          newState.template.backgroundId = updates.backgroundId;
        }

        if (updates.layoutId) {
          const layoutTemplate = LAYOUT_TEMPLATES.find((t) => t.id === updates.layoutId);
          newState.template.layoutId = updates.layoutId;

          // Update layout CSS variables
          updateCSSVariables({
            ...(layoutTemplate?.styles || {})
          });
        }

        set(newState);
      },

      resetEditor: async () => {
        const state = useEditor.getState();
        if (state.background.image?.startsWith('blob:')) {
          URL.revokeObjectURL(state.background.image);
        }

        const defaultLayoutTemplate = LAYOUT_TEMPLATES.find((t) => t.id === DEFAULT_EDITOR_STATE.template.layoutId);

        updateCSSVariables({
          ...defaultLayoutTemplate?.styles,
          /* Cover Wrapper */
          '--cover-display': 'flex',
          '--cover-justify-content': 'center',
          '--cover-align-items': 'center',
          '--cover-flex-direction': 'column',

          /* Cover Primary Text */
          '--cover-primary-text-color': DEFAULT_EDITOR_STATE.primaryText.color,
          '--cover-primary-text-font-size': `${DEFAULT_EDITOR_STATE.primaryText.fontSize}px`,
          '--cover-primary-text-font': DEFAULT_EDITOR_STATE.primaryText.font,
          '--cover-primary-text-align': 'center',

          /* Cover Secondary Text */
          '--cover-secondary-text-color': DEFAULT_EDITOR_STATE.secondaryText.color,
          '--cover-secondary-text-font-size': `${DEFAULT_EDITOR_STATE.secondaryText.fontSize}px`,
          '--cover-secondary-text-font': DEFAULT_EDITOR_STATE.secondaryText.font,
          '--cover-secondary-text-align': 'center',
          '--cover-secondary-bottom': 'unset',
          '--cover-secondary-right': 'unset',
          '--cover-secondary-left': 'unset',
          '--cover-secondary-position': 'relative',

          /* Cover Background */
          '--cover-color-overlay-opacity': '0%',
          '--cover-background-color-1': DEFAULT_EDITOR_STATE.background.colors?.color1,
          '--cover-background-color-2': DEFAULT_EDITOR_STATE.background.colors?.color2,

          /* Cover Aspect Ratio */
          '--cover-aspect-ratio': `${(DEFAULT_EDITOR_STATE.cover.width / DEFAULT_EDITOR_STATE.cover.height).toFixed(1)}`
        });

        await indexDBStorage.removeItem('editor-storage');

        set(() => ({
          _hasHydrated: true,
          ...defaultState,
          template: {
            layoutId: LAYOUT_TEMPLATES[0].id,
            backgroundId: BACKGROUND_TEMPLATES[0].id
          }
        }));

        toast.success('Cover reset.', {
          id: 'reset-cover',
          icon: <Check width={24} height={24} color="var(--mantine-primary-color-8)" />
        });
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
          colors: state.background.colors,
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
      const layoutTemplate = LAYOUT_TEMPLATES.find((t) => t.id === state.template.layoutId);
      // const backgroundTemplate = BACKGROUND_TEMPLATES.find((t) => t.id === state.template.backgroundId);

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
        '--cover-background-color-1': state.background.colors.color1,
        '--cover-background-color-2': state.background.colors.color2,
        /*
        '--cover-align-items
        '--cover-primary-text-align
        '--cover-secondary-position
        '--cover-secondary-bottom
        '--cover-secondary-right
        '--cover-secondary-left
        '--cover-secondary-text-align
        */
        ...layoutTemplate?.styles,
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
