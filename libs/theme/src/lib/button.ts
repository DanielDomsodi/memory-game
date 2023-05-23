import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
  baseStyle: {
    color: 'white',
  },
  variants: {
    solid: ({ colorScheme }) => ({
      color: colorScheme === 'cyan' ? 'white' : 'inherit',
    }),
  },
  defaultProps: {
    colorScheme: 'cyan',
  },
});
