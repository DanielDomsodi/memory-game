import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const variantOutlineAlpha = definePartsStyle(() => ({
  field: {
    backgroundColor: 'whiteAlpha.300',
    border: '1px solid transparent',
    color: 'white',
    _focusVisible: {
      borderColor: 'whiteAlpha.500',
      boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.5)',
    },
    _hover: {
      borderColor: 'whiteAlpha.500',
    },
    _placeholder: {
      color: 'whiteAlpha.800',
    },
  },
  element: {
    color: 'white',
  },
}));

export const Input = defineMultiStyleConfig({
  variants: { 'outline-alpha': variantOutlineAlpha },
});
