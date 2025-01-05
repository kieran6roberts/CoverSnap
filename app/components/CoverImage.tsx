'use client';

import { Box, Text, Flex, Button, LoadingOverlay, Skeleton } from '@mantine/core';
import { Rnd } from 'react-rnd';
import { Download, Restart } from 'iconoir-react';

import { EditorHydration, useEditor } from '~/contexts/EditorContext';
import classes from './CoverImage.module.css';
import { DownloadSuccessModal } from './DownloadSuccessModal';
import { useImageDownload } from '~/hooks/useImageDownload';

export function CoverImage({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const { primaryTitle, subTitle, backgroundImage, resetEditor } = useEditor();

  const { isLoading, isSuccessModalOpen, closeSuccessModal, downloadImage } = useImageDownload({
    imageRef: imageNodeRef
  });

  const resetStyles = () => {
    resetEditor();
  };

  return (
    <>
      <Box className={classes.coverSection}>
        <Box className={classes.coverWrapper}>
          <Text ta="center" size="sm" fw={500}>
            Download size is 1600 x 840
          </Text>
          <EditorHydration skeleton={<Skeleton className={classes.coverSkeleton} />}>
            <Box ref={imageNodeRef} className={classes.cover} variant="filled">
              <Box
                className={classes.backgroundWrapper}
                style={{
                  ...(backgroundImage && {
                    background: `linear-gradient(
                      color-mix(in srgb, var(--cover-background-color) var(--cover-color-overlay-opacity), transparent),
                      color-mix(in srgb, var(--cover-background-color) var(--cover-color-overlay-opacity), transparent)
                    ), url(${backgroundImage}) center/cover no-repeat`,
                    backgroundColor: 'transparent'
                  })
                }}
              />

              {primaryTitle ? (
                <Rnd
                  default={{
                    x: 0,
                    y: 25,
                    width: '100%',
                    height: 'auto'
                  }}
                  bounds="parent"
                  enableResizing={{
                    top: true,
                    right: true,
                    bottom: true,
                    left: true
                  }}
                  className={classes.rndWrapper}
                >
                  <span className={classes.title}>{primaryTitle ?? ''}</span>
                </Rnd>
              ) : null}
              {subTitle ? (
                <Rnd
                  default={{
                    x: 0,
                    y: 0,
                    width: 'auto',
                    height: 'auto'
                  }}
                  bounds="parent"
                  enableResizing={{
                    top: true,
                    right: true,
                    bottom: true,
                    left: true
                  }}
                  className={classes.rndWrapper}
                >
                  <span className={classes.subtitle}>{subTitle ?? ''}</span>
                </Rnd>
              ) : null}
            </Box>
          </EditorHydration>
          <Flex gap="xs" justify="center">
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
              visibleFrom="md"
              onClick={downloadImage}
              size="md"
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
