import type { Metadata } from "next"

import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export const metadata: Metadata = {
  title: "블로그 샘플",
  description: "글 카드 목록과 페이지네이션으로 구성한 블로그 샘플입니다.",
}

// 샘플용 목 데이터
const posts = [
  { id: 1, title: "App Router로 레이아웃 나누기", summary: "루트 레이아웃과 중첩 레이아웃의 역할을 정리합니다.", tag: "Next.js" },
  { id: 2, title: "zod와 react-hook-form 연결하기", summary: "스키마 하나로 타입과 검증을 함께 관리하는 방법입니다.", tag: "폼" },
  { id: 3, title: "shadcn/ui 테마 커스터마이징", summary: "CSS 변수를 바꿔 브랜드 색을 적용하는 방법입니다.", tag: "디자인" },
  { id: 4, title: "다크모드를 깜빡임 없이 적용하기", summary: "next-themes와 suppressHydrationWarning 설정을 다룹니다.", tag: "테마" },
  { id: 5, title: "Cache Components 입문", summary: "정적 셸과 동적 구간을 나누는 기본 개념을 소개합니다.", tag: "Next.js" },
  { id: 6, title: "접근성을 고려한 폼 구성", summary: "라벨 연결과 에러 메시지 전달 방법을 정리합니다.", tag: "접근성" },
]

/**
 * 블로그 샘플 페이지: 글 카드 목록 + 페이지네이션
 */
export default function BlogSamplePage() {
  return (
    <Container className="flex flex-col gap-10 py-12">
      <PageHeader
        title="블로그"
        description="글 목록과 페이지네이션을 구성하는 예시 화면입니다."
        breadcrumbs={[
          { title: "홈", href: "/" },
          { title: "샘플", href: "/samples" },
          { title: "블로그" },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                {post.tag}
              </Badge>
              <CardTitle className="pt-2">{post.title}</CardTitle>
              <CardDescription>{post.summary}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Container>
  )
}
