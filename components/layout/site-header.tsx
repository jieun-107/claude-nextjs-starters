import Link from "next/link"

import { ThemeToggle } from "@/components/common/theme-toggle"
import { Container } from "@/components/layout/container"
import { MobileNav } from "@/components/layout/mobile-nav"
import { NavLinks } from "@/components/layout/nav-links"
import { siteConfig } from "@/config/site"

/**
 * 상단 헤더: 로고, 데스크톱 메뉴, 테마 토글, 모바일 메뉴
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Container className="flex h-14 items-center gap-4">
        <MobileNav />

        <Link href="/" className="flex items-center gap-2 font-semibold">
          {siteConfig.name}
        </Link>

        <NavLinks items={siteConfig.mainNav} className="hidden md:flex md:gap-1" />

        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
        </div>
      </Container>
    </header>
  )
}
