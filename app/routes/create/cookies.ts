import { createCookie } from '@remix-run/cloudflare';

export const editorOpenStateCookie = createCookie('editor-open-state', {
  maxAge: 604_800 // 1 week
});

export const welcomeCookie = createCookie('welcome-status', {
  maxAge: 31536000 // 1 year in seconds
});
