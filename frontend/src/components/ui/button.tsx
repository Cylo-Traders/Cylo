import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border border-transparent cursor-pointer rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-border/20 hover:bg-primary/90",
        destructive:
          "bg-destructive text-white border-border/20 hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background border-border hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground border-border/20 hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-9 rounded-full gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-full px-6 has-[>svg]:px-4",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  loadingText,
  loadingClass,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    loadingText?: string;
    loadingClass?: string;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading || disabled}
      {...(asChild && { asChild: true })}
      {...(asChild && { className: cn(className) })}
      {...(asChild && { "data-state": isLoading ? "loading" : undefined })}
      {...(asChild && { "data-loading": isLoading ? "true" : undefined })}
      {...(asChild && { "aria-busy": isLoading })}
      {...(asChild && { "aria-disabled": isLoading })}
      {...(asChild && { "aria-label": loadingText })}
      {...(asChild && { "aria-live": isLoading ? "polite" : undefined })}
      {...(asChild && { "aria-atomic": isLoading ? "true" : undefined })}
      {...(asChild && { "aria-relevant": isLoading ? "additions" : undefined })}
      {...(asChild && {
        "aria-describedby": isLoading ? "loading-text" : undefined,
      })}
      {...(asChild && { "aria-hidden": isLoading ? "true" : undefined })}
      {...(asChild && {
        "aria-controls": isLoading ? "loading-text" : undefined,
      })}
      {...(asChild && { "aria-expanded": isLoading ? "true" : undefined })}
      {...props}
    >
      {isLoading ? (
        <span className={cn("flex items-center gap-3", loadingClass)}>
          <Loader className="!size-4 animate-spin" />
          {loadingText && loadingText}
        </span>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
