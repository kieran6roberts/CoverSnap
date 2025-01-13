'use client';

import { Box, Skeleton, Menu, Button } from '@mantine/core';
import { Rnd } from 'react-rnd';
import { AlignLeft, AlignCenter, AlignRight, MenuScale, Check } from 'iconoir-react';

import { EditorHydration, useEditor } from '~/contexts/EditorContext';
import classes from './CoverImage.module.css';
import type { TextAlignment } from '~/types/editor';
import { TEXT_ALIGNMENT_OPTIONS } from '~/consts';

const Controls = ({
  alignment,
  stack,
  onAlignChange,
  onStackChange
}: {
  alignment: TextAlignment;
  stack: number;
  onAlignChange: (value: TextAlignment) => void;
  onStackChange: (stack: 'top' | 'bottom') => void;
  textType: 'primary' | 'secondary';
}) => (
  <Menu shadow="md" width={200}>
    <Menu.Target>
      <Button size="xs" className={classes.titleControl} aria-label="Open text controls">
        <MenuScale width={14} height={14} />
      </Button>
    </Menu.Target>

    <Menu.Dropdown miw={250}>
      <Menu.Label>Text alignment</Menu.Label>
      <Menu.Item
        onClick={() => onAlignChange(TEXT_ALIGNMENT_OPTIONS.left)}
        leftSection={<AlignLeft width={14} height={14} />}
        rightSection={alignment === TEXT_ALIGNMENT_OPTIONS.left ? <Check width={14} height={14} /> : null}
      >
        Align left
      </Menu.Item>
      <Menu.Item
        onClick={() => onAlignChange(TEXT_ALIGNMENT_OPTIONS.center)}
        leftSection={<AlignCenter width={14} height={14} />}
        rightSection={alignment === TEXT_ALIGNMENT_OPTIONS.center ? <Check width={14} height={14} /> : null}
      >
        Align center
      </Menu.Item>
      <Menu.Item
        onClick={() => onAlignChange(TEXT_ALIGNMENT_OPTIONS.right)}
        leftSection={<AlignRight width={14} height={14} />}
        rightSection={alignment === TEXT_ALIGNMENT_OPTIONS.right ? <Check width={14} height={14} /> : null}
      >
        Align right
      </Menu.Item>
      <Menu.Divider />
      <Menu.Label>Text stacking</Menu.Label>
      <Menu.Item
        onClick={() => onStackChange('top')}
        rightSection={stack === 1 ? <Check width={14} height={14} /> : null}
      >
        Stack on top
      </Menu.Item>
      <Menu.Item
        onClick={() => onStackChange('bottom')}
        rightSection={stack === 0 ? <Check width={14} height={14} /> : null}
      >
        Stack on bottom
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
);

const RndWrapper = ({
  children,
  isPreviewMode,
  wrapperHeight,
  wrapperWidth,
  textAlignment,
  setTextAlignment,
  stack,
  setStack,
  textType
}: {
  children: React.ReactNode;
  isPreviewMode: boolean;
  wrapperHeight: string | number;
  wrapperWidth: string | number;
  textAlignment: TextAlignment;
  setTextAlignment: (align: TextAlignment) => void;
  stack: number;
  setStack: (stack: 'top' | 'bottom') => void;
  textType: 'primary' | 'secondary';
}) => {
  const handleStackChange = (stack: 'top' | 'bottom') => {
    setStack(stack);
  };

  return (
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
      className={`${classes.rndWrapper} ${textType === 'primary' ? classes.rndWrapperPrimary : classes.rndWrapperSecondary}`}
      style={{
        zIndex: stack,
        border: isPreviewMode ? '1px dashed transparent' : '1px dashed var(--mantine-primary-color-8)'
      }}
    >
      {!isPreviewMode ? (
        <Controls
          alignment={textAlignment}
          stack={stack}
          onAlignChange={setTextAlignment}
          onStackChange={handleStackChange}
          textType={textType}
        />
      ) : null}
      {children}
    </Rnd>
  );
};

export function CoverImageEditor({
  imageNodeRef,
  isPreviewMode
}: {
  imageNodeRef: React.RefObject<HTMLDivElement | null>;
  isPreviewMode: boolean;
}) {
  const {
    primaryText: { content: primaryText, align: primaryTextAlign, stack: primaryTextStack },
    secondaryText: { content: secondaryText, align: secondaryTextAlign, stack: secondaryTextStack },
    background: { image: backgroundImage, pattern: backgroundPattern },
    updatePrimaryText,
    updateSecondaryText
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

        {primaryText ? (
          <RndWrapper
            isPreviewMode={isPreviewMode}
            wrapperHeight="100%"
            wrapperWidth="100%"
            textAlignment={primaryTextAlign}
            setTextAlignment={(value) => updatePrimaryText({ align: value })}
            stack={primaryTextStack.order}
            setStack={(value) => updatePrimaryText({ stack: { ...primaryTextStack, position: value } })}
            textType="primary"
          >
            <span className={classes.title}>{primaryText ?? ''}</span>
          </RndWrapper>
        ) : null}

        {secondaryText ? (
          <RndWrapper
            isPreviewMode={isPreviewMode}
            wrapperHeight="auto"
            wrapperWidth="auto"
            textAlignment={secondaryTextAlign}
            setTextAlignment={(value) => updateSecondaryText({ align: value })}
            stack={secondaryTextStack.order}
            setStack={(value) => updateSecondaryText({ stack: { ...secondaryTextStack, position: value } })}
            textType="secondary"
          >
            <span className={classes.subtitle}>{secondaryText ?? ''}</span>
          </RndWrapper>
        ) : null}
      </Box>
    </EditorHydration>
  );
}
