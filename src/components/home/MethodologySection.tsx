import { CheckCircle, FileCheck, Shield, Users } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Escucha activa",
    description: "Entiendo tus necesidades, presupuesto y expectativas antes de mostrarte nada.",
  },
  {
    icon: FileCheck,
    title: "Selección filtrada",
    description: "Te presento solo propiedades que realmente encajan con lo que buscas.",
  },
  {
    icon: Shield,
    title: "Verificación legal",
    description: "Compruebo la situación legal de cada propiedad antes de que la consideres.",
  },
  {
    icon: CheckCircle,
    title: "Acompañamiento total",
    description: "Te guío en negociación, trámites, escrituración e instalación.",
  },
];

const MethodologySection = () => {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            Metodología de Trabajo
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            Proceso transparente y profesional
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Sin improvisaciones. Cada paso está diseñado para proteger tu inversión 
            y garantizar una experiencia sin estrés.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px bg-primary-foreground/20" />
              )}
              
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full mb-6">
                  <step.icon className="w-8 h-8 text-gold" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-gold text-primary text-sm font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-12 border-t border-primary-foreground/10">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gold">100%</p>
              <p className="text-primary-foreground/60 text-sm">Transparencia</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gold">0</p>
              <p className="text-primary-foreground/60 text-sm">Costos ocultos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gold">24h</p>
              <p className="text-primary-foreground/60 text-sm">Respuesta máxima</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gold">∞</p>
              <p className="text-primary-foreground/60 text-sm">Compromiso</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
