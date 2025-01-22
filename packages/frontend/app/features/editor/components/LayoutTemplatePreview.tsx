import { Paper, Center } from '@mantine/core';
import { Check } from 'iconoir-react';
import classnames from 'classnames';

import classes from '~/features/editor/styles/TemplatePreview.module.css';

export const LayoutTemplatePreview = ({
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
    <Paper radius="md" className={classnames(classes.previewContainer, coverClasses)}>
      <div className={classnames(classes.previewBar, classes['previewBar--wide'], previewPrimaryBarClasses)} />
      <div className={classnames(classes.previewBar, classes['previewBar--narrow'], previewSecondaryBarClasses)} />
      {isSelected && (
        <Center component="span" pos="absolute" inset={0} bg="rgba(0, 0, 0, 0.5)">
          <Center component="span" w={40} h={40} bg="white" style={{ borderRadius: '100%' }}>
            <Check width={32} height={32} color="var(--mantine-color-blue-filled)" />
          </Center>
        </Center>
      )}
    </Paper>
  );
};
