import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ImageGallery from "@/components/ImageGallery";
import PropertyContactForm from "@/components/PropertyContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  MapPin, Bed, Bath, Square, ArrowLeft, MessageCircle, 
  TrendingUp, Play, CheckCircle2 
} from "lucide-react";

// Import local images as fallbacks
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const getPropertyImages = (slug: string): string[] => {
  const imageMap: Record<string, string[]> = {
    'casa-moderna-piscina': [property1, property2, property3],
    'departamento-vista-rio': [property2, property1],
    'terreno-potencial': [property3, property1, property2],
  };
  return imageMap[slug] || [property1];
};

const PropertyDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: property, isLoading, error } = useQuery({
    queryKey: ["property", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("slug", slug)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const formatPrice = (price: number, priceType: string) => {
    const formatted = new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
    
    return priceType === 'rent' ? `${formatted}/mes` : formatted;
  };

  const getPriceTypeLabel = (type: string) => {
    switch (type) {
      case 'rent': return 'Alquiler';
      case 'sale': return 'Venta';
      case 'investment': return 'Inversión';
      default: return type;
    }
  };

  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case 'house': return 'Casa';
      case 'apartment': return 'Departamento';
      case 'land': return 'Terreno';
      case 'commercial': return 'Local Comercial';
      default: return type;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-custom py-24">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="aspect-[16/10] rounded-xl" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div>
              <Skeleton className="h-[400px] rounded-xl" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-custom py-24 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Propiedad no encontrada</h1>
          <p className="text-muted-foreground mb-8">
            La propiedad que buscas no existe o ha sido eliminada.
          </p>
          <Button asChild>
            <Link to="/propiedades">
              <ArrowLeft className="w-4 h-4" />
              Ver todas las propiedades
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const images = getPropertyImages(property.slug);
  const whatsappMessage = `Hola, me interesa la propiedad "${property.title}" en ${property.location}. ¿Podrías darme más información?`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppButton />

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="container-custom py-6">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Inicio
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/propiedades" className="text-muted-foreground hover:text-foreground transition-colors">
              Propiedades
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{property.title}</span>
          </div>
        </div>

        <div className="container-custom pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <ImageGallery images={images} title={property.title} />

              {/* Property Header */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    {getPriceTypeLabel(property.price_type)}
                  </Badge>
                  <Badge variant="outline">
                    {getPropertyTypeLabel(property.property_type)}
                  </Badge>
                  {property.featured && (
                    <Badge className="bg-gold text-primary">Destacado</Badge>
                  )}
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {property.title}
                </h1>

                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-5 h-5" />
                  <span>{property.location}</span>
                </div>

                <p className="text-3xl font-bold text-gold">
                  {formatPrice(Number(property.price), property.price_type)}
                </p>
              </div>

              {/* Property Features */}
              {(property.beds > 0 || property.baths > 0 || property.area > 0) && (
                <div className="flex flex-wrap gap-6 p-6 bg-muted/30 rounded-xl">
                  {property.beds > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gold/10 rounded-lg">
                        <Bed className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Habitaciones</p>
                        <p className="text-lg font-semibold">{property.beds}</p>
                      </div>
                    </div>
                  )}
                  {property.baths > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gold/10 rounded-lg">
                        <Bath className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Baños</p>
                        <p className="text-lg font-semibold">{property.baths}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gold/10 rounded-lg">
                      <Square className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Superficie</p>
                      <p className="text-lg font-semibold">{property.area} m²</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">Descripción</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* ROI Info (if available) */}
              {(property.estimated_roi || property.rental_potential) && (
                <Card className="border-gold/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-gold" />
                      Potencial de Inversión
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    {property.estimated_roi && (
                      <div className="p-4 bg-gold/5 rounded-lg">
                        <p className="text-sm text-muted-foreground">ROI Estimado Anual</p>
                        <p className="text-2xl font-bold text-gold">{property.estimated_roi}%</p>
                      </div>
                    )}
                    {property.rental_potential && (
                      <div className="p-4 bg-gold/5 rounded-lg">
                        <p className="text-sm text-muted-foreground">Potencial de Alquiler</p>
                        <p className="text-2xl font-bold text-foreground">
                          {formatPrice(Number(property.rental_potential), 'rent')}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Video (if available) */}
              {property.video_url && (
                <div>
                  <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Video Tour
                  </h2>
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <iframe
                      src={property.video_url}
                      title={`Video de ${property.title}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Location Map */}
              <div>
                <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Ubicación
                </h2>
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-muted">
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location + ', Paraguay')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    title={`Mapa de ${property.location}`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  * Ubicación aproximada. Te mostraré la ubicación exacta durante la visita.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="font-display">¿Te interesa esta propiedad?</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Completa el formulario o contáctame directamente por WhatsApp
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="whatsapp" 
                    className="w-full" 
                    size="lg"
                    asChild
                  >
                    <a
                      href={`https://wa.me/595981123456?text=${encodeURIComponent(whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Contactar por WhatsApp
                    </a>
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        o envía un mensaje
                      </span>
                    </div>
                  </div>

                  <PropertyContactForm 
                    propertyId={property.id} 
                    propertyTitle={property.title} 
                  />
                </CardContent>
              </Card>

              {/* Trust Points */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Asesoramiento Completo</p>
                      <p className="text-sm text-muted-foreground">
                        Te acompaño en todo el proceso de compra
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Transparencia Total</p>
                      <p className="text-sm text-muted-foreground">
                        Sin costos ocultos ni sorpresas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Apoyo Legal</p>
                      <p className="text-sm text-muted-foreground">
                        Conexión con profesionales de confianza
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
