# Modern Next.js 스타터킷

Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, lucide-react 기반으로
웹 서비스를 빠르게 시작할 수 있도록 만든 스타터킷입니다.

## 기술 스택

| 영역 | 도구 |
|---|---|
| 프레임워크 | Next.js (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS, shadcn/ui (base-nova) |
| 아이콘 | lucide-react |
| 다크모드 | next-themes |
| 폼·검증 | react-hook-form, zod, @hookform/resolvers |
| 토스트 | sonner |

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

주요 명령어:

| 명령어 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint 검사 |

## 폴더 구조

```
app/                    # 라우트: /, /components, /about, not-found, error, global-error, loading
components/
  ui/                   # shadcn/ui 원본 컴포넌트 (직접 수정 최소화)
  layout/               # 사이트 골격: Container, SiteHeader, MobileNav, SiteFooter, PageHeader
  common/               # 앱 공통 조합: ThemeToggle, ContactForm
  providers/            # 전역 프로바이더: ThemeProvider
config/site.ts          # 사이트명, 설명, 네비게이션 메뉴
lib/utils.ts            # cn 유틸 (cn 패키지 재export)
```

컴포넌트 계층:

1. **Primitives** (`components/ui`): button, input, label, textarea, checkbox, switch, select, badge, separator, skeleton, avatar, card
2. **Composite** (`components/ui`): dialog, sheet, dropdown-menu, tooltip, tabs, accordion, alert, breadcrumb, pagination, table, field, sonner
3. **Layout / Common** (`components/layout`, `components/common`): 헤더·푸터·페이지 제목 등 사이트 골격과 조합 컴포넌트
4. **Providers** (`components/providers`): 테마 등 전역 상태

## 컴포넌트 추가

shadcn/ui 컴포넌트는 CLI로 추가합니다.

```bash
npx shadcn@latest add dialog
```

## 메뉴 수정

`config/site.ts`의 `mainNav`를 수정하면 헤더, 모바일 메뉴, 푸터에 함께 반영됩니다.

## 참고

- 이 프로젝트는 설치된 Next.js 16 기준입니다. `cacheComponents`가 켜져 있으므로 서버 컴포넌트에서 `new Date()` 같은 현재 시각 값은 프리렌더 시 오류가 납니다. 필요하면 동적 컴포넌트로 분리하세요.
- `error.tsx`의 재시도 함수 prop 이름은 Next.js 16 규약에 따라 `retry`입니다.
