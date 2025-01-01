import { Box, Text, Flex, Button, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import classes from './CoverImage.module.css';
import { useEditor } from '../contexts/EditorContext';
import { Download } from 'iconoir-react';
import { saveDomNodeAsImage } from '~/utils/domToNode';
import { useState } from 'react';
import { DownloadSuccessModal } from './DownloadSuccessModal';

export function CoverImage({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const {
    state: { primaryTitle, subTitle, primaryTitleColor, subTitleColor, backgroundColor }
  } = useEditor();
  const [visible, { open, close }] = useDisclosure(false);

  const [isDownloadSuccessModalOpen, setIsDownloadSuccessModalOpen] = useState(false);

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
            <span className={classes.title} style={{ color: primaryTitleColor }}>
              {primaryTitle ?? ''}
            </span>
            <span className={classes.subtitle} style={{ color: subTitleColor }}>
              {subTitle ?? ''}
            </span>
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
