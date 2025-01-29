import { Box, Flex, Image, Text, Button } from '@mantine/core';
import { Link } from 'react-router';

import { ThemeToggle } from '~/shared/components/ThemeToggle';
import { GitHubStarButton } from '~/shared/components/GitHubStarButton';
import { MobileGithubButton } from '~/shared/components/MobileGitHubButton';
import { SITE_NAME } from '~/config/consts';

import classes from './styles/Navbar.module.css';

export function Navbar() {
  return (
    <Box
      component="header"
      w="100%"
      px="lg"
      style={{ borderBottom: '1px solid var(--mantine-color-default-border)', zIndex: 50 }}
      className={classes.navbar}
    >
      <Flex component="nav" justify="space-between" align="center" h="68px">
        <Flex
          component={Link}
          to="/"
          align="center"
          gap="xs"
          aria-label={`${SITE_NAME} logo`}
          style={{ textDecoration: 'none' }}
          viewTransition
        >
          <Image src="/favicon.ico" width={36} height={36} alt={`${SITE_NAME} logo`} />
          <Text component="span" size="lg" fw={500}>
            {SITE_NAME}
          </Text>
        </Flex>

        <Flex gap="lg" align="center">
          <Flex gap="xs" align="center">
            <GitHubStarButton visibleFrom="md" size="sm" variant="outline" />
            <Button component={Link} to="/create" size="sm" viewTransition>
              Editor
            </Button>
          </Flex>
          <MobileGithubButton />
          <ThemeToggle />
        </Flex>
      </Flex>
    </Box>
  );
}
