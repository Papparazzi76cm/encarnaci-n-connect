import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import AudienceSection from "@/components/home/AudienceSection";
import PropertiesSection from "@/components/home/PropertiesSection";
import InvestmentSection from "@/components/home/InvestmentSection";
import MethodologySection from "@/components/home/MethodologySection";
import LeadMagnetSection from "@/components/home/LeadMagnetSection";
import ContactCTASection from "@/components/home/ContactCTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <AudienceSection />
        <PropertiesSection />
        <InvestmentSection />
        <MethodologySection />
        <LeadMagnetSection />
        <ContactCTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
