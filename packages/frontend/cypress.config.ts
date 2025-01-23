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
    setupNodeEvents: async (on, config) => {
      on('task', verifyDownloadTasks);
      on('task', {
        log: (message: string) => {
          // Use if needing logs visible in CI Output
          console.log(message);
          return null;
        }
      });
      const fileName = config.env.configFile || 'dev';
      const configFile = await import(`./cypress/config/${fileName}.json`, {
        with: { type: 'json' }
      });
      return {
        ...config,
        ...configFile.default
      };
    }
  }
});
