'use client';

import { useRef } from 'react';
import { Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { EditorDrawer } from '~/components/DrawerEditing/EditorDrawer';
import { CoverImage } from '~/components/CoverImage';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { EditorLoaderData } from '~/types/editor';

export function EditorArea() {
  const fetcher = useFetcher();
  const { sidebarState } = useLoaderData<EditorLoaderData>();
  const currentSidebarState = fetcher.formData ? fetcher.formData.get('sidebarState') !== 'closed' : sidebarState;
  const isSidebarOpen = currentSidebarState !== 'closed';

  const coverImageNodeRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 992px)');

  const showDrawer = isMobile || isSidebarOpen;

  return (
    <>
      <Flex
        direction={{ base: 'column-reverse', md: 'row' }}
        justify="center"
        align="center"
        h={{ base: 'auto', md: '100%' }}
      >
        {showDrawer ? <EditorDrawer imageNodeRef={coverImageNodeRef} /> : null}
        <CoverImage imageNodeRef={coverImageNodeRef} />
      </Flex>
    </>
  );
}
