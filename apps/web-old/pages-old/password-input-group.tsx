'use client';

import {
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { cloneElement, isValidElement, useState } from 'react';
import { IoEye, IoEyeOff, IoKey } from 'react-icons/io5';

export type PasswordInputGroup = {
  input: React.InputHTMLAttributes<HTMLInputElement>;
};

export function PasswordInputGroup(props: PasswordInputGroup) {
  const { input } = props;
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const _input =
    isValidElement<typeof input>(input) &&
    cloneElement(input, {
      type: passwordVisibility ? 'text' : 'password',
    });

  const icon = passwordVisibility ? IoEyeOff : IoEye;

  return (
    <InputGroup variant={['outline-alpha', null, 'outline']} size="lg">
      <InputLeftElement pointerEvents="none">
        <Icon as={IoKey} />
      </InputLeftElement>
      {_input}
      <InputRightElement onClick={() => setPasswordVisibility((pv) => !pv)}>
        <Icon as={icon} />
      </InputRightElement>
    </InputGroup>
  );
}
