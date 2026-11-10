import Link from "next/link"
import { FileQuestion } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

/**
 * 404 페이지 (존재하지 않는 경로 또는 notFound() 호출 시)
 */
export default function NotFound() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-6 py-24 text-center">
      <FileQuestion className="size-12 text-muted-foreground" aria-hidden />
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">페이지를 찾을 수 없습니다</h1>
        <p className="text-muted-foreground">주소가 잘못되었거나 페이지가 이동되었을 수 있습니다.</p>
      </div>
      <Link href="/" className={buttonVariants()}>
        홈으로 돌아가기
      </Link>
    </Container>
  )
}
