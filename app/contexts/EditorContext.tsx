import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { useEffect } from 'react';
import { get, set, del } from 'idb-keyval';
import { toast } from 'sonner';
import { Check } from 'iconoir-react';

import { updateCSSVariables } from '~/utils/styles';
import type { TextAlignment } from '~/types/editor';
import { TEXT_ALIGNMENT_OPTIONS } from '~/consts';

interface TextState {
  content: string;
  color: string;
  fontSize: number | string;
  font: string | null;
  align: TextAlignment;
  stack: {
    position: 'top' | 'bottom';
    order: number;
  };
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

type EditorState = {
  primaryText: TextState;
  secondaryText: TextState;
  background: BackgroundState;
};

type EditorActions = {
  setHasHydrated: (state: boolean) => void;
  updatePrimaryText: (updates: Partial<TextState>) => void;
  updateSecondaryText: (updates: Partial<TextState>) => void;
  updateBackground: (updates: Partial<BackgroundState>) => void;
  resetEditor: () => void;
};

const defaultState: EditorState = {
  primaryText: {
    content: '10 Tips/Principles For Cleaner React Code.',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 28,
    font: 'sans-serif (default)',
    align: TEXT_ALIGNMENT_OPTIONS.center,
    stack: {
      position: 'bottom',
      order: 0
    }
  },
  secondaryText: {
    content: '',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 20,
    font: 'sans-serif (default)',
    align: TEXT_ALIGNMENT_OPTIONS.center,
    stack: {
      position: 'top',
      order: 1
    }
  },
  background: {
    image: null,
    color: 'rgba(51, 51, 51, 1)',
    pattern: {
      url: null,
      name: null,
      color: '#ffffff',
      opacity: 1
    }
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

      updatePrimaryText: (updates) => {
        set((state) => {
          if (updates.stack) {
            const { position } = updates.stack;
            return {
              primaryText: {
                ...state.primaryText,
                ...updates,
                stack: {
                  position,
                  order: position === 'top' ? 1 : 0
                }
              },
              secondaryText: {
                ...state.secondaryText,
                stack: {
                  position: position === 'top' ? 'bottom' : 'top',
                  order: position === 'top' ? 0 : 1
                }
              }
            };
          }
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
        if (updates.align) {
          cssUpdates['--cover-primary-text-align'] = updates.align;
        }
        if (updates.stack) {
          cssUpdates['--cover-primary-text-stack'] = updates.stack.order.toString();
          cssUpdates['--cover-secondary-text-stack'] = (updates.stack.position === 'top' ? 0 : 1).toString();
        }

        if (Object.keys(cssUpdates).length > 0) {
          updateCSSVariables(cssUpdates);
        }
      },

      updateSecondaryText: (updates) => {
        set((state) => {
          if (updates.stack) {
            const { position } = updates.stack;
            return {
              secondaryText: {
                ...state.secondaryText,
                ...updates,
                stack: {
                  position,
                  order: position === 'top' ? 1 : 0
                }
              },
              primaryText: {
                ...state.primaryText,
                stack: {
                  position: position === 'top' ? 'bottom' : 'top',
                  order: position === 'top' ? 0 : 1
                }
              }
            };
          }
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
        if (updates.align) {
          cssUpdates['--cover-secondary-text-align'] = updates.align;
        }
        if (updates.stack) {
          cssUpdates['--cover-secondary-text-stack'] = updates.stack.order.toString();
          cssUpdates['--cover-primary-text-stack'] = (updates.stack.position === 'top' ? 0 : 1).toString();
        }

        if (Object.keys(cssUpdates).length > 0) {
          updateCSSVariables(cssUpdates);
        }
      },

      updateBackground: (updates) => {
        set((state) => ({
          background: { ...state.background, ...updates }
        }));

        const cssUpdates: Record<string, string> = {};

        if (updates.color) {
          cssUpdates['--cover-background-color'] = updates.color;
        }

        if (Object.keys(cssUpdates).length > 0) {
          updateCSSVariables(cssUpdates);
        }

        if (updates.image) {
          // Clear pattern when setting image
          set((state) => ({
            background: {
              ...state.background,
              pattern: defaultState.background.pattern
            }
          }));
        }
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
          '--cover-primary-text-color': defaultState.primaryText.color,
          '--cover-primary-text-font-size': `${defaultState.primaryText.fontSize}px`,
          '--cover-primary-text-font': defaultState.primaryText.font ?? 'sans-serif',
          '--cover-primary-text-align': defaultState.primaryText.align,
          '--cover-primary-text-stack': defaultState.primaryText.stack.toString(),
          '--cover-secondary-text-color': defaultState.secondaryText.color,
          '--cover-secondary-text-font-size': `${defaultState.secondaryText.fontSize}px`,
          '--cover-secondary-text-font': defaultState.secondaryText.font ?? 'sans-serif',
          '--cover-secondary-text-align': defaultState.secondaryText.align,
          '--cover-secondary-text-stack': defaultState.secondaryText.stack.toString(),
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
        primaryText: state.primaryText,
        secondaryText: state.secondaryText,
        background: state.background
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
      updateCSSVariables({
        '--cover-primary-text-color': state.primaryText.color,
        '--cover-primary-text-font-size': `${state.primaryText.fontSize}px`,
        '--cover-primary-text-font': state.primaryText.font ?? 'sans-serif',
        '--cover-primary-text-align': state.primaryText.align,
        '--cover-primary-text-stack': state.primaryText.stack.toString(),
        '--cover-secondary-text-color': state.secondaryText.color,
        '--cover-secondary-text-font-size': `${state.secondaryText.fontSize}px`,
        '--cover-secondary-text-font': state.secondaryText.font ?? 'sans-serif',
        '--cover-secondary-text-align': state.secondaryText.align,
        '--cover-secondary-text-stack': state.secondaryText.stack.toString(),
        '--cover-background-color': state.background.color
      });
    }
  }, [hasHydrated]);

  if (!hasHydrated) {
    return skeleton ?? null;
  }

  return <>{children}</>;
}
