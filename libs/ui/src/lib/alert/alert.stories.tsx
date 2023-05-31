import type { Meta } from '@storybook/react';
import { Alert } from './alert';
import {
  IoAlertCircle,
  IoCheckmarkCircle,
  IoInformationCircle,
} from 'react-icons/io5';

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: 'Alert',
} satisfies Meta<typeof Alert>;

export default meta;

type Story = Meta<typeof Alert>;

export const Primary: Story = {
  render: (args) => {
    return (
      <div className="flex w-1/3 flex-col gap-4">
        <Alert {...args}>Lorem ipsum dolor</Alert>
        <Alert status="warning" alertIcon={<IoAlertCircle />}>
          Lorem ipsum dolor
        </Alert>
        <Alert status="success" alertIcon={<IoCheckmarkCircle />}>
          Lorem ipsum dolor
        </Alert>
        <Alert status="error" alertIcon={<IoAlertCircle />}>
          Lorem ipsum dolor
        </Alert>
      </div>
    );
  },
  args: {
    status: 'info',
    alertIcon: <IoInformationCircle />,
  },
};
