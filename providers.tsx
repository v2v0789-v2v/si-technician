"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { BadgeCheck, Building2, Droplets, Home, Quote, School, Store, User } from "lucide-react";
import { site, stats, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./navbar";
import { Reveal, SectionHeading } from "./ui";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const audiences = [
  { icon: Home, label: "Homes & Apartments" },
  { icon: Building2, label: "Offices & Corporates" },
  { icon: Store, label: "Shops & Showrooms" },
  { icon: School, label: "Schools & Institutes" },
  { icon: BadgeCheck, label: "Factories & Industries" },
  { icon: User, label: "Banks & Societies" },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-royal/10 blur-[140px]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Collage */}
          <Reveal className="relative">
            <div className="relative">
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-royal/20 blur-3xl" />
              <div className="glass relative overflow-hidden rounded-[2rem] p-2.5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem]">
                  <Image
                    src="/images/gallery/install.jpg"
                    alt="SI Technician installing a CCTV camera on site"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                </div>
              </div>

              <div className="animate-float absolute -bottom-8 -right-3 w-40 overflow-hidden rounded-2xl border-4 border-mist shadow-2xl sm:-right-7 sm:w-52 dark:border-ink">
                <div className="relative aspect-square">
                  <Image
                    src="/images/products/dome-cameras.jpg"
                    alt="Dome CCTV cameras supplied by SI Technician"
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="animate-float-delayed absolute -top-6 right-4 flex items-center gap-2.5 rounded-2xl px-4 py-3 glass-deep sm:right-10">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal/15 text-royal dark:text-royal-soft">
                  <Droplets className="h-4 w-4" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Pure Water Promise</span>
                  <span className="text-[10px] text-slate-400 dark:text-white/45">TDS-tested installs</span>
                </span>
              </div>

              <div className="absolute bottom-5 left-4 flex items-center gap-3 rounded-2xl px-4 py-3 glass-deep sm:left-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-royal to-royal-deep text-sm font-extrabold text-white">
                  AY
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{site.founder}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-royal dark:text-royal-soft">
                    Founder &amp; Chief Technician
                  </span>
                </span>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="flex flex-col gap-7">
            <SectionHeading
              align="left"
              kicker="About Us"
              title={
                <>
                  Security &amp; Purity,{" "}
                  <span className="text-gradient">Delivered with Trust</span>
                </>
              }
            />
            <Reveal delay={0.1}>
              <p className="text-[15px] leading-relaxed text-slate-600 dark:text-white/60">
                <strong className="font-semibold text-slate-900 dark:text-white">
                  SI Technician
                </strong>{" "}
                is a trusted provider of CCTV security systems and water
                purifiers in Ludhiana. We specialise in supplying, installing
                and maintaining premium security cameras, surveillance systems
                and RO water purifiers for homes, offices, shops, schools and
                industries.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-white/60">
                From a single WiFi camera to a full multi-site NVR network — and
                from a family RO to commercial purification — every project gets
                genuine products, transparent pricing and workmanship we proudly
                sign our name to.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="glass rounded-2xl border-l-[3px] !border-l-royal p-6">
                <Quote className="h-5 w-5 text-royal dark:text-royal-soft" />
                <p className="mt-3 text-[15px] font-medium italic leading-relaxed text-slate-700 dark:text-white/75">
                  Our mission is simple — providing affordable and reliable
                  security and clean drinking water solutions to every doorstep
                  in Punjab.
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-royal dark:text-royal-soft">
                  — {site.founder}, Founder
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {audiences.map((item) => {
                  const Icon = item.icon;
                  return (
                    <span
                      key={item.label}
                      className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-white/60"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-royal/10 text-royal dark:text-royal-soft">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      {item.label}
                    </span>
                  );
                })}
              </div>
              <a
                href={waLink("Hi SI Technician! I'd like a free security / RO consultation.")}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-fit items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_14px_40px_-10px_rgba(37,211,102,0.7)]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Get a Free Consultation
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="relative py-6 md:py-10">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-11 md:px-12 md:py-14">
            <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
            <div className="animate-pulse-slow absolute -left-20 -top-24 h-56 w-56 rounded-full bg-royal/20 blur-[100px]" />
            <div className="relative grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-2.5 text-center">
                  <span className="text-gradient text-4xl font-extrabold tracking-tight md:text-[3.4rem] md:leading-none">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-white/45">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
