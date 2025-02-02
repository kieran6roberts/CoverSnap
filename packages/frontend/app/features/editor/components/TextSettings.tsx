import { CloseButton, ColorInput, Stack, TextInput, NumberInput, Select, Fieldset } from '@mantine/core';

import { useEditor } from '~/shared/stores/EditorContext';
import { textLimits, fonts, RGBAColor } from '~/shared/consts';
import type { Fonts, PrimaryFontSize, SecondaryFontSize } from '~/shared/consts';

export function TextSettings() {
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
    updateSecondaryText,
    isResettingImage
  } = useEditor();
  const hasPrimaryText = primaryText.length > 0;
  const hasSecondaryText = secondaryText.length > 0;

  return (
    <Stack gap="xl" pb={{ base: 90, md: 16 }} mt={12}>
      <Fieldset legend="Primary text">
        <TextInput
          value={primaryText}
          onChange={(e) => updatePrimaryText({ content: e.target.value })}
          placeholder="HTTP Security Headers and how to..."
          error={
            primaryText.length > textLimits.PRIMARY_TEXT_LENGTH
              ? `Maximum ${textLimits.PRIMARY_TEXT_LENGTH} characters`
              : null
          }
          label="Content"
          description={`Maximum ${textLimits.PRIMARY_TEXT_LENGTH} characters`}
          rightSection={
            hasPrimaryText && (
              <CloseButton size="sm" variant="subtle" onClick={() => updatePrimaryText({ content: '' })} />
            )
          }
          maxLength={textLimits.PRIMARY_TEXT_LENGTH}
        />

        <ColorInput
          key={`color-${isResettingImage}`}
          format="rgba"
          description="Accepts RGBA"
          defaultValue={primaryTextColor}
          label="Color"
          onChangeEnd={(value) => updatePrimaryText({ color: value as RGBAColor })}
        />

        <Select
          aria-label="Content font"
          label="Font"
          placeholder="Pick primary font style"
          data={fonts}
          value={primaryTextFont}
          onChange={(value) => updatePrimaryText({ font: value as Fonts })}
          allowDeselect={false}
          checkIconPosition="right"
        />

        <NumberInput
          max={textLimits.PRIMARY_TEXT_FONT_SIZE_MAX}
          min={textLimits.PRIMARY_TEXT_FONT_SIZE_MIN}
          value={primaryTextFontSize}
          aria-label="Primary font size"
          onChange={(value) => updatePrimaryText({ fontSize: value as PrimaryFontSize })}
          label="Font size (px)"
          size="md"
          suffix="px"
          allowDecimal={false}
        />
      </Fieldset>
      <Fieldset legend="Secondary text" mt={24}>
        <TextInput
          value={secondaryText}
          onChange={(e) => updateSecondaryText({ content: e.target.value })}
          placeholder="by Kieran Roberts"
          label="Content"
          description={`Maximum ${textLimits.SECONDARY_TEXT_LENGTH} characters`}
          error={
            secondaryText.length > textLimits.SECONDARY_TEXT_LENGTH
              ? `Maximum ${textLimits.SECONDARY_TEXT_LENGTH} characters`
              : null
          }
          rightSection={
            hasSecondaryText && (
              <CloseButton size="sm" variant="subtle" onClick={() => updateSecondaryText({ content: '' })} />
            )
          }
          maxLength={textLimits.SECONDARY_TEXT_LENGTH}
        />

        <ColorInput
          format="rgba"
          label="Color"
          description="Accepts RGBA"
          value={secondaryTextColor}
          onChangeEnd={(value) => updateSecondaryText({ color: value as RGBAColor })}
        />

        <Select
          aria-label="Content font"
          label="Font"
          placeholder="Pick secondary font style"
          data={fonts}
          value={secondaryTextFont}
          onChange={(value) => updateSecondaryText({ font: value as Fonts })}
          allowDeselect={false}
          checkIconPosition="right"
        />

        <NumberInput
          value={secondaryTextFontSize}
          onChange={(value) => updateSecondaryText({ fontSize: value as SecondaryFontSize })}
          suffix="px"
          aria-label="Secondary font size"
          max={textLimits.SECONDARY_TEXT_FONT_SIZE_MAX}
          min={textLimits.SECONDARY_TEXT_FONT_SIZE_MIN}
          label="Font size (px)"
          size="md"
          allowDecimal={false}
        />
      </Fieldset>
    </Stack>
  );
}
