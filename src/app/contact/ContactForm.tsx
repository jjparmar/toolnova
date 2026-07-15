"use client";

import { useState } from "react";
import { Mail, MapPin, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [openedMail, setOpenedMail] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject =
      String(data.get("subject") || "").trim() || "ToolNova support request";
    const message = String(data.get("message") || "").trim();

    if (!firstName || !email || !message) return;

    const body = [
      message,
      "",
      "---",
      `Name: ${firstName}${lastName ? ` ${lastName}` : ""}`,
      `Email: ${email}`,
      `Source: ${siteConfig.url}/contact`,
    ].join("\n");

    const mailto = `mailto:${siteConfig.author.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    // Open the user's email client with a prefilled message (no backend required)
    window.location.href = mailto;
    setOpenedMail(true);
    setSubmitted(true);
  }

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* Contact Info */}
      <div className="space-y-8">
        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold mb-6">Get in touch</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Email Us</h4>
                <p className="text-muted-foreground text-sm mb-1">
                  Our friendly team is here to help. We reply within 24 hours.
                </p>
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="text-primary hover:underline font-medium"
                >
                  {siteConfig.author.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Office</h4>
                <p className="text-muted-foreground text-sm">
                  ToolNova Inc.
                  <br />
                  71 Ayer Rajah Crescent
                  <br />
                  Singapore 139951
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-2xl p-6">
          <p className="text-green-800 dark:text-green-400 text-sm font-medium">
            ⚡ Average response time: under 24 hours
          </p>
          <p className="text-green-700 dark:text-green-500 text-sm mt-1">
            Monday–Friday, 9am–6pm SGT
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {submitted ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center gap-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h3 className="text-2xl font-bold text-foreground">
              {openedMail ? "Email client opened" : "Ready to send"}
            </h3>
            <p className="text-muted-foreground max-w-sm">
              {openedMail
                ? "Your email app should open with a prefilled message. Hit send there — we typically reply within 24 hours."
                : "If your email app did not open, email us directly and we will reply within 24 hours."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Edit message
              </Button>
              <a href={`mailto:${siteConfig.author.email}`}>
                <Button className="w-full sm:w-auto gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Email {siteConfig.author.email}
                </Button>
              </a>
            </div>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  required
                  autoComplete="given-name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  autoComplete="family-name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                placeholder="How can we help?"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us more about your question or feedback..."
                className="min-h-[150px]"
                required
              />
            </div>
            <Button type="submit" className="w-full h-11 text-base">
              Open email to send
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Opens your email app with a prefilled message to{" "}
              {siteConfig.author.email}. No account required.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
