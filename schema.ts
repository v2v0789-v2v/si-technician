"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { galleryItems } from "@/lib/site";
import { Reveal, SectionHeading } from "./ui";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setIndex((i) =>
        i === null ? null : (i + dir + galleryItems.length) % galleryItems.length,
      ),
    [],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  return (
    <section id="gallery" className="relative scroll-mt-24 py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-32 h-80 w-80 rounded-full bg-royal/10 blur-[130px]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Gallery"
          title={
            <>
              Our Work &amp; <span className="text-gradient">Products</span> in Focus
            </>
          }
          description="A look at our installations, genuine product range and the sites we keep secure across Ludhiana."
        />

        <div className="mt-14 columns-2 gap-4 [column-fill:balance] sm:columns-3 xl:columns-4">
          {galleryItems.map((item, i) => (
            <Reveal
              key={item.src}
              delay={(i % 4) * 0.06}
              className="mb-4 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Open image: ${item.caption}`}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-slate-900/5 dark:border-white/10"
              >
                <div className={`relative w-full ${item.tall ? "aspect-[3/4]" : "aspect-square"}`}>
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4" />
                </span>
                <span className="absolute inset-x-4 bottom-3.5 translate-y-3 text-left text-xs font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink/92 p-4 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            onClick={close}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-royal"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-royal md:left-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <motion.figure
              key={index}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex max-w-4xl flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={galleryItems[index].src}
                alt={galleryItems[index].caption}
                className="max-h-[76vh] w-auto max-w-full rounded-2xl border border-white/10 object-contain shadow-2xl"
              />
              <figcaption className="flex items-center gap-3 text-center">
                <span className="text-sm font-semibold text-white">
                  {galleryItems[index].caption}
                </span>
                <span className="text-xs text-white/40">
                  {index + 1} / {galleryItems.length}
                </span>
              </figcaption>
            </motion.figure>

            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-royal md:right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
