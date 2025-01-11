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
    primaryTitle,
    primaryTitleColor,
    subTitle,
    subTitleColor,
    primaryTitleFontSize,
    setPrimaryTitle,
    setPrimaryTitleColor,
    setSubTitle,
    setPrimaryTitleFontSize,
    subTitleFontSize,
    setSubTitleFontSize,
    setSubTitleColor,
    primaryTitleFont,
    setPrimaryTitleFont,
    subTitleFont,
    setSubTitleFont
  } = useEditor();
  const hasPrimaryTitle = primaryTitle.length > 0;
  const hasSubTitle = subTitle.length > 0;

  return (
    <Stack gap="xl">
      <Divider label="Primary title" labelPosition="center" />
      <TextInput
        value={primaryTitle}
        onChange={(e) => setPrimaryTitle(e.target.value)}
        placeholder="HTTP Security Headers and how to..."
        error={primaryTitle.length > PRIMARY_TEXT_LENGTH ? `Maximum ${PRIMARY_TEXT_LENGTH} characters` : null}
        label="Title"
        description={`Maximum ${PRIMARY_TEXT_LENGTH} characters`}
        rightSection={hasPrimaryTitle && <CloseButton size="sm" variant="subtle" onClick={() => setPrimaryTitle('')} />}
        maxLength={PRIMARY_TEXT_LENGTH}
      />

      <ColorInput
        format="rgba"
        description="Accepts RGBA"
        value={primaryTitleColor}
        label="Color"
        onChange={setPrimaryTitleColor}
      />

      <Select
        aria-label="Title font"
        label="Font"
        placeholder="Pick value"
        data={fonts}
        value={primaryTitleFont}
        onChange={(value) => setPrimaryTitleFont(value)}
        allowDeselect={false}
        checkIconPosition="right"
      />

      <NumberInput
        max={PRIMARY_TEXT_FONT_SIZE_MAX}
        min={PRIMARY_TEXT_FONT_SIZE_MIN}
        value={primaryTitleFontSize}
        onChange={(value) => setPrimaryTitleFontSize(value)}
        label="Font size (px)"
        size="md"
        suffix="px"
        allowDecimal={false}
      />
      <Divider label="Subtitle" mt={40} labelPosition="center" />
      <TextInput
        value={subTitle}
        onChange={(e) => setSubTitle(e.target.value)}
        placeholder="Let's dive into the world of..."
        label="Subtitle"
        description={`Maximum ${SECONDARY_TEXT_LENGTH} characters`}
        error={subTitle.length > SECONDARY_TEXT_LENGTH ? `Maximum ${SECONDARY_TEXT_LENGTH} characters` : null}
        rightSection={hasSubTitle && <CloseButton size="sm" variant="subtle" onClick={() => setSubTitle('')} />}
        maxLength={SECONDARY_TEXT_LENGTH}
      />

      <ColorInput
        format="rgba"
        label="Color"
        description="Accepts RGBA"
        value={subTitleColor}
        onChange={setSubTitleColor}
      />

      <Select
        aria-label="Subtitle font"
        label="Font"
        placeholder="Pick value"
        data={fonts}
        value={subTitleFont}
        onChange={(value) => setSubTitleFont(value)}
        allowDeselect={false}
        checkIconPosition="right"
      />

      <NumberInput
        value={subTitleFontSize}
        onChange={(value) => setSubTitleFontSize(value)}
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
