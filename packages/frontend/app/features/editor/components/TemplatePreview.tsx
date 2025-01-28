import { Center, Paper, Stack, UnstyledButton, Text } from '@mantine/core';
import { Check } from 'iconoir-react';

import classes from '~/features/editor/styles/TemplatePreview.module.css';

export const TemplatePreview = ({
  children,
  isSelected,
  onTemplateUpdate,
  templateName
}: {
  children: React.ReactNode;
  isSelected: boolean;
  onTemplateUpdate: () => void;
  templateName: string;
}) => {
  return (
    <Stack key={templateName} gap={4} component="article">
      <Text
        component="span"
        fw={600}
        fz={{ base: 18, sm: 14 }}
        ta="center"
        c={isSelected ? 'var(--mantine-color-primary-filled)' : 'var(--mantine-color-dimmed)'}
      >
        {templateName}
      </Text>

      <UnstyledButton aria-label={`Toggle ${templateName} template`} onClick={onTemplateUpdate}>
        <Paper radius="md" className={classes.previewPaper}>
          {children}
          {isSelected && (
            <Center component="span" pos="absolute" style={{ zIndex: 50 }} inset={0} bg="rgba(0, 0, 0, 0.5)">
              <Center component="span" w={40} h={40} bg="white" style={{ borderRadius: '100%' }}>
                <Check width={32} height={32} color="var(--mantine-color-blue-filled)" />
              </Center>
            </Center>
          )}
        </Paper>
      </UnstyledButton>
    </Stack>
  );
};
