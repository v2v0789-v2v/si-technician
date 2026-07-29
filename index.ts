import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { navLinks, site, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./navbar";

/* Brand glyphs (lucide-react no longer ships brand icons) */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

const policies = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Shipping Policy", href: "/legal/shipping-policy" },
  { label: "Return Policy", href: "/legal/return-policy" },
  { label: "Terms & Conditions", href: "/legal/terms-and-conditions" },
];

const socials = [
  { label: "Facebook", icon: FacebookIcon, href: "https://facebook.com" },
  { label: "Instagram", icon: InstagramIcon, href: "https://instagram.com" },
  { label: "YouTube", icon: YoutubeIcon, href: "https://youtube.com" },
  { label: "X (Twitter)", icon: XIcon, href: "https://x.com" },
];

export function Footer() {
  return (
    <footer className="relative mt-6 border-t border-slate-900/5 bg-white/60 dark:border-white/5 dark:bg-[#03050b]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-royal/60 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[820px] -translate-x-1/2 rounded-full bg-royal/[0.07] blur-[130px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_0.9fr_0.9fr_1.2fr]">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="#home" className="flex w-fit items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-royal to-royal-deep shadow-[0_10px_30px_-8px_rgba(46,98,255,0.8)]">
                <ShieldCheck className="h-[22px] w-[22px] text-white" strokeWidth={2.2} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                  SI <span className="text-gradient">Technician</span>
                </span>
                <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-white/40">
                  CCTV · RO Solutions
                </span>
              </span>
            </Link>
            <p className="max-w-sm text-[13px] leading-relaxed text-slate-500 dark:text-white/50">
              {site.tagline}. Genuine products, professional installation and
              dependable after-sales support — proudly serving homes and
              businesses across Ludhiana, Punjab.
            </p>
            <div className="flex gap-2.5">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`SI Technician on ${social.label}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/10 bg-white/70 text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:border-royal hover:bg-royal hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-white/55"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
              <a
                href={waLink("Hi SI Technician!")}
                target="_blank"
                rel="noreferrer"
                aria-label="SI Technician on WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/10 bg-white/70 text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-white/55"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links" className="flex flex-col gap-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-white/35">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {[...navLinks.slice(1), { label: "FAQ", href: "#faq" }].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-600 transition-colors hover:text-royal dark:text-white/60 dark:hover:text-white"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 text-royal/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Policies */}
          <nav aria-label="Policies" className="flex flex-col gap-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-white/35">
              Policies
            </h3>
            <ul className="flex flex-col gap-2.5">
              {policies.map((policy) => (
                <li key={policy.href}>
                  <Link
                    href={policy.href}
                    className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-600 transition-colors hover:text-royal dark:text-white/60 dark:hover:text-white"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 text-royal/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    {policy.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-white/35">
              Contact
            </h3>
            <ul className="flex flex-col gap-4 text-[13px] text-slate-600 dark:text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-royal dark:text-royal-soft" />
                <span>
                  {site.addressLines[0]}
                  <br />
                  {site.addressLines[1]}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneTel}`}
                  className="flex items-center gap-3 transition-colors hover:text-royal dark:hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-royal dark:text-royal-soft" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-royal dark:text-royal-soft" />
                {site.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-slate-900/5 pt-7 text-center md:flex-row md:text-left dark:border-white/10">
          <p className="text-xs text-slate-400 dark:text-white/40">
            Copyright © 2026 <span className="font-semibold text-slate-600 dark:text-white/65">SI Technician</span>
            {" "}— All Rights Reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-white/40">
            Founded by <span className="font-semibold text-slate-600 dark:text-white/65">Akash Yadav</span> · Ludhiana, Punjab
          </p>
        </div>
      </div>
    </footer>
  );
}
