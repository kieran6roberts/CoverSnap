import { CloseButton, Stack, TextInput } from '@mantine/core';
import { useEditor } from '~/contexts/EditorContext';

export function DrawerTextSection() {
  const { state, setPrimaryTitle, setSecondaryTitle } = useEditor();
  const hasPrimaryTitle = state.primaryTitle.length > 0;
  const hasSecondaryTitle = state.secondaryTitle.length > 0;

  return (
    <Stack>
      <TextInput
        value={state.primaryTitle}
        onChange={(e) => setPrimaryTitle(e.target.value)}
        placeholder="HTTP Security Headers and how to..."
        error={state.primaryTitle.length > 60 ? 'Maximum 60 characters' : null}
        description="Tip: Use the key search words from your article in the title"
        rightSection={hasPrimaryTitle && <CloseButton size="sm" variant="subtle" onClick={() => setPrimaryTitle('')} />}
        maxLength={60}
      />
      <TextInput
        value={state.secondaryTitle}
        onChange={(e) => setSecondaryTitle(e.target.value)}
        placeholder="Let's dive into the world..."
        description="Keep the characters short and sweet"
        error={state.secondaryTitle.length > 80 ? 'Maximum 80 characters' : null}
        rightSection={
          hasSecondaryTitle && <CloseButton size="sm" variant="subtle" onClick={() => setSecondaryTitle('')} />
        }
        maxLength={80}
      />
    </Stack>
  );
}
