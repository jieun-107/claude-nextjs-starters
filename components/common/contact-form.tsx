"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

/**
 * 문의 폼 검증 스키마
 * 서버 전송 전 클라이언트에서 검증하며, 스키마 타입으로 폼 값 타입을 함께 얻습니다.
 */
const contactSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상 입력해 주세요."),
  email: z.email("올바른 이메일 형식이 아닙니다."),
  message: z
    .string()
    .min(10, "메시지는 10자 이상 입력해 주세요.")
    .max(500, "메시지는 500자 이하로 입력해 주세요."),
  agree: z.boolean().refine((value) => value, {
    message: "개인정보 수집에 동의해 주세요.",
  }),
})

type ContactValues = z.infer<typeof contactSchema>

const defaultValues: ContactValues = {
  name: "",
  email: "",
  message: "",
  agree: false,
}

/**
 * 문의 폼 예제
 * 실제 전송 로직은 onSubmit에 연결하세요. 지금은 지연 후 성공 토스트만 띄웁니다.
 */
export function ContactForm() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  })

  async function onSubmit(values: ContactValues) {
    // TODO: 서버 액션 또는 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 800))
    console.info("문의 전송 데이터", values)
    toast.success("문의가 접수되었습니다.")
    form.reset(defaultValues)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="flex w-full max-w-md flex-col gap-6"
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-name">이름</FieldLabel>
              <Input
                {...field}
                id="contact-name"
                placeholder="홍길동"
                aria-invalid={fieldState.invalid}
                autoComplete="name"
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-email">이메일</FieldLabel>
              <Input
                {...field}
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                aria-invalid={fieldState.invalid}
                autoComplete="email"
              />
              <FieldDescription>답변을 받을 이메일 주소입니다.</FieldDescription>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-message">문의 내용</FieldLabel>
              <Textarea
                {...field}
                id="contact-message"
                rows={5}
                placeholder="문의 내용을 입력해 주세요."
                aria-invalid={fieldState.invalid}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="agree"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox
                id="contact-agree"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                onBlur={field.onBlur}
                aria-invalid={fieldState.invalid}
              />
              <FieldLabel htmlFor="contact-agree">개인정보 수집·이용에 동의합니다.</FieldLabel>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "전송 중..." : "문의 보내기"}
      </Button>
    </form>
  )
}
