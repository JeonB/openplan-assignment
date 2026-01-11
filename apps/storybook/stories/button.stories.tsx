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

export const BtnHoveredAndPressed: Story = {
  args: {
    children: '다음',
  },
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Default State */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-600">Default</span>
        <Button>다음</Button>
      </div>

      {/* Hovered State */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-600">BtnHovered&Pressed</span>
        <Button className="!bg-black-100/80">다음</Button>
      </div>
    </div>
  ),
};
