import { Box, Title, Text } from '@mantine/core';
import classes from './CoverImage.module.css';
import { useEditor } from '../contexts/EditorContext';

export function CoverImage({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const { state } = useEditor();
  const hasSecondaryTitle = state.secondaryTitle.length > 0;

  return (
    <Box className={classes.coverContainer}>
      <Box ref={imageNodeRef} className={classes.cover} variant="filled" p="md" bg="var(--mantine-color-gray-8)">
        <Title
          order={2}
          className={classes.title}
          c="var(--mantine-color-white)"
          textWrap="balance"
          ta="center"
          lineClamp={3}
        >
          {state.primaryTitle ?? ''}
        </Title>
        <Title
          mt={hasSecondaryTitle ? 'md' : 0}
          order={3}
          className={classes.subtitle}
          c="var(--mantine-color-white)"
          textWrap="balance"
          ta="center"
          lineClamp={3}
        >
          {state.secondaryTitle ?? ''}
        </Title>
      </Box>
    </Box>
  );
}
