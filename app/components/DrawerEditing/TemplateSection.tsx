import { Text, SimpleGrid, UnstyledButton, Stack, Divider, Paper, Center } from '@mantine/core';
import classnames from 'classnames';

import classes from './TemplateSection.module.css';
import { useEditor } from '~/contexts/EditorContext';
import { Template } from '~/types/editor';
import { Check } from 'iconoir-react';

const generatePreview = ({
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

export const templates: Template[] = [
  {
    id: 'centered',
    name: 'Centered Stack',
    styles: {
      '--cover-align-items': 'center',
      '--cover-secondary-position': 'relative',
      '--cover-secondary-bottom': 'unset',
      '--cover-secondary-right': 'unset',
      '--cover-primary-text-align': 'center',
      '--cover-secondary-text-align': 'center'
    },
    preview: ({ isSelected }: { isSelected: boolean }) =>
      generatePreview({
        coverClasses: classnames(classes['previewContainer--centered']),
        isSelected
      })
  },
  {
    id: 'left-aligned',
    name: 'Left Aligned',
    styles: {
      '--cover-align-items': 'flex-start',
      '--cover-secondary-position': 'relative',
      '--cover-secondary-bottom': 'unset',
      '--cover-secondary-right': 'unset',
      '--cover-primary-text-align': 'left',
      '--cover-secondary-text-align': 'left'
    },
    preview: ({ isSelected }: { isSelected: boolean }) =>
      generatePreview({
        coverClasses: classnames(classes['previewContainer--left']),
        isSelected
      })
  },
  {
    id: 'right-aligned',
    name: 'Right Aligned',
    styles: {
      '--cover-align-items': 'flex-end',
      '--cover-secondary-position': 'relative',
      '--cover-secondary-bottom': 'unset',
      '--cover-secondary-right': 'unset',
      '--cover-primary-text-align': 'right',
      '--cover-secondary-text-align': 'right'
    },
    preview: ({ isSelected }: { isSelected: boolean }) =>
      generatePreview({
        coverClasses: classnames(classes['previewContainer--right']),
        isSelected
      })
  },
  {
    id: 'center-bottom-right',
    name: 'Center + Bottom Right',
    styles: {
      '--cover-align-items': 'center',
      '--cover-secondary-position': 'absolute',
      '--cover-secondary-bottom': '1rem',
      '--cover-secondary-right': '1rem',
      '--cover-primary-text-align': 'center',
      '--cover-secondary-text-align': 'right'
    },
    preview: ({ isSelected }: { isSelected: boolean }) =>
      generatePreview({
        coverClasses: classnames(classes['previewContainer--centered']),
        previewPrimaryBarClasses: classes['previewBar--wide'],
        previewSecondaryBarClasses: classes['previewBar--bottom-right'],
        isSelected
      })
  },
  {
    id: 'center-bottom-left',
    name: 'Center + Bottom Left',
    styles: {
      '--cover-align-items': 'center',
      '--cover-secondary-position': 'absolute',
      '--cover-secondary-bottom': '1rem',
      '--cover-secondary-left': '1rem',
      '--cover-primary-text-align': 'center',
      '--cover-secondary-text-align': 'left'
    },
    preview: ({ isSelected }: { isSelected: boolean }) =>
      generatePreview({
        coverClasses: classnames(classes['previewContainer--centered']),
        previewPrimaryBarClasses: classes['previewBar--wide'],
        previewSecondaryBarClasses: classes['previewBar--bottom-left'],
        isSelected
      })
  }
];

export function DrawerTemplateSection() {
  const { template, updateTemplate } = useEditor();

  return (
    <Stack gap="xl">
      <Divider label="Layout" labelPosition="center" />
      <SimpleGrid cols={2} spacing="sm" verticalSpacing="xl" mt={32}>
        {templates.map((t) => {
          const isSelected = template === t.id;
          return (
            <Stack key={t.id} gap="xs">
              <Text
                component="span"
                fw={500}
                ta="center"
                c={isSelected ? 'var(--mantine-color-primary-filled)' : 'var(--mantine-color-dimmed)'}
              >
                {t.name}
              </Text>

              <UnstyledButton
                pos="relative"
                aria-label={`Select ${t.name} template`}
                onClick={() => updateTemplate(t.id)}
              >
                {t.preview({ isSelected })}
              </UnstyledButton>
            </Stack>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
