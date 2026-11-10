/**
 * 사이트 전역 설정
 * 사이트명, 설명, 네비게이션 메뉴를 한 곳에서 관리합니다.
 */

export type NavItem = {
  title: string
  href: string
}

export const siteConfig = {
  name: "Modern Starter",
  description: "Next.js, TypeScript, Tailwind CSS, shadcn/ui로 빠르게 시작하는 웹 스타터킷",
  url: "http://localhost:3000",
  mainNav: [
    { title: "홈", href: "/" },
    { title: "컴포넌트", href: "/components" },
    { title: "소개", href: "/about" },
  ] satisfies NavItem[],
}

export type SiteConfig = typeof siteConfig
