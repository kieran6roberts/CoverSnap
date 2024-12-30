'use client';

import { Text, Stack, Accordion } from '@mantine/core';
import classes from './EditorDrawer.module.css';
import { DrawerTextSection } from './DrawerTextSection';

export function EditorDrawer() {
  const editSections = [
    {
      title: 'Text',
      description: 'Edit the text options for your cover image',
      content: () => <DrawerTextSection />
    }
    // {
    //   title: 'Background',
    //   description: 'Edit the background of your cover',
    //   content: () => <div>Background</div>
    //   // icon: <IconText />,
    // }
  ];

  const items = editSections.map((item) => (
    <Accordion.Item key={item.title} value={item.title}>
      <Accordion.Control>
        <Text>{item.title}</Text>
        <Text fz="sm">{item.description}</Text>
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
