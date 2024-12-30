'use client';

import { Text, Stack, Accordion, TextInput } from '@mantine/core';
import classes from './EditorDrawer.module.css';
import { useEditor } from '../contexts/EditorContext';

export function EditorDrawer() {
  const { state, setPrimaryTitle, setSecondaryTitle } = useEditor();

  const editSections = [
    {
      title: 'Text',
      description: 'Edit the text options for your cover image',
      content: () => (
        <Stack>
          <TextInput
            label="Primary title"
            value={state.primaryTitle}
            onChange={(e) => setPrimaryTitle(e.target.value)}
          />
          <TextInput
            label="Secondary title"
            value={state.secondaryTitle}
            onChange={(e) => setSecondaryTitle(e.target.value)}
          />
        </Stack>
      )
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
