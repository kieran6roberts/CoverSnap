import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { cloudflareDevProxy } from '@react-router/dev/vite/cloudflare';

export default defineConfig({
  plugins: [cloudflareDevProxy(), reactRouter(), tsconfigPaths()]
});
