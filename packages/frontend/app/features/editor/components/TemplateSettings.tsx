import { SimpleGrid, Stack, Fieldset } from '@mantine/core';
import classnames from 'classnames';

import classes from '~/features/editor/styles/TemplatePreview.module.css';
import { useEditor } from '~/shared/stores/EditorContext';
import { BACKGROUND_TEMPLATES, LAYOUT_TEMPLATES } from '~/features/editor/consts/templates';
import { TemplatePreview } from '~/features/editor/components/TemplatePreview';

export function TemplateSettings() {
  const { template, updateTemplate } = useEditor();

  return (
    <Stack gap={32} pb={{ base: 90, md: 16 }} mt={12}>
      <Fieldset legend="Background split">
        <SimpleGrid cols={{ base: 1, xs: 3, md: 2 }} spacing="xs" verticalSpacing="xl" component="section">
          {BACKGROUND_TEMPLATES.map((t) => {
            const isSelected = template.backgroundId === t.id;
            return (
              <TemplatePreview
                key={t.id}
                templateName={t.name}
                isSelected={isSelected}
                onTemplateUpdate={() => updateTemplate({ ...template, backgroundId: t.id })}
              >
                <div className={classes['previewPaper-content']}>
                  {t.sections?.map((section, index) => (
                    <div
                      className={classes['backgroundTemplate-previewSection']}
                      key={index}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 1,
                        clipPath: section.clipPath
                      }}
                    />
                  ))}
                </div>
              </TemplatePreview>
            );
          })}
        </SimpleGrid>
      </Fieldset>
      <Fieldset legend="Text layout">
        <SimpleGrid cols={{ base: 1, xs: 3, md: 2 }} spacing="xs" verticalSpacing="xl" component="section">
          {LAYOUT_TEMPLATES.map((t) => {
            const isSelected = template.layoutId === t.id;
            return (
              <TemplatePreview
                key={t.id}
                templateName={t.name}
                isSelected={isSelected}
                onTemplateUpdate={() => updateTemplate({ ...template, layoutId: t.id })}
              >
                <div className={classnames(t.previewStyles.cover, classes['previewPaper-content'])}>
                  <div className={classnames(classes['previewBar--wide'], t.previewStyles.primaryText ?? '')} />
                  <div className={classnames(classes['previewBar--narrow'], t.previewStyles.secondaryText ?? '')} />
                </div>
              </TemplatePreview>
            );
          })}
        </SimpleGrid>
      </Fieldset>
    </Stack>
  );
}
