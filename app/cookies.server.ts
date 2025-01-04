import { createCookie } from '@remix-run/node';

export const editorOpenStateCookie = createCookie('editor-open-state', {
  maxAge: 604_800 // 1 week
});
