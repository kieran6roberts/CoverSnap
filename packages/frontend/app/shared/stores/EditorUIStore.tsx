import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type OpenSection = 'templates' | 'text' | 'background' | 'info';

interface EditorUIState {
  isDrawerOpen: boolean;
  openSection: OpenSection;
  hasSeenWelcome: boolean;
  isHydrated: boolean;

  setDrawerOpen: (isOpen: boolean) => void;
  setHasHydrated: (isHydrated: boolean) => void;
  setOpenSection: (section: OpenSection) => void;
  setHasSeenWelcome: (hasSeen: boolean) => void;
}

export const useEditorUIStore = create<EditorUIState>()(
  persist(
    (set) => ({
      isDrawerOpen: true,
      openSection: 'templates',
      hasSeenWelcome: false,
      isHydrated: false,

      setDrawerOpen: (isOpen: boolean) => set({ isDrawerOpen: isOpen }),
      setHasHydrated: (isHydrated: boolean) => set({ isHydrated: isHydrated }),
      setOpenSection: (section: OpenSection) => set({ openSection: section }),
      setHasSeenWelcome: (hasSeen: boolean) => set({ hasSeenWelcome: hasSeen })
    }),
    {
      name: 'editor-ui-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isDrawerOpen: state.isDrawerOpen,
        openSection: state.openSection,
        hasSeenWelcome: state.hasSeenWelcome
      }),
      version: 1.1,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);
