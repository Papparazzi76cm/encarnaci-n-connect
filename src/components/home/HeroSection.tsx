import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Home, Phone } from "lucide-react";
import heroImage from "@/assets/hero-encarnacion.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Vista panorámica de Encarnación, Paraguay"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0" 
          style={{ background: "var(--gradient-hero)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-4xl">
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-6 animate-fade-in-delay-1">
            Te ayudo a vivir o invertir en{" "}
            <span className="text-gradient-gold">Encarnación</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-cream/80 max-w-2xl mb-10 leading-relaxed animate-fade-in-delay-2">
            Con seguridad, transparencia y acompañamiento total. Asesoramiento personalizado para extranjeros e inversores que buscan oportunidades en Paraguay.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-3">
            <Button variant="gold" size="xl" asChild>
              <Link to="/servicios#inversores">
                <TrendingUp className="w-5 h-5" />
                Quiero Invertir
              </Link>
            </Button>
            <Button variant="hero" size="xl" asChild>
              <Link to="/servicios#extranjeros">
                <Home className="w-5 h-5" />
                Quiero Vivir Aquí
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="https://wa.me/595991234567" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-cream/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-cream/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
