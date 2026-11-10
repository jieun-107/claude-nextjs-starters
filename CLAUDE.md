# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Next.js 16 주의사항

이 프로젝트는 `next@16.4.5`이며 학습 데이터의 Next.js와 API·규약이 다를 수 있습니다. 코드를 작성하기 전에 `node_modules/next/dist/docs/`의 관련 가이드를 확인하고, deprecation 안내를 따르세요. 자세한 규칙은 `AGENTS.md`에 있으며 `next dev`가 이 블록을 자동으로 관리합니다. 해당 블록은 수정하지 말고 커밋에 그대로 포함하세요.

- `next.config.ts`에서 `cacheComponents: true`가 켜져 있습니다. 서버 컴포넌트에서 `new Date()` 같은 현재 시각 값을 프리렌더 시점에 읽으면 빌드/렌더 오류가 납니다. 이런 값은 동적 컴포넌트로 분리하세요.
- 라우트 단위 에러 경계(`app/error.tsx`)의 재시도 prop 이름은 `retry`입니다 (`reset` 아님).
- `experimental.agentFeedback`이 활성화되어 있습니다. 작업 마무리 전 `AGENTS.md`의 피드백 절차를 따릅니다.

## 명령어

```bash
npm install            # 의존성 설치
npm run dev            # 개발 서버 (내부적으로 `next dev --webpack`, Turbopack 아님)
npm run build          # 프로덕션 빌드 (타입 검사 포함)
npm run start          # 빌드 결과 실행
npm run lint           # ESLint (flat config: eslint.config.mjs, next core-web-vitals + typescript)
npx tsc --noEmit       # 타입만 검사 (별도 스크립트 없음)
npx shadcn@latest add <component>   # shadcn/ui 컴포넌트 추가
```

- 테스트 프레임워크가 설정되어 있지 않습니다. 단일 테스트 실행 방법은 없으며, 변경 검증은 `lint`, `tsc --noEmit`, 그리고 dev 서버에서의 화면 확인으로 합니다. 화면 확인은 `.mcp.json`에 설정된 Playwright MCP로 할 수 있습니다 (`.playwright-mcp/`는 gitignore 대상).
- `next.config.ts`에 `turbopack.rules`(CSS용 `@tailwindcss/turbopack`)가 있지만 개발 서버는 `--webpack`으로 실행됩니다. CSS 처리 문제를 디버깅할 때 개발 경로와 빌드 경로가 다를 수 있음을 염두에 두세요.
- 커밋 메시지는 한국어로, `[Feat]`, `[Fix]`, `[Docs]`, `[Refactor]`, `[Chore]` 등 접두사 + 한 줄 요약 형식을 따릅니다 (예: `[Fix] DropdownMenu 메뉴 클릭 시 MenuGroupContext 오류 수정`).

## 아키텍처 (큰 그림)

### 라우팅과 레이아웃

- App Router 구조입니다. 모든 페이지가 `app/layout.tsx`의 루트 레이아웃을 공유합니다.
- 루트 레이아웃이 `ThemeProvider` → `TooltipProvider` → `SiteHeader` / `<main>` / `SiteFooter` / `Toaster` 순서로 감쌉니다. 새 전역 프로바이더나 전역 UI는 여기에 추가합니다.
- `lang="ko"`이며 UI 문구와 메타데이터 모두 한국어가 기본입니다. 메타데이터 title은 `template: "%s | {siteName}"` 패턴을 씁니다.
- 각 페이지는 보통 `<Container>`로 감싸고 `<PageHeader>`(브레드크럼·제목·설명·우측 액션 슬롯)로 상단을 구성합니다.

### 단일 출처 설정 (두 곳을 함께 봐야 하는 부분)

- **내비게이션**: `config/site.ts`의 `siteConfig.mainNav`가 헤더(`site-header` → `nav-links`), 모바일 메뉴(`mobile-nav`), 푸터(`site-footer`)에 모두 반영됩니다. 메뉴를 바꿀 때 컴포넌트를 따로 수정할 필요는 없습니다.

### 컴포넌트 계층

- `components/ui/`: shadcn/ui 원본 (style `base-nova`, `components.json` 참고). 직접 수정은 최소화합니다.
- **중요**: 이 컴포넌트들은 Radix가 아니라 `@base-ui/react` 기반입니다. 합성(composition)은 `asChild` 대신 `render` prop을 씁니다. 예: `<BreadcrumbLink render={<Link href=... />}>`.
- `components/layout/`: 사이트 골격 (Container, SiteHeader, MobileNav, SiteFooter, PageHeader). `components/common/`: 앱 공통 조합 (ThemeToggle, ContactForm). `components/samples/`: 샘플 페이지 전용 컴포넌트. `components/providers/`: 전역 프로바이더 (ThemeProvider).
- 클라이언트 컴포넌트는 파일 최상단에 `"use client"`를 둡니다 (폼, 테마, 에러 경계 등).

### 스타일과 테마

- Tailwind CSS v4 + CSS 변수 기반 테마입니다. 색상 토큰과 `.dark` 변형은 `app/globals.css`에 정의되어 있습니다. 색상을 바꿀 때 컴포넌트에 하드코딩하지 말고 토큰(`bg-background`, `text-muted-foreground` 등)을 사용하세요.
- 다크모드는 `next-themes`가 `<html>`에 `class="dark"`를 토글하는 방식이며 기본값은 시스템 설정입니다. `disableTransitionOnChange`가 켜져 있습니다.
- 클래스 병합은 `import { cn } from "cn"`을 직접 사용합니다. `lib/utils.ts`는 `cn`을 재export하지만 사용처가 없습니다.
- 경로 별칭 `@/*`는 프로젝트 루트를 가리킵니다 (`tsconfig.json`).

### 폼과 검증

- 폼은 `react-hook-form` + `zod` v4 + `@hookform/resolvers`를 조합합니다. 스키마에서 `z.infer`로 폼 값 타입을 얻고, 필드는 `components/ui/field.tsx`의 `Field*` 조합 컴포넌트로 렌더링합니다 (예: `components/common/contact-form.tsx`, `components/samples/login-form.tsx`).
- 토스트 알림은 `sonner`이며 루트 레이아웃의 `<Toaster />`에 의존합니다.

### 현재 상태

- 대부분의 페이지(`/`, `/components`, `/about`, `/samples/*`)는 데모·샘플용 정적 화면입니다. 실제 API 라우트, DB, 인증 로직은 없습니다. `ContactForm`과 `LoginForm`도 클라이언트 검증 후 토스트를 띄우는 수준입니다.
