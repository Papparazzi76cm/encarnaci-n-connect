import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const LeadMagnetSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Campos requeridos",
        description: "Por favor, completa tu nombre y email.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from("leads").insert({
        name: name.trim(),
        email: email.trim(),
        source: "lead_magnet",
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "¡Guía enviada!",
        description: "Revisa tu email en los próximos minutos.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Hubo un problema. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section-padding bg-muted/50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-large overflow-hidden border border-border">
            <div className="grid md:grid-cols-2">
              {/* Left Content */}
              <div className="p-8 md:p-12 bg-gradient-to-br from-primary to-navy-dark text-primary-foreground">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gold/20 rounded-xl mb-6">
                  <Download className="w-7 h-7 text-gold" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Guía gratuita 2026
                </h2>
                <p className="text-primary-foreground/80 mb-6">
                  Todo lo que necesitas saber para vivir o invertir en Encarnación: 
                  trámites, costes reales, zonas recomendadas y consejos prácticos.
                </p>
                <ul className="space-y-3">
                  {[
                    "Proceso de compra paso a paso",
                    "Costes reales (sin sorpresas)",
                    "Mejores zonas para invertir",
                    "Trámites de residencia",
                    "Errores comunes a evitar",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Form */}
              <div className="p-8 md:p-12">
                {!submitted ? (
                  <>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      Descarga gratis
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Recibirás la guía en tu email en menos de 5 minutos.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                          Tu nombre
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          maxLength={100}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                          placeholder="Nombre"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                          Tu email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          maxLength={255}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                          placeholder="email@ejemplo.com"
                        />
                      </div>
                      <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            Descargar Guía Gratis
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Sin spam. Solo información útil.
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      ¡Listo!
                    </h3>
                    <p className="text-muted-foreground">
                      Revisa tu email. La guía está en camino.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;
