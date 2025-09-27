import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-[linear-gradient(135deg,#3b82f6,#60a5fa)] text-black font-semibold shadow-[0_8px_24px_rgba(59,130,246,0.35)] hover:brightness-110",
        secondary:
          "bg-[rgba(31,31,31,0.9)] text-white border border-[rgba(59,130,246,0.35)] shadow-[0_8px_24px_rgba(15,23,42,0.35)] hover:bg-[rgba(48,48,48,0.9)]",
        ghost:
          "text-slate-200 hover:text-white hover:bg-white/5 border border-transparent",
        outline:
          "border border-[rgba(148,163,184,0.3)] text-slate-100 hover:border-[rgba(59,130,246,0.5)] hover:text-white",
      },
      size: {
        sm: "h-9 px-5 text-sm",
        md: "h-11 px-6 text-sm font-medium",
        lg: "h-12 px-7 text-base font-semibold",
        icon: "h-10 w-10",
      },
      glow: {
        true: "before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-[radial-gradient(circle_at_top,var(--accent)_0%,transparent_60%)] before:opacity-75 before:blur-2xl before:transition-opacity before:duration-300 hover:before:opacity-90",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, glow, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, glow }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
