import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site";

type LegalSection = { heading: string; body: string[] };
type LegalDoc = { title: string; intro: string; sections: LegalSection[] };

const LEGAL: Record<string, LegalDoc> = {
  "privacy-policy": {
    title: "Privacy Policy",
    intro:
      "Your privacy matters to us. This policy explains what information SI Technician collects, why we collect it, and how it is protected.",
    sections: [
      {
        heading: "Information We Collect",
        body: [
          "When you contact us through our website, WhatsApp, or phone, we may collect your name, phone number, email address, and the details of your enquiry or service request.",
          "During site visits for CCTV or RO installation, we note your address and basic property layout strictly for the purpose of completing the job.",
        ],
      },
      {
        heading: "How We Use Your Information",
        body: [
          "To respond to enquiries, prepare quotes, schedule installations, and provide after-sales support and warranty service.",
          "To send service reminders (for example, RO filter replacement due dates) only where you have opted in.",
        ],
      },
      {
        heading: "Data Sharing",
        body: [
          "We never sell your personal information. Details are shared with product brands only when required to register or claim a manufacturer warranty on your behalf.",
        ],
      },
      {
        heading: "CCTV Footage",
        body: [
          "Camera systems we install record locally on your own DVR/NVR or your personal cloud account. SI Technician does not access, store, or view your footage unless you explicitly request troubleshooting assistance.",
        ],
      },
      {
        heading: "Data Security & Retention",
        body: [
          "Contact records are stored securely and retained only as long as needed for service and warranty purposes. You may request deletion of your data at any time by calling or messaging us.",
        ],
      },
      {
        heading: "Contact",
        body: [
          `For any privacy questions, contact ${site.founder} at ${site.phoneDisplay} or visit us at ${site.addressLines.join(", ")}.`,
        ],
      },
    ],
  },
  "shipping-policy": {
    title: "Shipping & Delivery Policy",
    intro:
      "We keep delivery simple: fast, careful, and paired with professional installation wherever possible.",
    sections: [
      {
        heading: "Service & Delivery Area",
        body: [
          "Our primary delivery and installation area covers Ludhiana city and nearby localities in Punjab. Deliveries outside Ludhiana are handled case-by-case over phone or WhatsApp.",
        ],
      },
      {
        heading: "Delivery Timelines",
        body: [
          "In-stock CCTV cameras, DVR/NVR systems and RO purifiers are typically delivered within 24–48 hours inside Ludhiana.",
          "Installation is usually scheduled on the same day as delivery or the following day, as per your convenience.",
        ],
      },
      {
        heading: "Delivery Charges",
        body: [
          "Delivery is free within Ludhiana city limits on all products purchased with installation. Standalone accessory deliveries may carry a nominal charge, confirmed before dispatch.",
        ],
      },
      {
        heading: "Installation-First Delivery",
        body: [
          "Most products are delivered by our own technician who unboxes, installs, tests and demonstrates the product at your premises — no third-party couriers for local orders.",
        ],
      },
      {
        heading: "Damaged or Incorrect Items",
        body: [
          "Please inspect the product at the time of installation. Any transit damage or incorrect model will be replaced immediately at no cost.",
        ],
      },
    ],
  },
  "return-policy": {
    title: "Return & Replacement Policy",
    intro:
      "We want you to be fully satisfied. Our return policy is fair, transparent, and aligned with manufacturer guidelines.",
    sections: [
      {
        heading: "7-Day Replacement Window",
        body: [
          "Unopened, unused products in original sealed packaging may be returned or replaced within 7 days of purchase.",
          "Products found defective on arrival or during installation are replaced immediately — no waiting period.",
        ],
      },
      {
        heading: "Non-Returnable Items",
        body: [
          "Installed CCTV cameras, DVR/NVR units and RO purifiers that have been commissioned cannot be returned, as installation involves consumables (cabling, connectors, fittings, filters) customised to your site.",
          "RO filters and membranes removed from sealing are not returnable for hygiene reasons, unless defective.",
        ],
      },
      {
        heading: "Warranty Claims",
        body: [
          "Products covered under manufacturer warranty are repaired or replaced through the brand's service process. We manage the claim on your behalf free of charge.",
        ],
      },
      {
        heading: "Refunds",
        body: [
          "Approved refunds are processed to the original payment method within 5–7 working days.",
        ],
      },
      {
        heading: "How to Raise a Request",
        body: [
          `Call or WhatsApp us on ${site.phoneDisplay} with your invoice details and we will guide you through the process the same day.`,
        ],
      },
    ],
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    intro:
      "These terms govern the use of the SI Technician website and the purchase of our products and services.",
    sections: [
      {
        heading: "About SI Technician",
        body: [
          `SI Technician (${site.addressLines.join(", ")}) is founded and operated by ${site.founder}. We supply, install, and maintain CCTV security systems and RO water purifiers.`,
        ],
      },
      {
        heading: "Pricing & Quotes",
        body: [
          "Prices displayed on this website are indicative and shown as 'Contact for Price' because they vary by brand, model and site requirements. A written quote is shared before any work begins and is valid for 7 days.",
        ],
      },
      {
        heading: "Site Content",
        body: [
          "Product images are for representation. Specifications are provided by manufacturers and may change without notice. We always confirm exact model details before dispatch.",
        ],
      },
      {
        heading: "Installation & Warranty",
        body: [
          "Installation carried out by SI Technician is warranted against workmanship defects for 90 days. Product warranties rest with the respective manufacturers.",
        ],
      },
      {
        heading: "Limitation of Liability",
        body: [
          "CCTV systems are a deterrent and recording aid; SI Technician is not liable for losses arising from theft, power failure, storage failure or network outage. RO output quality depends on input water conditions, which we test and disclose at installation.",
        ],
      },
      {
        heading: "Governing Jurisdiction",
        body: [
          "All disputes are subject to the jurisdiction of Ludhiana, Punjab, India.",
        ],
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(LEGAL).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = LEGAL[slug];
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.intro,
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = LEGAL[slug];
  if (!doc) notFound();

  return (
    <div className="relative overflow-hidden pt-36 pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-royal/15 blur-[140px]"
      />
      <div className="relative mx-auto w-full max-w-3xl px-5 md:px-8">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-royal dark:text-white/50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-royal dark:text-royal-soft">
          SI Technician · Legal
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl dark:text-white">
          {doc.title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-500 md:text-base dark:text-white/55">
          {doc.intro}
        </p>
        <p className="mt-2 text-xs text-slate-400 dark:text-white/35">
          Last updated: January 2026
        </p>

        <div className="mt-12 space-y-10">
          {doc.sections.map((section, i) => (
            <section
              key={section.heading}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <h2 className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-white">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-royal/10 text-xs font-bold text-royal dark:text-royal-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.heading}
              </h2>
              <div className="mt-4 space-y-3">
                {section.body.map((para, j) => (
                  <p
                    key={j}
                    className="text-sm leading-relaxed text-slate-500 dark:text-white/60"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="glass mt-12 rounded-2xl p-6 text-center md:p-8">
          <p className="text-sm text-slate-500 dark:text-white/60">
            Questions about this policy? Call us at{" "}
            <a
              href={`tel:${site.phoneTel}`}
              className="font-semibold text-royal hover:underline dark:text-royal-soft"
            >
              {site.phoneDisplay}
            </a>{" "}
            — we&apos;re happy to help.
          </p>
        </div>
      </div>
    </div>
  );
}
