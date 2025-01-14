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

import { useEditor } from '~/contexts/EditorContext';
import { updateCSSVariables } from '~/utils/styles';
import classes from './BackgroundSection.module.css';

export function DrawerBackgroundSection() {
  const {
    background: { image: backgroundImage, color: backgroundColor, pattern: backgroundPattern },
    updateBackground
  } = useEditor();

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
    <Stack gap="xl">
      <Fieldset legend="Colors">
        <ColorInput
          format="rgba"
          label="Background color"
          description="Accepts RGBA"
          value={backgroundColor}
          onChangeEnd={(value) => updateBackground({ color: value })}
        />
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
              style={{ border: '1px solid var(--mantine-color-default-border)' }}
              alt="Background image"
              width={368}
              height={200}
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
              // Convert decimal to percentage for color-mix
              const percentage = value ? Number(value) * 100 : 0;
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
        <SimpleGrid cols={2} spacing="sm" verticalSpacing="xl" component="section">
          {Object.entries(patterns).map(([key, value]) => {
            const isSelected = backgroundPattern.name === key;
            return (
              <Stack key={key} gap={2} component="article">
                <Text
                  component="span"
                  fw={600}
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
                      <Center className={classes['patternCard-selected']}>
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
