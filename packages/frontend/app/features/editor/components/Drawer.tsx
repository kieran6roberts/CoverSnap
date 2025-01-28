import { Text, Flex, Button, Box, ScrollArea, LoadingOverlay, Title, ActionIcon, Stack } from '@mantine/core';
import { Text as IconText, MediaImage, AlignBottomBox, Download, ArrowLeftTag, InfoCircle } from 'iconoir-react';

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

const editSections = [
  {
    id: 'templates',
    title: 'Template',
    color: 'grape',
    content: () => <TemplateSettings />,
    icon: <AlignBottomBox width={24} height={24} />
  },
  {
    id: 'text',
    title: 'Text',
    color: 'teal',
    content: () => <TextSettings />,
    icon: <IconText width={24} height={24} />
  },
  {
    id: 'background',
    title: 'Background',
    color: 'yellow',
    content: () => <BackgroundSettings />,
    icon: <MediaImage width={24} height={24} />
  },
  {
    id: 'info',
    title: 'Info',
    color: 'gray',
    content: () => <InfoSection />,
    icon: <InfoCircle width={24} height={24} />
  }
] as const;

export function Drawer({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const { setDrawerOpen, openSection, setOpenSection } = useEditorUIStore();
  const { resetEditor, cover } = useEditor();

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
        <Flex>
          <Flex
            direction="column"
            component="section"
            justify="space-between"
            p="md"
            style={{ borderRight: '1px solid var(--mantine-color-default-border)' }}
          >
            <Flex direction="column" gap="md">
              {editSections.map((section) => {
                if (section.id !== 'info') {
                  return (
                    <DrawerControl
                      key={section.id}
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
            <DrawerControl color="gray" label="Info" onClick={() => setOpenSection('info')}>
              <InfoCircle width={24} height={24} />
            </DrawerControl>
          </Flex>

          <Box flex={1}>
            <ScrollArea visibleFrom="md" h="calc(100vh - 69px - 60px - 55px)" px="sm">
              {editSections[openSectionIndex].content()}
            </ScrollArea>
            <Box hiddenFrom="md">{editSections[openSectionIndex].content()}</Box>
            <Stack
              hiddenFrom="md"
              m="lg"
              h="100%"
              className={classes['sidebar-help']}
              pb={72}
              maw={600}
              px="md"
              mx="auto"
            >
              <Text size="sm" ta="center">
                Your editor state (except uploaded background images) will persist across sessions meaning your progress
                will be saved.
              </Text>
              <Text size="sm" ta="center">
                Run your downloaded cover through an image compressor, you are then set to publish! If you have any
                suggestions for the app, share them with me{' '}
                <a
                  href="https://x.com/Kieran6dev"
                  target="_blank"
                  rel="noreferrer"
                  className={classes['sidebar-help--name-link']}
                >
                  @Kieran6dev.
                </a>{' '}
                If you like the app, take a second to star in on GitHub, thanks!
              </Text>
            </Stack>
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
