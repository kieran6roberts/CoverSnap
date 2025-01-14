'use client';

import { Box, Flex, Button, LoadingOverlay, Select } from '@mantine/core';
import type { ButtonProps } from '@mantine/core';
import { Download, Restart } from 'iconoir-react';

import { useEditor } from '~/contexts/EditorContext';
import classes from './CoverImage.module.css';
import { DownloadSuccessModal } from './DownloadSuccessModal';
import { useImageDownload } from '~/hooks/useImageDownload';
import { CoverImageEditor } from './CoverImageEditor';
import { IMAGE_DOWNLOAD_SIZES } from '~/consts/editor';
import { updateCSSVariables } from '~/utils/styles';

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
  const { resetEditor, updateCover, cover } = useEditor();

  const { isLoading, isSuccessModalOpen, closeSuccessModal, downloadImage } = useImageDownload({
    imageRef: imageNodeRef,
    cover
  });

  const resetStyles = () => {
    resetEditor();
  };

  const onAspectRatioChange = (value: string | null) => {
    if (!value) return;
    const aspectRatio = value.split(':')[1];
    const size = value.split(':')[2];
    const width = size.split('x')[0];
    const height = size.split('x')[1];

    updateCSSVariables({ '--cover-aspect-ratio': `${aspectRatio}` });
    updateCover({ width: Number(width), height: Number(height), aspectRatio: Number(aspectRatio) });
  };

  return (
    <>
      <Box component="section" className={classes.coverSection}>
        <Box className={classes.coverWrapper}>
          <Select
            label="Image download size"
            defaultValue={IMAGE_DOWNLOAD_SIZES.hashnode.value}
            data={Object.values(IMAGE_DOWNLOAD_SIZES).map((size) => ({
              value: size.value,
              label: `${size.width}x${size.height} ${size.label} `
            }))}
            onChange={(value) => onAspectRatioChange(value)}
            clearable={false}
            allowDeselect={false}
            comboboxProps={{ width: 'max-content', position: 'bottom' }}
            checkIconPosition="right"
          />
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
        </Box>
      </Box>
      {isSuccessModalOpen && <DownloadSuccessModal close={closeSuccessModal} />}
    </>
  );
}
