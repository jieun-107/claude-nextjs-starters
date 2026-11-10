"use client"

import * as React from "react"
import { AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

/**
 * 라우트 단위 에러 경계
 * Next.js 16 규약에 따라 재시도 함수 prop 이름은 `retry`입니다.
 */
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  React.useEffect(() => {
    // 에러 리포팅 서비스(예: Sentry)가 있다면 여기서 전송합니다.
    console.error(error)
  }, [error])

  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-6 py-24 text-center">
      <AlertTriangle className="size-12 text-destructive" aria-hidden />
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">문제가 발생했습니다</h1>
        <p className="text-muted-foreground">잠시 후 다시 시도해 주세요.</p>
      </div>
      <Button onClick={() => retry()}>다시 시도</Button>
    </Container>
  )
}
