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
import SEO from "@/components/SEO";

const Index = () => {
  // Datos estructurados para Google (SEO Local)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Asunción Inmobiliaria",
    "image": "https://asuncioninmobiliaria.com/logo.png",
    "description": "Asesoría inmobiliaria profesional en Asunción, Paraguay. Ayudo a extranjeros e inversores a comprar, alquilar o invertir con seguridad y transparencia.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Asunción",
      "addressRegion": "Central",
      "addressCountry": "PY"
    },
    "telephone": "+595991234567",
    "url": "https://asuncioninmobiliaria.com"
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Inmobiliaria en Asunción | Compra, Alquiler e Inversión en Paraguay"
        description="Agencia inmobiliaria en Asunción. Encuentra casas, departamentos y terrenos. Asesoría para extranjeros e inversores con estándares europeos."
        keywords="inmobiliaria Asunción, venta de casas Asunción, terrenos Asunción Paraguay, invertir en Paraguay, alquiler Asunción"
        schema={localBusinessSchema}
      />
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
