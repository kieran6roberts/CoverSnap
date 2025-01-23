import { Box, Flex, Image } from '@mantine/core';
import { Link } from 'react-router';

import { ThemeToggle } from '~/shared/components/ThemeToggle';
import { GitHubStarButton } from '~/shared/components/GitHubStarButton';
import { MobileGithubButton } from '~/shared/components/MobileGitHubButton';
import { SITE_NAME } from '~/config/consts';

export function Navbar() {
  return (
    <Box
      component="header"
      w="100%"
      py="md"
      px="lg"
      style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}
    >
      <Flex component="nav" justify="space-between" align="center">
        <Link
          to="/"
          style={{ fontSize: '1.5rem', fontWeight: 500, textDecoration: 'none' }}
          aria-label={`${SITE_NAME} logo`}
          viewTransition
        >
          <Image src="/favicon.ico" width={36} height={36} alt={`${SITE_NAME} logo`} />
        </Link>

        <Flex gap="xs">
          <ThemeToggle />
          <GitHubStarButton visibleFrom="md" size="sm" variant="light" />
          <MobileGithubButton />
        </Flex>
      </Flex>
    </Box>
  );
}
