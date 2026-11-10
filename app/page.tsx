import Link from "next/link"
import { Code2, Layers, Palette, Rocket } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/layout/container"

const techStack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "lucide-react",
  "next-themes",
  "react-hook-form",
  "zod",
]

const features = [
  {
    icon: Rocket,
    title: "빠른 시작",
    description: "App Router 기반의 레이아웃, 에러·404·로딩 페이지가 미리 준비되어 있습니다.",
  },
  {
    icon: Palette,
    title: "디자인 시스템",
    description: "shadcn/ui 컴포넌트와 다크모드를 기본으로 제공하며 취향에 맞게 바꿀 수 있습니다.",
  },
  {
    icon: Layers,
    title: "계층형 컴포넌트",
    description: "ui, layout, common, providers로 나뉜 구조라 필요한 곳을 바로 찾을 수 있습니다.",
  },
  {
    icon: Code2,
    title: "타입 안정성",
    description: "TypeScript와 zod 스키마로 폼 값과 데이터의 타입을 함께 관리합니다.",
  },
]

/**
 * 랜딩 페이지
 */
export default function HomePage() {
  return (
    <>
      <section className="border-b py-20 sm:py-28">
        <Container className="flex flex-col items-center gap-6 text-center">
          <Badge variant="secondary">Starter Kit</Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            바로 개발을 시작할 수 있는 <span className="text-primary">웹 스타터킷</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            공통 레이아웃, 다크모드, 폼 검증, 토스트 알림까지 준비되어 있어 기능 개발에만 집중할 수 있습니다.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/components" className={buttonVariants({ size: "lg" })}>
              컴포넌트 둘러보기
            </Link>
            <Link href="/about" className={buttonVariants({ size: "lg", variant: "outline" })}>
              사용 방법 보기
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {techStack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <Icon className="size-8 text-primary" aria-hidden />
                <CardTitle className="pt-2">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </Container>
      </section>
    </>
  )
}
