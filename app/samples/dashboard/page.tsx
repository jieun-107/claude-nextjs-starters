import type { Metadata } from "next"
import { DollarSign, ShoppingCart, Users, Activity } from "lucide-react"

import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata: Metadata = {
  title: "대시보드 샘플",
  description: "통계 카드와 최근 주문 테이블로 구성한 대시보드 샘플입니다.",
}

// 샘플용 목 데이터 (실제 데이터는 API나 DB에서 가져오세요)
const stats = [
  { title: "총 매출", value: "₩12,450,000", change: "+12.5%", icon: DollarSign },
  { title: "주문 수", value: "328", change: "+8.1%", icon: ShoppingCart },
  { title: "신규 고객", value: "54", change: "+3.2%", icon: Users },
  { title: "전환율", value: "4.8%", change: "-0.4%", icon: Activity },
]

const orders = [
  { id: "ORD-1024", customer: "김서연", amount: "₩84,000", status: "완료" },
  { id: "ORD-1023", customer: "이준호", amount: "₩32,500", status: "배송 중" },
  { id: "ORD-1022", customer: "박민지", amount: "₩150,000", status: "결제 대기" },
  { id: "ORD-1021", customer: "최도윤", amount: "₩67,800", status: "완료" },
]

/**
 * 대시보드 샘플 페이지
 */
export default function DashboardSamplePage() {
  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader
        title="대시보드"
        description="핵심 지표와 최근 주문을 한눈에 보는 관리자 화면 예시입니다."
        breadcrumbs={[
          { title: "홈", href: "/" },
          { title: "샘플", href: "/samples" },
          { title: "대시보드" },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ title, value, change, icon: Icon }) => (
          <Card key={title}>
            <CardHeader>
              <CardDescription className="flex items-center justify-between">
                {title}
                <Icon className="size-4" aria-hidden />
              </CardDescription>
              <CardTitle className="text-2xl">{value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">지난달 대비 {change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최근 주문</CardTitle>
          <CardDescription>최근 4건의 주문 현황입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>최근 주문 목록 (샘플 데이터)</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>주문 번호</TableHead>
                <TableHead>고객</TableHead>
                <TableHead>금액</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarFallback>{order.customer.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      {order.customer}
                    </div>
                  </TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === "완료" ? "default" : "secondary"}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  )
}
