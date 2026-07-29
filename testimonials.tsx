"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageSquareText,
  PhoneCall,
  Send,
  User,
} from "lucide-react";
import { site, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./navbar";
import { Reveal, SectionHeading } from "./ui";

const inputCls =
  "glass w-full rounded-xl px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:!border-royal/60 focus:shadow-[0_0_0_4px_rgba(46,98,255,0.14)] dark:text-white dark:placeholder:text-white/30";

const infoCards = [
  {
    icon: User,
    label: "Founder",
    value: site.founder,
    sub: "Security & RO Specialist",
  },
  {
    icon: PhoneCall,
    label: "Phone / WhatsApp",
    value: site.phoneDisplay,
    sub: "24×7 support line",
    href: `tel:${site.phoneTel}`,
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: site.addressLines.join(", "),
    sub: "Serving all of Ludhiana",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "9:00 AM – 9:00 PM",
    sub: "Open all 7 days",
  },
];

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Network error — please reach us on WhatsApp or call instead.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-96 w-[760px] -translate-x-1/2 rounded-full bg-royal/10 blur-[150px]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Contact Us"
          title={
            <>
              Let&apos;s Secure <span className="text-gradient">What Matters</span>
            </>
          }
          description="Call, WhatsApp or drop a message — we respond fast and site visits within Ludhiana are completely free."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Info stack */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {infoCards.map((card, i) => {
              const Icon = card.icon;
              const inner = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal/10 text-royal transition-colors group-hover:bg-royal group-hover:text-white dark:text-royal-soft">
                    <Icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10.5px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-white/35">
                      {card.label}
                    </span>
                    <span className="mt-1 block truncate text-[15px] font-semibold text-slate-900 dark:text-white">
                      {card.value}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-400 dark:text-white/40">
                      {card.sub}
                    </span>
                  </span>
                </>
              );
              return (
                <Reveal key={card.label} delay={i * 0.06}>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="group glass flex items-center gap-4 rounded-2xl p-5 transition-all duration-400 hover:-translate-y-1 hover:border-royal/45"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group glass flex items-center gap-4 rounded-2xl p-5 transition-all duration-400 hover:-translate-y-1 hover:border-royal/45">
                      {inner}
                    </div>
                  )}
                </Reveal>
              );
            })}

            <Reveal delay={0.3}>
              <a
                href={waLink("Hi SI Technician! I'd like to book a visit.")}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#25D366] to-[#14914a] p-5 text-white transition-transform duration-400 hover:-translate-y-1"
              >
                <span className="absolute inset-0 animate-pulse-ring rounded-2xl bg-[#25D366]/40" />
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <span className="relative">
                  <span className="block text-sm font-bold">Chat instantly on WhatsApp</span>
                  <span className="mt-0.5 block text-xs text-white/75">
                    Average reply time: under 5 minutes
                  </span>
                </span>
              </a>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="glass relative h-full overflow-hidden rounded-3xl p-6 md:p-9">
              <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]" />
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative flex h-full min-h-[420px] flex-col items-center justify-center gap-5 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1eb856]"
                  >
                    <CheckCircle2 className="h-10 w-10" />
                  </motion.span>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Request received!
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed text-slate-500 dark:text-white/55">
                    Thank you for reaching out. Our team will call you back
                    shortly — usually within the hour during working time.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="rounded-full border border-slate-900/10 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-royal/50 hover:text-royal dark:border-white/15 dark:text-white/75 dark:hover:text-white"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative flex h-full flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal/10 text-royal dark:text-royal-soft">
                      <MessageSquareText className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                        Book a free site visit
                      </h3>
                      <p className="text-xs text-slate-400 dark:text-white/40">
                        We&apos;ll call back to confirm a time slot
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold text-slate-500 dark:text-white/50">
                        Full Name *
                      </span>
                      <input
                        name="name"
                        required
                        minLength={2}
                        placeholder="e.g. Rohit Sharma"
                        className={inputCls}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold text-slate-500 dark:text-white/50">
                        Phone Number *
                      </span>
                      <input
                        name="phone"
                        required
                        type="tel"
                        inputMode="tel"
                        placeholder="10-digit mobile number"
                        className={inputCls}
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold text-slate-500 dark:text-white/50">
                      Email (optional)
                    </span>
                    <span className="relative block">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-white/30" />
                      <input
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className={`${inputCls} !pl-11`}
                      />
                    </span>
                  </label>
                  <label className="block flex-1">
                    <span className="mb-2 block text-xs font-semibold text-slate-500 dark:text-white/50">
                      Your Requirement *
                    </span>
                    <textarea
                      name="message"
                      required
                      minLength={10}
                      rows={4}
                      placeholder="e.g. Need 4 CCTV cameras for my shop on Mall Road, or RO service for home…"
                      className={`${inputCls} h-full min-h-[120px] resize-none`}
                    />
                  </label>

                  {status === "error" && (
                    <p className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-500">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-royal py-4 text-sm font-bold text-white transition-all hover:bg-royal-deep hover:shadow-[0_16px_44px_-12px_rgba(46,98,255,0.8)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-slate-400 dark:text-white/35">
                    Your details stay private — read our{" "}
                    <a href="/legal/privacy-policy" className="text-royal hover:underline dark:text-royal-soft">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal delay={0.15} className="mt-6">
          <div className="glass relative overflow-hidden rounded-3xl p-2.5">
            <iframe
              title="SI Technician — Subhash Nagar, Prem Vihar, Ludhiana"
              src="https://www.google.com/maps?q=Subhash%20Nagar%2C%20Prem%20Vihar%2C%20Ludhiana%2C%20Punjab%20141007&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[340px] w-full rounded-[1.3rem] grayscale-[0.2] dark:grayscale dark:invert-[0.92] dark:hue-rotate-180 dark:contrast-[0.85]"
            />
            <div className="glass-deep pointer-events-none absolute bottom-7 left-7 flex items-center gap-3 rounded-2xl px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal text-white">
                <MapPin className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs font-bold text-slate-900 dark:text-white">
                  SI Technician
                </span>
                <span className="block text-[10px] text-slate-500 dark:text-white/50">
                  Subhash Nagar, Prem Vihar, Ludhiana
                </span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
