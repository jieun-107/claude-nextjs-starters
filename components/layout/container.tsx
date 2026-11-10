import * as React from "react"

import { cn } from "cn"

/**
 * 콘텐츠 최대 너비와 좌우 여백을 잡아주는 래퍼
 */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  )
}
