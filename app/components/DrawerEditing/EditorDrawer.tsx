'use client';

import { Text, Accordion, Flex, Button, Box, ScrollArea, LoadingOverlay, Skeleton } from '@mantine/core';
import { Text as IconText, MediaImage, AlignBottomBox, UploadSquare, Pentagon, Download } from 'iconoir-react';
import { useFetcher, useLoaderData } from '@remix-run/react';

import type { EditorLoaderData } from '~/types/editor';
import classes from './EditorDrawer.module.css';
import { DrawerTextSection } from '~/components/DrawerEditing/TextSection';
import { DrawerBackgroundSection } from '~/components/DrawerEditing/BackgroundSection';
import { useEditor, EditorHydration } from '~/contexts/EditorContext';
import { useImageDownload } from '~/hooks/useImageDownload';
import { DownloadSuccessModal } from '~/components/DownloadSuccessModal';

export function EditorDrawer({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const fetcher = useFetcher();
  const { openItems } = useLoaderData<EditorLoaderData>();

  // Optimistic value
  const currentOpenItems = fetcher.formData ? fetcher.formData.get('openItems')?.toString().split(',') : openItems;

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

  const handleAccordionChange = (values: string[]) => {
    fetcher.submit(
      { openItems: values, intent: 'updateOpenItems' },
      {
        method: 'post',
        action: '/create'
      }
    );
  };

  const items = editSections.map((item) => {
    return (
      <EditorHydration
        key={item.title}
        skeleton={
          <Flex h={53} w="100%" justify="space-between" align="center" p="md">
            <Flex gap="sm" align="center">
              <Skeleton circle height={24} width={24} animate />
              <Skeleton height={16} width={125} animate />
            </Flex>
            <Skeleton height={16} circle width={16} animate />
          </Flex>
        }
      >
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
      </EditorHydration>
    );
  });

  return (
    <>
      <Box component="aside" className={classes.sidebar} pos="relative">
        <ScrollArea visibleFrom="md" h="calc(100vh - 69px)">
          <Accordion radius="md" multiple value={currentOpenItems} onChange={handleAccordionChange} variant="default">
            {items}
          </Accordion>
        </ScrollArea>
        <Accordion
          hiddenFrom="md"
          radius="md"
          multiple
          value={currentOpenItems}
          onChange={handleAccordionChange}
          variant="default"
        >
          {items}
        </Accordion>
        <Flex
          hiddenFrom="md"
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
