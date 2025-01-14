import { Text, SimpleGrid, UnstyledButton, Stack } from '@mantine/core';

import { useEditor } from '~/contexts/EditorContext';
import { TEMPLATES } from '~/consts/editor';
import { TemplatePreview } from './TemplatePreview';

export function DrawerTemplateSection() {
  const { template, updateTemplate } = useEditor();

  return (
    <Stack gap="xl">
      <SimpleGrid cols={2} spacing="sm" verticalSpacing="xl" component="section">
        {TEMPLATES.map((t) => {
          const isSelected = template === t.id;
          return (
            <Stack key={t.id} gap={2} component="article">
              <Text
                component="span"
                fw={600}
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
                {t.preview({
                  children: (
                    <TemplatePreview
                      coverClasses={t.previewStyles.cover}
                      previewPrimaryBarClasses={t.previewStyles?.primaryText ?? ''}
                      previewSecondaryBarClasses={t.previewStyles?.secondaryText ?? ''}
                      isSelected={isSelected}
                    />
                  )
                })}
              </UnstyledButton>
            </Stack>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
