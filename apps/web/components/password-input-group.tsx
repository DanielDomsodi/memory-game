'use client';

import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@memory-game/ui';
import { cloneElement, isValidElement, useState } from 'react';
import { IoEye, IoEyeOff, IoKey } from 'react-icons/io5';

export type PasswordInputGroup = React.ComponentPropsWithoutRef<
  typeof InputGroup
> & {
  input: React.InputHTMLAttributes<HTMLInputElement>;
};

export function PasswordInputGroup(props: PasswordInputGroup) {
  const { input, children, ...rest } = props;
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const _input =
    isValidElement<typeof input>(input) &&
    cloneElement(input, {
      type: passwordVisibility ? 'text' : 'password',
    });

  return (
    <InputGroup size="lg" {...rest}>
      <InputLeftElement pointerEvents="none">
        <IoKey />
      </InputLeftElement>
      {_input}
      <InputRightElement onClick={() => setPasswordVisibility((pv) => !pv)}>
        {passwordVisibility ? <IoEyeOff /> : <IoEye />}
      </InputRightElement>
      {children}
    </InputGroup>
  );
}
