import type { Config } from 'tailwindcss';
import { createGlobPatternsForDependencies } from '@nrwl/react/tailwind';
import { join } from 'path';

export default {
  content: [
    join(
      __dirname,
      '{app,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  plugins: [],
  presets: [require('../../libs/tailwind-preset/src/lib/base-preset')],
} satisfies Config;
