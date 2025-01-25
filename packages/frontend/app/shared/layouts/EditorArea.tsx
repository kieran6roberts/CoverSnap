import { useRef } from 'react';
import { Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { Drawer } from '~/features/editor/components/Drawer';
import { CoverImage } from '~/features/preview/components/CoverImage';
import { useEditorUIStore } from '~/shared/stores/EditorUIStore';

export function EditorArea() {
  const { isDrawerOpen, isHydrated } = useEditorUIStore();

  const coverImageNodeRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 992px)');

  const showDrawer = isMobile || isDrawerOpen;

  return (
    <>
      <Flex
        direction={{ base: 'column-reverse', md: 'row' }}
        justify="center"
        align="center"
        h={{ base: 'auto', md: '100%' }}
      >
        {showDrawer && isHydrated ? <Drawer imageNodeRef={coverImageNodeRef} /> : null}
        <CoverImage imageNodeRef={coverImageNodeRef} />
      </Flex>
    </>
  );
}
