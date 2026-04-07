import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/34644937922?text=Hola%2C%20me%20interesa%20obtener%20más%20información%20sobre%20sus%20servicios%20inmobiliarios%20en%20Asunción."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[hsl(142_70%_45%)] text-cream rounded-full shadow-large hover:bg-[hsl(142_70%_40%)] transition-all duration-300 hover:scale-110 animate-pulse-subtle"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton;
