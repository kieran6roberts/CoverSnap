'use client';

import { Modal, Stack, Button, Flex, Text, Divider, Anchor } from '@mantine/core';
import { GitHubStarButton } from './GitHubStarButton';
import { GITHUB_URL } from '~/consts';

export function DownloadSuccessModal({ close }: { close: () => void }) {
  return (
    <Modal opened onClose={close} centered title="Thanks for using CoverSnap!">
      <Stack>
        <Divider />
        <Text mb="md">
          If you have any feedback, please share it with me on X{' '}
          <Anchor underline="always" target="_blank" href="https://x.com/Kieran6Dev">
            @Kieran6Dev
          </Anchor>{' '}
          or raise an issue on{' '}
          <Anchor underline="always" target="_blank" href={GITHUB_URL}>
            GitHub.
          </Anchor>
        </Text>

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
