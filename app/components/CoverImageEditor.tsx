'use client';

import { Box, Skeleton, SegmentedControl, Center } from '@mantine/core';
import { Rnd } from 'react-rnd';
import { AlignLeft, AlignCenter, AlignRight } from 'iconoir-react';

import { EditorHydration, useEditor } from '~/contexts/EditorContext';
import classes from './CoverImage.module.css';
import type { TextAlignment } from '~/types/editor';
import { TEXT_ALIGNMENT_OPTIONS } from '~/consts';

const AlignmentControls = ({ value, onChange }: { value: TextAlignment; onChange: (value: TextAlignment) => void }) => (
  <SegmentedControl
    size="xs"
    value={value}
    onChange={(value) => onChange(value as TextAlignment)}
    data={[
      {
        label: (
          <Center>
            <AlignLeft width={12} height={12} />
          </Center>
        ),
        value: TEXT_ALIGNMENT_OPTIONS.left
      },
      {
        label: (
          <Center>
            <AlignCenter width={12} height={12} />
          </Center>
        ),
        value: TEXT_ALIGNMENT_OPTIONS.center
      },
      {
        label: (
          <Center>
            <AlignRight width={12} height={12} />
          </Center>
        ),
        value: TEXT_ALIGNMENT_OPTIONS.right
      }
    ]}
    className={classes.titleControl}
  />
);

const RndWrapper = ({
  children,
  isPreviewMode,
  wrapperHeight,
  wrapperWidth,
  textAlignment,
  setTextAlignment
}: {
  children: React.ReactNode;
  isPreviewMode: boolean;
  wrapperHeight: string | number;
  wrapperWidth: string | number;
  textAlignment: TextAlignment;
  setTextAlignment: (align: TextAlignment) => void;
}) => (
  <Rnd
    disableDragging={isPreviewMode}
    minHeight={100}
    default={{
      x: 0,
      y: 0,
      width: wrapperWidth,
      height: wrapperHeight
    }}
    bounds="parent"
    enableResizing={{
      top: !isPreviewMode,
      right: !isPreviewMode,
      bottom: !isPreviewMode,
      left: !isPreviewMode
    }}
    className={classes.rndWrapper}
    style={{ border: isPreviewMode ? '1px dashed transparent' : '1px dashed var(--mantine-primary-color-8)' }}
  >
    {!isPreviewMode ? <AlignmentControls value={textAlignment} onChange={setTextAlignment} /> : null}
    {children}
  </Rnd>
);

export function CoverImageEditor({
  imageNodeRef,
  isPreviewMode
}: {
  imageNodeRef: React.RefObject<HTMLDivElement | null>;
  isPreviewMode: boolean;
}) {
  const {
    primaryTitle,
    subTitle,
    primaryTitleAlign,
    subTitleAlign,
    backgroundImage,
    backgroundPattern,
    setPrimaryTitleAlign,
    setSubTitleAlign
  } = useEditor();
  return (
    <EditorHydration skeleton={<Skeleton className={classes.coverSkeleton} />}>
      <Box ref={imageNodeRef} className={classes.cover} variant="filled">
        <Box
          className={classes.backgroundWrapper}
          style={{
            ...(backgroundPattern?.url
              ? {
                  background: backgroundPattern.url
                }
              : backgroundImage
                ? {
                    background: `linear-gradient(
                  color-mix(in srgb, var(--cover-background-color) var(--cover-color-overlay-opacity), transparent),
                  color-mix(in srgb, var(--cover-background-color) var(--cover-color-overlay-opacity), transparent)
                ), url(${backgroundImage}) center/cover no-repeat`,
                    backgroundColor: 'transparent'
                  }
                : {})
          }}
        />

        {primaryTitle ? (
          <RndWrapper
            isPreviewMode={isPreviewMode}
            wrapperHeight="100%"
            wrapperWidth="100%"
            textAlignment={primaryTitleAlign}
            setTextAlignment={setPrimaryTitleAlign}
          >
            <span className={classes.title}>{primaryTitle ?? ''}</span>
          </RndWrapper>
        ) : null}

        {subTitle ? (
          <RndWrapper
            isPreviewMode={isPreviewMode}
            wrapperHeight="auto"
            wrapperWidth="auto"
            textAlignment={subTitleAlign}
            setTextAlignment={setSubTitleAlign}
          >
            <span className={classes.subtitle}>{subTitle ?? ''}</span>
          </RndWrapper>
        ) : null}
      </Box>
    </EditorHydration>
  );
}
