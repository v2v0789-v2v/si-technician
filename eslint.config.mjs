"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Eye,
  Phone,
  Search,
  SearchX,
  ShoppingBag,
  Star,
  X,
  ZoomIn,
} from "lucide-react";
import type { Product } from "@/db/schema";
import { categories, site, waLink } from "@/lib/site";
import { useCategoryFilter } from "./providers";
import { WhatsAppIcon } from "./navbar";
import { Reveal, SectionHeading } from "./ui";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const buyMessage = (name: string) =>
  `Hi ${site.name}! I'm interested in the "${name}". Please share the best price and installation details.`;

const categoryLabel = (id: string) =>
  categories.find((c) => c.id === id)?.label ?? "Product";

/* ---------------------------------------------------------------- */
export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const { category, setCategory } = useCategoryFilter();

  useEffect(() => {
    let alive = true;
    fetch("/api/products")
      .then((r) => r.json())
      .then((d: { ok: boolean; products?: Product[] }) => {
        if (!alive) return;
        setProducts(d.products ?? []);
        setStatus(d.ok ? "ready" : "error");
      })
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!q ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)),
    );
  }, [products, query, category]);

  const chips = [{ id: "all", label: "All Products" }, ...categories];

  return (
    <section id="products" className="relative scroll-mt-24 py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-royal/10 blur-[140px]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            kicker="Featured Products"
            title={
              <>
                Handpicked <span className="text-gradient">Security &amp; Purification</span> Gear
              </>
            }
            description="Genuine, brand-sealed cameras and purifiers with professional installation, honest pricing and full warranty support."
          />
          <Reveal delay={0.1} className="w-full lg:max-w-xs">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-white/35" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="Search cameras, purifiers…"
                aria-label="Search products"
                className="glass w-full rounded-full py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-royal/60 dark:text-white dark:placeholder:text-white/30"
              />
            </label>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="no-scrollbar -mx-5 mt-9 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0">
            {chips.map((chip) => {
              const active = category === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setCategory(chip.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                    active
                      ? "bg-royal text-white glow-royal"
                      : "glass text-slate-600 hover:text-royal dark:text-white/60 dark:hover:text-white"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {status === "ready" && (
          <p className="mt-6 text-xs font-medium text-slate-400 dark:text-white/35">
            Showing {filtered.length} of {products.length} products
            {category !== "all" ? ` · ${categoryLabel(category)}` : ""}
            {query ? ` · “${query}”` : ""}
          </p>
        )}

        {status === "loading" && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass overflow-hidden rounded-3xl">
                <div className="shimmer aspect-[4/3]" />
                <div className="space-y-3 p-6">
                  <div className="shimmer h-3 w-1/3 rounded-full" />
                  <div className="shimmer h-4 w-3/4 rounded-full" />
                  <div className="shimmer h-3 w-full rounded-full" />
                  <div className="shimmer h-9 w-full rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="glass mt-10 rounded-3xl p-12 text-center">
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              Products are loading slowly…
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-white/50">
              Please refresh, or call us directly at{" "}
              <a href={`tel:${site.phoneTel}`} className="font-semibold text-royal">
                {site.phoneDisplay}
              </a>
            </p>
          </div>
        )}

        {status === "ready" && filtered.length === 0 && (
          <div className="glass mt-10 flex flex-col items-center gap-4 rounded-3xl p-14 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-royal/10 text-royal dark:text-royal-soft">
              <SearchX className="h-6 w-6" />
            </span>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              No products found
            </p>
            <p className="max-w-sm text-sm text-slate-500 dark:text-white/50">
              New stock arrives every week — try a different keyword or category, or ask us on WhatsApp.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="mt-1 rounded-full bg-royal px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-royal-deep"
            >
              Reset filters
            </button>
          </div>
        )}

        {status === "ready" && filtered.length > 0 && (
          <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  onView={() => setSelected(product)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ---------------------------------------------------------------- */
function ProductCard({
  product,
  onView,
}: {
  product: Product;
  onView: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, ease: EASE }}
      className="group glass relative flex flex-col overflow-hidden rounded-3xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-royal px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_8px_24px_-6px_rgba(46,98,255,0.8)]">
            {product.badge}
          </span>
        )}
        <a
          href={waLink(buyMessage(product.name))}
          target="_blank"
          rel="noreferrer"
          aria-label={`WhatsApp inquiry for ${product.name}`}
          className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-[#25D366] text-white opacity-0 shadow-[0_10px_24px_-6px_rgba(37,211,102,0.7)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <WhatsAppIcon className="h-[18px] w-[18px]" />
        </a>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-5 md:p-6">
        <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-royal dark:text-royal-soft">
          {categoryLabel(product.category)}
        </span>
        <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-slate-500 dark:text-white/50">
          {product.description}
        </p>

        <div className="mt-1.5 flex items-center justify-between border-t border-slate-900/5 pt-3.5 dark:border-white/10">
          <div>
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-white/35">
              Best Price
            </p>
            <p className="text-[15px] font-bold text-royal dark:text-royal-soft">
              {product.priceLabel}
            </p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-amber-400/10 px-2.5 py-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-amber-500">4.9</span>
          </span>
        </div>

        <div className="mt-1 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={onView}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-900/10 px-3 py-2.5 text-[13px] font-semibold text-slate-700 transition-all hover:border-royal/50 hover:text-royal dark:border-white/15 dark:text-white/75 dark:hover:border-royal/60 dark:hover:text-white"
          >
            <Eye className="h-4 w-4" />
            Details
          </button>
          <a
            href={waLink(buyMessage(product.name))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-royal px-3 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-royal-deep hover:shadow-[0_12px_32px_-10px_rgba(46,98,255,0.8)]"
          >
            <ShoppingBag className="h-4 w-4" />
            Buy Now
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------------------------------------------------------------- */
function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key="product-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[85] flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
        >
          <div
            className="absolute inset-0 bg-ink/75 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 14 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="glass-deep no-scrollbar relative grid max-h-[90vh] w-full max-w-4xl grid-rows-[auto_1fr] overflow-y-auto rounded-[1.8rem] md:grid-cols-2 md:grid-rows-none"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-ink/60 text-white backdrop-blur-md transition hover:bg-royal"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            {/* Zoomable image */}
            <div
              className="relative aspect-square cursor-zoom-in overflow-hidden bg-white md:aspect-auto md:min-h-[520px]"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setOrigin(
                  `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}% ${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`,
                );
              }}
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover transition-transform duration-300 ease-out"
                style={{
                  transformOrigin: origin,
                  transform: zoom ? "scale(2.05)" : "scale(1)",
                }}
              />
              {product.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-royal px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-lg">
                  {product.badge}
                </span>
              )}
              <span className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink/70 px-3.5 py-1.5 text-[10px] font-semibold text-white/80 backdrop-blur-md">
                <ZoomIn className="h-3.5 w-3.5" /> Hover to zoom
              </span>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-5 p-6 md:p-9">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-royal dark:text-royal-soft">
                {categoryLabel(product.category)}
              </span>
              <h3 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.9rem] md:leading-tight dark:text-white">
                {product.name}
              </h3>
              <span className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1.5 text-xs font-semibold text-slate-500 dark:text-white/50">
                  4.9 · Verified installations
                </span>
              </span>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-white/60">
                {product.description}
              </p>

              <ul className="grid gap-2.5 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[13px] font-medium text-slate-600 dark:text-white/70"
                  >
                    <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-royal/12 text-royal dark:text-royal-soft">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="glass mt-1 flex items-center justify-between rounded-2xl px-5 py-4">
                <div>
                  <p className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-white/35">
                    Best Price
                  </p>
                  <p className="text-lg font-bold text-royal dark:text-royal-soft">
                    {product.priceLabel}
                  </p>
                </div>
                <span className="rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-3 py-1 text-[11px] font-bold text-[#1eb856]">
                  In Stock
                </span>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-3 pt-1">
                <a
                  href={`tel:${site.phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-900/10 px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-royal/50 hover:text-royal dark:border-white/15 dark:text-white/75 dark:hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
                <a
                  href={waLink(buyMessage(product.name))}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_12px_32px_-10px_rgba(37,211,102,0.7)]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Buy on WhatsApp
                </a>
              </div>
              <p className="text-center text-[11px] text-slate-400 dark:text-white/35">
                Free on-site consultation included with every purchase.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
