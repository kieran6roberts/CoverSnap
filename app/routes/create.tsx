import { Flex, Anchor, Box, Image } from '@mantine/core';
import { Link, MetaFunction } from '@remix-run/react';

import { WelcomeModal } from '~/components/WelcomeModal';
import { GitHubStarButton } from '~/components/GitHubStarButton';
import { ColorSchemeToggle } from '~/components/ThemeToggle';
import { MobileGithubButton } from '~/components/MobileGithubButton';
import { EditorArea } from '~/components/Layout/EditorArea';

export const meta: MetaFunction = () => {
  return [
    { title: 'CoverSnap | Create Blog Cover Images' },
    {
      name: 'description',
      content: 'Use the editing tools to build your cover image and download it when you are ready.'
    }
  ];
};

export default function Create() {
  return (
    <>
      <WelcomeModal />

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
            <MobileGithubButton />
          </Flex>
        </Flex>
      </Box>
      <main>
        <EditorArea />
      </main>
    </>
  );
}
