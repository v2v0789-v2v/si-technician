import { Hero } from "@/components/hero";
import { CategoryProvider } from "@/components/providers";
import { Categories } from "@/components/categories";
import { ProductsSection } from "@/components/products";
import { Services, WhyChooseUs } from "@/components/services";
import { About, Stats } from "@/components/about";
import { Testimonials } from "@/components/testimonials";
import { Gallery } from "@/components/gallery";
import { Faq } from "@/components/faq";
import { ContactSection } from "@/components/contact";
import { faqs } from "@/lib/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <CategoryProvider>
        <Categories />
        <ProductsSection />
      </CategoryProvider>
      <Services />
      <WhyChooseUs />
      <About />
      <Stats />
      <Testimonials />
      <Gallery />
      <Faq />
      <ContactSection />
    </>
  );
}
