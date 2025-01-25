import { Flex, Button, LoadingOverlay, Skeleton } from '@mantine/core';
import { Download, Restart } from 'iconoir-react';

type CoverImageControlsProps =
  | {
      isLoading: boolean;
      resetStyles: () => void;
      downloadImage: () => void;
      isDownloadDisabled: false;
      hasEditorHydrated: boolean;
    }
  | {
      isLoading?: never;
      resetStyles?: never;
      downloadImage?: never;
      isDownloadDisabled: true;
      hasEditorHydrated: boolean;
    };

export function CoverImageControls({
  isLoading,
  resetStyles,
  downloadImage,
  isDownloadDisabled,
  hasEditorHydrated
}: CoverImageControlsProps) {
  return (
    <Flex gap="xs" justify="center" wrap="wrap">
      <Skeleton visible={!hasEditorHydrated} h="max-content" w="max-content">
        <Button
          visibleFrom="md"
          onClick={resetStyles}
          size="md"
          rightSection={<Restart width={24} height={24} />}
          variant="outline"
        >
          Reset cover
        </Button>
      </Skeleton>

      <Skeleton visible={!hasEditorHydrated} h="max-content" w="max-content">
        <Button
          visibleFrom="md"
          disabled={isDownloadDisabled}
          {...(downloadImage ? { onClick: downloadImage } : {})}
          size="md"
          rightSection={<Download width={24} height={24} />}
          className="plausible-event-name=Download+Image"
        >
          <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
          Download image
        </Button>
      </Skeleton>
    </Flex>
  );
}
