import { useFetcher, useLoaderData } from '@remix-run/react';
import { Modal, Text, Stack, Button, Image } from '@mantine/core';

import type { EditorLoaderData } from '~/features/preview/types/editor';
import welcomeImage from '~/images/welcome.webp';

export function WelcomeModal() {
  const fetcher = useFetcher();
  const { hasVisited } = useLoaderData<EditorLoaderData>();

  const hasVisitedEditor = fetcher.formData ? fetcher.formData.get('hasVisited') === 'true' : hasVisited;

  const handleClose = () => {
    fetcher.submit({ hasVisited: 'true', intent: 'updateHasVisited' }, { method: 'post' });
  };

  return (
    <>
      {!hasVisitedEditor && (
        <Modal
          centered
          opened={!hasVisitedEditor}
          onClose={handleClose}
          fz="xl"
          title={
            <Text size="xl" fw={500}>
              Hey 👋
            </Text>
          }
          size="md"
        >
          <Stack>
            <Image src={welcomeImage} radius="md" alt="Welcome to CvrSnap cover" width={400} height={200} />
            <Text>
              Use the editing sidebar to adjust your content, layout, background and more. Several new templates are
              coming soon.
            </Text>
            <Text>When you are done, select your preferred download size and hit the download button. Enjoy!</Text>
            <Button variant="filled" fullWidth data-autofocus onClick={handleClose}>
              Start editing
            </Button>
          </Stack>
        </Modal>
      )}
    </>
  );
}
