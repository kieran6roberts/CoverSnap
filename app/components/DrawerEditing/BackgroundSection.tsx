import { ColorInput, Stack, Flex, Select, FileInput, NumberInput } from '@mantine/core';
import { colorTypeOptions, DEFAULT_CSS_VARIABLE_VALUES } from '~/consts';
import { useState } from 'react';
import { updateCSSVariable } from '~/utils/styles';
import { MediaImageFolder } from 'iconoir-react';
import { useEditor } from '~/contexts/EditorContext';

type ColorType = (typeof colorTypeOptions)[number];

export function DrawerBackgroundSection() {
  const [colorFormat, setColorFormat] = useState<ColorType>('hex');
  const {
    state: { backgroundImage },
    setBackgroundImage
  } = useEditor();

  const onBackgroundImageChange = (file: File | null) => {
    // Revoke old image if it's a blob
    if (backgroundImage?.startsWith('blob:')) {
      URL.revokeObjectURL(backgroundImage);
    }

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    } else {
      setBackgroundImage(null);
    }
  };

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
      <FileInput
        clearable
        leftSection={<MediaImageFolder width={16} height={16} />}
        accept="image/png,image/jpeg,image/webp"
        label="Upload background image"
        placeholder="Click to upload"
        maw={368}
        onChange={onBackgroundImageChange}
      />
      {backgroundImage ? (
        <NumberInput
          defaultValue={DEFAULT_CSS_VARIABLE_VALUES['color-overlay-opacity']}
          suffix="%"
          max={100}
          min={0}
          onChange={(value) => {
            updateCSSVariable({ name: '--cover-color-overlay-opacity', value: `${value}%` });
          }}
          label="Color overlay opacity"
          size="md"
          allowDecimal={false}
          allowNegative={false}
        />
      ) : null}
    </Stack>
  );
}
