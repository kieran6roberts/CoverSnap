import { Modal, Text, Stack, Button, Image } from '@mantine/core';

import welcomeImage from '~/images/welcome.webp';
import { SITE_NAME } from '~/config/consts';

export function WelcomeModal({ isOpen, hideWelcome }: { isOpen: boolean; hideWelcome: () => void }) {
  return (
    <Modal
      centered
      opened={isOpen}
      onClose={hideWelcome}
      fz="xl"
      title={
        <Text size="xl" fw={500}>
          Hey 👋
        </Text>
      }
      size="md"
    >
      <Stack>
        <Image src={welcomeImage} radius="md" alt={`Welcome to ${SITE_NAME} cover`} width={400} height={200} />
        <Text>
          Thank you for trying {SITE_NAME}! You are free to download as many cover images as you like for free, and I'll
          be adding more customisation options over time.
        </Text>
        <Text>
          If you publish a post with a CvrSnap cover, share it with me using one of my contact links from the sideber.
          Let's get started!
        </Text>
        <Button variant="filled" fullWidth data-autofocus onClick={hideWelcome}>
          Start editing
        </Button>
      </Stack>
    </Modal>
  );
}
