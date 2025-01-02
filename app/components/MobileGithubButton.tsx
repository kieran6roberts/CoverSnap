'use client';

import { ActionIcon } from '@mantine/core';
import { Github } from 'iconoir-react';

export function MobileGithubButton() {
  return (
    <ActionIcon variant="light" size="lg">
      <Github />
    </ActionIcon>
  );
}
