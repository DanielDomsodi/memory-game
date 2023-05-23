import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { Alert } from './alert';
import { Button } from './button';
import { Input } from './input';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme(
  withDefaultColorScheme({ colorScheme: 'cyan' }),
  {
    config,
    components: { Button, Input, Alert },
  },
  {
    fonts: {
      heading: `'Inter', sans-serif;`,
      body: `'Inter', sans-serif;`,
    },
  }
);

export default theme;
