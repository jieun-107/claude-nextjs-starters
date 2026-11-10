"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "cn"
import type { NavItem } from "@/config/site"

type NavLinksProps = {
  items: NavItem[]
  className?: string
  linkClassName?: string
  ariaLabel?: string
  onNavigate?: () => void
}

/**
 * 현재 경로와 일치하는 메뉴를 강조하는 네비게이션 링크 목록
 * usePathname을 쓰기 때문에 클라이언트 컴포넌트로 분리했습니다.
 * 데스크톱/모바일에서 라벨이 겹치지 않도록 ariaLabel로 구분합니다.
 */
export function NavLinks({
  items,
  className,
  linkClassName,
  ariaLabel = "주요 메뉴",
  onNavigate,
}: NavLinksProps) {
  const pathname = usePathname()

  return (
    <nav className={className} aria-label={ariaLabel}>
      {items.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              isActive ? "text-foreground" : "text-muted-foreground",
              linkClassName
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
