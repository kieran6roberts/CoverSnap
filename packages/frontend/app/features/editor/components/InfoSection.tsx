import { Stack, Text, Image } from '@mantine/core';

import { SITE_NAME } from '~/config/consts';
import welcomeImage from '~/images/welcome.webp';
import classes from '~/features/editor/styles/EditorDrawer.module.css';

export function InfoSection() {
  return (
    <Stack m="lg" h="100%" className={classes['sidebar-help']} mt={12}>
      <Image
        src={welcomeImage}
        radius="md"
        alt={`Welcome to ${SITE_NAME} cover`}
        w="100%"
        style={{ aspectRatio: 2.38 }}
        bg="var(--mantine-color-dark-9)"
      />
      <Text size="sm" ta="center">
        Your editor state (except uploaded background images) will persist across sessions meaning your progress will be
        saved.
      </Text>
      <Text size="sm" ta="center">
        Run your downloaded cover through an image compressor, you are then set to publish! If you have any suggestions
        for the app, share them with me{' '}
        <a
          href="https://x.com/Kieran6dev"
          target="_blank"
          rel="noreferrer"
          className={classes['sidebar-help--name-link']}
        >
          @Kieran6dev.
        </a>{' '}
        If you like the app, take a second to star in on GitHub, thanks!
      </Text>
    </Stack>
  );
}
