"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

/**
 * 로그인 폼 검증 스키마
 */
const loginSchema = z.object({
  email: z.email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(8, "비밀번호는 8자 이상 입력해 주세요."),
  remember: z.boolean(),
})

type LoginValues = z.infer<typeof loginSchema>

const defaultValues: LoginValues = {
  email: "",
  password: "",
  remember: false,
}

/**
 * 로그인 폼 샘플
 * 실제 인증은 onSubmit에 연결하세요. 지금은 지연 후 성공 토스트만 띄웁니다.
 */
export function LoginForm() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  })

  async function onSubmit(values: LoginValues) {
    // TODO: 인증 API 또는 서버 액션으로 교체
    await new Promise((resolve) => setTimeout(resolve, 800))
    console.info("로그인 시도", { email: values.email })
    toast.success("로그인되었습니다. (샘플)")
    form.reset(defaultValues)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="flex w-full max-w-sm flex-col gap-6"
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-email">이메일</FieldLabel>
              <Input
                {...field}
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={fieldState.invalid}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-password">비밀번호</FieldLabel>
              <Input
                {...field}
                id="login-password"
                type="password"
                autoComplete="current-password"
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>8자 이상 입력해 주세요.</FieldDescription>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="remember"
          control={form.control}
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox
                id="login-remember"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
              <FieldLabel htmlFor="login-remember">로그인 상태 유지</FieldLabel>
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "확인 중..." : "로그인"}
      </Button>
    </form>
  )
}
