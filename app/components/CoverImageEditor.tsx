'use client';

import { Box, Skeleton, SegmentedControl, Center } from '@mantine/core';
import { Rnd } from 'react-rnd';
import { AlignLeft, AlignCenter, AlignRight } from 'iconoir-react';

import { EditorHydration, useEditor } from '~/contexts/EditorContext';
import classes from './CoverImage.module.css';

const AlignmentControls = ({
  value,
  onChange
}: {
  value: 'center' | 'left' | 'right';
  onChange: (value: 'center' | 'left' | 'right') => void;
}) => (
  <SegmentedControl
    size="xs"
    value={value}
    onChange={(value) => onChange(value as 'center' | 'left' | 'right')}
    data={[
      {
        label: (
          <Center>
            <AlignLeft width={12} height={12} />
          </Center>
        ),
        value: 'left'
      },
      {
        label: (
          <Center>
            <AlignCenter width={12} height={12} />
          </Center>
        ),
        value: 'center'
      },
      {
        label: (
          <Center>
            <AlignRight width={12} height={12} />
          </Center>
        ),
        value: 'right'
      }
    ]}
    className={classes.titleControl}
  />
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
    setPrimaryTitleAlign,
    setSubTitleAlign
  } = useEditor();
  return (
    <EditorHydration skeleton={<Skeleton className={classes.coverSkeleton} />}>
      <Box ref={imageNodeRef} className={classes.cover} variant="filled">
        <Box
          className={classes.backgroundWrapper}
          style={{
            ...(backgroundImage && {
              background: `linear-gradient(
                      color-mix(in srgb, var(--cover-background-color) var(--cover-color-overlay-opacity), transparent),
                      color-mix(in srgb, var(--cover-background-color) var(--cover-color-overlay-opacity), transparent)
                    ), url(${backgroundImage}) center/cover no-repeat`,
              backgroundColor: 'transparent'
            })
          }}
        />

        {primaryTitle ? (
          <Rnd
            disableDragging={isPreviewMode}
            minHeight={100}
            default={{
              x: 0,
              y: 0,
              width: '100%',
              height: '100%'
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
            {!isPreviewMode ? <AlignmentControls value={primaryTitleAlign} onChange={setPrimaryTitleAlign} /> : null}
            <span className={classes.title}>{primaryTitle ?? ''}</span>
          </Rnd>
        ) : null}
        {subTitle ? (
          <Rnd
            disableDragging={isPreviewMode}
            minHeight={100}
            default={{
              x: 0,
              y: 0,
              width: 'auto',
              height: 'auto'
            }}
            bounds="parent"
            enableResizing={{
              top: !isPreviewMode,
              right: !isPreviewMode,
              bottom: !isPreviewMode,
              left: !isPreviewMode
            }}
            style={{ border: isPreviewMode ? 'none' : '1px dashed var(--mantine-primary-color-8)' }}
            className={classes.rndWrapper}
          >
            {!isPreviewMode ? <AlignmentControls value={subTitleAlign} onChange={setSubTitleAlign} /> : null}
            <span className={classes.subtitle}>{subTitle ?? ''}</span>
          </Rnd>
        ) : null}
      </Box>
    </EditorHydration>
  );
}
