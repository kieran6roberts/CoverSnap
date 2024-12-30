'use client';

import { Text, Stack, Accordion } from '@mantine/core';
import classes from './EditorDrawer.module.css';
import { DrawerTextSection } from '~/components/DrawerEditing/TextSection';
import { DrawerBackgroundSection } from '~/components/DrawerEditing/BackgroundSection';

export function EditorDrawer() {
  const editSections = [
    {
      title: 'Text',
      content: () => <DrawerTextSection />
    },
    {
      title: 'Background colors',
      content: () => <DrawerBackgroundSection />
      // icon: <IconText />,
    }
  ];

  const items = editSections.map((item) => (
    <Accordion.Item key={item.title} value={item.title}>
      <Accordion.Control>
        <Text>{item.title}</Text>
      </Accordion.Control>
      <Accordion.Panel>{item.content()}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Stack gap="md" className={classes.sidebar} p="md">
      <Accordion radius="md" defaultValue={['Text']} multiple variant="default">
        {items}
      </Accordion>
    </Stack>
  );
}
