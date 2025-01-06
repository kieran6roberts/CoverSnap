'use client';

import { Text, Accordion, Flex, Button, Box, ScrollArea, LoadingOverlay, Skeleton, Badge } from '@mantine/core';
import { Text as IconText, MediaImage, AlignBottomBox, UploadSquare, Pentagon, Download } from 'iconoir-react';
import { useFetcher, useLoaderData } from '@remix-run/react';

import type { EditorLoaderData } from '~/types/editor';
import classes from './EditorDrawer.module.css';
import { DrawerTextSection } from '~/components/DrawerEditing/TextSection';
import { DrawerBackgroundSection } from '~/components/DrawerEditing/BackgroundSection';
import { useEditor, EditorHydration } from '~/contexts/EditorContext';
import { useImageDownload } from '~/hooks/useImageDownload';
import { DownloadSuccessModal } from '~/components/DownloadSuccessModal';
import { CREATE_ROUTE } from '~/consts';

const editSections = [
  {
    title: 'Text',
    content: () => <DrawerTextSection />,
    icon: <IconText width={24} height={24} color="var(--mantine-primary-color-8)" />
  },
  {
    title: 'Background',
    content: () => <DrawerBackgroundSection />,
    icon: <MediaImage width={24} height={24} color="var(--mantine-primary-color-8)" />
  },
  {
    title: 'Templates',
    content: () => null,
    icon: <AlignBottomBox width={24} height={24} color="var(--mantine-primary-color-8)" />,
    isDisabled: true
  },
  {
    title: 'Elements',
    content: () => null,
    icon: <Pentagon width={24} height={24} color="var(--mantine-primary-color-8)" />,
    isDisabled: true
  },
  {
    title: 'Uploads',
    content: () => null,
    icon: <UploadSquare width={24} height={24} color="var(--mantine-primary-color-8)" />,
    isDisabled: true
  }
];

export function EditorDrawer({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const fetcher = useFetcher();
  const { openItems } = useLoaderData<EditorLoaderData>();

  // Optimistic value
  const currentOpenItems = fetcher.formData ? fetcher.formData.get('openItems')?.toString().split(',') : openItems;

  const { resetEditor } = useEditor();

  const { isLoading, downloadImage, isSuccessModalOpen, closeSuccessModal } = useImageDownload({
    imageRef: imageNodeRef
  });

  const handleAccordionChange = (values: string[]) => {
    fetcher.submit(
      { openItems: values, intent: 'updateOpenItems' },
      {
        method: 'post',
        action: CREATE_ROUTE
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
            className={classes.accordionControl}
          >
            <Flex gap="xs" align="center">
              <Text size="md" fw={500}>
                {item.title}
              </Text>
              {item.isDisabled && <Badge size="xs">Coming soon</Badge>}
            </Flex>
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
          pb={80}
        >
          {items}
        </Accordion>
        <Flex
          hiddenFrom="md"
          justify={{ base: 'space-between', md: 'flex-end' }}
          bg="var(--mantine-color-body)"
          pos={{ base: 'fixed', md: 'sticky' }}
          className={classes.mobileFooter}
          bottom={0}
          right={0}
          left={0}
          p="md"
        >
          <Button hiddenFrom="md" onClick={resetEditor} variant="outline" size="xs">
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
