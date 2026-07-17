"use client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

import { useState } from"react";
import { useRouter } from"next/navigation";
import Link from"next/link";
import { Button } from"@/components/ui/button";
import { useSession } from"next-auth/react";
import {
  Check,
  ChevronDown,
  Crown,
  Sparkles,
  Shield,
  Zap,
  FileText,
  Infinity,
} from"lucide-react";
import { cn } from"@/lib/utils";
import { DAILY_FREE_LIMIT } from"@/lib/limits";
import { TOOL_COUNT_LABEL } from"@/data/tools";
import { toast } from"sonner";

const MONTHLY_PRICE = 2.99;
const YEARLY_PRICE = 29.99;
const YEARLY_MONTHLY_EQ = (YEARLY_PRICE / 12).toFixed(2);
const YEARLY_SAVE_PCT = Math.round(
  (1 - YEARLY_PRICE / (MONTHLY_PRICE * 12)) * 100,
);

const freeFeatures = [`${TOOL_COUNT_LABEL} tools free to start`,`${DAILY_FREE_LIMIT} free AI generations / day (guest)`,"Free account for another daily AI allowance + history","Unlimited browser PDF & image tools","No credit card to start",
];

const proFeatures = ["Unlimited AI generations","Premium model (higher quality)","Priority processing","Ad-free experience","Priority support","Everything in Free",
];

const comparisonRows = [
  {
    feature:"Tool catalog",
    free:`${TOOL_COUNT_LABEL} tools`,
    pro:`${TOOL_COUNT_LABEL} tools`,
  },
  {
    feature:"AI generations",
    free:`${DAILY_FREE_LIMIT}/day free tier`,
    pro:"Unlimited",
  },
  {
    feature:"AI model",
    free:"Standard (fast)",
    pro:"Premium (higher quality)",
  },
  {
    feature:"PDF / image tools",
    free:"Unlimited in browser",
    freeOk: true,
    pro:"Unlimited in browser",
  },
  { feature:"Ads", free:"May show ads", pro:"Ad-free" },
  { feature:"Support", free:"Email / contact form", pro:"Priority support" },
];

const faqs = [
  {
    q:"Can I cancel anytime?",
    a:"Yes. Cancel from your account when available; you keep Pro until the current billing period ends. No hidden cancellation fees.",
  },
  {
    q:"What payment methods work?",
    a:"Payments are processed by Razorpay (cards, UPI, net banking, and wallets where available).",
  },
  {
    q:"Is there a refund?",
    a:"We offer a 7-day money-back guarantee if Pro is not a fit. See our Refund Policy for details.",
  },
  {
    q:"What happens when Pro ends?",
    a:"You return to the Free plan. PDF/image tools stay free; AI tools return to the free daily allowance. Your account and history stay intact.",
  },
  {
    q:"Is Free really usable?",
    a:`Yes. Every tool is free to open. Browser PDF/image utilities have no AI limits. AI tools include ${DAILY_FREE_LIMIT} free uses per day without sign-up; a free account can unlock more daily uses.`,
  },
  {
    q:"Do you store my documents?",
    a:"We prioritize privacy. PDF/image tools process in your browser when possible. AI prompts are processed to fulfill your request and are not sold. See Privacy Policy for full details.",
  },
];

