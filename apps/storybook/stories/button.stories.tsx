import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@repo/ui/button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Button content',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
      table: {
        type: { summary: '() => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BtnDefault: Story = {
  args: {
    children: '다음',
  },
};

export const BtnHovered: Story = {
  args: {
    children: '다음',
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const BtnPressed: Story = {
  args: {
    children: '다음',
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};
