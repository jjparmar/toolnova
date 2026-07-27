"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home, Wrench } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertTriangle className="h-7 w-7" aria-hidden />
      </div>
      <h1 className="font-heading mb-2 text-2xl font-extrabold tracking-tight text-foreground">
        Something went wrong
      </h1>
      <p className="mb-2 text-sm leading-relaxed text-muted-foreground">
        A temporary error interrupted this page. Refreshing usually fixes it
        after a deploy. If it keeps happening, try another tool or contact
        support.
      </p>
      {error.digest && (
        <p className="mb-6 font-mono text-[11px] text-muted-foreground/80">
          Ref: {error.digest}
        </p>
      )}
      {!error.digest && <div className="mb-6" />}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset} className="gap-2 rounded-xl font-bold">
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
        <Button variant="outline" asChild className="gap-2 rounded-xl font-bold">
          <Link href="/tools">
            <Wrench className="h-4 w-4" />
            All tools
          </Link>
        </Button>
        <Button variant="ghost" asChild className="gap-2 rounded-xl font-bold">
          <Link href="/">
            <Home className="h-4 w-4" />
            Home
          </Link>
        </Button>
      </div>
      <p className="mt-8 text-xs text-muted-foreground">
        Need help?{" "}
        <Link
          href="/contact"
          className="font-semibold text-primary underline underline-offset-2"
        >
          Contact support
        </Link>
      </p>
    </div>
  );
}
