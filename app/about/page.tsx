import type { Metadata } from "next"

import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const structure = [
  { path: "app/", desc: "라우트(페이지)와 layout, loading, error, not-found 등 파일 규약" },
  { path: "components/ui/", desc: "shadcn/ui 원본 컴포넌트 (npx shadcn add 로 추가)" },
  { path: "components/layout/", desc: "Container, SiteHeader, SiteFooter, PageHeader 등 사이트 골격" },
  { path: "components/common/", desc: "ThemeToggle, ContactForm 등 앱 공통 조합 컴포넌트" },
  { path: "components/providers/", desc: "ThemeProvider 등 클라이언트 전역 프로바이더" },
  { path: "config/site.ts", desc: "사이트명, 설명, 네비게이션 메뉴 정의" },
  { path: "lib/", desc: "cn 등 공통 유틸 (직접 만들기 전에 검증된 라이브러리를 먼저 검토)" },
]

const addComponentCode = `npx shadcn@latest add dialog
// components/ui/dialog.tsx 가 생성되고 바로 import해서 사용`

const navCode = `// config/site.ts
export const siteConfig = {
  mainNav: [
    { title: "홈", href: "/" },
    { title: "새 메뉴", href: "/new" }, // 추가하면 헤더·모바일 메뉴·푸터에 자동 반영
  ],
}`

export const metadata: Metadata = {
  title: "소개",
  description: "스타터킷의 폴더 구조와 컴포넌트를 추가하는 방법을 안내합니다.",
}

/**
 * 소개 페이지: 폴더 구조와 개발 방법 안내
 */
export default function AboutPage() {
  return (
    <Container className="flex flex-col gap-10 py-12">
      <PageHeader
        title="소개"
        description="스타터킷의 폴더 구조와 컴포넌트를 추가하는 방법을 안내합니다."
        breadcrumbs={[{ title: "홈", href: "/" }, { title: "소개" }]}
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">폴더 구조</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {structure.map((item) => (
            <Card key={item.path} size="sm">
              <CardHeader>
                <CardTitle className="font-mono text-sm">{item.path}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">컴포넌트 추가</h2>
        <pre className="overflow-x-auto rounded-lg border bg-muted p-4 text-sm">
          <code>{addComponentCode}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">메뉴 수정</h2>
        <pre className="overflow-x-auto rounded-lg border bg-muted p-4 text-sm">
          <code>{navCode}</code>
        </pre>
      </section>
    </Container>
  )
}
