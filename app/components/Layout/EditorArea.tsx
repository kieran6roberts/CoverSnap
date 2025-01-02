'use client';

import { useRef } from 'react';
import { Flex, Box } from '@mantine/core';

import { EditorProvider } from '~/contexts/EditorContext';
import { EditorDrawer } from '~/components/DrawerEditing/EditorDrawer';
import { CoverImage } from '~/components/CoverImage';

export function EditorArea() {
  const coverImageNodeRef = useRef<HTMLDivElement>(null);

  return (
    <EditorProvider>
      <Flex direction={{ base: 'column-reverse', md: 'row' }}>
        <Box visibleFrom="md">
          <EditorDrawer imageNodeRef={coverImageNodeRef} />
        </Box>

        <CoverImage imageNodeRef={coverImageNodeRef} />
      </Flex>
    </EditorProvider>
  );
}
