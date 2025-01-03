import { CloseButton, ColorInput, Divider, Flex, Select, Stack, TextInput, NumberInput } from '@mantine/core';
import { useSearchParams } from '@remix-run/react';

import { useEditor } from '~/contexts/EditorContext';
import { colorTypeOptions, DEFAULT_CSS_VARIABLE_VALUES } from '~/consts';
import { ColorType } from '~/types';
import { updateCSSVariable } from '~/utils/styles';

export function DrawerTextSection() {
  const [searchParams] = useSearchParams();
  const resetKey = searchParams.get('reset');
  const { state, setPrimaryTitle, setSubTitle, setPrimaryTitleColorFormat, setSubTitleColorFormat } = useEditor();
  const hasPrimaryTitle = state.primaryTitle.length > 0;
  const hasSubTitle = state.subTitle.length > 0;

  return (
    <Stack>
      <Divider label="Primary title" labelPosition="center" />
      <TextInput
        value={state.primaryTitle}
        onChange={(e) => setPrimaryTitle(e.target.value)}
        placeholder="HTTP Security Headers and how to..."
        error={state.primaryTitle.length > 80 ? 'Maximum 80 characters' : null}
        label="Title"
        description="Maximum 80 characters"
        rightSection={hasPrimaryTitle && <CloseButton size="sm" variant="subtle" onClick={() => setPrimaryTitle('')} />}
        maxLength={80}
      />
      <Stack>
        <Flex align="flex-end" justify="space-between" gap="xs">
          <ColorInput
            key={`title-color-${resetKey}`}
            format={state.primaryTitleColorFormat}
            label="Color"
            defaultValue={DEFAULT_CSS_VARIABLE_VALUES['title-color']}
            w="100%"
            onChangeEnd={(color) => {
              updateCSSVariable({ name: '--cover-title-color', value: color });
            }}
          />
          <Select
            key={`title-color-type-${resetKey}`}
            checkIconPosition="right"
            comboboxProps={{ shadow: 'md' }}
            data={colorTypeOptions}
            value={state.primaryTitleColorFormat}
            onChange={(value) => setPrimaryTitleColorFormat(value as ColorType)}
            aria-label="Change title color type"
            searchable={false}
            w={150}
            variant="default"
            allowDeselect={false}
          />
        </Flex>
      </Stack>
      <NumberInput
        key={`title-size-${resetKey}`}
        defaultValue={DEFAULT_CSS_VARIABLE_VALUES['title-font-size']}
        max={80}
        min={10}
        onChange={(value) => {
          updateCSSVariable({ name: '--cover-title-font-size', value: `${value}px` });
        }}
        label="Font size (px)"
        size="md"
        suffix="px"
        allowDecimal={false}
      />
      <Divider label="Subtitle" mt={40} labelPosition="center" />
      <TextInput
        value={state.subTitle}
        onChange={(e) => setSubTitle(e.target.value)}
        placeholder="Let's dive into the world of..."
        label="Subtitle"
        description="Maximum 80 characters"
        error={state.subTitle.length > 80 ? 'Maximum 80 characters' : null}
        rightSection={hasSubTitle && <CloseButton size="sm" variant="subtle" onClick={() => setSubTitle('')} />}
        maxLength={80}
      />
      <Stack>
        <Flex align="flex-end" justify="space-between" gap="xs">
          <ColorInput
            key={`subtitle-color-${resetKey}`}
            format={state.subTitleColorFormat}
            label="Color"
            defaultValue={DEFAULT_CSS_VARIABLE_VALUES['subtitle-color']}
            w="100%"
            onChangeEnd={(color) => {
              updateCSSVariable({ name: '--cover-subtitle-color', value: color });
            }}
          />
          <Select
            key={`subtitle-color-type-${resetKey}`}
            checkIconPosition="right"
            comboboxProps={{ shadow: 'md' }}
            data={colorTypeOptions}
            value={state.subTitleColorFormat}
            onChange={(value) => setSubTitleColorFormat(value as ColorType)}
            aria-label="Change subtitle color type"
            w={150}
            variant="default"
            searchable={false}
            allowDeselect={false}
          />
        </Flex>
      </Stack>
      <NumberInput
        key={`subtitle-size-${resetKey}`}
        defaultValue={DEFAULT_CSS_VARIABLE_VALUES['subtitle-font-size']}
        suffix="px"
        max={50}
        min={10}
        onChange={(value) => {
          updateCSSVariable({ name: '--cover-subtitle-font-size', value: `${value}px` });
        }}
        label="Font size (px)"
        size="md"
        allowDecimal={false}
      />
    </Stack>
  );
}
