'use client';

import { Box, Text, Flex, Button, LoadingOverlay } from '@mantine/core';
import type { ButtonProps } from '@mantine/core';
import { Download, Restart } from 'iconoir-react';

import { useEditor } from '~/contexts/EditorContext';
import classes from './CoverImage.module.css';
import { DownloadSuccessModal } from './DownloadSuccessModal';
import { useImageDownload } from '~/hooks/useImageDownload';
import { CoverImageEditor } from './CoverImageEditor';

const DownloadButton = ({
  isLoading,
  downloadImage,
  ...props
}: {
  isLoading: boolean;
  downloadImage: () => void;
} & ButtonProps) => {
  return (
    <Button onClick={downloadImage} size="md" rightSection={<Download width={24} height={24} />} {...props}>
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      Download image
    </Button>
  );
};

export function CoverImage({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const { resetEditor } = useEditor();

  const { isLoading, isSuccessModalOpen, closeSuccessModal, downloadImage } = useImageDownload({
    imageRef: imageNodeRef
  });

  const resetStyles = () => {
    resetEditor();
  };

  return (
    <>
      <Box component="section" className={classes.coverSection}>
        <Box className={classes.coverWrapper}>
          <CoverImageEditor imageNodeRef={imageNodeRef} />
          <Flex gap="xs" justify="center" wrap="wrap">
            <Button
              visibleFrom="md"
              onClick={resetStyles}
              size="md"
              rightSection={<Restart width={24} height={24} />}
              variant="outline"
            >
              Reset applied styles
            </Button>

            <DownloadButton isLoading={isLoading} downloadImage={downloadImage} visibleFrom="md" />
          </Flex>
          <Text ta="center" size="sm" fw={500}>
            Download size is 1600 x 840
          </Text>
        </Box>
      </Box>
      {isSuccessModalOpen && <DownloadSuccessModal close={closeSuccessModal} />}
    </>
  );
}
