import type { Meta } from '@storybook/react';
import { IoAt, IoKey } from 'react-icons/io5';
import { Input } from '../input';
import { InputLeftElement, InputRightElement } from './input-element';
import { InputGroup } from './input-group';

const meta = {
  component: InputGroup,
  title: 'InputGroup',
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = Meta<typeof InputGroup>;

export const Primary: Story = {
  render: (args) => {
    return (
      <div className="flex gap-4">
        <InputGroup {...args}>
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
  args: {
    size: 'md',
  },
};
