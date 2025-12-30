import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Cómo comprar vivienda en Paraguay siendo extranjero",
    excerpt: "Guía completa del proceso de compra: requisitos legales, documentación necesaria, tiempos estimados y consejos prácticos para no cometer errores.",
    date: "2024-12-15",
    readTime: "8 min",
    category: "Guías",
  },
  {
    id: 2,
    title: "Zonas recomendadas para vivir en Encarnación",
    excerpt: "Análisis detallado de los mejores barrios según tu perfil: familias, jubilados, inversores. Pros, contras y precios orientativos de cada zona.",
    date: "2024-12-10",
    readTime: "6 min",
    category: "Guías",
  },
  {
    id: 3,
    title: "Costes reales de comprar una vivienda en Paraguay",
    excerpt: "Más allá del precio de venta: impuestos, honorarios notariales, gastos de escrituración y otros costes que debes considerar.",
    date: "2024-12-05",
    readTime: "5 min",
    category: "Finanzas",
  },
  {
    id: 4,
    title: "Errores típicos al invertir en Paraguay",
    excerpt: "Los 7 errores más comunes que cometen los extranjeros al invertir en inmuebles y cómo evitarlos.",
    date: "2024-11-28",
    readTime: "7 min",
    category: "Inversión",
  },
  {
    id: 5,
    title: "¿Es Encarnación una buena inversión inmobiliaria?",
    excerpt: "Análisis del mercado local, tendencias de precios, rentabilidades esperadas y proyección a 5-10 años.",
    date: "2024-11-20",
    readTime: "10 min",
    category: "Inversión",
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Blog & Recursos
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl">
              Información práctica y honesta para vivir o invertir en Paraguay. Sin humo, sin promesas vacías.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid gap-8">
              {blogPosts.map((post, index) => (
                <article 
                  key={post.id} 
                  className="group bg-card border border-border rounded-xl overflow-hidden hover-lift"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    
                    <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Encarnación Inmobiliaria</p>
                          <p className="text-xs text-muted-foreground">Asesor Inmobiliario</p>
                        </div>
                      </div>
                      <Button variant="ghost" className="group-hover:text-primary">
                        Leer artículo
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 bg-muted/50 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                ¿Tienes dudas específicas?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Si quieres información personalizada sobre tu situación, contáctame. 
                Te cuento la realidad sin vender humo.
              </p>
              <Button variant="default" size="lg" asChild>
                <Link to="/contacto">
                  Ir a Contacto
                  <ArrowRight className="w-4 h-4" />
                </Link>
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

export default BlogPage;
