"use client"

import "./globals.css"

/**
 * 루트 레이아웃까지 실패했을 때 쓰는 전역 에러 페이지
 * 루트 레이아웃을 대체하므로 자체 <html>과 <body>를 가져야 합니다.
 * 테마 클래스(.dark)가 없으므로 항상 :root의 라이트 토큰이 적용됩니다.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-6 text-center text-foreground">
        <h1 className="text-3xl font-semibold tracking-tight">서비스에 문제가 발생했습니다</h1>
        <p className="text-muted-foreground">
          {error.digest ? `오류 코드: ${error.digest}` : "잠시 후 다시 시도해 주세요."}
        </p>
        <button
          type="button"
          onClick={() => retry()}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80"
        >
          다시 시도
        </button>
      </body>
    </html>
  )
}
