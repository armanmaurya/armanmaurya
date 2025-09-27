import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "border-[rgba(148,163,184,0.25)] bg-[rgba(22,22,22,0.7)] text-[rgba(226,232,240,0.85)]",
        glow: "border-transparent bg-[rgba(59,130,246,0.25)] text-white shadow-[0_8px_24px_rgba(59,130,246,0.35)]",
        outline: "border-[rgba(148,163,184,0.45)] text-[rgba(226,232,240,0.7)]",
        accent: "border-transparent bg-[linear-gradient(135deg,#3b82f6,#60a5fa)] text-[#0b1120] font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
);

Badge.displayName = "Badge";
