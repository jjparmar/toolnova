"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";

export default function ToolsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Tool page error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h1 className="font-heading mb-2 text-2xl font-semibold text-foreground">
        This tool failed to load
      </h1>
      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        This is usually a temporary issue after a site update. Try refreshing the
        page. If it continues, open the tools library and try again.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
        <Button variant="outline" asChild className="gap-2">
          <Link href="/tools">
            <ArrowLeft className="h-4 w-4" />
            All tools
          </Link>
        </Button>
      </div>
    </div>
  );
}
