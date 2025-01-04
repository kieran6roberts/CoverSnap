import { CloseButton, ColorInput, Divider, Stack, TextInput, NumberInput, Select } from '@mantine/core';
import { useSearchParams } from '@remix-run/react';

import { useEditor } from '~/contexts/EditorContext';

export function DrawerTextSection() {
  const [searchParams] = useSearchParams();
  const resetKey = searchParams.get('reset');
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
    <Stack>
      <Divider label="Primary title" labelPosition="center" />
      <TextInput
        value={primaryTitle}
        onChange={(e) => setPrimaryTitle(e.target.value)}
        placeholder="HTTP Security Headers and how to..."
        error={primaryTitle.length > 80 ? 'Maximum 80 characters' : null}
        label="Title"
        description="Maximum 80 characters"
        rightSection={hasPrimaryTitle && <CloseButton size="sm" variant="subtle" onClick={() => setPrimaryTitle('')} />}
        maxLength={80}
      />

      <ColorInput
        key={`title-color-${resetKey}`}
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
        data={[
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
        ]}
        value={primaryTitleFont}
        onChange={(value) => setPrimaryTitleFont(value)}
        allowDeselect={false}
        checkIconPosition="right"
      />

      <NumberInput
        key={`title-size-${resetKey}`}
        max={80}
        min={10}
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
        description="Maximum 80 characters"
        error={subTitle.length > 80 ? 'Maximum 80 characters' : null}
        rightSection={hasSubTitle && <CloseButton size="sm" variant="subtle" onClick={() => setSubTitle('')} />}
        maxLength={80}
      />

      <ColorInput
        key={`subtitle-color-${resetKey}`}
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
        data={[
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
        ]}
        value={subTitleFont}
        onChange={(value) => setSubTitleFont(value)}
        allowDeselect={false}
        checkIconPosition="right"
      />

      <NumberInput
        key={`subtitle-size-${resetKey}`}
        value={subTitleFontSize}
        onChange={(value) => setSubTitleFontSize(value)}
        suffix="px"
        max={50}
        min={10}
        label="Font size (px)"
        size="md"
        allowDecimal={false}
      />
    </Stack>
  );
}
