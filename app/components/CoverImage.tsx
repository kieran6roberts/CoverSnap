import { Box, Title, Text, Flex, Button } from '@mantine/core';
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
  const hasSecondaryTitle = secondaryTitle.length > 0;

  const [isDownloadSuccessModalOpen, setIsDownloadSuccessModalOpen] = useState(false);

  const onDownload = async () => {
    if (imageNodeRef.current) {
      const result = await saveDomNodeAsImage(imageNodeRef.current);
      if (result.success) {
        setIsDownloadSuccessModalOpen(true);
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
            <Button onClick={onDownload} size="lg" rightSection={<Download width={24} height={24} />}>
              Download Image
            </Button>
            {/* <ActionIcon hiddenFrom="md" onClick={onDownload} variant="filled" size="lg">
              <DownloadCircle />
            </ActionIcon> */}
          </Flex>
        </Box>
      </Box>
      {isDownloadSuccessModalOpen && <DownloadSuccessModal close={() => setIsDownloadSuccessModalOpen(false)} />}
    </>
  );
}
