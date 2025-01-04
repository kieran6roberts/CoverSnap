import { ColorInput, Stack, FileInput, NumberInput, Button, Image, Text } from '@mantine/core';
import { useSearchParams } from '@remix-run/react';
import { MediaImageFolder } from 'iconoir-react';

import { useEditor } from '~/contexts/EditorContext';
import { updateCSSVariable } from '~/utils/styles';

export function DrawerBackgroundSection() {
  const [searchParams] = useSearchParams();
  const resetKey = searchParams.get('reset');

  const { backgroundImage, backgroundColor, setBackgroundColor, setBackgroundImage } = useEditor();

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
      <ColorInput
        key={`bg-color-${resetKey}`}
        format="rgba"
        label="Background color"
        description="Accepts RGBA"
        value={backgroundColor}
        onChange={setBackgroundColor}
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
          <Button aria-label="Remove background image" onClick={() => setBackgroundImage(null)}>
            Clear
          </Button>
        </Stack>
      ) : (
        <FileInput
          key={`bg-image-${resetKey}`}
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
          key={`color-overlay-opacity-${resetKey}`}
          defaultValue={0}
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
