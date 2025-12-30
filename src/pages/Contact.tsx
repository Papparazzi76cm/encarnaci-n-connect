import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Contacto
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl">
              Si estás pensando en mudarte o invertir, hablemos. Te cuento la realidad sin vender humo.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-2">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Hablemos directamente
                </h2>
                <p className="text-muted-foreground mb-8">
                  Prefiero el trato personal. Llámame, escríbeme por WhatsApp o envíame un email. 
                  Respondo en menos de 24 horas.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">WhatsApp / Teléfono</h3>
                      <a
                        href="tel:+595991234567"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +595 991 234 567
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Disponible de lunes a sábado
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <a
                        href="mailto:info@encarnacioninmobiliaria.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@encarnacioninmobiliaria.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Ubicación</h3>
                      <p className="text-muted-foreground">
                        Encarnación, Itapúa<br />Paraguay
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-muted/50 rounded-xl">
                  <p className="text-sm text-muted-foreground italic">
                    "No tengo oficina física tradicional. Trabajo de forma ágil, 
                    nos encontramos donde tú prefieras o hacemos videollamada."
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
                  {!submitted ? (
                    <>
                      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                        Envíame un mensaje
                      </h2>
                      <p className="text-muted-foreground mb-8">
                        Cuéntame tu situación y cómo puedo ayudarte.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                              Tu nombre *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                              placeholder="Nombre completo"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                              Email *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                              placeholder="tu@email.com"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                              Teléfono / WhatsApp
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                              placeholder="+34 600 123 456"
                            />
                          </div>
                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                              ¿Qué te interesa?
                            </label>
                            <select
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                            >
                              <option value="">Selecciona una opción</option>
                              <option value="mudarse">Quiero mudarme a Paraguay</option>
                              <option value="invertir">Quiero invertir</option>
                              <option value="vender">Quiero vender mi propiedad</option>
                              <option value="otro">Otra consulta</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                            Tu mensaje *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground resize-none"
                            placeholder="Cuéntame tu situación..."
                          />
                        </div>

                        <Button type="submit" variant="gold" size="lg" className="w-full">
                          <Send className="w-4 h-4" />
                          Enviar Mensaje
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                          Respuesta garantizada en menos de 24 horas.
                        </p>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-accent" />
                      </div>
                      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                        ¡Mensaje enviado!
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Te responderé lo antes posible, normalmente en menos de 24 horas.
                      </p>
                      <Button variant="whatsapp" size="lg" asChild>
                        <a href="https://wa.me/595991234567" target="_blank" rel="noopener noreferrer">
                          <Phone className="w-4 h-4" />
                          O háblame directamente por WhatsApp
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ContactPage;
