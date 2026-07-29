"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BellRing,
  Phone,
  Radar,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { brands, site } from "@/lib/site";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 34 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

const feeds = [
  { src: "/images/gallery/install.jpg", label: "CAM 01 · ENTRANCE" },
  { src: "/images/gallery/cams-wall.jpg", label: "CAM 02 · FACADE" },
  { src: "/images/gallery/cams-sky.jpg", label: "CAM 03 · PERIMETER" },
  { src: "/images/hero.jpg", label: "CAM 04 · CONTROL" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.2]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <>
      <section
        ref={ref}
        id="home"
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink"
      >
        {/* Parallax backdrop */}
        <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Professional CCTV monitoring control room"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink" />
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="animate-pulse-slow absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-royal/25 blur-[130px]" />
        <div className="animate-pulse-slow absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-royal-deep/30 blur-[120px] [animation-delay:2.5s]" />

        {/* Content */}
        <motion.div
          style={{ opacity: fade }}
          className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 px-5 pb-24 pt-32 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-36"
        >
          {/* Left copy */}
          <div className="flex flex-col items-start gap-7">
            <motion.span
              {...rise(0.05)}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75 backdrop-blur-md"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-royal-soft" />
              Ludhiana&apos;s Trusted Security Experts
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-[#2fe673]" />
            </motion.span>

            <motion.h1
              {...rise(0.15)}
              className="text-balance text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl xl:text-[4.2rem]"
            >
              Protect Your Home &amp; Business with{" "}
              <span className="text-gradient">Smart Security</span> Solutions
            </motion.h1>

            <motion.p
              {...rise(0.25)}
              className="max-w-xl text-pretty text-sm leading-relaxed text-white/60 sm:text-base"
            >
              Premium CCTV cameras, video door phones, WiFi cameras, DVR/NVR
              systems and RO water purifiers — supplied, installed and
              maintained by certified technicians across Ludhiana.
            </motion.p>

            <motion.div {...rise(0.35)} className="flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="group inline-flex items-center gap-2.5 rounded-full bg-royal px-7 py-3.5 text-sm font-semibold text-white glow-royal transition-colors hover:bg-royal-deep"
              >
                View Products
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={`tel:${site.phoneTel}`}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/35 hover:bg-white/10"
              >
                <Phone className="h-4 w-4 text-royal-soft" />
                Call Now
              </a>
            </motion.div>

            <motion.div
              {...rise(0.45)}
              className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-7"
            >
              {[
                ["500+", "Installations"],
                ["1000+", "Happy Customers"],
                ["24×7", "Support"],
              ].map(([value, label]) => (
                <div key={label} className="flex flex-col">
                  <span className="text-2xl font-bold tracking-tight text-white">
                    {value}
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
                    {label}
                  </span>
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-sm font-bold text-white">4.9</span>
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
                  Customer Rating
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right — live monitoring console */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
            className="relative hidden lg:block"
          >
            <div className="animate-float rounded-3xl border border-white/12 bg-white/[0.05] p-4 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <div className="flex items-center justify-between px-1.5 pb-3.5">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
                  SI Live Monitoring
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-red-400">
                  <span className="h-1.5 w-1.5 animate-blink rounded-full bg-red-500" />
                  REC
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {feeds.map((feed, i) => (
                  <div
                    key={feed.label}
                    className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10"
                  >
                    <Image
                      src={feed.src}
                      alt={feed.label}
                      fill
                      sizes="260px"
                      className="object-cover opacity-85 saturate-[0.8]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />
                    {i === 0 && (
                      <>
                        <span className="animate-scan absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-royal/40 to-transparent" />
                        <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-royal/90 px-2 py-0.5 text-[8.5px] font-bold tracking-wider text-white">
                          <Radar className="h-2.5 w-2.5 animate-blink" />
                          MOTION
                        </span>
                      </>
                    )}
                    <span className="absolute bottom-2 left-2.5 text-[9px] font-semibold tracking-[0.18em] text-white/80">
                      {feed.label}
                    </span>
                    <span className="absolute bottom-2 right-2.5 text-[8.5px] font-medium tracking-wider text-[#2fe673]">
                      LIVE
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-2 px-1 pt-3.5">
                {[
                  [Sparkles, "4K Ultra HD"],
                  [Radar, "AI Motion Sense"],
                  [ShieldCheck, "Encrypted Feed"],
                ].map(([Icon, label]) => {
                  const I = Icon as typeof Sparkles;
                  return (
                    <span
                      key={label as string}
                      className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[9.5px] font-semibold uppercase tracking-wider text-white/55"
                    >
                      <I className="h-3 w-3 text-royal-soft" />
                      {label as string}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Floating alert chips */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: EASE }}
              className="animate-float-delayed absolute -left-10 top-14 flex items-center gap-3 rounded-2xl border border-white/12 bg-ink/80 px-4 py-3 backdrop-blur-xl"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal/20 text-royal-soft">
                <BellRing className="h-4 w-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-xs font-semibold text-white">Motion detected</span>
                <span className="text-[10px] text-white/45">Front gate · just now</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
              className="animate-float absolute -bottom-7 -right-6 flex items-center gap-3 rounded-2xl border border-white/12 bg-ink/80 px-4 py-3 backdrop-blur-xl"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/15 text-amber-400">
                <Star className="h-4 w-4 fill-amber-400" />
              </span>
              <span className="flex flex-col">
                <span className="text-xs font-semibold text-white">4.9 / 5 rating</span>
                <span className="text-[10px] text-white/45">from 1000+ customers</span>
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
          <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-white/25 pt-1.5">
            <span className="h-2 w-1 animate-bounce rounded-full bg-royal-soft" />
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/35">
            Scroll
          </span>
        </div>
      </section>

      {/* Brand marquee */}
      <div className="relative overflow-hidden border-y border-slate-900/5 bg-white/50 py-5 dark:border-white/5 dark:bg-white/[0.02]">
        <div className="animate-marquee flex w-max items-center gap-12 pr-12">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="flex items-center gap-12 text-[13px] font-semibold tracking-[0.35em] text-slate-400 dark:text-white/30"
            >
              {brand}
              <span className="h-1 w-1 rounded-full bg-royal/60" />
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-mist to-transparent dark:from-ink" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-mist to-transparent dark:from-ink" />
      </div>
    </>
  );
}
