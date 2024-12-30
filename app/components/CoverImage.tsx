import { Box, Title } from '@mantine/core';
import classes from './CoverImage.module.css';
import { useEditor } from '../contexts/EditorContext';

export function CoverImage({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const {
    state: { primaryTitle, secondaryTitle, backgroundColor }
  } = useEditor();
  const hasSecondaryTitle = secondaryTitle.length > 0;

  return (
    <Box className={classes.coverContainer}>
      <Box ref={imageNodeRef} className={classes.cover} variant="filled" p="md" style={{ backgroundColor }}>
        <Title
          order={2}
          className={classes.title}
          c="var(--mantine-color-white)"
          textWrap="balance"
          ta="center"
          lineClamp={3}
        >
          {primaryTitle ?? ''}
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
          {secondaryTitle ?? ''}
        </Title>
      </Box>
    </Box>
  );
}
