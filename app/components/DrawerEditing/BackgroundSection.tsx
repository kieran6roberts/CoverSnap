import { ColorInput, Stack, Flex, Select, FileInput, NumberInput } from '@mantine/core';
import { useSearchParams } from '@remix-run/react';
import { MediaImageFolder } from 'iconoir-react';

import { colorTypeOptions, DEFAULT_CSS_VARIABLE_VALUES } from '~/consts';
import { updateCSSVariable } from '~/utils/styles';
import { useEditor } from '~/contexts/EditorContext';

type ColorType = (typeof colorTypeOptions)[number];

export function DrawerBackgroundSection() {
  const [searchParams] = useSearchParams();
  const resetKey = searchParams.get('reset');

  const {
    state: { backgroundImage, backgroundColorFormat },
    setBackgroundImage,
    setBackgroundColorFormat
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
          key={`bg-color-${resetKey}`}
          format={backgroundColorFormat}
          label="Background color"
          description="Select a primary background color for the cover"
          defaultValue={DEFAULT_CSS_VARIABLE_VALUES['bg-color']}
          onChangeEnd={(color) => {
            updateCSSVariable({ name: '--cover-background-color', value: color });
          }}
        />
        <Select
          key={`bg-color-type-${resetKey}`}
          checkIconPosition="right"
          comboboxProps={{ shadow: 'md' }}
          data={colorTypeOptions}
          value={backgroundColorFormat}
          onChange={(value) => setBackgroundColorFormat(value as ColorType)}
          aria-label="Change background color type"
          w={100}
          variant="default"
          allowDeselect={false}
        />
      </Flex>
      <FileInput
        key={`bg-image-${resetKey}`}
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
          key={`color-overlay-opacity-${resetKey}`}
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
