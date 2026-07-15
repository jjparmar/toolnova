"use client";

import { createContext, useContext } from "react";

/** Nested EnhancedToolLayout reads this to avoid a duplicate Back button */
export const ToolShellContext = createContext({ nestedInPremiumShell: false });

export function useToolShell() {
  return useContext(ToolShellContext);
}
