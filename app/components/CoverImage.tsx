import { Box, Title, Text, Flex, Button, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import classes from './CoverImage.module.css';
import { useEditor } from '../contexts/EditorContext';
import { Download } from 'iconoir-react';
import { saveDomNodeAsImage } from '~/utils/domToNode';
import { useState } from 'react';
import { DownloadSuccessModal } from './DownloadSuccessModal';

export function CoverImage({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const {
    state: { primaryTitle, secondaryTitle, backgroundColor }
  } = useEditor();
  const [visible, { open, close }] = useDisclosure(false);

  const [isDownloadSuccessModalOpen, setIsDownloadSuccessModalOpen] = useState(false);

  const hasSecondaryTitle = secondaryTitle.length > 0;

  const onDownload = async () => {
    open();
    if (imageNodeRef.current) {
      const result = await saveDomNodeAsImage(imageNodeRef.current);
      if (result.success) {
        setIsDownloadSuccessModalOpen(true);
        setTimeout(() => {
          close();
        }, 500);
      }
    }
  };

  return (
    <>
      <Box className={classes.coverSection}>
        <Box className={classes.coverWrapper}>
          <Text ta="center" size="sm" fw={500}>
            Download size is 1600 x 840
          </Text>
          <Box ref={imageNodeRef} className={classes.cover} variant="filled" style={{ backgroundColor }}>
            <Title
              order={2}
              className={classes.title}
              c="var(--mantine-color-white)"
              textWrap="balance"
              ta="center"
              lineClamp={3}
            >
              {primaryTitle ?? ''}
            </Title>
            <Title
              mt={hasSecondaryTitle ? 'md' : 0}
              order={3}
              className={classes.subtitle}
              c="var(--mantine-color-white)"
              textWrap="balance"
              ta="center"
              lineClamp={3}
            >
              {secondaryTitle ?? ''}
            </Title>
          </Box>
          <Flex gap="xs" justify="center">
            <Button hiddenFrom="md" onClick={onDownload} size="xs" rightSection={<Download width={16} height={16} />}>
              <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
              Download image
            </Button>
            <Button visibleFrom="md" onClick={onDownload} size="lg" rightSection={<Download width={24} height={24} />}>
              <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
              Download image
            </Button>
          </Flex>
        </Box>
      </Box>
      {isDownloadSuccessModalOpen && <DownloadSuccessModal close={() => setIsDownloadSuccessModalOpen(false)} />}
    </>
  );
}
