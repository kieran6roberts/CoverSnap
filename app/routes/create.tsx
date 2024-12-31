import { Flex, Anchor, Box, ActionIcon } from '@mantine/core';
import { Link, MetaFunction } from '@remix-run/react';
import { useRef } from 'react';

import { BrandLogo } from '~/components/BrandLogo';
import { EditorDrawer } from '~/components/DrawerEditing/EditorDrawer';
import { CoverImage } from '~/components/CoverImage';
import { EditorProvider } from '~/contexts/EditorContext';

import { GitHubStarButton } from '~/components/GitHubStarButton';
import { ColorSchemeToggle } from '~/components/ThemeToggle';
import { Github } from 'iconoir-react';

export const meta: MetaFunction = () => {
  return [
    { title: 'CoverSnap | Create Cover Image' },
    {
      name: 'description',
      content: 'Use the editing tools to build your cover image and download it when you are ready.'
    }
  ];
};

export default function Create() {
  const coverImageNodeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Box
        component="header"
        w="100%"
        py="md"
        px="lg"
        h={75}
        style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}
      >
        <Flex component="nav" justify="space-between" align="center">
          <Anchor size="sm" w={125} fw={125} variant="text" component={Link} to="/" display="flex">
            <BrandLogo />
          </Anchor>
          <Flex gap="xs">
            <ColorSchemeToggle />
            <GitHubStarButton visibleFrom="md" size="sm" variant="light" />
            <ActionIcon hiddenFrom="md" variant="light" size="lg">
              <Github />
            </ActionIcon>
          </Flex>
        </Flex>
      </Box>
      <main>
        <EditorProvider>
          <Flex direction={{ base: 'column', md: 'row' }}>
            {/* Editor Drawer for desktop */}

            <Box visibleFrom="md">
              <EditorDrawer />
            </Box>

            <CoverImage imageNodeRef={coverImageNodeRef} />
            {/* <CoverList /> */}

            {/* Editor Drawer for mobile */}
            <Box hiddenFrom="md">
              <EditorDrawer />
            </Box>
          </Flex>
        </EditorProvider>
      </main>
    </>
  );
}
