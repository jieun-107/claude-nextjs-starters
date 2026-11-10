import { Container } from "@/components/layout/container"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * 페이지 전환 중 표시되는 로딩 스켈레톤
 */
export default function Loading() {
  return (
    <Container className="flex flex-col gap-6 py-16" aria-busy="true" aria-live="polite">
      <div className="space-y-3">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-40 w-full rounded-xl" />
        ))}
      </div>
    </Container>
  )
}
