import { Flex, Box, ScrollArea, Title, ActionIcon, Tabs } from '@mantine/core';
import { Text as IconText, MediaImage, AlignBottomBox, ArrowLeftTag, InfoCircle } from 'iconoir-react';
import { useRef, useEffect } from 'react';
import { useViewportSize } from '@mantine/hooks';

import classes from '~/features/editor/styles/EditorDrawer.module.css';
import { TextSettings } from '~/features/editor/components/TextSettings';
import { BackgroundSettings } from '~/features/editor/components/BackgroundSettings';
import { TemplateSettings } from '~/features/editor/components/TemplateSettings';
import { useEditor } from '~/shared/stores/EditorContext';
import { useImageDownload } from '~/shared/hooks/useImageDownload';
import { DownloadSuccessModal } from '~/shared/components/DownloadSuccessModal';
import { useEditorUIStore } from '~/shared/stores/EditorUIStore';
import type { OpenSection } from '~/shared/stores/EditorUIStore';
import { DrawerControl } from '~/features/editor/components/DrawerControl';
import { InfoSection } from '~/features/editor/components/InfoSection';
import { DRAWER_SECTIONS } from '~/features/editor/consts';
import { DrawerFooter } from '~/features/editor/components/DrawerFooter';

const editSections = [
  {
    id: DRAWER_SECTIONS.templates,
    title: 'Templates',
    color: 'grape.5',
    content: () => <TemplateSettings />,
    icon: <AlignBottomBox width={24} height={24} />
  },
  {
    id: DRAWER_SECTIONS.text,
    title: 'Text',
    color: 'green.5',
    content: () => <TextSettings />,
    icon: <IconText width={24} height={24} />
  },
  {
    id: DRAWER_SECTIONS.background,
    title: 'Background',
    color: 'yellow.5',
    content: () => <BackgroundSettings />,
    icon: <MediaImage width={24} height={24} />
  },
  {
    id: DRAWER_SECTIONS.info,
    title: 'Info',
    color: 'var(--mantine-color-body)',
    content: () => <InfoSection />,
    icon: <InfoCircle width={24} height={24} color="var(--mantine-color-text)" />
  }
] as const;

export function Drawer({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const { setDrawerOpen, openSection, setOpenSection } = useEditorUIStore();
  const { resetEditor, cover } = useEditor();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { width } = useViewportSize();

  useEffect(() => {
    const isMobile = width < 992;

    if (!isMobile && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [openSection]);

  const { isLoading, downloadImage, isSuccessModalOpen, closeSuccessModal } = useImageDownload({
    imageRef: imageNodeRef,
    cover
  });

  const openSectionIndex = editSections.findIndex((section) => section.id === openSection);

  return (
    <>
      <Box component="aside" className={classes.sidebar} pos="relative">
        <Flex
          justify="space-between"
          align="center"
          p="md"
          style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}
        >
          <Title size="sm" order={2}>
            Cover settings
          </Title>
          <ActionIcon
            visibleFrom="md"
            onClick={() => setDrawerOpen(false)}
            variant="default"
            size={32}
            title="Close sidebar"
            aria-label="Close sidebar"
          >
            <ArrowLeftTag width={18} height={18} />
          </ActionIcon>
        </Flex>
        <Tabs
          visibleFrom="md"
          variant="none"
          orientation="vertical"
          value={openSection}
          onChange={(value) => setOpenSection(value as OpenSection)}
        >
          <Tabs.List component="section" className={classes['sidebar-controls']} p="sm">
            {editSections.map((section) => {
              const isActive = section.id === openSection;

              return (
                <DrawerControl
                  key={section.id}
                  value={section.id}
                  isActive={isActive}
                  color={section.color}
                  label={section.title}
                  component={Tabs.Tab}
                  mt={section.id === DRAWER_SECTIONS.info ? 'auto' : '0'}
                  mb={section.id !== DRAWER_SECTIONS.info ? '16' : '0'}
                >
                  {section.icon}
                </DrawerControl>
              );
            })}
          </Tabs.List>

          <ScrollArea flex={1} viewportRef={scrollAreaRef} h="calc(100vh - 69px - 60px - 55px)" px="sm">
            <Tabs.Panel value={openSection}>{editSections[openSectionIndex].content()}</Tabs.Panel>
          </ScrollArea>
        </Tabs>
        <Flex direction="column" hiddenFrom="md" variant="none">
          <Flex
            direction="row"
            component="section"
            className={classes['sidebar-controls']}
            pos="sticky"
            top={0}
            gap="md"
            p="md"
          >
            {editSections.map((section) => {
              const isActive = section.id === openSection;

              return (
                <DrawerControl
                  key={section.id}
                  value={section.id}
                  isActive={isActive}
                  color={section.color}
                  label={section.title}
                  component="button"
                  onClick={() => setOpenSection(section.id)}
                  ml={section.id === DRAWER_SECTIONS.info ? 'auto' : '0'}
                >
                  {section.icon}
                </DrawerControl>
              );
            })}
          </Flex>

          <Box flex={1} p="md">
            {editSections[openSectionIndex].content()}
          </Box>
        </Flex>
        <DrawerFooter resetEditor={resetEditor} downloadImage={downloadImage} isLoading={isLoading} />
      </Box>
      {isSuccessModalOpen && <DownloadSuccessModal close={closeSuccessModal} />}
    </>
  );
}
