import { ActionIcon } from '@mantine/core';
import { Github } from 'iconoir-react';
import { SITE_NAME } from '~/config/consts';

export function MobileGithubButton() {
  return (
    <ActionIcon aria-label={`${SITE_NAME} GitHub repo`} hiddenFrom="md" variant="outline" size={40}>
      <Github width={20} height={20} />
    </ActionIcon>
  );
}
