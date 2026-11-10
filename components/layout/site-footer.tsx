import Link from "next/link"

import { Container } from "@/components/layout/container"
import { siteConfig } from "@/config/site"

/**
 * 하단 푸터: 저작권과 주요 메뉴 링크
 * 연도(new Date)는 cacheComponents 프리렌더를 깨뜨리므로 넣지 않았습니다.
 * 연도가 필요하면 Suspense 안의 동적 컴포넌트로 분리하세요.
 */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t">
      <Container className="flex flex-col gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {siteConfig.name}. All rights reserved.</p>
        <nav aria-label="푸터 메뉴" className="flex gap-4">
          {siteConfig.mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.title}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  )
}
