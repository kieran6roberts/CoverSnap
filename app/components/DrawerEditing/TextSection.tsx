import { CloseButton, ColorInput, Divider, Flex, Select, Stack, TextInput } from '@mantine/core';

import { useEditor } from '~/contexts/EditorContext';
import { colorTypeOptions } from '~/consts';
import { ColorType } from '~/types';
import { useState } from 'react';

export function DrawerTextSection() {
  const { state, setPrimaryTitle, setSubTitle, setPrimaryTitleColor, setSubTitleColor } = useEditor();
  const hasPrimaryTitle = state.primaryTitle.length > 0;
  const hasSubTitle = state.subTitle.length > 0;

  const [primaryTitleColorFormat, setPrimaryTitleColorFormat] = useState<ColorType>('hex');
  const [subTitleColorFormat, setSubTitleColorFormat] = useState<ColorType>('hex');

  return (
    <Stack>
      <Divider label="Primary title" labelPosition="center" />
      <TextInput
        value={state.primaryTitle}
        onChange={(e) => setPrimaryTitle(e.target.value)}
        placeholder="HTTP Security Headers and how to..."
        error={state.primaryTitle.length > 60 ? 'Maximum 60 characters' : null}
        label="Cover Title"
        description="Maximum 60 characters"
        rightSection={hasPrimaryTitle && <CloseButton size="sm" variant="subtle" onClick={() => setPrimaryTitle('')} />}
        maxLength={60}
      />
      <Stack>
        <Flex align="flex-end" justify="space-between" gap="xs">
          <ColorInput
            format={primaryTitleColorFormat}
            label="Primary title color"
            description="Select a primary title color"
            defaultValue={state.primaryTitleColor}
            w="100%"
            onChangeEnd={(color) => {
              setPrimaryTitleColor(color);
            }}
          />
          <Select
            checkIconPosition="right"
            comboboxProps={{ shadow: 'md' }}
            data={colorTypeOptions}
            value={primaryTitleColorFormat}
            onChange={(value) => setPrimaryTitleColorFormat(value as ColorType)}
            aria-label="Change color type"
            w={150}
            variant="default"
            allowDeselect={false}
          />
        </Flex>
      </Stack>
      <Divider label="Subtitle" mt={40} labelPosition="center" />
      <TextInput
        value={state.subTitle}
        onChange={(e) => setSubTitle(e.target.value)}
        placeholder="Let's dive into the world..."
        label="Cover Subtitle"
        description="Maximum 80 characters"
        error={state.subTitle.length > 80 ? 'Maximum 80 characters' : null}
        rightSection={hasSubTitle && <CloseButton size="sm" variant="subtle" onClick={() => setSubTitle('')} />}
        maxLength={80}
      />
      <Stack>
        <Flex align="flex-end" justify="space-between" gap="xs">
          <ColorInput
            format={subTitleColorFormat}
            label="Subtitle color"
            description="Select a subtitle color"
            defaultValue={state.subTitleColor}
            w="100%"
            onChangeEnd={(color) => {
              setSubTitleColor(color);
            }}
          />
          <Select
            checkIconPosition="right"
            comboboxProps={{ shadow: 'md' }}
            data={colorTypeOptions}
            value={subTitleColorFormat}
            onChange={(value) => setSubTitleColorFormat(value as ColorType)}
            aria-label="Change color type"
            w={150}
            variant="default"
            allowDeselect={false}
          />
        </Flex>
      </Stack>
    </Stack>
  );
}
