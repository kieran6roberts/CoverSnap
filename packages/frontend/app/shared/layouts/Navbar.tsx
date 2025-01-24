import { Box, Flex, Image, Text } from '@mantine/core';
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
        <Flex
          component={Link}
          to="/"
          align="center"
          gap="xs"
          aria-label={`${SITE_NAME} logo`}
          style={{ textDecoration: 'none' }}
          viewTransition
        >
          <Image src="/favicon.ico" width={28} height={28} alt={`${SITE_NAME} logo`} />
          <Text component="span" size="lg" fw={500}>
            {SITE_NAME}
          </Text>
        </Flex>

        <Flex gap="xs">
          <ThemeToggle />
          <GitHubStarButton visibleFrom="md" size="sm" variant="light" />
          <MobileGithubButton />
        </Flex>
      </Flex>
    </Box>
  );
}
