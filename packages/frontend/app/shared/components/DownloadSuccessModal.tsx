import { Modal, Stack, Button, Flex, Text, Divider, Anchor } from '@mantine/core';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Check } from 'iconoir-react';

import { GitHubStarButton } from '~/shared/components/GitHubStarButton';
import { GITHUB_URL, SITE_NAME } from '~/config/consts';

export function DownloadSuccessModal({ close }: { close: () => void }) {
  useEffect(() => {
    requestAnimationFrame(() => {
      toast.success('Image downloaded successfully.', {
        icon: <Check width={24} height={24} color="var(--mantine-primary-color-8)" />,
        id: 'download-success',
        duration: 2000
      });
    });
  }, []);

  return (
    <Modal opened onClose={close} centered title={`Thanks for using ${SITE_NAME}!`}>
      <Stack>
        <Divider />
        <Text mb="md">
          If you have any feedback, please share it with me{' '}
          <Anchor underline="always" target="_blank" data-autofocus href="https://x.com/Kieran6Dev">
            @Kieran6Dev
          </Anchor>
          . Leave a star on{' '}
          <Anchor underline="always" target="_blank" href={GITHUB_URL}>
            GitHub
          </Anchor>{' '}
          if it was helpful.
        </Text>

        <Flex justify="center" align="center" gap="md">
          <GitHubStarButton size="sm" variant="outline" />
          <Button size="sm" variant="filled" onClick={close}>
            Keep building
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
}
