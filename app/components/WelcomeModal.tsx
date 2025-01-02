'use client';

import { Card, Modal, Text, Stack, Group, Button, Image } from '@mantine/core';
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
            <Card padding="md" radius="md" mb="xl" withBorder>
              <Card.Section>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>My Clean Code Principles</Text>
              </Group>
              <Text c="dimmed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Donec id elit non mi porta
                gravida at eget metus.
              </Text>
            </Card>
            <Button variant="filled" fullWidth data-autofocus onClick={() => setIsWelcomeModalOpen(false)}>
              Start editing
            </Button>
          </Stack>
        </Modal>
      )}
    </>
  );
}
