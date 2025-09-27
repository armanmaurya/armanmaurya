import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  asChild?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "label";
    return (
      <Comp
        ref={ref}
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.28em] text-[rgba(226,232,240,0.55)]",
          className
        )}
        {...props}
      />
    );
  }
);
Label.displayName = "Label";

export { Label };
