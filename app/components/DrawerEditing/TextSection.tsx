import { CloseButton, ColorInput, Divider, Flex, Select, Stack, TextInput, NumberInput } from '@mantine/core';

import { useEditor } from '~/contexts/EditorContext';
import { colorTypeOptions, DEFAULT_CSS_VARIABLE_VALUES } from '~/consts';
import { ColorType } from '~/types';
import { useState } from 'react';
import { updateCSSVariable } from '~/utils/styles';

export function DrawerTextSection() {
  const { state, setPrimaryTitle, setSubTitle } = useEditor();
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
        error={state.primaryTitle.length > 80 ? 'Maximum 80 characters' : null}
        label="Cover Title"
        description="Maximum 80 characters"
        rightSection={hasPrimaryTitle && <CloseButton size="sm" variant="subtle" onClick={() => setPrimaryTitle('')} />}
        maxLength={80}
      />
      <Stack>
        <Flex align="flex-end" justify="space-between" gap="xs">
          <ColorInput
            format={primaryTitleColorFormat}
            label="Primary title color"
            defaultValue={DEFAULT_CSS_VARIABLE_VALUES['title-color']}
            w="100%"
            onChangeEnd={(color) => {
              updateCSSVariable({ name: '--cover-title-color', value: color });
            }}
          />
          <Select
            checkIconPosition="right"
            comboboxProps={{ shadow: 'md' }}
            data={colorTypeOptions}
            value={primaryTitleColorFormat}
            onChange={(value) => setPrimaryTitleColorFormat(value as ColorType)}
            aria-label="Change title color type"
            w={150}
            variant="default"
            allowDeselect={false}
          />
        </Flex>
      </Stack>
      <NumberInput
        defaultValue={DEFAULT_CSS_VARIABLE_VALUES['title-font-size']}
        max={80}
        min={10}
        onChange={(value) => {
          updateCSSVariable({ name: '--cover-title-font-size', value: `${value}px` });
        }}
        label="Primary title font size (px)"
        size="md"
        suffix="px"
        allowDecimal={false}
      />
      <Divider label="Subtitle" mt={40} labelPosition="center" />
      <TextInput
        value={state.subTitle}
        onChange={(e) => setSubTitle(e.target.value)}
        placeholder="Let's dive into the world of..."
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
            defaultValue={DEFAULT_CSS_VARIABLE_VALUES['subtitle-color']}
            w="100%"
            onChangeEnd={(color) => {
              updateCSSVariable({ name: '--cover-subtitle-color', value: color });
            }}
          />
          <Select
            checkIconPosition="right"
            comboboxProps={{ shadow: 'md' }}
            data={colorTypeOptions}
            value={subTitleColorFormat}
            onChange={(value) => setSubTitleColorFormat(value as ColorType)}
            aria-label="Change subtitle color type"
            w={150}
            variant="default"
            allowDeselect={false}
          />
        </Flex>
      </Stack>
      <NumberInput
        defaultValue={DEFAULT_CSS_VARIABLE_VALUES['subtitle-font-size']}
        suffix="px"
        max={50}
        min={10}
        onChange={(value) => {
          updateCSSVariable({ name: '--cover-subtitle-font-size', value: `${value}px` });
        }}
        label="Subtitle font size (px)"
        size="md"
        allowDecimal={false}
      />
    </Stack>
  );
}
