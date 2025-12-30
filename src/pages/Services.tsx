import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { 
  Plane, TrendingUp, Key, MapPin, FileCheck, Scale, Home, 
  Users, Camera, Share2, CheckCircle, ArrowRight, Phone 
} from "lucide-react";

const ServicesPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Servicios
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl">
              Soluciones personalizadas para cada perfil. Acompañamiento integral con estándares europeos.
            </p>
          </div>
        </section>

        {/* Services for Foreigners */}
        <section id="extranjeros" className="section-padding bg-background scroll-mt-24">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                  <Plane className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">Para Extranjeros</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Tu nueva vida en Encarnación, sin complicaciones
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Te acompaño en todo el proceso de mudanza: desde encontrar la propiedad perfecta 
                  hasta que estés instalado y funcionando en Paraguay.
                </p>
                
                <div className="space-y-4 mb-8">
                  {[
                    "Asesoría previa sobre zonas, precios y estilo de vida",
                    "Selección personalizada de propiedades",
                    "Acompañamiento legal y fiscal completo",
                    "Gestión de trámites de residencia",
                    "Visitas guiadas a las propiedades",
                    "Negociación profesional en tu nombre",
                    "Apoyo en la instalación inicial (bancos, servicios, etc.)",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <Button variant="gold" size="lg" asChild>
                  <a href="https://wa.me/595991234567" target="_blank" rel="noopener noreferrer">
                    Reservar Sesión Informativa Gratuita
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
              
              <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  ¿Qué incluye el servicio?
                </h3>
                <div className="grid gap-6">
                  {[
                    { icon: MapPin, title: "Análisis de zonas", desc: "Te explico pros y contras de cada área" },
                    { icon: FileCheck, title: "Due diligence legal", desc: "Verificación completa de cada propiedad" },
                    { icon: Scale, title: "Asesoría fiscal", desc: "Optimización de impuestos en la compra" },
                    { icon: Home, title: "Instalación", desc: "Te ayudo a adaptarte a tu nueva vida" },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services for Investors */}
        <section id="inversores" className="section-padding bg-muted/30 scroll-mt-24">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-card rounded-2xl p-8 md:p-12 shadow-medium">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  Datos de inversión en Encarnación
                </h3>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {[
                    { value: "8-12%", label: "ROI anual promedio" },
                    { value: "+15%", label: "Valorización/año" },
                    { value: "0%", label: "Impuesto patrimonio" },
                    { value: "10%", label: "Imp. renta máximo" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-4 bg-muted/50 rounded-xl">
                      <p className="text-2xl md:text-3xl font-bold text-gold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">
                  *Datos orientativos basados en el mercado actual. Resultados pueden variar.
                </p>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full mb-6">
                  <TrendingUp className="w-5 h-5 text-gold" />
                  <span className="text-gold font-medium">Para Inversores</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Oportunidades de inversión con visión a largo plazo
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Te ofrezco acceso a propiedades y terrenos con alto potencial de rentabilidad, 
                  análisis detallados y una red de contactos locales para maximizar tu inversión.
                </p>
                
                <div className="space-y-4 mb-8">
                  {[
                    "Análisis de rentabilidad personalizado",
                    "Propiedades estratégicas (no en portales públicos)",
                    "Terrenos con potencial de desarrollo",
                    "Visión a 5-10 años del mercado",
                    "Acompañamiento completo en la compra",
                    "Red de contactos: abogados, escribanos, gestores",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <Button variant="default" size="lg" asChild>
                  <a href="https://wa.me/595991234567" target="_blank" rel="noopener noreferrer">
                    Consultar Oportunidades
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services for Property Owners */}
        <section id="propietarios" className="section-padding bg-background scroll-mt-24">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
                <Key className="w-5 h-5 text-accent" />
                <span className="text-accent font-medium">Para Propietarios</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Vende tu propiedad al mejor precio
              </h2>
              <p className="text-muted-foreground text-lg">
                Marketing profesional y acceso a una base de compradores extranjeros e inversores 
                que buscan propiedades como la tuya.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Camera,
                  title: "Fotografía Profesional",
                  desc: "Imágenes de alta calidad que destacan lo mejor de tu propiedad.",
                },
                {
                  icon: Share2,
                  title: "Difusión Digital",
                  desc: "Marketing online dirigido a extranjeros e inversores.",
                },
                {
                  icon: Users,
                  title: "Base de Clientes",
                  desc: "Acceso a compradores cualificados que ya buscan en Encarnación.",
                },
                {
                  icon: Scale,
                  title: "Gestión Seria",
                  desc: "Proceso profesional de principio a fin.",
                },
                {
                  icon: FileCheck,
                  title: "Filtro de Clientes",
                  desc: "Solo te contacto con interesados serios y verificados.",
                },
                {
                  icon: Home,
                  title: "Valoración Real",
                  desc: "Te digo el precio real de mercado, sin inflarlo ni bajarlo.",
                },
              ].map((service) => (
                <div key={service.title} className="bg-card border border-border rounded-xl p-6 hover-lift">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{service.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="cta" size="xl" asChild>
                <a href="https://wa.me/595991234567" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5" />
                  Quiero Vender mi Propiedad
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ServicesPage;
