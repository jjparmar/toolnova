"use client";

import dynamic from"next/dynamic";

/**
 * Client-only lazy load of FeedbackWidget.
 * Must live in a Client Component — layout.tsx is a Server Component
 * and cannot use next/dynamic with ssr: false.
 */
export const FeedbackWidgetLazy = dynamic(
  () => import("@/components/FeedbackWidget").then((m) => m.FeedbackWidget),
  {
    ssr: false,
    loading: () => null,
  },
);
