import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const Story: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default Story;

export const Primary: typeof Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Button size="sm">Small</Button>
      <Button {...args}>Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="lg" disabled>
        Disabled
      </Button>
    </div>
  ),
  args: {
    size: 'md',
    full: false,
    isLoading: false,
  },
};
