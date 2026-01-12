# Photo Viewer App

사진을 조회하고 메타데이터를 확인할 수 있는 웹 애플리케이션입니다.

## 프로젝트 실행 방법

### 필수 요구사항

- Node.js 18 이상
- pnpm (권장) 또는 npm, yarn

### 설치 및 실행

```bash
# 의존성 설치 (루트 디렉토리에서)
pnpm install

# 개발 서버 실행
pnpm dev

# 또는 web 앱만 실행
pnpm dev --filter web
```

## 구현한 기능

### 1. 사진 메타데이터 표시

- **사진 이미지**: 반응형 이미지 (최대 728px)
- **기본 정보**: id, author
- **크기 정보**: width, height (천 단위 구분 포맷)
- **링크 정보**: url, download_url (클릭 가능한 링크)

### 2. 상태 영속성

- Zustand persist 미들웨어를 통한 localStorage 저장
- 페이지 새로고침 시에도 마지막 조회한 사진 데이터 유지
- 브라우저 캐싱으로 이미지 즉시 로드

### 3. 반응형 디자인

- 모바일/태블릿/데스크톱 화면 최적화
- **모바일/태블릿**: 세로 스택 레이아웃
- **데스크톱 (1280px 이상)**: 가로 분할 레이아웃 (사진:정보 = 1:1)
- 반응형 타이포그래피 (28px → 32px)

### 4. Typography 시스템

- 일관된 텍스트 스타일 관리를 위한 컴포넌트화
- `HeaderTitle`, `DisplayText`, `BodyText`, `BodyTextMuted`, `LinkText` 제공
- Tailwind CSS와 clsx/tailwind-merge 조합으로 유연한 스타일링

### 5. 사용자 경험 최적화

- 블러 배경 효과로 이미지에 집중
- 부드러운 전환 애니메이션
- 접근성을 고려한 시맨틱 HTML
- 로딩 중 디바운스 처리 (300ms)

## 기술 스택

| 분류             | 기술                         |
| ---------------- | ---------------------------- |
| Framework        | Next.js 16.1.0 (App Router)  |
| UI Library       | React 19.2.0                 |
| Language         | TypeScript 5                 |
| Styling          | Tailwind CSS 4               |
| State Management | Zustand (persist)            |
| Server State     | TanStack Query 5             |
| UI Components    | shadcn/ui (Button, Skeleton) |
| Font             | Pretendard Variable          |
| Package Manager  | pnpm                         |
| API              | Picsum Photos API            |

## 기술적 의사결정 및 이유

### 1. Next.js 16 App Router

**선택 이유**: 최신 Next.js 기능 활용 및 서버 컴포넌트 지원

**장점**:

- 서버 컴포넌트로 초기 로딩 성능 향상
- 파일 기반 라우팅으로 직관적인 구조
- Next.js Image 컴포넌트로 이미지 최적화
- 내장 폰트 최적화 (`next/font`)

### 3. Zustand + persist 미들웨어

**선택 이유**: 경량화된 상태 관리 + localStorage 영속성

**장점**:

- Redux보다 간단한 보일러플레이트
- persist 미들웨어로 새로고침 시에도 데이터 유지
- TypeScript 지원 우수
- 작은 번들 크기 (~1.3KB)

### 2. Tailwind CSS 4 + Typography 컴포넌트

**선택 이유**: 빠른 개발과 일관된 디자인 시스템

**장점**:

- 유틸리티 우선 접근으로 빠른 스타일링
- Typography 컴포넌트로 텍스트 스타일 중앙 관리
- 반응형 디자인 구현 용이

### 3. 이미지 캐싱 최적화

**선택 이유**: 새로고침 시 즉시 이미지 표시

**구현**:

```js
// next.config.js
images: {
  minimumCacheTTL: 3600, // 1시간 캐싱
}

// photo-card.tsx
<Image
  fetchPriority="high"  // 우선 로드
  priority              // 최초 렌더 시 프리로드
/>
```

**효과**:

- 브라우저 캐시 활용으로 재방문 시 즉시 표시
- Next.js Image 최적화로 반응형 이미지 자동 생성

## 프로젝트 구조

```bash
apps/web/
├── app/                         # Next.js App Router
│   ├── page.tsx                # 홈 페이지
│   ├── result/page.tsx         # 결과 페이지
│   ├── layout.tsx              # 루트 레이아웃
│   ├── globals.css             # 전역 스타일
│   └── fonts/                  # 폰트 파일
│
├── components/
│   ├── home/                   # 홈 페이지 컴포넌트
│   │   └── home-content.tsx   # 메인 콘텐츠
│   ├── result/                 # 결과 페이지 컴포넌트
│   │   ├── result-content.tsx # 결과 콘텐츠
│   │   ├── photo-card.tsx     # 사진 카드
│   │   ├── info-cards.tsx     # 정보 카드
│   │   ├── info-cards-skeleton.tsx
│   │   └── background-layer.tsx
│   ├── layout/                 # 레이아웃 컴포넌트
│   │   └── header.tsx         # 헤더
│   ├── ui/                     # 재사용 UI 컴포넌트
│   │   ├── typography.tsx     # 타이포그래피 시스템
│   │   └── skeleton.tsx       # 스켈레톤 UI
│   └── providers/              # Context Providers
│       └── query-provider.tsx # TanStack Query
│
├── lib/
│   ├── actions/                # Server Actions
│   │   └── photo.ts           # 사진 조회 액션
│   ├── hooks/                  # Custom Hooks
│   │   └── use-photo.ts       # 사진 조회 훅
│   ├── stores/                 # Zustand Stores
│   │   └── photo-store.ts     # 사진 상태 관리
│   ├── types/                  # TypeScript 타입
│   │   └── photo.types.ts     # 사진 타입 정의
│   └── utils/                  # 유틸리티 함수
│       └── cn.ts              # 클래스 병합 유틸
│
└── next.config.js              # Next.js 설정

packages/
└── ui/                         # 공유 UI 컴포넌트
    └── src/
        └── button.tsx          # 버튼 컴포넌트
```

## 주요 컴포넌트 설명

### 상태 관리 흐름

```text
사용자 액션 → useMutation (TanStack Query)
             ↓
         Server Action (photo.ts)
             ↓
         Picsum API 호출
             ↓
         Zustand Store 업데이트 + localStorage 저장
             ↓
         UI 자동 업데이트
```
