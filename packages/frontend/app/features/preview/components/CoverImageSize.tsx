import { Select, Skeleton } from '@mantine/core';

import { IMAGE_DOWNLOAD_SIZES } from '~/features/editor/consts';

export function CoverImageSize({
  defaultImageSize,
  onAspectRatioChange,
  _hasHydrated
}: {
  defaultImageSize: string;
  onAspectRatioChange: (value: string | null) => void;
  _hasHydrated: boolean;
}) {
  return (
    <Skeleton visible={!_hasHydrated} maw={250}>
      <Select
        label="Image download size"
        value={defaultImageSize}
        data={Object.values(IMAGE_DOWNLOAD_SIZES).map((size) => ({
          value: size.value,
          label: `${size.width}x${size.height} ${size.label} `
        }))}
        onChange={(value) => onAspectRatioChange(value)}
        clearable={false}
        allowDeselect={false}
        comboboxProps={{ width: '275px', position: 'bottom' }}
        checkIconPosition="right"
      />
    </Skeleton>
  );
}
