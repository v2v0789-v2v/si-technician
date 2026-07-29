import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { FloatingActions, Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — CCTV Security & RO Water Purifiers in Ludhiana`,
    template: `%s · ${site.name}`,
  },
  description:
    "SI Technician by Akash Yadav — premium CCTV cameras (Dome, Bullet, PTZ, WiFi, DVR/NVR) and RO water purifiers with expert installation, AMC and 24×7 support across Ludhiana, Punjab.",
  keywords: [
    "CCTV camera Ludhiana",
    "CCTV installation Ludhiana",
    "Hikvision dealer Ludhiana",
    "CP Plus camera Punjab",
    "RO water purifier Ludhiana",
    "RO repair Ludhiana",
    "SI Technician",
    "Akash Yadav",
    "security camera shop Subhash Nagar",
    "water purifier AMC",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description:
      "Premium CCTV cameras, video door phones, DVR/NVR systems and RO water purifiers with professional installation in Ludhiana, Punjab.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1920,
        height: 1080,
        alt: "SI Technician — smart CCTV security monitoring",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description:
      "Premium CCTV & RO water purifier solutions with expert installation in Ludhiana, Punjab.",
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#04060c" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7fc" },
  ],
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  slogan: site.tagline,
  url: site.url,
  image: `${site.url}/images/hero.jpg`,
  telephone: site.phoneTel,
  priceRange: "₹₹",
  founder: { "@type": "Person", name: site.founder },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Subhash Nagar, Prem Vihar",
    addressLocality: "Ludhiana",
    addressRegion: "Punjab",
    postalCode: "141007",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 30.901, longitude: 75.8573 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "21:00",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${poppins.variable} min-h-screen font-sans antialiased`}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingActions />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </body>
    </html>
  );
}
