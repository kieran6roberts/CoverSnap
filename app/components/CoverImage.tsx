'use client';

import { Box, Text, Flex, Button, LoadingOverlay } from '@mantine/core';
import { Rnd } from 'react-rnd';
import { useSearchParams, useNavigate } from '@remix-run/react';

import classes from './CoverImage.module.css';
import { useEditor } from '../contexts/EditorContext';
import { Download, Restart } from 'iconoir-react';
import { DownloadSuccessModal } from './DownloadSuccessModal';
import { useImageDownload } from '~/hooks/useImageDownload';

export function CoverImage({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    state: { primaryTitle, subTitle, backgroundImage },
    resetEditor
  } = useEditor();

  const { isLoading, isSuccessModalOpen, closeSuccessModal, downloadImage } = useImageDownload({
    imageRef: imageNodeRef
  });

  const resetStyles = () => {
    const resetKey = Date.now();
    const newParams = new URLSearchParams(searchParams);
    newParams.set('reset', resetKey.toString());
    navigate(`?${newParams.toString()}`, { replace: true });

    resetEditor();
  };

  return (
    <>
      <Box className={classes.coverSection}>
        <Box className={classes.coverWrapper}>
          <Text ta="center" size="sm" fw={500}>
            Download size is 1600 x 840
          </Text>
          <Box
            ref={imageNodeRef}
            className={classes.cover}
            variant="filled"
            style={{
              ...(backgroundImage && {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundColor: 'transparent',
                background: `linear-gradient(
                  color-mix(in srgb, var(--cover-background-color) var(--cover-color-overlay-opacity), transparent),
                  color-mix(in srgb, var(--cover-background-color) var(--cover-color-overlay-opacity), transparent)
                ), url(${backgroundImage})`
              })
            }}
          >
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
          <Flex gap="xs" justify="center">
            <Button
              visibleFrom="md"
              onClick={resetStyles}
              size="md"
              variant="light"
              rightSection={<Restart width={24} height={24} />}
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
