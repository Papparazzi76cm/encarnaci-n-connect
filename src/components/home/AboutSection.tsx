import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Globe, Users, Scale, ArrowRight } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const features = [
  {
    icon: Globe,
    title: "Enfoque Europeo",
    description: "Metodología profesional con estándares internacionales de transparencia.",
  },
  {
    icon: Shield,
    title: "Acompañamiento Integral",
    description: "Te guío en cada paso: legal, fiscal, bancario y de instalación.",
  },
  {
    icon: Users,
    title: "Experiencia Local",
    description: "Conocimiento profundo del mercado inmobiliario de Encarnación.",
  },
  {
    icon: Scale,
    title: "Transparencia Total",
    description: "Sin sorpresas. Información clara sobre precios, trámites y tiempos.",
  },
];

const AboutSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-large">
              <img
                src={profilePhoto}
                alt="Asesor inmobiliario profesional"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-large border border-border max-w-xs hidden md:block">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-primary">100%</p>
                  <p className="text-sm text-muted-foreground">Clientes satisfechos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              Sobre Mí
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-6">
              Tu aliado de confianza en Encarnación
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Soy un profesional inmobiliario con experiencia en el mercado europeo, 
              ahora dedicado a ayudar a extranjeros e inversores a encontrar su lugar 
              en Paraguay. Mi enfoque combina la rigurosidad profesional europea con 
              el conocimiento profundo del mercado local.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="default" size="lg" asChild>
              <Link to="/sobre-mi">
                Conocer más
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
