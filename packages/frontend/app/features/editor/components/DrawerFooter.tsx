import { Flex, Text, Button, Drawer, LoadingOverlay, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { ImagePreview } from '~/features/preview/components/ImagePreview';
import { useEditor } from '~/shared/stores/EditorContext';
import classes from '../styles/EditorDrawer.module.css';
import { Download } from 'iconoir-react';
import { useImageDownload } from '~/shared/hooks/useImageDownload';
import { DownloadSuccessModal } from '~/shared/components/DownloadSuccessModal';
import { CoverImageSize } from '~/features/preview/components/CoverImageSize';
import { getAspectRatioData, updateCSSVariables } from '~/shared/utils/styles';
import type { DownloadSizeInfo } from '~/shared/consts';
interface DrawerFooterProps {
  resetEditor: () => void;
  imageNodeRef: React.RefObject<HTMLDivElement | null>;
}

export function DrawerFooter({ resetEditor, imageNodeRef }: DrawerFooterProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const { cover, updateCover } = useEditor();
  const { isLoading, downloadImage, isSuccessModalOpen, closeSuccessModal } = useImageDownload({
    imageRef: imageNodeRef,
    cover
  });

  const defaultImageSize = `${cover.id}:${cover.aspectRatio}:${cover.width}x${cover.height}`;

  const onDownloadImage = () => {
    downloadImage();
    close();
  };

  const onAspectRatioChange = (value: DownloadSizeInfo | null) => {
    if (!value) return;
    const { id, aspectRatio, width, height } = getAspectRatioData(value);

    updateCSSVariables({ '--cover-aspect-ratio': `${aspectRatio}` });
    updateCover({ id, width, height, aspectRatio });
  };

  return (
    <>
      <Flex
        justify={{ base: 'space-between', md: 'flex-start' }}
        align="center"
        bg="var(--mantine-color-body)"
        pos={{ base: 'fixed', md: 'sticky' }}
        className={classes['sidebar-footer']}
        bottom={0}
        right={0}
        left={0}
        p="md"
      >
        <Text component="span" size="xs" fw={500} visibleFrom="md">
          Built by{' '}
          <a
            className={classes['sidebar-footer--name-link']}
            href="https://www.linkedin.com/in/kieran6roberts/"
            target="_blank"
            rel="noreferrer"
          >
            <span>Kieran Roberts</span>
          </a>
        </Text>

        <Button hiddenFrom="md" onClick={resetEditor} variant="outline" size="sm">
          Reset all
        </Button>
        <Button
          hiddenFrom="md"
          variant="gradient"
          gradient={{ from: 'grape', to: 'violet', deg: 135 }}
          onClick={open}
          size="sm"
        >
          Preview/Download
        </Button>

        <Drawer.Root
          offset={8}
          display="flex"
          radius="md"
          position="bottom"
          hiddenFrom="md"
          size="xl"
          opened={opened}
          onClose={close}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.CloseButton />
            </Drawer.Header>
            <Drawer.Body
              component={Stack}
              pt={12}
              ta="center"
              h="calc(100% - 68px)"
              px={24}
              style={{ alignItems: 'center' }}
            >
              <CoverImageSize
                defaultImageSize={defaultImageSize}
                onAspectRatioChange={(value) => onAspectRatioChange(value as DownloadSizeInfo | null)}
              />
              <ImagePreview imageNodeRef={imageNodeRef} />

              <Button
                className="plausible-event-name=Download+Image"
                variant="gradient"
                w="100%"
                gradient={{ from: 'grape', to: 'violet', deg: 135 }}
                hiddenFrom="md"
                onClick={onDownloadImage}
                size="md"
                rightSection={<Download width={24} height={24} />}
                mt="auto"
              >
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
                Download image
              </Button>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      </Flex>
      {isSuccessModalOpen && <DownloadSuccessModal close={closeSuccessModal} />}
    </>
  );
}
