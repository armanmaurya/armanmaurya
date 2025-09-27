import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, rows = 4, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "w-full rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[rgba(13,17,24,0.8)] px-4 py-3 text-sm text-white transition focus:border-[rgba(59,130,246,0.6)] focus:outline-none focus:ring-2 focus:ring-[rgba(59,130,246,0.35)] placeholder:text-[rgba(148,163,184,0.6)]",
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
