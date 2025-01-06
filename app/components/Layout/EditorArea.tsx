'use client';

import { useRef } from 'react';
import { Flex } from '@mantine/core';

import { EditorDrawer } from '~/components/DrawerEditing/EditorDrawer';
import { CoverImage } from '~/components/CoverImage';

export function EditorArea() {
  const coverImageNodeRef = useRef<HTMLDivElement>(null);

  return (
    <Flex direction={{ base: 'column-reverse', md: 'row' }}>
      <EditorDrawer imageNodeRef={coverImageNodeRef} />
      <CoverImage imageNodeRef={coverImageNodeRef} />
    </Flex>
  );
}
