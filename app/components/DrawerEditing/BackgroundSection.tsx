/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColorInput,
  Stack,
  FileInput,
  NumberInput,
  Button,
  Image,
  Text,
  Divider,
  Paper,
  SimpleGrid,
  UnstyledButton,
  Center
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
      updateCSSVariables({ name: '--cover-color-overlay-opacity', value: '0%' });
    }
  };

  const onPatternChange = (name: string) => {
    if (backgroundImage) {
      onBackgroundImageChange(null);
      updateCSSVariables({ name: '--cover-color-overlay-opacity', value: '0%' });
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
      <Divider label="Basic" labelPosition="center" />
      <ColorInput
        format="rgba"
        label="Background color"
        description="Accepts RGBA"
        value={backgroundColor}
        onChange={(value) => updateBackground({ color: value })}
      />
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
            updateCSSVariables({ name: '--cover-color-overlay-opacity', value: `${percentage}%` });
          }}
          label="Overlay opacity"
          allowNegative={false}
        />
      ) : null}
      <Divider label="Patterns" mt={40} labelPosition="center" />
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
      <SimpleGrid cols={2} spacing="sm" verticalSpacing="xl" mt={32}>
        {Object.entries(patterns).map(([key, value]) => {
          const isSelected = backgroundPattern.name === key;
          return (
            <Stack key={key} gap="xs">
              <Text
                component="span"
                fw={500}
                ta="center"
                c={isSelected ? 'var(--mantine-primary-color-light-color)' : 'var(--mantine-color-scheme)'}
              >
                {key}
              </Text>

              <UnstyledButton aria-label={`Select ${key} background pattern`} onClick={() => onPatternChange(key)}>
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
                  {isSelected && (
                    <Center className={classes['patternCard-selected']}>
                      <Text component="span" fw={500} c="var(--mantine-primary-color-light-color)">
                        <Check width={32} height={32} />
                      </Text>
                    </Center>
                  )}
                </Paper>
              </UnstyledButton>
            </Stack>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
