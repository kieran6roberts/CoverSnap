'use client';

import { useRef } from 'react';
import { Flex, Box } from '@mantine/core';

import { EditorDrawer } from '~/components/DrawerEditing/EditorDrawer';
import { CoverImage } from '~/components/CoverImage';

export function EditorArea() {
  const coverImageNodeRef = useRef<HTMLDivElement>(null);

  return (
    <Flex direction={{ base: 'column-reverse', md: 'row' }}>
      <Box>
        <EditorDrawer imageNodeRef={coverImageNodeRef} />
      </Box>

      <CoverImage imageNodeRef={coverImageNodeRef} />
    </Flex>
  );
}
