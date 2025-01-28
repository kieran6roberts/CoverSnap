/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColorInput,
  Stack,
  FileInput,
  NumberInput,
  Button,
  Image,
  Text,
  Paper,
  SimpleGrid,
  UnstyledButton,
  Center,
  Fieldset
} from '@mantine/core';
import { MediaImageFolder, Check } from 'iconoir-react';
import * as patterns from 'hero-patterns';

import { useEditor } from '~/shared/stores/EditorContext';
import { updateCSSVariables } from '~/shared/utils/styles';
import classes from '~/features/editor/styles/BackgroundSection.module.css';
import { decimalToPercentage } from '~/features/editor/utils';

export function BackgroundSettings() {
  const {
    template,
    background: { image: backgroundImage, colors: backgroundColors, pattern: backgroundPattern },
    updateBackground
  } = useEditor();

  // TODO: Put these in consts
  const is3DotTemplate = template.backgroundId === 'window';
  const isSolidTemplate = template.backgroundId === 'solid';

  const onBackgroundImageChange = (file: File | null) => {
    // Revoke old image if it's a blob
    if (backgroundImage?.startsWith('blob:')) {
      URL.revokeObjectURL(backgroundImage);
    }

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateBackground({ image: imageUrl });
    } else {
      updateBackground({ image: null });
      updateCSSVariables({ '--cover-color-overlay-opacity': '0%' });
    }
  };

  const onPatternChange = (name: string) => {
    if (backgroundImage) {
      onBackgroundImageChange(null);
      updateCSSVariables({ '--cover-color-overlay-opacity': '0%' });
    }
    if (name === backgroundPattern.name) {
      updateBackground({
        pattern: {
          name: null,
          url: null,
          color: backgroundPattern.color,
          opacity: backgroundPattern.opacity
        }
      });
    } else {
      updateBackground({
        pattern: {
          name,
          url: (patterns as any)[name](backgroundPattern.color, backgroundPattern.opacity),
          color: backgroundPattern.color,
          opacity: backgroundPattern.opacity
        }
      });
    }
  };

  return (
    <Stack gap="xl" pb={16} mt={12}>
      <Fieldset legend="Colors">
        <ColorInput
          format="rgba"
          label="Background color 1"
          description="Accepts RGBA"
          value={backgroundColors?.color1 ?? 'rgba(255, 255, 255, 1)'}
          onChangeEnd={(value) => updateBackground({ colors: { ...backgroundColors, color1: value } })}
        />

        {!isSolidTemplate ? (
          <ColorInput
            format="rgba"
            label="Background color 2"
            description="Accepts RGBA"
            value={backgroundColors?.color2 ?? 'rgba(255, 255, 255, 1)'}
            onChangeEnd={(value) => updateBackground({ colors: { ...backgroundColors, color2: value } })}
            disabled={!!backgroundImage}
          />
        ) : null}

        {is3DotTemplate ? (
          <>
            <ColorInput
              format="rgba"
              label="Background color 3"
              description="Accepts RGBA"
              value={backgroundColors?.color3 ?? 'rgba(255, 255, 255, 1)'}
              onChangeEnd={(value) => updateBackground({ colors: { ...backgroundColors, color3: value } })}
              disabled={!!backgroundImage}
            />
            <ColorInput
              format="rgba"
              label="Background color 4"
              description="Accepts RGBA"
              value={backgroundColors?.color4 ?? 'rgba(255, 255, 255, 1)'}
              onChangeEnd={(value) => updateBackground({ colors: { ...backgroundColors, color4: value } })}
              disabled={!!backgroundImage}
            />
          </>
        ) : null}
      </Fieldset>
      <Fieldset legend="Images">
        {backgroundImage ? (
          <Stack>
            <Text fw={500} component="span">
              Upload background image
            </Text>
            <Image
              src={backgroundImage}
              radius="md"
              style={{ border: '1px solid var(--mantine-color-default-border)', aspectRatio: '16/9' }}
              alt="Background image"
              width="100%"
            />
            <Button aria-label="Remove background image" onClick={() => onBackgroundImageChange(null)}>
              Clear
            </Button>
          </Stack>
        ) : (
          <FileInput
            clearable
            description="Accepts PNG, JPEG, and WEBP"
            leftSection={<MediaImageFolder width={16} height={16} />}
            accept="image/png,image/jpeg,image/webp"
            label="Upload background image"
            placeholder="Click to upload"
            maw={368}
            onChange={onBackgroundImageChange}
          />
        )}
        {backgroundImage ? (
          <NumberInput
            defaultValue={0}
            max={1}
            min={0}
            step={0.1}
            decimalScale={1}
            onChange={(value) => {
              const percentage = value ? decimalToPercentage(Number(value)) : 0;
              updateCSSVariables({ '--cover-color-overlay-opacity': `${percentage}%` });
            }}
            label="Overlay opacity"
            allowNegative={false}
          />
        ) : null}
      </Fieldset>
      <Fieldset legend="Patterns" disabled={!!backgroundImage}>
        <ColorInput
          disabled={!!backgroundImage}
          format="hex"
          label="Pattern color"
          description="Accepts HEX"
          value={backgroundPattern.color}
          onChangeEnd={(color) =>
            updateBackground({
              pattern: {
                ...backgroundPattern,
                url: backgroundPattern.name
                  ? (patterns as any)[backgroundPattern.name](color, backgroundPattern.opacity)
                  : null,
                color
              }
            })
          }
        />
        <NumberInput
          disabled={!!backgroundImage}
          max={1}
          min={0}
          step={0.1}
          value={backgroundPattern.opacity}
          onChange={(value) =>
            updateBackground({
              pattern: {
                ...backgroundPattern,
                opacity: Number(value),
                url: backgroundPattern.name
                  ? (patterns as any)[backgroundPattern.name](backgroundPattern.color, Number(value))
                  : null
              }
            })
          }
          label="Pattern opacity"
          allowNegative={false}
        />
        <SimpleGrid cols={{ base: 1, xs: 3, md: 2 }} spacing="sm" verticalSpacing="xl" component="section">
          {Object.entries(patterns).map(([key, value]) => {
            const isSelected = backgroundPattern.name === key;
            return (
              <Stack key={key} gap={4} component="article">
                <Text
                  component="span"
                  fw={600}
                  fz={{ base: 18, sm: 14 }}
                  ta="center"
                  c={
                    isSelected && !backgroundImage
                      ? 'var(--mantine-color-primary-filled)'
                      : 'var(--mantine-color-dimmed)'
                  }
                  style={{
                    whiteSpace: 'nowrap'
                  }}
                >
                  {key}
                </Text>

                <UnstyledButton
                  aria-label={`Select ${key} background pattern`}
                  onClick={() => onPatternChange(key)}
                  style={{ cursor: !backgroundImage ? 'pointer' : 'not-allowed' }}
                >
                  <Paper
                    radius="md"
                    className={classes.patternCard}
                    style={{
                      backgroundImage: value(backgroundPattern.color, 1),
                      border: isSelected
                        ? '1px solid var(--mantine-primary-color-light-color)'
                        : '1px solid var(--mantine-color-default-border)'
                    }}
                  >
                    {isSelected && !backgroundImage && (
                      <Center className={classes['patternCard--selected']}>
                        <Center component="span" w={40} h={40} bg="white" style={{ borderRadius: '100%' }}>
                          <Check width={32} height={32} color="var(--mantine-color-blue-filled)" />
                        </Center>
                      </Center>
                    )}
                  </Paper>
                </UnstyledButton>
              </Stack>
            );
          })}
        </SimpleGrid>
      </Fieldset>
    </Stack>
  );
}
