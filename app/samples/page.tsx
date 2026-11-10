import type { Metadata } from "next"
import Link from "next/link"
import { CreditCard, LayoutDashboard, LogIn, Newspaper, type LucideIcon } from "lucide-react"

import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { samples } from "@/config/samples"

export const metadata: Metadata = {
  title: "샘플",
  description: "자주 쓰는 화면 패턴의 샘플 페이지 목록입니다.",
}

// slug별 아이콘 (데이터는 config/samples.ts, 표현용 아이콘은 여기서 매핑)
const iconMap: Record<string, LucideIcon> = {
  login: LogIn,
  dashboard: LayoutDashboard,
  pricing: CreditCard,
  blog: Newspaper,
}

/**
 * 샘플 목록 페이지: 샘플 카드 그리드
 */
export default function SamplesPage() {
  return (
    <Container className="flex flex-col gap-10 py-12">
      <PageHeader
        title="샘플"
        description="로그인, 대시보드, 요금제, 블로그 등 자주 쓰는 화면 패턴을 확인해 보세요."
        breadcrumbs={[{ title: "홈", href: "/" }, { title: "샘플" }]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {samples.map((sample) => {
          const Icon = iconMap[sample.slug] ?? Newspaper
          return (
            <Link
              key={sample.slug}
              href={`/samples/${sample.slug}`}
              className="group rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Card className="h-full transition-colors group-hover:bg-muted/50">
                <CardHeader>
                  <Icon className="size-8 text-primary" aria-hidden />
                  <CardTitle className="pt-2">{sample.title}</CardTitle>
                  <CardDescription>{sample.description}</CardDescription>
                  <div className="flex flex-wrap gap-1 pt-2">
                    {sample.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>
    </Container>
  )
}
