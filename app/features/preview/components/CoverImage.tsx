import { Box, Flex, Button, LoadingOverlay, Select, ActionIcon, Skeleton } from '@mantine/core';
import type { ButtonProps } from '@mantine/core';
import { ArrowRightTag, Download, Restart } from 'iconoir-react';
import { lazy } from 'react';
import { useFetcher, useLoaderData } from '@remix-run/react';

import { useEditor } from '~/shared/contexts/EditorContext';
import classes from '~/features/preview/styles/CoverImage.module.css';
import { DownloadSuccessModal } from '~/shared/components/DownloadSuccessModal';
import { useImageDownload } from '~/shared/hooks/useImageDownload';
import { ImagePreview } from '~/features/preview/components/ImagePreview';
import { IMAGE_DOWNLOAD_SIZES } from '~/features/editor/consts';
import { updateCSSVariables } from '~/shared/utils/styles';
import { EditorLoaderData } from '~/features/preview/types/editor';
import { CREATE_ROUTE } from '~/config/consts';

const Confetti = lazy(() => import('~/features/preview/components/Confetti'));

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
  const { resetEditor, updateCover, cover, _hasHydrated } = useEditor();
  const fetcher = useFetcher();
  const { sidebarState } = useLoaderData<EditorLoaderData>();

  const currentSidebarState = fetcher.formData ? fetcher.formData.get('sidebarState') : sidebarState;
  const isSidebarOpen = currentSidebarState !== 'closed';
  const defaultImageSize = `${cover.id}:${cover.aspectRatio}:${cover.width}x${cover.height}`;

  const { isLoading, isSuccessModalOpen, closeSuccessModal, downloadImage } = useImageDownload({
    imageRef: imageNodeRef,
    cover
  });

  const resetStyles = () => {
    resetEditor();
  };

  const onSidebarChange = (value: boolean) => {
    fetcher.submit(
      { sidebarState: value ? 'true' : 'false', intent: 'updateSidebarState' },
      {
        method: 'post',
        action: CREATE_ROUTE
      }
    );
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
        {!isSidebarOpen ? (
          <ActionIcon
            visibleFrom="md"
            pos="absolute"
            top={16}
            left={20}
            onClick={() => onSidebarChange(true)}
            title="Open sidebar"
            variant="default"
            size={28}
            aria-label="Open sidebar"
          >
            <ArrowRightTag width={18} height={18} />
          </ActionIcon>
        ) : null}
        <Skeleton visible={!_hasHydrated} maw="max-content">
          <Select
            label="Image download size"
            value={defaultImageSize}
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
        </Skeleton>
        <ImagePreview imageNodeRef={imageNodeRef} />
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

      {isSuccessModalOpen && <DownloadSuccessModal close={closeSuccessModal} />}
      {isSuccessModalOpen && <Confetti />}
    </>
  );
}
