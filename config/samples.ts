/**
 * 샘플 페이지 목록의 단일 출처
 * 목록 페이지(/samples)가 이 배열로 카드를 그립니다. 새 샘플을 추가하면 여기에도 항목을 넣으세요.
 */

export type SampleItem = {
  slug: string
  title: string
  description: string
  tags: string[]
}

export const samples: SampleItem[] = [
  {
    slug: "login",
    title: "로그인",
    description: "이메일·비밀번호 입력과 zod 검증을 적용한 로그인 폼입니다.",
    tags: ["폼", "검증"],
  },
  {
    slug: "dashboard",
    title: "대시보드",
    description: "통계 카드와 최근 주문 테이블로 구성한 관리자 화면입니다.",
    tags: ["레이아웃", "테이블"],
  },
  {
    slug: "pricing",
    title: "요금제",
    description: "추천 배지와 기능 목록이 들어간 3단 요금제 카드입니다.",
    tags: ["마케팅", "카드"],
  },
  {
    slug: "blog",
    title: "블로그",
    description: "글 카드 목록과 페이지네이션으로 구성한 게시판 화면입니다.",
    tags: ["목록", "페이지네이션"],
  },
]
