import { DownloadCircle } from 'iconoir-react';
import { Flex, Anchor, Box, Button } from '@mantine/core';
import { Link } from '@remix-run/react';
import { useRef } from 'react';
import toast from 'react-hot-toast';

import { BrandLogo } from '~/components/BrandLogo';
import { ColorSchemeToggle } from '~/components/ThemeToggle';
import { EditorDrawer } from '~/components/EditorDrawer';
import { CoverImage } from '~/components/CoverImage';
import { EditorProvider } from '../contexts/EditorContext';
import { saveDomNodeAsImage } from '~/utils/domToNode';

export default function Create() {
  const coverImageNodeRef = useRef<HTMLDivElement>(null);

  const onDownload = async () => {
    if (coverImageNodeRef.current) {
      toast.promise(saveDomNodeAsImage(coverImageNodeRef.current), {
        loading: 'Loading',
        success: 'Cover image downloaded successfully.',
        error: 'Failed to download cover image.'
      });
    }
  };

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
          <Flex gap="xs">
            <ColorSchemeToggle />
            <Button onClick={onDownload} rightSection={<DownloadCircle />}>
              Download Image
            </Button>
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
