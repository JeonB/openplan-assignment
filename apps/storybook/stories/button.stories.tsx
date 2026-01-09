import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@repo/ui/button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    appName: {
      control: 'text',
      description: 'The name of the application',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me',
    appName: 'storybook',
  },
};

export const WebApp: Story = {
  args: {
    children: 'Web Button',
    appName: 'web',
  },
};

export const DocsApp: Story = {
  args: {
    children: 'Docs Button',
    appName: 'docs',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Styled Button',
    appName: 'storybook',
    className: 'px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors',
  },
};

export const LongText: Story = {
  args: {
    children: 'This is a button with a very long text content',
    appName: 'storybook',
    className: 'px-4 py-2 bg-gray-100 rounded',
  },
};

export const DifferentStyles: Story = {
  args: {
    children: 'Custom Style',
    appName: 'storybook',
    className:
      'px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform',
  },
};
