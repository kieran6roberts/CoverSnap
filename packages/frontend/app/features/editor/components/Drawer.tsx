import {
  Text,
  Accordion,
  Flex,
  Button,
  Box,
  ScrollArea,
  LoadingOverlay,
  Skeleton,
  Title,
  ThemeIcon,
  ActionIcon,
  Image,
  Stack
} from '@mantine/core';
import { Text as IconText, MediaImage, AlignBottomBox, Download, ArrowLeftTag, QuestionMark } from 'iconoir-react';

import classes from '~/features/editor/styles/EditorDrawer.module.css';
import { TextSettings } from '~/features/editor/components/TextSettings';
import { BackgroundSettings } from '~/features/editor/components/BackgroundSettings';
import { TemplateSettings } from '~/features/editor/components/TemplateSettings';
import { useEditor, EditorHydration } from '~/shared/stores/EditorContext';
import { useImageDownload } from '~/shared/hooks/useImageDownload';
import { DownloadSuccessModal } from '~/shared/components/DownloadSuccessModal';
import { useEditorUIStore } from '~/shared/stores/EditorUIStore';
import welcomeImage from '~/images/welcome.webp';
import { SITE_NAME } from '~/config/consts';
const editSections = [
  {
    title: 'Template',
    content: () => <TemplateSettings />,
    icon: (
      <ThemeIcon size="lg" radius="md" variant="light" color="var(--mantine-color-grape-8)">
        <AlignBottomBox width={24} height={24} color="var(--mantine-color-grape-8)" />
      </ThemeIcon>
    )
  },
  {
    title: 'Text',
    content: () => <TextSettings />,
    icon: (
      <ThemeIcon size="lg" radius="md" variant="light" color="var(--mantine-color-teal-8)">
        <IconText width={24} height={24} color="var(--mantine-color-teal-8)" />
      </ThemeIcon>
    )
  },
  {
    title: 'Background',
    content: () => <BackgroundSettings />,
    icon: (
      <ThemeIcon size="lg" radius="md" variant="light" color="var(--mantine-color-yellow-8)">
        <MediaImage width={24} height={24} color="var(--mantine-color-yellow-8)" />
      </ThemeIcon>
    )
  },
  {
    title: 'More coming soon',
    content: () => null,
    icon: (
      <ThemeIcon size="lg" radius="md" variant="light" color="var(--mantine-color-pink-8)">
        <QuestionMark width={24} height={24} color="var(--mantine-color-pink-8)" />
      </ThemeIcon>
    ),
    isDisabled: true
  }
];

export function Drawer({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const { setDrawerOpen, openSections, setOpenSections } = useEditorUIStore();
  const { resetEditor, cover } = useEditor();

  const { isLoading, downloadImage, isSuccessModalOpen, closeSuccessModal } = useImageDownload({
    imageRef: imageNodeRef,
    cover
  });

  const items = editSections.map((item) => {
    return (
      <EditorHydration
        key={item.title}
        skeleton={
          <Flex h={53} w="100%" justify="space-between" align="center" p="md">
            <Flex gap="sm" align="center">
              <Skeleton radius="md" height={34} width={34} animate />
              <Skeleton radius="md" height={16} width={125} animate />
            </Flex>
            <Skeleton radius="md" height={16} circle width={16} animate />
          </Flex>
        }
      >
        <Accordion.Item key={item.title} value={item.title}>
          <Accordion.Control
            aria-label={`Toggle ${item.title.toLowerCase()} editing`}
            icon={item.icon}
            className={classes.accordionControl}
            disabled={!!item?.isDisabled}
          >
            <Flex gap="xs" align="center">
              <Text size="md" fw={500} className={classes['accordionControl-name']}>
                {item.title}
              </Text>
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
        <ScrollArea visibleFrom="md" h="calc(100vh - 69px - 60px - 55px)">
          <Accordion
            value={openSections}
            onChange={setOpenSections}
            transitionDuration={0}
            radius="md"
            multiple
            variant="default"
          >
            {items}
          </Accordion>
          <Stack m="lg" h="100%" className={classes['sidebar-help']}>
            <Image src={welcomeImage} radius="md" alt={`Welcome to ${SITE_NAME} cover`} width={400} height={200} />
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
        </ScrollArea>
        <Accordion
          value={openSections}
          onChange={setOpenSections}
          hiddenFrom="md"
          radius="md"
          multiple
          variant="default"
          pb={24}
        >
          {items}
        </Accordion>
        <Stack hiddenFrom="md" m="lg" h="100%" className={classes['sidebar-help']} pb={72} maw={600} px="md" mx="auto">
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
          <Button hiddenFrom="md" onClick={resetEditor} variant="outline" size="xs">
            Reset all
          </Button>
          <Button
            className="plausible-event-name=Download+Image"
            hiddenFrom="md"
            onClick={downloadImage}
            size="xs"
            rightSection={<Download width={16} height={16} />}
          >
            <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
            Download image
          </Button>
        </Flex>
      </Box>
      {isSuccessModalOpen && <DownloadSuccessModal close={closeSuccessModal} />}
    </>
  );
}
