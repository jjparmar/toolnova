import * as React from"react"
import { Slot } from"@radix-ui/react-slot"
import { cva, type VariantProps } from"class-variance-authority"

import { cn } from"@/lib/utils"

const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:"bg-gradient-to-r from-primary to-[hsl(var(--primary-deep))] text-primary-foreground shadow-[0_1px_2px_hsl(var(--foreground)/0.06),0_6px_20px_-6px_hsla(var(--primary)/0.45)] hover:shadow-[0_2px_4px_hsl(var(--foreground)/0.06),0_12px_28px_-8px_hsla(var(--primary)/0.55)] hover:-translate-y-0.5 active:translate-y-px active:scale-[0.98]",
        destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:-translate-y-0.5 active:translate-y-px active:scale-[0.98]",
        outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5 active:translate-y-px active:scale-[0.98]",
        secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:-translate-y-0.5 active:translate-y-px active:scale-[0.98]",
        ghost:"hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5 active:translate-y-px active:scale-[0.98]",
        link:"text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:"h-9 px-4 py-2",
        sm:"h-8 rounded-md px-3 text-xs",
        lg:"h-10 rounded-md px-8 text-base",
        icon:"h-9 w-9",
      },
    },
    defaultVariants: {
      variant:"default",
      size:"default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot :"button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
