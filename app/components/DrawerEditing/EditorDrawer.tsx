'use client';

import { Text, Stack, Accordion, Flex, Button, Divider } from '@mantine/core';
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
        <Text size="sm" fw={500}>
          {item.title}
        </Text>
      </Accordion.Control>
      <Accordion.Panel p="sm">{item.content()}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Stack gap="md" className={classes.sidebar} p="md">
      {/* <Text size="xs" fw={500} fz={18}>
        Editor
      </Text> */}
      <Divider label="Edit cover image" />
      <Accordion radius="md" defaultValue={['Text', 'Background']} multiple variant="default">
        {items}
      </Accordion>
      <Flex justify="flex-end" mt="auto">
        <Button onClick={resetEditor} variant="light" color="var(--mantine-primary-color-4)">
          Reset all
        </Button>
      </Flex>
    </Stack>
  );
}
