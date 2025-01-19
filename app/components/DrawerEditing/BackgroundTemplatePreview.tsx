import { Paper, Center } from '@mantine/core';
import { Check } from 'iconoir-react';

import classnames from 'classnames';
import classes from './TemplatePreview.module.css';

export const BackgroundTemplatePreview = ({
  coverClasses,
  previewSection1Classes,
  isSelected
}: {
  coverClasses: string;
  previewSection1Classes?: string;
  isSelected: boolean;
}) => {
  return (
    <Paper radius="md" className={classnames(classes.previewContainer, coverClasses)}>
      <div className={classnames(classes.previewSection, previewSection1Classes)} />
      {isSelected && (
        <Center pos="absolute" inset={0} bg="rgba(0, 0, 0, 0.5)">
          <Center component="span" w={40} h={40} bg="white" style={{ borderRadius: '100%' }}>
            <Check width={32} height={32} color="var(--mantine-color-blue-filled)" />
          </Center>
        </Center>
      )}
    </Paper>
  );
};
