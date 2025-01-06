'use client';

import { Flex, Button, ButtonProps } from '@mantine/core';
import { Link } from '@remix-run/react';
import { Github } from 'iconoir-react';

import { GITHUB_URL } from '~/consts';

export function GitHubStarButton({
  size = 'md',
  ...props
}: {
  size?: 'sm' | 'md';
} & ButtonProps) {
  return (
    <Button
      component={Link}
      target="_blank"
      to={GITHUB_URL}
      size={size}
      color="var(--mantine-primary-color-7)"
      {...props}
    >
      <Flex align="center" gap="xs">
        <Github width={20} /> GitHub
      </Flex>
    </Button>
  );
}
