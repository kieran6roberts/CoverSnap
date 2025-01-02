import { ColorInput, Stack, Flex, Select } from '@mantine/core';
import { colorTypeOptions, DEFAULT_CSS_VARIABLE_VALUES } from '~/consts';
import { useState } from 'react';
import { updateCSSVariable } from '~/utils/styles';

type ColorType = (typeof colorTypeOptions)[number];

export function DrawerBackgroundSection() {
  const [colorFormat, setColorFormat] = useState<ColorType>('hex');

  return (
    <Stack>
      <Flex align="flex-end" justify="space-between" gap="xs">
        <ColorInput
          format={colorFormat}
          label="Background color"
          description="Select a primary background color for the cover"
          defaultValue={DEFAULT_CSS_VARIABLE_VALUES['bg-color']}
          onChangeEnd={(color) => {
            updateCSSVariable({ name: '--cover-background-color', value: color });
          }}
        />
        <Select
          checkIconPosition="right"
          comboboxProps={{ shadow: 'md' }}
          data={colorTypeOptions}
          value={colorFormat}
          onChange={(value) => setColorFormat(value as ColorType)}
          aria-label="Change background color type"
          w={100}
          variant="default"
          allowDeselect={false}
        />
      </Flex>
    </Stack>
  );
}
