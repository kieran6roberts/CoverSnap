import { Paper, Center } from '@mantine/core';
import { Check } from 'iconoir-react';

import classnames from 'classnames';
import classes from './TemplatePreview.module.css';

export const TemplatePreview = ({
  coverClasses,
  previewPrimaryBarClasses,
  previewSecondaryBarClasses,
  isSelected
}: {
  coverClasses: string;
  previewPrimaryBarClasses?: string;
  previewSecondaryBarClasses?: string;
  isSelected: boolean;
}) => {
  return (
    <Paper
      withBorder
      bg="var(--mantine-primary-color-filled)"
      radius="md"
      className={classnames(classes.previewContainer, coverClasses)}
    >
      <div className={classnames(classes.previewBar, classes['previewBar--wide'], previewPrimaryBarClasses)} />
      <div className={classnames(classes.previewBar, classes['previewBar--narrow'], previewSecondaryBarClasses)} />
      {isSelected && (
        <Center pos="absolute" inset={0} bg="rgba(0, 0, 0, 0.5)">
          <Check width={32} height={32} color="white" />
        </Center>
      )}
    </Paper>
  );
};