export default function PricingClient() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const loadScript = () =>
    new Promise<boolean>((resolve) => {
      if (typeof window !=="undefined" && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src ="https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const startSubscription = async (planId: string) => {
    if (!session) {
      toast.info("Sign in to upgrade to Pro");
      router.push("/login?callbackUrl=/pricing");
      return;
    }

    setLoading(true);
    try {
      const resScript = await loadScript();
      if (!resScript) {
        toast.error("Payment SDK failed to load. Check your connection.");
        return;
      }

      const res = await fetch("/api/create-subscription", {
        method:"POST",
        headers: {"Content-Type":"application/json" },
        body: JSON.stringify({ planId }),
      });

      const sub = await res.json().catch(() => ({}));
      if (!res.ok || !sub.id) {
        toast.error(
          typeof sub?.error ==="string"
            ? sub.error
            :"Could not start subscription. Try again.",
        );
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: sub.id,
        name:"ToolNova",
        description: isYearly ?"Pro yearly" :"Pro monthly",
        prefill: {
          email: session.user?.email || undefined,
          name: session.user?.name || undefined,
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method:"POST",
              headers: {"Content-Type":"application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json().catch(() => ({}));
            if (verifyData.success || verifyRes.ok) {
              toast.success("Welcome to Pro! Unlimited AI is unlocked.");
              router.push("/dashboard");
            } else {
              toast.message("Payment received — Pro will activate shortly after verification.",
              );
            }
          } catch {
            toast.message("Payment submitted. Refresh dashboard in a minute.");
          }
        },
        theme: { color:"#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Subscription Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const proPrice = isYearly ? YEARLY_PRICE : MONTHLY_PRICE;
  const proPeriod = isYearly ?"year" :"month";

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero band */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-[900px] px-6 py-14 text-center md:py-16">
          <div className="section-kicker mb-5">
            <Crown className="h-4 w-4" />
            Simple pricing
          </div>
          <h1 className="font-heading mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Free to start.{" "}
            <span className="text-primary">Pro when you need unlimited AI.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Use {TOOL_COUNT_LABEL} tools without a credit card. Browser PDF &amp;
            image tools stay unlimited. Upgrade only if you want unlimited AI
            and an ad-free workspace.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pt-12">
        {/* Billing toggle */}
        <div className="mb-12 flex justify-center">
          <div
            className="inline-flex rounded-full border border-border bg-muted p-1"
            role="group"
            aria-label="Billing period"
          >
            <button
              type="button"
              onClick={() => setIsYearly(false)}
              className={cn(
                "rounded-full px-6 py-2.5 text-sm font-bold transition-all",
                !isYearly
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsYearly(true)}
              className={cn(
                "rounded-full px-6 py-2.5 text-sm font-bold transition-all",
                isYearly
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              )}
            >
              Yearly
              <span className="ml-2 text-xs font-semibold text-primary">
                Save {YEARLY_SAVE_PCT}%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="mx-auto mb-16 grid max-w-4xl gap-6 md:grid-cols-2 lg:gap-8">
          {/* Free */}
          <div className="content-panel flex flex-col p-8">
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Free forever
              </span>
            </div>
            <h2 className="font-heading mb-1 text-2xl font-extrabold">Free</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Perfect for students and light use
            </p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-black">$0</span>
              <span className="text-muted-foreground">/mo</span>
            </div>
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl font-bold mb-8"
              onClick={() => router.push("/tools")}
            >
              Start free — no card
            </Button>
            <ul className="space-y-3 flex-1">
              {freeFeatures.map((f) => (
                <li key={f} className="flex gap-3 text-sm">
                  <Check className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="relative flex flex-col rounded-xl border-2 border-primary bg-card p-8 shadow-premium-sm">
            <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
              Best value
            </div>
            <div className="mb-2 flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Pro
              </span>
            </div>
            <h2 className="font-heading mb-1 text-2xl font-extrabold">Pro</h2>
            <p className="text-muted-foreground text-sm mb-6">
              For daily AI power users
            </p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-5xl font-black">${proPrice}</span>
              <span className="text-muted-foreground">/{proPeriod}</span>
            </div>
            {isYearly ? (
              <p className="text-sm text-emerald-600 font-medium mb-6">
                ≈ ${YEARLY_MONTHLY_EQ}/mo · save {YEARLY_SAVE_PCT}% vs monthly
              </p>
            ) : (
              <p className="text-sm text-muted-foreground mb-6">
                Cancel anytime · 7-day money-back
              </p>
            )}
            <Button
              className="w-full h-12 rounded-xl font-bold mb-8 bg-primary hover:bg-primary/90 shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/25 transition-all duration-300"
              disabled={loading}
              onClick={() =>
                startSubscription(
                  isYearly ?"plan_SEPrpn71jkiE0u" :"plan_SEPqtQNsEaZpDB",
                )
              }
            >
              {loading ? ("Opening checkout…"
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  {session ?"Upgrade to Pro" :"Sign in & upgrade"}
                </>
              )}
            </Button>
            <ul className="space-y-3 flex-1">
              {proFeatures.map((f) => (
                <li key={f} className="flex gap-3 text-sm">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span className="font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust strip */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-20">
          {[
            {
              icon: Shield,
              title:"Privacy-minded",
              desc:"Browser PDF/image tools when possible",
            },
            {
              icon: Zap,
              title:"No card for Free",
              desc:"Try tools before you ever pay",
            },
            {
              icon: Infinity,
              title:"Clear limits",
              desc:`Free AI: ${DAILY_FREE_LIMIT}/day · Pro: unlimited`,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="surface-card-quiet p-5 text-center"
            >
              <item.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="font-heading font-bold text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="font-heading text-2xl font-bold text-center mb-6">
            Free vs Pro at a glance
          </h2>
          <div className="content-panel overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60">
                <tr>
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-left p-4 font-semibold">Free</th>
                  <th className="text-left p-4 font-semibold text-primary">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-t border-border/70"
                  >
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td className="p-4 text-muted-foreground">{row.free}</td>
                    <td className="p-4 font-medium">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-2xl font-bold text-center mb-8">
            Pricing FAQ
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className={cn("rounded-2xl border transition-colors",
                    open
                      ?"border-primary/40 bg-primary/5"
                      :"border-border bg-card/70",
                  )}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                  >
                    {faq.q}
                    <ChevronDown
                      className={cn("h-5 w-5 shrink-0 transition-transform",
                        open &&"rotate-180 text-primary",
                      )}
                    />
                  </button>
                  {open && (
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer links */}
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>
            <Link href="/refund" className="underline underline-offset-4 hover:text-primary">
              Refund policy
            </Link>
            {" ·"}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms
            </Link>
            {" ·"}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy
            </Link>
            {" ·"}
            <Link href="/advertising" className="underline underline-offset-4 hover:text-primary">
              How Free is funded
            </Link>
          </p>
          <p>
            Questions?{""}
            <Link href="/contact" className="text-primary font-medium hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
