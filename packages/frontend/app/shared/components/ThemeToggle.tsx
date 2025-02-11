import { ActionIcon, Center, useMantineColorScheme } from '@mantine/core';
import { SunLight, HalfMoon } from 'iconoir-react';
import { SITE_THEMES } from '~/config/consts';

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => setColorScheme(colorScheme === SITE_THEMES.light ? SITE_THEMES.dark : SITE_THEMES.light)}
      variant="default"
      size={40}
      aria-label="Toggle color scheme"
    >
      <Center darkHidden h="100%" w="100%">
        <SunLight width={20} height={20} color="var(--mantine-color-text)" />
      </Center>
      <Center lightHidden h="100%" w="100%">
        <HalfMoon width={20} height={20} color="var(--mantine-color-text)" />
      </Center>
    </ActionIcon>
  );
}
