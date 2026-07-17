"use client"

import { Toaster as Sonner, ToasterProps } from "sonner"

/**
 * ThemeProvider was removed (light-only UI). Force light toasts so
 * next-themes is not required at runtime.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
