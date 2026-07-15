"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Cake,
  Clock,
  BarChart2,
  CalendarDays,
  Gift,
  ArrowLeft,
  Sparkles,
  PartyPopper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQSection } from "@/components/FAQSection";
import { toolFAQs } from "@/lib/content-database";
import {
  calculateAge,
  parseFlexibleDate,
  type AgeBreakdown,
} from "@/lib/text-utils";

const relatedTools = [
  {
    name: "Word Counter",
    slug: "word-counter",
    icon: BarChart2,
    color: "text-primary",
  },
  {
    name: "Case Converter",
    slug: "case-converter",
    icon: Clock,
    color: "text-teal-600",
  },
  {
    name: "Timetable Generator",
    slug: "timetable-generator",
    icon: CalendarDays,
    color: "text-emerald-600",
  },
  {
    name: "Goal Planner",
    slug: "goal-planner",
    icon: Gift,
    color: "text-amber-600",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Pick your date",
    desc: "Use the date picker or type YYYY-MM-DD",
    icon: Calendar,
  },
  {
    step: 2,
    title: "Calculate",
    desc: "Get age in years, months, and days",
    icon: Clock,
  },
  {
    step: 3,
    title: "See stats",
    desc: "Days lived and next birthday countdown",
    icon: Cake,
  },
];

function formatLong(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function AgeCalculatorClient() {
  const [dateValue, setDateValue] = useState("");
  const [result, setResult] = useState<AgeBreakdown | null>(null);
  const [error, setError] = useState<string | null>(null);
  const maxDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const handleCalculate = () => {
    const birth = parseFlexibleDate(dateValue);
    if (!birth) {
      setResult(null);
      setError(
        "Please pick a date with the calendar, or enter YYYY-MM-DD (e.g. 2000-01-15). Slash dates work when unambiguous.",
      );
      return;
    }
    const age = calculateAge(birth);
    if ("error" in age) {
      setResult(null);
      setError(age.error);
      return;
    }
    setError(null);
    setResult(age);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <Link
          href="/tools/utility-tools"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to utility tools
        </Link>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/15">
            <Sparkles className="h-3.5 w-3.5" />
            Free calculator · No signup
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            Age Calculator
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Find your exact age in years, months, and days — plus days until your
            next birthday.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-lg shadow-primary/5 space-y-6">
          <div>
            <label
              htmlFor="birthdate"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Date of birth
            </label>
            <input
              id="birthdate"
              type="date"
              max={maxDate}
              min="1900-01-01"
              value={dateValue}
              onChange={(e) => {
                setDateValue(e.target.value);
                setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCalculate();
              }}
              className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Prefer the date picker for accuracy. Feb 29 birthdays use Mar 1 as
              the anniversary in non-leap years.
            </p>
          </div>

          <Button
            type="button"
            onClick={handleCalculate}
            disabled={!dateValue}
            className="w-full h-12 rounded-xl font-bold text-base"
          >
            <Cake className="h-5 w-5 mr-2" />
            Calculate age
          </Button>

          {error && (
            <div className="rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {result.isBirthdayToday && (
                <div className="flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 text-primary font-semibold text-sm">
                  <PartyPopper className="h-5 w-5" />
                  Happy birthday! 🎉
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Years", value: result.years },
                  { label: "Months", value: result.months },
                  { label: "Days", value: result.days },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border bg-muted/40 p-4 text-center"
                  >
                    <div className="font-heading text-3xl font-bold tabular-nums text-foreground">
                      {s.value}
                    </div>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">Total days lived:</span>{" "}
                  <strong className="tabular-nums">
                    {result.totalDays.toLocaleString()}
                  </strong>
                </p>
                <p>
                  <span className="text-muted-foreground">Total weeks:</span>{" "}
                  <strong className="tabular-nums">
                    {result.totalWeeks.toLocaleString()}
                  </strong>
                </p>
                <p>
                  <span className="text-muted-foreground">Total months:</span>{" "}
                  <strong className="tabular-nums">{result.totalMonths}</strong>
                </p>
                <p>
                  <span className="text-muted-foreground">Next birthday:</span>{" "}
                  <strong>{formatLong(result.nextBirthday)}</strong>
                </p>
                <p>
                  <span className="text-muted-foreground">Days until birthday:</span>{" "}
                  <strong className="tabular-nums text-primary">
                    {result.isBirthdayToday ? "Today!" : result.daysToNextBirthday}
                  </strong>
                </p>
                <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                  Birth date: {formatLong(result.birthDate)} · Calculated on{" "}
                  {formatLong(result.calculatedOn)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          {howItWorks.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl border border-border bg-card p-5 text-center"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <step.icon className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-primary mb-1">
                Step {step.step}
              </p>
              <h3 className="font-heading font-bold text-foreground mb-1">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="font-heading text-lg font-bold text-foreground mb-4">
            Related tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="rounded-xl border border-border bg-card p-4 text-center hover:border-primary/40 hover:shadow-md transition-all"
              >
                <tool.icon className={`h-6 w-6 mx-auto mb-2 ${tool.color}`} />
                <span className="text-sm font-semibold text-foreground">
                  {tool.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <FAQSection faqs={toolFAQs["age-calculator"] || []} />
        </div>
      </div>
    </div>
  );
}
