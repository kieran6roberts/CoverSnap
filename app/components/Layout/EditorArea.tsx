'use client';

import { useRef } from 'react';
import { Grid } from '@mantine/core';

import { EditorDrawer } from '~/components/DrawerEditing/EditorDrawer';
import { CoverImage } from '~/components/CoverImage';
import { create } from 'zustand';
interface SidebarStore {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isDrawerOpen: true,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  setDrawerOpen: (open: boolean) => set({ isDrawerOpen: open })
}));

export function EditorArea() {
  const coverImageNodeRef = useRef<HTMLDivElement>(null);
  const { isDrawerOpen } = useSidebarStore();

  return (
    <>
      <Grid grow gutter={0} justify="center" align="center" h="100%" bg="var(--mantine-color-dark-outline-hover)">
        <Grid.Col hiddenFrom="md" span={12} order={2} h="100%">
          <EditorDrawer imageNodeRef={coverImageNodeRef} />
        </Grid.Col>
        <Grid.Col visibleFrom="md" span={isDrawerOpen ? 3 : 0} order={1} display={isDrawerOpen ? 'block' : 'none'}>
          <EditorDrawer imageNodeRef={coverImageNodeRef} />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 9 }} order={{ base: 1, md: 2 }} h="100%">
          <CoverImage imageNodeRef={coverImageNodeRef} />
        </Grid.Col>
      </Grid>
    </>
  );
}
