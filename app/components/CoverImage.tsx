import { Box, Title, Text } from '@mantine/core';
import classes from './CoverImage.module.css';
import { useEditor } from '../contexts/EditorContext';

export function CoverImage({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const { state } = useEditor();

  return (
    <Box className={classes.coverContainer} ref={imageNodeRef}>
      <Box className={classes.cover} variant="filled" bg="var(--mantine-color-gray-8)">
        <Title order={2} className={classes.title} c="var(--mantine-color-white)" ta="center">
          {state.primaryTitle ?? ''}
        </Title>
        <Text className={classes.subtitle} c="var(--mantine-color-white)" ta="center">
          {state.secondaryTitle ?? ''}
        </Text>
      </Box>
    </Box>
  );
}
