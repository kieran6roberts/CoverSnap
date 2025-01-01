import { Box, Text, Flex, Button, LoadingOverlay } from '@mantine/core';

import classes from './CoverImage.module.css';
import { useEditor } from '../contexts/EditorContext';
import { Download } from 'iconoir-react';
import { DownloadSuccessModal } from './DownloadSuccessModal';
import { useImageDownload } from '~/hooks/useImageDownload';

export function CoverImage({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const {
    state: { primaryTitle, subTitle }
  } = useEditor();

  const { isLoading, isSuccessModalOpen, closeSuccessModal, downloadImage } = useImageDownload({
    imageRef: imageNodeRef
  });

  return (
    <>
      <Box className={classes.coverSection}>
        <Box className={classes.coverWrapper}>
          <Text ta="center" size="sm" fw={500}>
            Download size is 1600 x 840
          </Text>
          <Box ref={imageNodeRef} className={classes.cover} variant="filled">
            <span className={classes.title}>{primaryTitle ?? ''}</span>
            <span className={classes.subtitle}>{subTitle ?? ''}</span>
          </Box>
          <Flex gap="xs" justify="center">
            <Button
              visibleFrom="md"
              onClick={downloadImage}
              size="lg"
              rightSection={<Download width={24} height={24} />}
            >
              <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
              Download image
            </Button>
          </Flex>
        </Box>
      </Box>
      {isSuccessModalOpen && <DownloadSuccessModal close={closeSuccessModal} />}
    </>
  );
}
