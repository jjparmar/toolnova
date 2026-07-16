"use client";

import { usePathname } from"next/navigation";
import { RelatedTools } from"./RelatedTools";

export function GlobalRelatedTools() {
    const pathname = usePathname();

    // Only show on specific tool pages
    if (!pathname || pathname ==="/tools" || pathname.split("/").length < 3) {
        return null;
    }

    const currentTool = pathname.split("/").pop();

    if (!currentTool) return null;

    return <RelatedTools currentTool={currentTool} />;
}
