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
]
