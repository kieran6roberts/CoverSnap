import { Flex, Text, Button, LoadingOverlay } from '@mantine/core';
import { Download } from 'iconoir-react';

import classes from '../styles/EditorDrawer.module.css';

interface DrawerFooterProps {
  resetEditor: () => void;
  downloadImage: () => void;
  isLoading: boolean;
}

export function DrawerFooter({ resetEditor, downloadImage, isLoading }: DrawerFooterProps) {
  return (
    <Flex
      justify={{ base: 'space-between', md: 'flex-start' }}
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
  );
}
