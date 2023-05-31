import type { Meta } from '@storybook/react';
import { Input } from './input';

const Story: Meta<typeof Input> = {
  component: Input,
  title: 'Input',
};
export default Story;

export const Primary: typeof Story = {
  render: (args) => {
    return (
      <div className="flex w-1/2 gap-4">
        <Input {...args} placeholder="First Name" />
        <Input {...args} />
      </div>
    );
  },
  args: {
    variant: 'outline',
    size: 'md',
    disabled: false,
  },
};
