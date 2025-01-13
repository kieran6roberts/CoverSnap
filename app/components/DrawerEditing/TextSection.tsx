import { CloseButton, ColorInput, Divider, Stack, TextInput, NumberInput, Select } from '@mantine/core';

import { useEditor } from '~/contexts/EditorContext';

const PRIMARY_TEXT_LENGTH = 80;
const SECONDARY_TEXT_LENGTH = 60;
const PRIMARY_TEXT_FONT_SIZE_MIN = 10;
const PRIMARY_TEXT_FONT_SIZE_MAX = 80;
const SECONDARY_TEXT_FONT_SIZE_MIN = 10;
const SECONDARY_TEXT_FONT_SIZE_MAX = 60;

const fonts = [
  'sans-serif (default)',
  'serif (default)',
  'monospace (default)',
  'Arial',
  'Helvetica',
  'Verdana',
  'Tahoma',
  'Trebuchet MS',
  'Times New Roman',
  'Georgia',
  'Courier New',
  'system-ui'
];

export function DrawerTextSection() {
  const {
    primaryText: {
      content: primaryText,
      color: primaryTextColor,
      font: primaryTextFont,
      fontSize: primaryTextFontSize
    },
    secondaryText: {
      content: secondaryText,
      color: secondaryTextColor,
      font: secondaryTextFont,
      fontSize: secondaryTextFontSize
    },
    updatePrimaryText,
    updateSecondaryText
  } = useEditor();
  const hasPrimaryText = primaryText.length > 0;
  const hasSecondaryText = secondaryText.length > 0;

  return (
    <Stack gap="xl">
      <Divider label="Primary text" labelPosition="center" />
      <TextInput
        value={primaryText}
        onChange={(e) => updatePrimaryText({ content: e.target.value })}
        placeholder="HTTP Security Headers and how to..."
        error={primaryText.length > PRIMARY_TEXT_LENGTH ? `Maximum ${PRIMARY_TEXT_LENGTH} characters` : null}
        label="Content"
        description={`Maximum ${PRIMARY_TEXT_LENGTH} characters`}
        rightSection={
          hasPrimaryText && (
            <CloseButton size="sm" variant="subtle" onClick={() => updatePrimaryText({ content: '' })} />
          )
        }
        maxLength={PRIMARY_TEXT_LENGTH}
      />

      <ColorInput
        format="rgba"
        description="Accepts RGBA"
        value={primaryTextColor}
        label="Color"
        onChange={(value) => updatePrimaryText({ color: value })}
      />

      <Select
        aria-label="Content font"
        label="Font"
        placeholder="Pick value"
        data={fonts}
        value={primaryTextFont}
        onChange={(value) => updatePrimaryText({ font: value })}
        allowDeselect={false}
        checkIconPosition="right"
      />

      <NumberInput
        max={PRIMARY_TEXT_FONT_SIZE_MAX}
        min={PRIMARY_TEXT_FONT_SIZE_MIN}
        value={primaryTextFontSize}
        onChange={(value) => updatePrimaryText({ fontSize: value })}
        label="Font size (px)"
        size="md"
        suffix="px"
        allowDecimal={false}
      />
      <Divider label="Secondary text" mt={40} labelPosition="center" />
      <TextInput
        value={secondaryText}
        onChange={(e) => updateSecondaryText({ content: e.target.value })}
        placeholder="Let's dive into the world of..."
        label="Content"
        description={`Maximum ${SECONDARY_TEXT_LENGTH} characters`}
        error={secondaryText.length > SECONDARY_TEXT_LENGTH ? `Maximum ${SECONDARY_TEXT_LENGTH} characters` : null}
        rightSection={
          hasSecondaryText && (
            <CloseButton size="sm" variant="subtle" onClick={() => updateSecondaryText({ content: '' })} />
          )
        }
        maxLength={SECONDARY_TEXT_LENGTH}
      />

      <ColorInput
        format="rgba"
        label="Color"
        description="Accepts RGBA"
        value={secondaryTextColor}
        onChange={(value) => updateSecondaryText({ color: value })}
      />

      <Select
        aria-label="Content font"
        label="Font"
        placeholder="Pick value"
        data={fonts}
        value={secondaryTextFont}
        onChange={(value) => updateSecondaryText({ font: value })}
        allowDeselect={false}
        checkIconPosition="right"
      />

      <NumberInput
        value={secondaryTextFontSize}
        onChange={(value) => updateSecondaryText({ fontSize: value })}
        suffix="px"
        max={SECONDARY_TEXT_FONT_SIZE_MAX}
        min={SECONDARY_TEXT_FONT_SIZE_MIN}
        label="Font size (px)"
        size="md"
        allowDecimal={false}
      />
    </Stack>
  );
}
