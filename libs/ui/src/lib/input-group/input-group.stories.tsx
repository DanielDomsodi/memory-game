import type { Meta } from '@storybook/react';
import { InputGroup } from './input-group';
import Input from '../input/input';
import {
  InputLeftElement,
  InputRightElement,
} from '../input-element/input-element';
import { IoAt, IoKey } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import { BaseSize } from '../theme/theme.type';

const Story: Meta<typeof InputGroup> = {
  component: InputGroup,
  title: 'InputGroup',
};
export default Story;

export const Primary: typeof Story = {
  render: (args) => {
    const [inputSize, setInputSize] = useState<BaseSize>('md');

    useEffect(() => {
      setTimeout(() => {
        setInputSize('lg');
      }, 2000);
    });

    return (
      <div className="flex gap-4">
        <InputGroup {...args} size={inputSize}>
          <InputLeftElement pointerEvents="none">
            <IoAt />
          </InputLeftElement>
          <Input variant="filled" />
          <InputRightElement>
            <IoKey />
          </InputRightElement>
        </InputGroup>
      </div>
    );
  },
  args: {},
};
