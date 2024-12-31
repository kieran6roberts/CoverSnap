import { Flex, Button } from '@mantine/core';
import { Link } from '@remix-run/react';
import { Github } from 'iconoir-react';

import { GITHUB_URL } from '~/consts';

export function GitHubStarButton({
  size = 'md',
  variant = 'filled',
  visibleFrom
}: {
  size?: 'sm' | 'md';
  variant?: 'filled' | 'outline' | 'light';
  visibleFrom?: 'md' | 'sm';
}) {
  return (
    <Button
      component={Link}
      target="_blank"
      to={GITHUB_URL}
      size={size}
      variant={variant}
      {...(visibleFrom ? { visibleFrom } : {})}
    >
      <Flex align="center" gap="xs">
        <Github width={20} /> Find us on GitHub
      </Flex>
    </Button>
  );
}
