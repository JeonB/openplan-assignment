# Storybook

UI 컴포넌트 개발 및 문서화를 위한 Storybook 워크스페이스입니다.

## 개발 서버 실행

```bash
pnpm dev --filter storybook
```

또는

```bash
cd apps/storybook
pnpm storybook
```

## 빌드

```bash
pnpm build --filter storybook
```

## 기술 스택

- Storybook 10.1.x
- React 19
- Vite (빌드 도구)
- TypeScript 5.9

## 스토리 작성

CSF 3.0 형식으로 스토리를 작성합니다:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@repo/ui/button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me',
    appName: 'storybook',
  },
};
```
