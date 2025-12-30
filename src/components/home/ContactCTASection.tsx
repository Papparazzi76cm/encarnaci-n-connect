import { Button } from "@/components/ui/button";
import { Phone, Mail, ArrowRight } from "lucide-react";

const ContactCTASection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            No esperes. <span className="text-gradient-gold">Hablemos.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Si estás pensando en mudarte o invertir en Encarnación, contáctame. 
            Te cuento la realidad sin vender humo.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="whatsapp" size="xl" asChild>
              <a href="https://wa.me/595991234567" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" />
                Hablar por WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="mailto:info@encarnacioninmobiliaria.com">
                <Mail className="w-5 h-5" />
                Enviar Email
              </a>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            Respuesta en menos de 24 horas. Consulta inicial sin compromiso.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactCTASection;
