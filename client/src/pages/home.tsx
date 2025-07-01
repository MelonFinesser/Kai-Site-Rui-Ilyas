import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import FeaturesSection from "@/components/features-section";
import QuoteFormsSection from "@/components/quote-forms-section";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <QuoteFormsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
