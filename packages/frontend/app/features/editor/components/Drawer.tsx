import { Text, Flex, Button, Box, ScrollArea, LoadingOverlay, Title, ActionIcon } from '@mantine/core';
import { Text as IconText, MediaImage, AlignBottomBox, Download, ArrowLeftTag, InfoCircle } from 'iconoir-react';
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
import { DrawerControl } from '~/features/editor/components/DrawerControl';
import { InfoSection } from '~/features/editor/components/InfoSection';
import { DRAWER_SECTIONS } from '~/features/editor/consts';

const editSections = [
  {
    id: DRAWER_SECTIONS.templates,
    title: 'Templates',
    color: 'grape.6',
    content: () => <TemplateSettings />,
    icon: <AlignBottomBox width={24} height={24} />
  },
  {
    id: DRAWER_SECTIONS.text,
    title: 'Text',
    color: 'green.6',
    content: () => <TextSettings />,
    icon: <IconText width={24} height={24} />
  },
  {
    id: DRAWER_SECTIONS.background,
    title: 'Background',
    color: 'yellow.6',
    content: () => <BackgroundSettings />,
    icon: <MediaImage width={24} height={24} />
  },
  {
    id: DRAWER_SECTIONS.info,
    title: 'Info',
    color: 'gray',
    content: () => <InfoSection />,
    icon: <InfoCircle width={24} height={24} />
  }
] as const;

export function Drawer({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const { setDrawerOpen, openSection, setOpenSection } = useEditorUIStore();
  const { resetEditor, cover } = useEditor();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const mobileSectionRef = useRef<HTMLDivElement>(null);
  const { width } = useViewportSize();

  useEffect(() => {
    const isMobile = width < 992;

    if (!isMobile && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: 0, behavior: 'instant' });
    } else if (isMobile && mobileSectionRef.current) {
      mobileSectionRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
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
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Flex
            direction={{ base: 'row', md: 'column' }}
            component="section"
            className={classes['sidebar-controls']}
            pos="sticky"
            top={0}
            justify="space-between"
            p="md"
          >
            <Flex direction={{ base: 'row', md: 'column' }} gap="md">
              {editSections.map((section) => {
                const isActive = section.id === openSection;

                if (section.id !== DRAWER_SECTIONS.info) {
                  return (
                    <DrawerControl
                      key={section.id}
                      isActive={isActive}
                      color={section.color}
                      label={section.title}
                      onClick={() => setOpenSection(section.id)}
                    >
                      {section.icon}
                    </DrawerControl>
                  );
                }
              })}
            </Flex>
            <DrawerControl
              color="gray.1"
              isActive={openSection === DRAWER_SECTIONS.info}
              label="Info"
              onClick={() => setOpenSection(DRAWER_SECTIONS.info)}
            >
              <InfoCircle width={24} height={24} />
            </DrawerControl>
          </Flex>

          <Box flex={1}>
            <ScrollArea viewportRef={scrollAreaRef} visibleFrom="md" h="calc(100vh - 69px - 60px - 55px)" px="sm">
              {editSections[openSectionIndex].content()}
            </ScrollArea>
            <Box
              p="md"
              hiddenFrom="md"
              ref={mobileSectionRef}
              style={{
                scrollMarginTop: '70px'
              }}
            >
              {editSections[openSectionIndex].content()}
            </Box>
            <Flex
              justify={{ base: 'space-between', md: 'flex-end' }}
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
                className="plausible-event-name=Download+Image"
                hiddenFrom="md"
                onClick={downloadImage}
                size="sm"
                rightSection={<Download width={16} height={16} />}
              >
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
                Download image
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
      {isSuccessModalOpen && <DownloadSuccessModal close={closeSuccessModal} />}
    </>
  );
}
