'use client';

import { Flex, Button } from '@mantine/core';
import { Link } from '@remix-run/react';
import { Github } from 'iconoir-react';

import { GITHUB_URL } from '~/consts';

export function GitHubStarButton({
  size = 'md',
  variant = 'filled',
  visibleFrom,
  hiddenFrom,
  isFullWidth = false
}: {
  size?: 'sm' | 'md';
  variant?: 'filled' | 'outline' | 'light';
  visibleFrom?: 'md' | 'sm';
  hiddenFrom?: 'md' | 'sm';
  isFullWidth?: boolean;
}) {
  return (
    <Button
      component={Link}
      target="_blank"
      to={GITHUB_URL}
      size={size}
      variant={variant}
      color="var(--mantine-primary-color-7)"
      {...(isFullWidth ? { fullWidth: true } : {})}
      {...(visibleFrom ? { visibleFrom } : {})}
      {...(hiddenFrom ? { hiddenFrom } : {})}
    >
      <Flex align="center" gap="xs">
        <Github width={20} /> GitHub
      </Flex>
    </Button>
  );
}
