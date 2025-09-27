import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-3xl border border-[rgba(59,130,246,0.15)] bg-[rgba(18,20,30,0.75)] backdrop-blur-xl shadow-[0_20px_60px_rgba(8,47,73,0.45)]",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative p-8 md:p-10", className)}
      {...props}
    />
  );
});
CardContent.displayName = "CardContent";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative p-8 pb-0 md:p-10 md:pb-0", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold tracking-tight text-white md:text-2xl",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "mt-3 text-sm text-[rgba(226,232,240,0.75)] md:text-base",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export { Card, CardContent, CardHeader, CardTitle, CardDescription };
