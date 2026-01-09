# OpenPlan Assignment - 프로젝트 개발 규칙

## 프로젝트 구조

이 프로젝트는 **Turborepo + pnpm 워크스페이스** 기반 모노레포입니다.

```
openplan-assignment/
├── apps/
│   ├── web/          # Next.js 16 메인 웹 애플리케이션
│   ├── docs/         # Next.js 문서 사이트
│   └── storybook/    # Storybook 컴포넌트 문서화
├── packages/
│   ├── ui/           # 공유 React 컴포넌트 라이브러리
│   ├── eslint-config/   # 공유 ESLint 설정
│   └── typescript-config/ # 공유 TypeScript 설정
└── turbo.json        # Turborepo 설정
```

## 1. 코드 작성 규칙

### 절대 하지 말 것

- **타입 `any` 사용 금지**: TypeScript strict 모드 준수
- **`React.FC` 사용 금지**: React 19에서 deprecated, 명시적 props 타입 사용
- **`forwardRef` 사용 금지**: React 19에서는 ref를 일반 prop으로 전달
- **`console.log` 프로덕션 코드에 남기기 금지**: 디버깅 완료 후 제거
- **지시 없이 build 명령 실행 금지**: 빌드는 필요시에만 실행

### React 19 최신 문법

```typescript
// ❌ 잘못된 방법 (React 18 이하)
import React from 'react';
const MyComponent: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

// ✅ 올바른 방법 (React 19)
import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function MyComponent({ children }: Props) {
  return <div>{children}</div>;
}
```

### ref 전달 (React 19)

```typescript
// ❌ 잘못된 방법 (forwardRef 사용)
import { forwardRef } from 'react';
const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <input ref={ref} {...props} />;
});

// ✅ 올바른 방법 (일반 prop)
interface Props {
  ref?: React.RefObject<HTMLInputElement>;
}

export default function Input({ ref, ...props }: Props) {
  return <input ref={ref} {...props} />;
}
```

## 2. TypeScript 규칙

### 타입 안전성

- **TypeScript strict 모드**: 모든 워크스페이스에서 strict 모드 활성화
- **명시적 타입 정의**: 함수 매개변수와 반환 타입 명시
- **타입 import**: `import type` 사용

```typescript
// ✅ 올바른 타입 import
import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// ✅ 명시적 함수 타입
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### 컴포넌트 Props 타입

```typescript
// ✅ 인터페이스로 Props 정의
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export default function Button({ children, onClick, variant = 'primary', disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={variant}>
      {children}
    </button>
  );
}
```

## 3. 컴포넌트 설계

### 서버/클라이언트 컴포넌트 구분

**서버 컴포넌트 (기본)**
- 데이터 페칭
- 정적 콘텐츠 렌더링
- SEO 중요 콘텐츠

**클라이언트 컴포넌트 (`'use client'`)**
- 이벤트 핸들러 (`onClick`, `onChange` 등)
- 상태 관리 (`useState`, `useReducer`)
- 브라우저 API 사용
- 커스텀 훅 사용

```typescript
// ✅ 클라이언트 컴포넌트
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

## 4. 상태 관리

### TanStack Query (v5.x)

서버 상태 관리에 사용:

```typescript
// ✅ 최신 문법: useSuspenseQuery
import { useSuspenseQuery } from '@tanstack/react-query';

function UserProfile({ userId }: { userId: string }) {
  const { data } = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  return <div>{data.name}</div>;
}
```

### Zustand (v5.x)

클라이언트 전역 상태 관리:

```typescript
// ✅ Zustand v5 최신 문법
import { create } from 'zustand';

interface BearState {
  bears: number;
  increase: () => void;
}

const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}));
```

## 5. Storybook 작성 (CSF 3.0)

### 최신 Storybook 문법

```typescript
// ✅ CSF 3.0 + satisfies 패턴
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

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
};
```

## 6. 스타일링

### Tailwind CSS 사용

- **유틸리티 우선**: Tailwind 클래스 사용
- **커스텀 CSS 최소화**: 필요시에만 `globals.css`에 추가
- **반응형 디자인**: 브레이크포인트 활용 (`sm:`, `md:`, `lg:`, `xl:`)

```tsx
// ✅ Tailwind 클래스 사용
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
  Click me
</button>
```

## 7. Monorepo 워크스페이스

### 패키지 참조

```json
{
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*"
  }
}
```

### 패키지 관리 명령어

```bash
# 전체 빌드
pnpm build

# 특정 워크스페이스에서 개발 서버 실행
pnpm dev --filter web
pnpm dev --filter storybook

# 특정 워크스페이스에 패키지 추가
pnpm add <package> --filter web

# 루트에 개발 의존성 추가
pnpm add -D -w <package>

# 전체 포맷팅
pnpm format

# 전체 린트
pnpm lint
```

## 8. Prettier 설정

프로젝트는 다음 Prettier 규칙을 따릅니다:

- **세미콜론**: 사용 (`semi: true`)
- **따옴표**: 싱글 쿼트 (`singleQuote: true`)
- **후행 쉼표**: 항상 (`trailingComma: 'all'`)
- **탭**: 스페이스 2칸 (`tabWidth: 2`)
- **줄 길이**: 120자 (`printWidth: 120`)
- **Tailwind 클래스 정렬**: 자동 적용

```bash
# 코드 포맷팅
pnpm format
```

## 9. 개발 워크플로우

### 새 컴포넌트 추가

1. `packages/ui/src/`에 컴포넌트 생성
2. TypeScript 타입 명시적 정의
3. `apps/storybook/stories/`에 스토리 작성
4. 린트 및 타입 체크 통과 확인

### 새 페이지 추가

1. `apps/web/app/` 또는 `apps/docs/app/`에 페이지 생성
2. 서버/클라이언트 컴포넌트 구분
3. 필요시 `@repo/ui` 컴포넌트 재사용

### 커밋 전 체크리스트

- [ ] TypeScript 타입 에러 없음 (`pnpm check-types`)
- [ ] ESLint 에러 없음 (`pnpm lint`)
- [ ] Prettier 포맷팅 적용 (`pnpm format`)
- [ ] `console.log` 제거
- [ ] 빌드 성공 확인 (필요시)

## 10. 성능 최적화

### Next.js 이미지 최적화

```tsx
// ✅ Next.js Image 컴포넌트 사용
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={100}
  height={100}
  priority={true}
/>
```

### 동적 import

```tsx
// ✅ 큰 컴포넌트는 동적 import
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

## 11. 참고 자료

- [React 19 문서](https://react.dev/)
- [Next.js 16 문서](https://nextjs.org/docs)
- [TanStack Query v5](https://tanstack.com/query/latest)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Storybook 8](https://storybook.js.org/)
- [Turborepo](https://turbo.build/repo)
- [Tailwind CSS](https://tailwindcss.com/)
