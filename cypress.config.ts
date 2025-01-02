import { defineConfig } from 'cypress';
import customViteConfig from './vite.config';
import pkg from 'cy-verify-downloads';
const { verifyDownloadTasks } = pkg;

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: customViteConfig
    }
  },

  e2e: {
    defaultCommandTimeout: 10000,
    video: false,
    viewportHeight: 768,
    viewportWidth: 1366,
    trashAssetsBeforeRuns: true, // Clean screenshots after tests are done
    setupNodeEvents(on) {
      on('task', verifyDownloadTasks);
      on('task', {
        log: (message: string) => {
          // Use if needing logs visible in CI Output
          console.log(message);
          return null;
        }
      });
    }
  }
});
