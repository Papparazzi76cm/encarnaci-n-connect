import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send, Loader2 } from "lucide-react";

interface PropertyContactFormProps {
  propertyId: string;
  propertyTitle: string;
}

const PropertyContactForm = ({ propertyId, propertyTitle }: PropertyContactFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hola, me interesa obtener más información sobre la propiedad "${propertyTitle}".`,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
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
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        message: formData.message.trim() || null,
        source: "property",
        property_id: propertyId,
      });

      if (error) throw error;

      toast({
        title: "¡Mensaje enviado!",
        description: "Te contactaré lo antes posible para darte toda la información.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: `Hola, me interesa obtener más información sobre la propiedad "${propertyTitle}".`,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre *</Label>
        <Input
          id="name"
          type="text"
          placeholder="Tu nombre completo"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          maxLength={100}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          maxLength={255}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Teléfono / WhatsApp</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+595 9XX XXX XXX"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          maxLength={20}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensaje</Label>
        <Textarea
          id="message"
          placeholder="¿Qué te gustaría saber sobre esta propiedad?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          maxLength={1000}
        />
      </div>

      <Button type="submit" variant="gold" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Solicitar Información
          </>
        )}
      </Button>
    </form>
  );
};

export default PropertyContactForm;
