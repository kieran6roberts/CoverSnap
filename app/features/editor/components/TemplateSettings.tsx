'use client';

import { Text, SimpleGrid, UnstyledButton, Stack, Fieldset } from '@mantine/core';

import { useEditor } from '~/shared/contexts/EditorContext';
import { BACKGROUND_TEMPLATES, LAYOUT_TEMPLATES } from '~/features/editor/consts/templates';
import { LayoutTemplatePreview } from '~/features/editor/components/LayoutTemplatePreview';
import { BackgroundTemplatePreview } from '~/features/editor/components/BackgroundTemplatePreview';

export function TemplateSettings() {
  const { template, updateTemplate } = useEditor();

  return (
    <Stack gap={32}>
      <Fieldset legend="Background split">
        <SimpleGrid cols={{ base: 1, xs: 3, md: 2 }} spacing="xs" verticalSpacing="xl" component="section">
          {BACKGROUND_TEMPLATES.map((t) => {
            const isSelected = template.backgroundId === t.id;
            return (
              <Stack key={t.id} gap={4} component="article">
                <Text
                  component="span"
                  fw={600}
                  fz={{ base: 18, sm: 14 }}
                  ta="center"
                  c={isSelected ? 'var(--mantine-color-primary-filled)' : 'var(--mantine-color-dimmed)'}
                >
                  {t.name}
                </Text>

                <UnstyledButton
                  pos="relative"
                  aria-label={`Select ${t.name} template`}
                  onClick={() => updateTemplate({ ...template, backgroundId: t.id })}
                >
                  {t.preview({
                    children: <BackgroundTemplatePreview styles={t.previewStyles ?? ''} isSelected={isSelected} />
                  })}
                </UnstyledButton>
              </Stack>
            );
          })}
        </SimpleGrid>
      </Fieldset>
      <Fieldset legend="Text layout">
        <SimpleGrid cols={{ base: 1, xs: 3, md: 2 }} spacing="xs" verticalSpacing="xl" component="section">
          {LAYOUT_TEMPLATES.map((t) => {
            const isSelected = template.layoutId === t.id;
            return (
              <Stack key={t.id} gap={4} component="article">
                <Text
                  component="span"
                  fw={600}
                  fz={{ base: 18, sm: 14 }}
                  ta="center"
                  c={isSelected ? 'var(--mantine-color-primary-filled)' : 'var(--mantine-color-dimmed)'}
                >
                  {t.name}
                </Text>

                <UnstyledButton
                  pos="relative"
                  aria-label={`Select ${t.name} template`}
                  onClick={() => updateTemplate({ ...template, layoutId: t.id })}
                >
                  {t.preview({
                    children: (
                      <LayoutTemplatePreview
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
      </Fieldset>
    </Stack>
  );
}
