import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  component: Button,
  title: 'Button',
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return (
      <div className="flex gap-4">
        <Button size="sm">Small</Button>
        <Button {...args}>Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="lg" disabled>
          Disabled
        </Button>
      </div>
    );
  },
  args: {
    variant: 'solid',
    color: 'brand',
    size: 'md',
    full: false,
    isLoading: false,
  },
};
