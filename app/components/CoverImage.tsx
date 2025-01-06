'use client';

import { Box, Text, Flex, Button, LoadingOverlay } from '@mantine/core';
import type { ButtonProps } from '@mantine/core';
import { Download, Restart, EyeClosed, Eye } from 'iconoir-react';
import { useSearchParams, useNavigate } from '@remix-run/react';

import { useEditor } from '~/contexts/EditorContext';
import classes from './CoverImage.module.css';
import { DownloadSuccessModal } from './DownloadSuccessModal';
import { useImageDownload } from '~/hooks/useImageDownload';
import { CoverImageEditor } from './CoverImageEditor';
import { PREVIEW_PARAM } from '~/consts';

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
  const [searchParams] = useSearchParams();
  const { resetEditor } = useEditor();
  const navigate = useNavigate();
  const isPreviewMode = searchParams.get(PREVIEW_PARAM) === 'true';

  const { isLoading, isSuccessModalOpen, closeSuccessModal, downloadImage } = useImageDownload({
    imageRef: imageNodeRef
  });

  const resetStyles = () => {
    resetEditor();
  };

  const onPreviewModeChange = () => {
    if (isPreviewMode) {
      navigate('/create', { replace: true });
    } else {
      navigate(`?${PREVIEW_PARAM}=true`, { replace: true });
    }
  };

  return (
    <>
      <Box component="section" className={classes.coverSection}>
        <Box className={classes.coverWrapper}>
          <CoverImageEditor imageNodeRef={imageNodeRef} isPreviewMode={isPreviewMode} />
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

            <Button
              onClick={onPreviewModeChange}
              size="md"
              rightSection={isPreviewMode ? <Eye width={24} height={24} /> : <EyeClosed width={24} height={24} />}
              variant="outline"
              miw={180}
            >
              Preview ({isPreviewMode ? 'ON' : 'OFF'})
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
