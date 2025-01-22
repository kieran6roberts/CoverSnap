import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface EditorUIState {
  isDrawerOpen: boolean;
  openSections: string[];
  hasSeenWelcome: boolean;

  setDrawerOpen: (isOpen: boolean) => void;
  setOpenSections: (sections: string[]) => void;
  setHasSeenWelcome: (hasSeen: boolean) => void;
}

export const useEditorUIStore = create<EditorUIState>()(
  persist(
    (set) => ({
      isDrawerOpen: true,
      openSections: [],
      hasSeenWelcome: false,

      setDrawerOpen: (isOpen: boolean) => set({ isDrawerOpen: isOpen }),
      setOpenSections: (sections: string[]) => set({ openSections: sections }),
      setHasSeenWelcome: (hasSeen: boolean) => set({ hasSeenWelcome: hasSeen })
    }),
    {
      name: 'editor-ui-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isDrawerOpen: state.isDrawerOpen,
        openSections: state.openSections,
        hasSeenWelcome: state.hasSeenWelcome
      }),
      version: 1
    }
  )
);
