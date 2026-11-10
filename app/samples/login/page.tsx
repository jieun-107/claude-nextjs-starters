import type { Metadata } from "next"

import { LoginForm } from "@/components/samples/login-form"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "로그인 샘플",
  description: "이메일·비밀번호 검증을 적용한 로그인 폼 샘플입니다.",
}

/**
 * 로그인 샘플 페이지
 */
export default function LoginSamplePage() {
  return (
    <Container className="flex flex-col gap-10 py-12">
      <PageHeader
        title="로그인"
        description="zod 스키마로 입력을 검증하고, 실패 시 필드별 에러를 보여줍니다."
        breadcrumbs={[
          { title: "홈", href: "/" },
          { title: "샘플", href: "/samples" },
          { title: "로그인" },
        ]}
      />

      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>계정에 로그인</CardTitle>
          <CardDescription>이메일과 비밀번호를 입력해 주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </Container>
  )
}
