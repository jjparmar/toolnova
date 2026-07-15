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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQSection } from "@/components/FAQSection";
import { toolFAQs } from "@/lib/content-database";

/** Parse YYYY-MM-DD or unambiguous slash dates. Prefer ISO from <input type="date">. */
function parseBirthDate(input: string): Date | null {
  const raw = input.trim();
  if (!raw) return null;

  // ISO from date input: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const [y, m, d] = raw.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    if (
      date.getFullYear() === y &&
      date.getMonth() === m - 1 &&
      date.getDate() === d
    ) {
      return date;
    }
    return null;
  }

  // Slash formats: try both MM/DD/YYYY and DD/MM/YYYY; pick the one that is valid
  if (raw.includes("/")) {
    const parts = raw.split("/").map((p) => p.trim());
    if (parts.length !== 3) return null;
    const a = parseInt(parts[0], 10);
    const b = parseInt(parts[1], 10);
    const y = parseInt(parts[2], 10);
    if (!a || !b || !y || y < 1000 || y > 9999) return null;

    const candidates: Date[] = [];

    // MM/DD/YYYY
    if (a >= 1 && a <= 12 && b >= 1 && b <= 31) {
      const md = new Date(y, a - 1, b);
      if (
        md.getFullYear() === y &&
        md.getMonth() === a - 1 &&
        md.getDate() === b
      ) {
        candidates.push(md);
      }
    }
    // DD/MM/YYYY (when different from MM/DD)
    if (b >= 1 && b <= 12 && a >= 1 && a <= 31) {
      const dm = new Date(y, b - 1, a);
      if (
        dm.getFullYear() === y &&
        dm.getMonth() === b - 1 &&
        dm.getDate() === a
      ) {
        // Only add if not the same calendar day as MM/DD interpretation
        if (
          !candidates.some(
            (c) =>
              c.getFullYear() === dm.getFullYear() &&
              c.getMonth() === dm.getMonth() &&
              c.getDate() === dm.getDate(),
          )
        ) {
          candidates.push(dm);
        }
      }
    }

    if (candidates.length === 1) return candidates[0];
    // Ambiguous (e.g. 05/06/2000) — prefer MM/DD when both valid
    if (candidates.length === 2) return candidates[0];
    return null;
  }

  // Fallback: Date.parse for other locales
  const fallback = new Date(raw);
  return isNaN(fallback.getTime()) ? null : fallback;
}

function formatAgeResult(birthDate: Date): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const birth = new Date(birthDate);
  birth.setHours(0, 0, 0, 0);

  if (birth > today) {
    return "❌ **Future date**\n\nBirth date cannot be in the future. Please pick a date on or before today.";
  }

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor(
    (today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24),
  );
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  let nextBirthday = new Date(
    today.getFullYear(),
    birth.getMonth(),
    birth.getDate(),
  );
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  // Handle Feb 29 in non-leap years
  if (nextBirthday.getMonth() !== birth.getMonth()) {
    nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
  }
  const daysToNextBirthday = Math.ceil(
    (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  return `🎂 **Age Calculation Results**

**Current Age:**
✅ ${years} years, ${months} months, ${days} days

**Detailed Breakdown:**
📅 Total Days Lived: ${totalDays.toLocaleString()} days
📆 Total Weeks Lived: ${totalWeeks.toLocaleString()} weeks
📊 Total Months Lived: ${totalMonths} months

**Birthday Information:**
🎈 Next Birthday: ${nextBirthday.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
⏰ Days Until Birthday: ${daysToNextBirthday} days

**Birth Date:** ${birth.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
**Calculated On:** ${today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`;
}

const relatedTools = [
  {
    name: "Word Counter",
    slug: "word-counter",
    icon: BarChart2,
    color: "text-blue-600",
  },
  {
    name: "Case Converter",
    slug: "case-converter",
    icon: Clock,
    color: "text-purple-600",
  },
  {
    name: "Timetable Generator",
    slug: "timetable-generator",
    icon: CalendarDays,
    color: "text-green-600",
  },
  {
    name: "Goal Planner",
    slug: "goal-planner",
    icon: Gift,
    color: "text-orange-600",
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

export default function AgeCalculatorClient() {
  const [dateValue, setDateValue] = useState("");
  const [result, setResult] = useState("");
  const maxDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const handleCalculate = () => {
    const birth = parseBirthDate(dateValue);
    if (!birth) {
      setResult(
        "❌ **Invalid Date**\n\nPlease pick a date with the calendar, or enter:\n- YYYY-MM-DD (e.g., 2000-01-15)\n- MM/DD/YYYY or DD/MM/YYYY when unambiguous",
      );
      return;
    }
    setResult(formatAgeResult(birth));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-[#0f1419] dark:to-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to tools
        </Link>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Free calculator · No signup
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-3">
            Age Calculator
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Find your exact age in years, months, and days — plus days until your
            next birthday.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 sm:p-8 shadow-sm space-y-6">
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
              onChange={(e) => setDateValue(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Or type ISO format YYYY-MM-DD if your browser date picker is limited.
            </p>
          </div>

          <Button
            onClick={handleCalculate}
            disabled={!dateValue}
            className="w-full h-12 rounded-xl font-bold text-base"
          >
            <Cake className="h-5 w-5 mr-2" />
            Calculate age
          </Button>

          {result && (
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {result}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          {howItWorks.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 text-center"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <step.icon className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-primary mb-1">
                Step {step.step}
              </p>
              <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Related tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 text-center hover:border-primary/40 hover:shadow-md transition-all"
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
