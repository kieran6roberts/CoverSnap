import { Select } from '@mantine/core';

import { IMAGE_DOWNLOAD_SIZES } from '~/features/editor/consts';

export function CoverImageSize({
  defaultImageSize,
  onAspectRatioChange
}: {
  defaultImageSize: string;
  onAspectRatioChange: (value: string | null) => void;
}) {
  return (
    <Select
      label="Image download size"
      w="275px"
      value={defaultImageSize}
      data={Object.values(IMAGE_DOWNLOAD_SIZES).map((size) => ({
        value: size.value,
        label: `${size.width}x${size.height} ${size.label} `
      }))}
      onChange={(value) => onAspectRatioChange(value)}
      clearable={false}
      allowDeselect={false}
      comboboxProps={{ width: '300px', position: 'bottom' }}
      checkIconPosition="right"
    />
  );
}
