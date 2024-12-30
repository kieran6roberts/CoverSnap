import { BrandLogo } from '~/components/BrandLogo';

import { Flex, Anchor, Box } from '@mantine/core';
import { Link } from '@remix-run/react';
import { ColorSchemeToggle } from '~/components/ThemeToggle';
import { EditorDrawer } from '~/components/EditorDrawer';
import { CoverImage } from '~/components/CoverImage';
import { EditorProvider } from '../contexts/EditorContext';

export default function Create() {
  return (
    <>
      <Box
        component="header"
        w="100%"
        py="md"
        px="xl"
        h={75}
        style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}
      >
        <Flex component="nav" justify="space-between" align="center">
          <Anchor size="sm" w={150} fw={500} variant="text" component={Link} to="/">
            <BrandLogo />
          </Anchor>
          <ColorSchemeToggle />
        </Flex>
      </Box>
      <main>
        <EditorProvider>
          <Flex direction={{ base: 'column', md: 'row' }}>
            {/* Editor Drawer for desktop */}

            <Box visibleFrom="md">
              <EditorDrawer />
            </Box>

            <CoverImage />
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
