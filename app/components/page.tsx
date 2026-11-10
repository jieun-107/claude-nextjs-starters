import Link from "next/link"
import type { Metadata } from "next"
import { Info } from "lucide-react"

import { ContactForm } from "@/components/common/contact-form"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const tableRows = [
  { name: "버튼", status: "사용 가능", tier: "Primitive" },
  { name: "폼 필드", status: "사용 가능", tier: "Composite" },
  { name: "다이얼로그", status: "사용 가능", tier: "Composite" },
]

export const metadata: Metadata = {
  title: "컴포넌트",
  description: "설치된 shadcn/ui 컴포넌트와 공통 컴포넌트를 카테고리별로 확인합니다.",
}

/**
 * 컴포넌트 쇼케이스
 * 설치된 shadcn/ui 컴포넌트를 카테고리별 탭으로 보여줍니다.
 */
export default function ComponentsPage() {
  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader
        title="컴포넌트"
        description="설치된 shadcn/ui 컴포넌트와 공통 컴포넌트를 카테고리별로 확인합니다."
        breadcrumbs={[{ title: "홈", href: "/" }, { title: "컴포넌트" }]}
      />

      <Tabs defaultValue="basic" className="w-full">
        <TabsList>
          <TabsTrigger value="basic">기본</TabsTrigger>
          <TabsTrigger value="input">입력</TabsTrigger>
          <TabsTrigger value="overlay">오버레이</TabsTrigger>
          <TabsTrigger value="data">데이터·피드백</TabsTrigger>
        </TabsList>

        {/* 기본: 버튼, 배지, 아바타, 공통 컴포넌트 */}
        <TabsContent value="basic" className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Button</CardTitle>
              <CardDescription>variant와 size로 모양을 바꿉니다.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button>기본</Button>
              <Button variant="secondary">보조</Button>
              <Button variant="outline">외곽선</Button>
              <Button variant="ghost">고스트</Button>
              <Button variant="destructive">삭제</Button>
              <Button variant="link">링크</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badge · Avatar</CardTitle>
              <CardDescription>상태 표시와 사용자 아바타입니다.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Badge>기본</Badge>
              <Badge variant="secondary">보조</Badge>
              <Badge variant="outline">외곽선</Badge>
              <Avatar>
                <AvatarFallback>홍길</AvatarFallback>
              </Avatar>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common · 테마 토글</CardTitle>
              <CardDescription>헤더에 쓰이는 다크모드 전환 컴포넌트입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeToggle />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skeleton</CardTitle>
              <CardDescription>데이터 로딩 중 자리를 잡아주는 placeholder입니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* 입력: 폼 컴포넌트와 문의 폼 예제 */}
        <TabsContent value="input" className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>입력 컴포넌트</CardTitle>
              <CardDescription>Input, Label, Textarea, Select, Checkbox, Switch</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="demo-input">이름</Label>
                <Input id="demo-input" placeholder="이름을 입력하세요" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="demo-textarea">메모</Label>
                <Textarea id="demo-textarea" rows={3} placeholder="메모를 입력하세요" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="demo-select">기술 스택</Label>
                <Select defaultValue="next">
                  <SelectTrigger id="demo-select" className="w-full">
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="vue">Vue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="demo-check" defaultChecked />
                <Label htmlFor="demo-check">약관에 동의합니다</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="demo-switch" />
                <Label htmlFor="demo-switch">알림 받기</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>문의 폼 (zod + react-hook-form)</CardTitle>
              <CardDescription>검증 실패 시 필드별 에러가 표시되고, 성공하면 토스트가 뜹니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </TabsContent>

        {/* 오버레이: 다이얼로그, 시트, 드롭다운, 툴팁 */}
        <TabsContent value="overlay" className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Dialog</CardTitle>
              <CardDescription>중요한 확인이나 짧은 입력에 씁니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger render={<Button variant="outline" />}>다이얼로그 열기</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>정말 진행하시겠습니까?</DialogTitle>
                    <DialogDescription>이 작업은 되돌릴 수 없습니다.</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose render={<Button variant="outline" />}>취소</DialogClose>
                    <DialogClose render={<Button />}>확인</DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sheet</CardTitle>
              <CardDescription>화면 가장자리에서 열리는 패널입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger render={<Button variant="outline" />}>시트 열기</SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>상세 정보</SheetTitle>
                    <SheetDescription>오른쪽에서 열리는 패널 예시입니다.</SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>DropdownMenu</CardTitle>
              <CardDescription>여러 동작을 메뉴로 묶습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" />}>메뉴</DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {/* Label은 반드시 DropdownMenuGroup 안에서 사용해야 함 (Base UI 요구사항) */}
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>프로필</DropdownMenuItem>
                    <DropdownMenuItem>설정</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tooltip</CardTitle>
              <CardDescription>아이콘 버튼의 설명을 보여줍니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tooltip>
                <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="정보" />}>
                  <Info />
                </TooltipTrigger>
                <TooltipContent>자세한 정보를 보여줍니다.</TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 데이터·피드백: 테이블, 아코디언, 페이지네이션, 알림 */}
        <TabsContent value="data" className="mt-6 grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Table</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>설치된 컴포넌트 목록</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>이름</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>계층</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableRows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.tier}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accordion</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion>
                <AccordionItem value="a">
                  <AccordionTrigger>계층 구조는 어떻게 나뉘나요?</AccordionTrigger>
                  <AccordionContent>ui(원본), layout(골격), common(조합), providers(전역)으로 나뉩니다.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="b">
                  <AccordionTrigger>컴포넌트는 어떻게 추가하나요?</AccordionTrigger>
                  <AccordionContent>npx shadcn@latest add 컴포넌트명 명령으로 추가합니다.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert · Pagination</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Alert>
                <Info />
                <AlertTitle>안내</AlertTitle>
                <AlertDescription>알림 메시지는 Alert로 표시합니다.</AlertDescription>
              </Alert>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
            <CardFooter>
              <Link href="/about" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                사용 방법 보기
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Container>
  )
}
