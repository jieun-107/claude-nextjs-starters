"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NavLinks } from "@/components/layout/nav-links"
import { siteConfig } from "@/config/site"

/**
 * 모바일 전용 메뉴 (md 미만에서만 노출)
 * 메뉴를 고르면 시트가 닫힙니다.
 */
export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="메뉴 열기"
          />
        }
      >
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" onClick={() => setOpen(false)}>
              {siteConfig.name}
            </Link>
          </SheetTitle>
          <SheetDescription>사이트 메뉴</SheetDescription>
        </SheetHeader>
        <NavLinks
          items={siteConfig.mainNav}
          className="flex flex-col gap-1 px-4"
          linkClassName="text-base"
          ariaLabel="모바일 메뉴"
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  )
}
