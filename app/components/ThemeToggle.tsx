'use client';

import { Select, useMantineColorScheme } from '@mantine/core';
import { SunLight, HalfMoon, Settings } from 'iconoir-react';

const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';
const AUTO_THEME = 'auto';

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const themeOptions = [
    {
      value: LIGHT_THEME,
      label: 'Light',
      leftSection: <SunLight width={16} height={16} color="var(--mantine-color-text)" />
    },
    {
      value: DARK_THEME,
      label: 'Dark',
      leftSection: <HalfMoon width={16} height={16} color="var(--mantine-color-text)" />
    },
    {
      value: AUTO_THEME,
      label: 'Auto',
      leftSection: <Settings width={16} height={16} color="var(--mantine-color-text)" />
    }
  ];

  return (
    <Select
      checkIconPosition="right"
      comboboxProps={{ shadow: 'md' }}
      leftSection={themeOptions.find((option) => option.value === colorScheme)?.leftSection}
      aria-label="Theme toggle"
      data={themeOptions}
      size="sm"
      w={120}
      variant="filled"
      value={colorScheme}
      onChange={(value) => setColorScheme(value as 'light' | 'dark' | 'auto')}
      allowDeselect={false}
    />
  );
}
