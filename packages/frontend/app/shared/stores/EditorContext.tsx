import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { useEffect } from 'react';
import { get, set, del } from 'idb-keyval';
import { toast } from 'sonner';
import { Check } from 'iconoir-react';

import { updateCSSVariables } from '~/shared/utils/styles';
import { BACKGROUND_TEMPLATES, LAYOUT_TEMPLATES } from '~/features/editor/consts/templates';
import {
  DEFAULT_EDITOR_STATE,
  CoverSettings,
  PrimaryTextSettings,
  SecondaryTextSettings,
  BackgroundSettings,
  TemplateSettings
} from '~/shared/consts';
import { CSSVariableKey } from '~/shared/types/styles';
import { PREVIEW_VARIABLE_NAMES } from '~/config/consts/styles';
import { DeepReadonly } from '~/shared/types';

type EditorState = DeepReadonly<{
  template: TemplateSettings;
  primaryText: PrimaryTextSettings;
  secondaryText: SecondaryTextSettings;
  background: BackgroundSettings;
  cover: CoverSettings;
}>;

type EditorActions = {
  setHasHydrated: (state: boolean) => void;
  updatePrimaryText: (updates: Partial<PrimaryTextSettings>) => void;
  updateSecondaryText: (updates: Partial<SecondaryTextSettings>) => void;
  updateBackground: (updates: Partial<EditorState['background']>) => void;
  updateCover: (updates: CoverSettings) => void;
  updateTemplate: (updates: Partial<TemplateSettings>) => void;
  resetEditor: () => void;
};

const defaultState: EditorState = {
  template: DEFAULT_EDITOR_STATE.template,
  primaryText: DEFAULT_EDITOR_STATE.primaryText,
  secondaryText: DEFAULT_EDITOR_STATE.secondaryText,
  background: DEFAULT_EDITOR_STATE.background,
  cover: DEFAULT_EDITOR_STATE.cover
};

export const indexDBStorage: StateStorage = {
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
  persist<EditorState & EditorActions & { _hasHydrated: boolean; isResettingImage: boolean }>(
    (set) => ({
      _hasHydrated: false,
      isResettingImage: false,
      ...defaultState,
      setHasHydrated: (state) => set({ _hasHydrated: state }),

      updatePrimaryText: (updates) => {
        set((state) => {
          return {
            primaryText: { ...state.primaryText, ...updates }
          };
        });

        const cssUpdates: Partial<Record<CSSVariableKey, string>> = {};

        if (updates.color) {
          cssUpdates[PREVIEW_VARIABLE_NAMES.primaryText.color] = updates.color;
        }
        if (updates.fontSize) {
          cssUpdates[PREVIEW_VARIABLE_NAMES.primaryText.fontSize] = `${updates.fontSize}px`;
        }
        if (updates.font) {
          cssUpdates[PREVIEW_VARIABLE_NAMES.primaryText.font] = updates.font;
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

        const cssUpdates: Partial<Record<CSSVariableKey, string>> = {};

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

          const cssUpdates: Partial<Record<CSSVariableKey, string>> = {};

          if (updates.colors?.color1) {
            cssUpdates['--cover-background-color-1'] = updates.colors?.color1;
          }
          if (updates.colors?.color2) {
            cssUpdates['--cover-background-color-2'] = updates.colors?.color2;
          }
          if (updates.colors?.color3) {
            cssUpdates['--cover-background-color-3'] = updates.colors?.color3;
          }
          if (updates.colors?.color4) {
            cssUpdates['--cover-background-color-4'] = updates.colors?.color4;
          }

          if (Object.keys(cssUpdates).length > 0) {
            updateCSSVariables(cssUpdates);
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

        if (updates.layoutId) {
          const layoutTemplate = LAYOUT_TEMPLATES.find((t) => t.id === updates.layoutId);

          // Update layout CSS variables
          updateCSSVariables({
            ...(layoutTemplate?.styles || {})
          });
        }

        set({
          ...state,
          template: {
            ...state.template,
            ...(updates.layoutId ? { layoutId: updates.layoutId } : {}),
            ...(updates.backgroundId ? { backgroundId: updates.backgroundId } : {})
          }
        });
      },

      resetEditor: async () => {
        set({ isResettingImage: true });

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
          '--cover-align-items': 'flex-start',
          '--cover-flex-direction': 'column',

          /* Cover Primary Text */
          '--cover-primary-text-color': DEFAULT_EDITOR_STATE.primaryText.color,
          '--cover-primary-text-font-size': `${DEFAULT_EDITOR_STATE.primaryText.fontSize}px`,
          '--cover-primary-text-font': DEFAULT_EDITOR_STATE.primaryText.font,
          '--cover-primary-text-align': 'left',

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
          '--cover-background-color-1': DEFAULT_EDITOR_STATE.background.colors?.color1 ?? 'rgba(81, 133, 196, 1)',
          '--cover-background-color-2': DEFAULT_EDITOR_STATE.background.colors?.color2 ?? 'rgba(51, 51, 51, 1)',
          '--cover-background-color-3': DEFAULT_EDITOR_STATE.background.colors?.color3 ?? 'rgba(51, 51, 51, 1)',
          '--cover-background-color-4': DEFAULT_EDITOR_STATE.background.colors?.color4 ?? 'rgba(51, 51, 51, 1)',

          /* Cover Aspect Ratio */
          '--cover-aspect-ratio': `${(DEFAULT_EDITOR_STATE.cover.width / DEFAULT_EDITOR_STATE.cover.height).toFixed(1)}`
        });

        await indexDBStorage.removeItem('editor-storage');

        setTimeout(() => {
          set({
            _hasHydrated: true,
            isResettingImage: false,
            ...defaultState,
            template: {
              layoutId: LAYOUT_TEMPLATES[0].id,
              backgroundId: BACKGROUND_TEMPLATES[0].id
            },
            background: {
              ...DEFAULT_EDITOR_STATE.background
            }
          });
        }, 500);

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
      version: 1,
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
        '--cover-background-color-1': state.background.colors?.color1 ?? 'rgba(81, 133, 196, 1)',
        '--cover-background-color-2': state.background.colors?.color2 ?? 'rgba(51, 51, 51, 1)',
        '--cover-background-color-3': state.background.colors?.color3 ?? 'rgba(51, 51, 51, 1)',
        '--cover-background-color-4': state.background.colors?.color4 ?? 'rgba(51, 51, 51, 1)',
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
