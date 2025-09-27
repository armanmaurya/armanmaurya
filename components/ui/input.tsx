import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "h-12 w-full rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[rgba(13,17,24,0.8)] px-4 text-sm text-white transition focus:border-[rgba(59,130,246,0.6)] focus:outline-none focus:ring-2 focus:ring-[rgba(59,130,246,0.35)] placeholder:text-[rgba(148,163,184,0.6)]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
