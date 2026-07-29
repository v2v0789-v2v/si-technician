"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircleQuestion, Plus } from "lucide-react";
import { faqs, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./navbar";
import { Reveal, SectionHeading } from "./ui";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.35fr]">
          <div className="flex flex-col gap-7 self-start lg:sticky lg:top-28">
            <SectionHeading
              align="left"
              kicker="FAQ"
              title={
                <>
                  Questions, <span className="text-gradient">Answered</span>
                </>
              }
              description="Everything you need to know about our cameras, purifiers, installation, warranty and AMC — straight answers, no jargon."
            />
            <Reveal delay={0.15}>
              <div className="glass flex items-center gap-4 rounded-2xl p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal/10 text-royal dark:text-royal-soft">
                  <MessageCircleQuestion className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Still unsure?
                  </p>
                  <p className="text-xs text-slate-500 dark:text-white/45">
                    Ask us anything — replies within minutes.
                  </p>
                </div>
                <a
                  href={waLink("Hi SI Technician! I have a question.")}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-white transition hover:shadow-[0_10px_28px_-8px_rgba(37,211,102,0.7)]"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                  Ask
                </a>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-3.5">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={faq.q} delay={Math.min(i * 0.05, 0.3)}>
                  <div
                    className={`glass overflow-hidden rounded-2xl transition-all duration-400 ${
                      isOpen ? "!border-royal/45 shadow-[0_20px_50px_-24px_rgba(46,98,255,0.35)]" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
                        {faq.q}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ${
                          isOpen
                            ? "rotate-45 border-royal bg-royal text-white"
                            : "border-slate-900/10 text-slate-500 dark:border-white/15 dark:text-white/50"
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-sm leading-relaxed text-slate-500 dark:text-white/55">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
