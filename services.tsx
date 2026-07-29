"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/site";
import { useCategoryFilter } from "./providers";
import { Reveal, SectionHeading } from "./ui";

export function Categories() {
  const { setCategory } = useCategoryFilter();

  const jumpToProducts = (id: string) => {
    setCategory(id);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="categories" className="relative scroll-mt-24 py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-royal/10 blur-[120px]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Browse Categories"
          title={
            <>
              Everything for <span className="text-gradient">Security</span> &amp;{" "}
              <span className="text-gradient">Purity</span>
            </>
          }
          description="From discreet dome cameras to multi-stage RO purifiers — explore our complete, brand-genuine range curated for Indian homes and businesses."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.id} delay={Math.min(i * 0.05, 0.45)}>
                <motion.button
                  type="button"
                  onClick={() => jumpToProducts(cat.id)}
                  whileHover={{ y: -7 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="group glass relative flex h-full w-full flex-col items-start gap-3.5 overflow-hidden rounded-2xl p-5 text-left md:p-6"
                >
                  <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-royal/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-900/10 bg-white/80 text-royal transition-all duration-400 group-hover:border-royal group-hover:bg-royal group-hover:text-white group-hover:shadow-[0_10px_30px_-8px_rgba(46,98,255,0.7)] dark:border-white/10 dark:bg-white/5 dark:text-royal-soft">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={1.9} />
                  </span>
                  <span className="text-sm font-semibold tracking-tight text-slate-900 md:text-[15px] dark:text-white">
                    {cat.label}
                  </span>
                  <span className="text-xs leading-relaxed text-slate-500 dark:text-white/45">
                    {cat.tagline}
                  </span>
                  <span className="mt-auto flex items-center gap-1 pt-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-royal opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-royal-soft">
                    Shop now
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </motion.button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
