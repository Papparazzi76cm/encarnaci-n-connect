import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plane, TrendingUp, Key, ArrowRight } from "lucide-react";

const audiences = [
  {
    icon: Plane,
    title: "Extranjeros que quieren mudarse",
    description:
      "Te acompaño en todo el proceso: desde la búsqueda de la propiedad ideal hasta tu instalación completa en Encarnación. Asesoría legal, bancaria y de residencia incluida.",
    cta: "Servicios para extranjeros",
    link: "/servicios#extranjeros",
    gradient: "from-primary/10 to-accent/10",
  },
  {
    icon: TrendingUp,
    title: "Inversores",
    description:
      "Análisis de rentabilidad, propiedades estratégicas, terrenos con potencial y visión a largo plazo. Acceso a oportunidades que no están en portales públicos.",
    cta: "Servicios para inversores",
    link: "/servicios#inversores",
    gradient: "from-gold/10 to-secondary/20",
  },
  {
    icon: Key,
    title: "Propietarios que quieren vender",
    description:
      "Fotografía profesional, difusión a extranjeros e inversores, gestión seria y filtro de clientes. Vende tu propiedad al mejor precio posible.",
    cta: "Servicios para propietarios",
    link: "/servicios#propietarios",
    gradient: "from-accent/10 to-primary/10",
  },
];

const AudienceSection = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            ¿A quién ayudo?
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
            Servicios personalizados para cada perfil
          </h2>
          <p className="text-muted-foreground text-lg">
            Entiendo que cada cliente tiene necesidades únicas. Por eso ofrezco 
            soluciones adaptadas a tu situación específica.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((item, index) => (
            <div
              key={item.title}
              className={`group bg-gradient-to-br ${item.gradient} bg-card rounded-2xl p-8 border border-border hover-lift`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                {item.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {item.description}
              </p>
              <Button variant="outline" asChild className="group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Link to={item.link}>
                  {item.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
