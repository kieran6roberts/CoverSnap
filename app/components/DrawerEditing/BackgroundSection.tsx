import { ColorInput, Stack, Flex, Select } from '@mantine/core';
import { useEditor } from '~/contexts/EditorContext';
import { colorTypeOptions } from '~/consts';
import { useState } from 'react';

type ColorType = (typeof colorTypeOptions)[number];

export function DrawerBackgroundSection() {
  const { state, setBackgroundColor } = useEditor();
  const [colorFormat, setColorFormat] = useState<ColorType>('hex');

  return (
    <Stack>
      <Flex align="flex-end" justify="space-between" gap="xs">
        <ColorInput
          format={colorFormat}
          label="Background color"
          description="Select a primary background color for the cover"
          defaultValue={state.backgroundColor}
          onChangeEnd={(color) => {
            setBackgroundColor(color);
          }}
        />
        <Select
          checkIconPosition="right"
          comboboxProps={{ shadow: 'md' }}
          data={colorTypeOptions}
          value={colorFormat}
          onChange={(value) => setColorFormat(value as ColorType)}
          aria-label="Change color type"
          w={100}
          variant="default"
          allowDeselect={false}
        />
      </Flex>
    </Stack>
  );
}
