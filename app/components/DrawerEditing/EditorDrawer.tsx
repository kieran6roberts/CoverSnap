import { Text, Accordion, Flex, Button, Box, ScrollArea } from '@mantine/core';
import classes from './EditorDrawer.module.css';
import { DrawerTextSection } from '~/components/DrawerEditing/TextSection';
import { DrawerBackgroundSection } from '~/components/DrawerEditing/BackgroundSection';
import { useEditor } from '~/contexts/EditorContext';

export function EditorDrawer() {
  const { resetEditor } = useEditor();

  const editSections = [
    {
      title: 'Text',
      content: () => <DrawerTextSection />
    },
    {
      title: 'Background',
      content: () => <DrawerBackgroundSection />
      // icon: <IconText />,
    }
  ];

  const items = editSections.map((item) => (
    <Accordion.Item key={item.title} value={item.title}>
      <Accordion.Control>
        <Text size="lg" fw={500}>
          {item.title}
        </Text>
      </Accordion.Control>
      <Accordion.Panel px="sm">
        <Box pb={75}>{item.content()}</Box>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Box component="aside" className={classes.sidebar} pos="relative">
      <ScrollArea h="calc(100vh - 69px - 69px)">
        <Accordion radius="md" defaultValue={['Text', 'Background']} multiple variant="default">
          {items}
        </Accordion>
      </ScrollArea>
      <Flex
        justify="flex-end"
        bg="var(--mantine-color-body)"
        pos="sticky"
        bottom={0}
        right={0}
        p="md"
        style={{ borderTop: '1px solid var(--mantine-color-default-border)', zIndex: 10 }}
      >
        <Button onClick={resetEditor} variant="light" color="var(--mantine-primary-color-4)">
          Reset all
        </Button>
      </Flex>
    </Box>
  );
}
