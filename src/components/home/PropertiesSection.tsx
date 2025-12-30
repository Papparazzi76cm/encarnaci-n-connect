import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Square, MapPin, ArrowRight } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const properties = [
  {
    id: 1,
    image: property1,
    title: "Casa Moderna con Piscina",
    location: "San Pedro, Encarnación",
    price: "USD 285.000",
    type: "Venta",
    beds: 4,
    baths: 3,
    area: 320,
    featured: true,
  },
  {
    id: 2,
    image: property2,
    title: "Departamento Vista al Río",
    location: "Costanera, Encarnación",
    price: "USD 1.200/mes",
    type: "Alquiler",
    beds: 2,
    baths: 2,
    area: 95,
    featured: false,
  },
  {
    id: 3,
    image: property3,
    title: "Terreno con Potencial",
    location: "Zona Norte, Encarnación",
    price: "USD 45.000",
    type: "Inversión",
    beds: 0,
    baths: 0,
    area: 1500,
    featured: true,
  },
];

const PropertyCard = ({ property }: { property: typeof properties[0] }) => {
  const slugMap: Record<number, string> = {
    1: 'casa-moderna-piscina',
    2: 'departamento-vista-rio',
    3: 'terreno-potencial',
  };

  return (
    <Link 
      to={`/propiedades/${slugMap[property.id]}`}
      className="group bg-card rounded-xl overflow-hidden border border-border hover-lift block"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
            {property.type}
          </span>
          {property.featured && (
            <span className="px-3 py-1 bg-gold text-primary text-xs font-medium rounded-full">
              Destacado
            </span>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
          <MapPin className="w-4 h-4" />
          {property.location}
        </div>
        <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {property.title}
        </h3>
        <p className="text-2xl font-bold text-gold mb-4">{property.price}</p>
        
        {property.beds > 0 && (
          <div className="flex items-center gap-6 text-muted-foreground text-sm border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4" />
              {property.beds} hab.
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4" />
              {property.baths} baños
            </div>
            <div className="flex items-center gap-2">
              <Square className="w-4 h-4" />
              {property.area} m²
            </div>
          </div>
        )}
        {property.beds === 0 && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm border-t border-border pt-4">
            <Square className="w-4 h-4" />
            {property.area} m² de terreno
          </div>
        )}
      </div>
    </Link>
  );
};

const PropertiesSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              Propiedades Destacadas
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
              Selección exclusiva
            </h2>
          </div>
          <Button variant="outline" size="lg" asChild>
            <Link to="/propiedades">
              Ver todas las propiedades
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
