import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Globe, Shield, Users, Scale, Heart, Target, ArrowRight } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Hero */}
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
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-large max-w-xs hidden md:block">
                  <p className="font-display text-lg font-bold mb-1">
                    "La honestidad es mi mejor herramienta de venta."
                  </p>
                </div>
              </div>

              {/* Content */}
              <div>
                <span className="text-gold font-medium text-sm uppercase tracking-wider">
                  Sobre Mí
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
                  Confianza, transparencia y profesionalidad
                </h1>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>
                    Soy un profesional inmobiliario con experiencia en el mercado europeo. 
                    Tras años trabajando en el sector, decidí trasladarme a Paraguay atraído 
                    por las oportunidades que ofrece esta región en crecimiento.
                  </p>
                  <p>
                    Mi enfoque combina la rigurosidad y transparencia del mercado europeo 
                    con el conocimiento profundo de la realidad local. Entiendo las dudas 
                    y preocupaciones de quien viene de fuera porque yo mismo pasé por eso.
                  </p>
                  <p>
                    No trabajo con "promesas". Trabajo con información clara, expectativas 
                    realistas y un acompañamiento que va más allá de la simple transacción 
                    inmobiliaria.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Mis valores de trabajo
              </h2>
              <p className="text-muted-foreground text-lg">
                Los principios que guían cada interacción y cada operación.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Transparencia Total",
                  desc: "Te cuento la realidad sin adornarla. Los pros, los contras, los riesgos. Prefiero perder una venta que tu confianza.",
                },
                {
                  icon: Scale,
                  title: "Honestidad",
                  desc: "Nunca te recomendaré algo que no recomendaría a mi propia familia. Así de simple.",
                },
                {
                  icon: Globe,
                  title: "Profesionalidad Europea",
                  desc: "Metodología rigurosa, documentación impecable, procesos claros y tiempos cumplidos.",
                },
                {
                  icon: Users,
                  title: "Acompañamiento Real",
                  desc: "No desaparezco después de la venta. Estoy disponible para resolver dudas y ayudarte en tu adaptación.",
                },
                {
                  icon: Heart,
                  title: "Empatía",
                  desc: "Entiendo lo que significa tomar una decisión tan importante en un país nuevo. He pasado por eso.",
                },
                {
                  icon: Target,
                  title: "Enfoque en Resultados",
                  desc: "Mi objetivo es que consigas lo que buscas, no cerrar operaciones a cualquier precio.",
                },
              ].map((value) => (
                <div key={value.title} className="bg-card border border-border rounded-xl p-6">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              ¿Quieres saber más?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Contáctame sin compromiso. Podemos tener una conversación inicial para conocer 
              tu situación y ver si puedo ayudarte.
            </p>
            <Button variant="gold" size="xl" asChild>
              <a href="https://wa.me/595991234567" target="_blank" rel="noopener noreferrer">
                Hablar por WhatsApp
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AboutPage;
