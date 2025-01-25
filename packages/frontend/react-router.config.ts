import type { Config } from '@react-router/dev/config';

export default {
  async prerender() {
    return ['/', '/create'];
  },
  ssr: false,
  buildDirectory: 'build'
} satisfies Config;
