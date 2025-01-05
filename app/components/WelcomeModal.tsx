'use client';

import { useFetcher, useLoaderData } from '@remix-run/react';
import { Modal, Text, Stack, Button } from '@mantine/core';

import type { EditorLoaderData } from '~/types/editor';

export function WelcomeModal() {
  const fetcher = useFetcher();
  const { hasVisited } = useLoaderData<EditorLoaderData>();

  const hasVisitedEditor = fetcher.formData ? fetcher.formData.get('hasVisited') === 'true' : hasVisited;

  const handleClose = () => {
    fetcher.submit({ hasVisited: 'true' }, { method: 'post' });
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
              Welcome to CoverSnap!
            </Text>
          }
          size="md"
        >
          <Stack>
            <Text>
              Use the editing sidebar to adjust your content and design specifics. You can also drag and resize your
              text using the cover image preview. More features coming soon!
            </Text>

            <video
              controls
              width="100%"
              autoPlay
              loop
              muted
              style={{ maxWidth: 400, margin: '0 auto', borderRadius: '12px' }}
            >
              <source src="resize-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <Button variant="filled" fullWidth data-autofocus onClick={handleClose}>
              Start editing
            </Button>
          </Stack>
        </Modal>
      )}
    </>
  );
}
