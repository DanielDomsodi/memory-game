import type { Config } from 'tailwindcss';
import { createGlobPatternsForDependencies } from '@nrwl/react/tailwind';
import { join } from 'path';

export default {
  content: [
    join(__dirname, './src/**/*!(*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  presets: [require('../tailwind-preset/src/lib/base-preset')],
} satisfies Config;
