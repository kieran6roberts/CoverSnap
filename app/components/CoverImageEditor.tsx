'use client';

import { Box, Skeleton } from '@mantine/core';

import { EditorHydration, useEditor } from '~/contexts/EditorContext';
import classes from './CoverImage.module.css';
import { BACKGROUND_TEMPLATES } from '~/consts/editor';

export function CoverImageEditor({ imageNodeRef }: { imageNodeRef: React.RefObject<HTMLDivElement | null> }) {
  const {
    template: { backgroundId },
    primaryText,
    secondaryText,
    background: { image: backgroundImage, pattern: backgroundPattern },
    cover
  } = useEditor();

  const backgroundTemplate = BACKGROUND_TEMPLATES.find((t) => t.id === backgroundId);
  const { sections: backgroundSections } = backgroundTemplate ?? {};

  return (
    <EditorHydration skeleton={<Skeleton radius={12} className={classes.coverSkeleton} animate />}>
      <Box
        ref={imageNodeRef}
        style={{
          backgroundColor: 'var(--cover-background-color-1)',
          display: 'var(--cover-display)',
          justifyContent: 'var(--cover-justify-content)',
          alignItems: 'var(--cover-align-items)',
          position: 'relative',
          flexDirection: 'var(--cover-flex-direction)' as React.CSSProperties['flexDirection'],
          gap: '1rem',
          overflow: 'hidden',
          width: 'min(calc(90vw - 360px), 900px)',
          padding: '1rem',
          minWidth: '320px',
          aspectRatio: cover.aspectRatio,
          borderRadius: '12px',
          letterSpacing: 'normal',
          margin: '0 auto'
        }}
      >
        {/* Background sections */}
        {backgroundSections?.map((section, index) => (
          <Box
            key={index}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              backgroundColor: `var(--cover-background-color-${index + 1})`,
              clipPath: section.clipPath
            }}
          />
        ))}

        <Box
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            ...(backgroundPattern?.url
              ? {
                  background: backgroundPattern.url
                }
              : backgroundImage
                ? {
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'transparent'
                  }
                : {})
          }}
        >
          {backgroundImage && (
            <Box
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'var(--cover-background-color-1)',
                opacity: 'var(--cover-color-overlay-opacity)'
              }}
            />
          )}
        </Box>

        {primaryText.content && (
          <span
            id="primaryText"
            className="primaryText"
            style={{
              color: 'var(--cover-primary-text-color)',
              fontSize: 'var(--cover-primary-text-font-size)',
              fontFamily: 'var(--cover-primary-text-font)',
              textAlign: 'var(--cover-primary-text-align)' as React.CSSProperties['textAlign'],
              display: 'block',
              fontWeight: 600,
              margin: 0,
              letterSpacing: 'normal',
              position: 'relative',
              zIndex: 2
            }}
          >
            {primaryText.content}
          </span>
        )}

        {secondaryText.content && (
          <span
            id="secondaryText"
            className="secondaryText"
            style={{
              color: 'var(--cover-secondary-text-color)',
              fontSize: 'var(--cover-secondary-text-font-size)',
              fontFamily: 'var(--cover-secondary-text-font)',
              textAlign: 'var(--cover-secondary-text-align)' as React.CSSProperties['textAlign'],
              display: 'block',
              fontWeight: 500,
              margin: 0,
              position: 'var(--cover-secondary-position, relative)' as React.CSSProperties['position'],
              bottom: 'var(--cover-secondary-bottom, unset)',
              right: 'var(--cover-secondary-right, unset)',
              left: 'var(--cover-secondary-left, unset)',
              letterSpacing: 'normal',
              zIndex: 2
            }}
          >
            {secondaryText.content}
          </span>
        )}
      </Box>
    </EditorHydration>
  );
}
