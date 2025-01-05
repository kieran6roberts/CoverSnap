'use client';

import { ActionIcon } from '@mantine/core';
import { Github } from 'iconoir-react';

export function MobileGithubButton() {
  return (
    <ActionIcon aria-label="CoverSnap GitHub repo" hiddenFrom="md" variant="outline" size="lg">
      <Github />
    </ActionIcon>
  );
}
