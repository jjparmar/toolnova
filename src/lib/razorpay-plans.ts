/**
 * Allowed Razorpay subscription plan IDs for ToolNova Pro.
 * Keep in sync with PricingClient upgrade buttons.
 */
export const PRO_PLAN_IDS = {
  monthly: "plan_SEPqtQNsEaZpDB",
  yearly: "plan_SEPrpn71jkiE0u",
} as const;

export type ProPlanId = (typeof PRO_PLAN_IDS)[keyof typeof PRO_PLAN_IDS];

const ALLOWED = new Set<string>(Object.values(PRO_PLAN_IDS));

export function isAllowedPlanId(planId: unknown): planId is ProPlanId {
  return typeof planId === "string" && ALLOWED.has(planId);
}

export function resolvePlanLabel(planId: string): "monthly" | "yearly" | "unknown" {
  if (planId === PRO_PLAN_IDS.monthly) return "monthly";
  if (planId === PRO_PLAN_IDS.yearly) return "yearly";
  return "unknown";
}
