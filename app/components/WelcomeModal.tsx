'use client';

import { Modal, Text, Stack, Button } from '@mantine/core';
import { useEffect, useState } from 'react';

export function WelcomeModal() {
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedEditor');
    if (!hasVisited) {
      localStorage.setItem('hasVisitedEditor', 'true');
      setIsWelcomeModalOpen(true);
    }
  }, []);

  return (
    <>
      {isWelcomeModalOpen && (
        <Modal
          centered
          opened
          onClose={() => setIsWelcomeModalOpen(false)}
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
              Use the editing sidebar to adjust your content and design specifics. Drag and resize your text using the
              cover image preview. More features coming soon!
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

            <Button variant="filled" fullWidth data-autofocus onClick={() => setIsWelcomeModalOpen(false)}>
              Start editing
            </Button>
          </Stack>
        </Modal>
      )}
    </>
  );
}
