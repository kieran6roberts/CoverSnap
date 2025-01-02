'use client';

import { Text, Accordion, Flex, Button, Box, ScrollArea, LoadingOverlay } from '@mantine/core';
import { Text as IconText, MediaImage, AlignBottomBox, UploadSquare, Pentagon, Download } from 'iconoir-react';

import classes from './EditorDrawer.module.css';
import { DrawerTextSection } from '~/components/DrawerEditing/TextSection';
import { DrawerBackgroundSection } from '~/components/DrawerEditing/BackgroundSection';
import { useEditor } from '~/contexts/EditorContext';
import { useImageDownload } from '~/hooks/useImageDownload';
import { DownloadSuccessModal } from '~/components/DownloadSuccessModal';

export function EditorDrawer({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const { resetEditor } = useEditor();

  const { isLoading, downloadImage, isSuccessModalOpen, closeSuccessModal } = useImageDownload({
    imageRef: imageNodeRef
  });

  const editSections = [
    {
      title: 'Text',
      content: () => <DrawerTextSection />,
      icon: <IconText width={24} height={24} />
    },
    {
      title: 'Background',
      content: () => <DrawerBackgroundSection />,
      icon: <MediaImage width={24} height={24} />
    },
    {
      title: 'Templates',
      content: () => null,
      icon: <AlignBottomBox width={24} height={24} />,
      isDisabled: true
    },
    {
      title: 'Elements',
      content: () => null,
      icon: <Pentagon width={24} height={24} />,
      isDisabled: true
    },
    {
      title: 'Uploads',
      content: () => null,
      icon: <UploadSquare width={24} height={24} />,
      isDisabled: true
    }
  ];

  const items = editSections.map((item) => (
    <Accordion.Item key={item.title} value={item.title}>
      <Accordion.Control
        aria-label={`Toggle ${item.title.toLowerCase()} editing`}
        icon={item.icon}
        disabled={!!item.isDisabled}
      >
        <Text size="lg" fw={500}>
          {item.title}
        </Text>
      </Accordion.Control>
      <Accordion.Panel px="sm">
        <Box pb={48} pt={24}>
          {item.content()}
        </Box>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <>
      <Box component="aside" className={classes.sidebar} pos="relative">
        <ScrollArea visibleFrom="md" h="calc(100vh - 69px - 75px)">
          <Accordion radius="md" multiple variant="default">
            {items}
          </Accordion>
        </ScrollArea>
        <Accordion hiddenFrom="md" radius="md" multiple variant="default">
          {items}
        </Accordion>
        <Flex
          justify={{ base: 'space-between', md: 'flex-end' }}
          bg="var(--mantine-color-body)"
          pos={{ base: 'fixed', md: 'sticky' }}
          bottom={0}
          right={0}
          left={0}
          p="md"
          style={{ borderTop: '1px solid var(--mantine-color-default-border)', zIndex: 10 }}
        >
          <Button
            hiddenFrom="md"
            onClick={resetEditor}
            variant="light"
            size="xs"
            color="var(--mantine-primary-color-4)"
          >
            Reset all
          </Button>
          <Button
            visibleFrom="md"
            onClick={resetEditor}
            variant="light"
            size="sm"
            color="var(--mantine-primary-color-4)"
          >
            Reset all
          </Button>
          <Button hiddenFrom="md" onClick={downloadImage} size="xs" rightSection={<Download width={16} height={16} />}>
            <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
            Download image
          </Button>
        </Flex>
      </Box>
      {isSuccessModalOpen && <DownloadSuccessModal close={closeSuccessModal} />}
    </>
  );
}
