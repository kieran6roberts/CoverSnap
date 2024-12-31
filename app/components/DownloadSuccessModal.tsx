import { Modal, Stack, Button, Flex, Card, Text, Image, Group, Divider } from '@mantine/core';
import { GitHubStarButton } from './GitHubStarButton';
import { useEditor } from '~/contexts/EditorContext';

export function DownloadSuccessModal({ close }: { close: () => void }) {
  const { state } = useEditor();
  return (
    <Modal opened onClose={close} centered title="Thanks for using CoverSnap!">
      <Stack>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{state.primaryTitle}</Text>
          </Group>
        </Card>
        <Divider />
        <Text>
          If you have any feedback, please share with me on X{' '}
          <a target="_blank" href="https://x.com/Kieran6Dev">
            @Kieran6Dev
          </a>
        </Text>
        <Divider />
        <Flex justify="center" align="center" gap="md">
          <GitHubStarButton size="sm" variant="outline" />
          <Button size="sm" variant="filled" onClick={close}>
            Build a new cover
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
}
