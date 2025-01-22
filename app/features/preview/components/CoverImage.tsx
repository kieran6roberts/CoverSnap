import { Box, ActionIcon } from '@mantine/core';
import { ArrowRightTag } from 'iconoir-react';
import { lazy } from 'react';

import { useEditor } from '~/shared/stores/EditorContext';
import classes from '~/features/preview/styles/CoverImage.module.css';
import { DownloadSuccessModal } from '~/shared/components/DownloadSuccessModal';
import { useImageDownload } from '~/shared/hooks/useImageDownload';
import { ImagePreview } from '~/features/preview/components/ImagePreview';
import { updateCSSVariables } from '~/shared/utils/styles';
import { CoverImageControls } from '~/features/preview/components/CoverImageControls';
import { CoverImageSize } from '~/features/preview/components/CoverImageSize';
import { useEditorUIStore } from '~/shared/stores/EditorUIStore';

const Confetti = lazy(() => import('~/features/preview/components/Confetti'));

export function CoverImage({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const { resetEditor, updateCover, cover, _hasHydrated } = useEditor();
  const { isDrawerOpen, setDrawerOpen } = useEditorUIStore();

  const defaultImageSize = `${cover.id}:${cover.aspectRatio}:${cover.width}x${cover.height}`;

  const { isLoading, isSuccessModalOpen, isDownloadDisabled, closeSuccessModal, downloadImage } = useImageDownload({
    imageRef: imageNodeRef,
    cover
  });

  const resetStyles = () => {
    resetEditor();
  };

  const onAspectRatioChange = (value: string | null) => {
    if (!value) return;
    const id = value.split(':')[0];
    const aspectRatio = value.split(':')[1];
    const size = value.split(':')[2];
    const width = size.split('x')[0];
    const height = size.split('x')[1];

    updateCSSVariables({ '--cover-aspect-ratio': `${aspectRatio}` });
    updateCover({ id, width: Number(width), height: Number(height), aspectRatio: Number(aspectRatio) });
  };

  return (
    <>
      <Box className={classes.coverWrapper}>
        {!isDrawerOpen ? (
          <ActionIcon
            visibleFrom="md"
            pos="absolute"
            top={16}
            left={20}
            onClick={() => setDrawerOpen(true)}
            title="Open sidebar"
            variant="default"
            size={28}
            aria-label="Open sidebar"
          >
            <ArrowRightTag width={18} height={18} />
          </ActionIcon>
        ) : null}
        <CoverImageSize
          defaultImageSize={defaultImageSize}
          onAspectRatioChange={onAspectRatioChange}
          _hasHydrated={_hasHydrated}
        />
        <ImagePreview imageNodeRef={imageNodeRef} />

        <CoverImageControls
          {...(isDownloadDisabled
            ? {
                isDownloadDisabled: true
              }
            : { isLoading, resetStyles, downloadImage, isDownloadDisabled: false })}
        />
      </Box>

      {isSuccessModalOpen && <DownloadSuccessModal close={closeSuccessModal} />}
      {isSuccessModalOpen && <Confetti />}
    </>
  );
}
