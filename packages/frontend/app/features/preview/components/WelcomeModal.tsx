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
          Use the editing sidebar to adjust your content, layout, and background. Your editor state will persist across
          sessions so you're free to come back and edit at any time.
        </Text>
        <Text>
          When you are done, select your preferred download size and hit the download button. Run it through an image
          compressor before using it. Enjoy!
        </Text>
        <Button variant="filled" fullWidth data-autofocus onClick={hideWelcome}>
          Start editing
        </Button>
      </Stack>
    </Modal>
  );
}
