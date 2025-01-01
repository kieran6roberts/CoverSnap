import { Flex, Anchor, Box, ActionIcon, Modal, Text, Card, Group, Image, Stack, Button, Mark } from '@mantine/core';
import { Link, MetaFunction } from '@remix-run/react';
import { useRef, useState, useEffect } from 'react';

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
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedEditor');
    if (!hasVisited) {
      localStorage.setItem('hasVisitedEditor', 'true');
      setIsWelcomeModalOpen(true);
    }
  }, []);

  return (
    <>
      {isWelcomeModalOpen && (
        <Modal
          centered
          opened
          onClose={() => setIsWelcomeModalOpen(false)}
          fz="xl"
          title={
            <Text size="xl" fw={500}>
              Welcome to CoverSnap!
            </Text>
          }
          size="md"
        >
          <Stack>
            <Text size="md" mb="lg">
              CoverSnap is a <Mark>free</Mark> tool that helps you generate great looking cover images for your blog
              posts. Use the editor on the left to customise your cover as you see fit. When you're ready, download your
              cover image by clicking the download button beneath the preview.
            </Text>
            <Card padding="md" radius="md" mb="xl" withBorder>
              <Card.Section>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>My Clean Code Principles</Text>
              </Group>
              <Text c="dimmed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Donec id elit non mi porta
                gravida at eget metus.
              </Text>
            </Card>
            <Button variant="filled" fullWidth data-autofocus onClick={() => setIsWelcomeModalOpen(false)}>
              Start editing
            </Button>
          </Stack>
        </Modal>
      )}

      <Box
        component="header"
        w="100%"
        py="md"
        px="lg"
        style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}
      >
        <Flex component="nav" justify="space-between" align="center">
          <Anchor component={Link} to="/" display="flex" aria-label="CoverSnap logo">
            <Image src="/favicon.ico" width={36} height={36} alt="CoverSnap logo" />
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
              <EditorDrawer imageNodeRef={coverImageNodeRef} />
            </Box>

            <CoverImage imageNodeRef={coverImageNodeRef} />
            {/* <CoverList /> */}

            {/* Editor Drawer for mobile */}
            <Box hiddenFrom="md">
              <EditorDrawer imageNodeRef={coverImageNodeRef} />
            </Box>
          </Flex>
        </EditorProvider>
      </main>
    </>
  );
}
