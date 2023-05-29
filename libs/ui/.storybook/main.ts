import type { StorybookConfig } from '@storybook/react-vite';
const { mergeConfig } = require('vite');

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'libs/ui/vite.config.ts',
      },
    },
  },
  stories: [
    '../src/lib/**/*.stories.mdx',
    '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-styling',
    '@storybook/addon-mdx-gfm',
  ],
  refs: {
    '@chakra-ui/react': {
      disable: true,
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {});
  },
  docs: {
    autodocs: false,
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
