import type { Metadata } from "next"
import Link from "next/link"
import { Check } from "lucide-react"

import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "cn"

export const metadata: Metadata = {
  title: "요금제 샘플",
  description: "추천 배지와 기능 목록이 있는 3단 요금제 샘플입니다.",
}

const plans = [
  {
    name: "스타터",
    price: "무료",
    description: "개인 프로젝트를 시작하는 분께",
    features: ["프로젝트 3개", "기본 컴포넌트", "커뮤니티 지원"],
    highlighted: false,
  },
  {
    name: "프로",
    price: "₩19,000 / 월",
    description: "성장하는 팀을 위한 기본 플랜",
    features: ["프로젝트 무제한", "전체 컴포넌트", "우선 이메일 지원", "팀 협업 기능"],
    highlighted: true,
  },
  {
    name: "엔터프라이즈",
    price: "문의",
    description: "보안과 규모가 중요한 조직을 위한 플랜",
    features: ["전용 인프라", "SSO 연동", "전담 매니저", "SLA 보장"],
    highlighted: false,
  },
]

/**
 * 요금제 샘플 페이지
 */
export default function PricingSamplePage() {
  return (
    <Container className="flex flex-col gap-10 py-12">
      <PageHeader
        title="요금제"
        description="필요에 맞는 플랜을 고를 수 있도록 기능을 비교해 보여줍니다."
        breadcrumbs={[
          { title: "홈", href: "/" },
          { title: "샘플", href: "/samples" },
          { title: "요금제" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn("flex flex-col", plan.highlighted && "ring-2 ring-primary")}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{plan.name}</CardTitle>
                {plan.highlighted && <Badge>추천</Badge>}
              </div>
              <CardDescription>{plan.description}</CardDescription>
              <p className="pt-2 text-3xl font-bold">{plan.price}</p>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="flex flex-col gap-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-primary" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link
                href="/samples/login"
                className={cn(buttonVariants({ variant: plan.highlighted ? "default" : "outline" }), "w-full")}
              >
                {plan.price === "문의" ? "문의하기" : "시작하기"}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Container>
  )
}
