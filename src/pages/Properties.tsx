import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Square, MapPin, Search, Filter } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const allProperties = [
  {
    id: 1,
    image: property1,
    title: "Casa Moderna con Piscina",
    location: "San Pedro, Encarnación",
    price: 285000,
    priceDisplay: "USD 285.000",
    type: "Comprar",
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
    price: 1200,
    priceDisplay: "USD 1.200/mes",
    type: "Alquilar",
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
    price: 45000,
    priceDisplay: "USD 45.000",
    type: "Terrenos",
    beds: 0,
    baths: 0,
    area: 1500,
    featured: true,
  },
  {
    id: 4,
    image: property2,
    title: "Dúplex Céntrico",
    location: "Centro, Encarnación",
    price: 180000,
    priceDisplay: "USD 180.000",
    type: "Inversión",
    beds: 3,
    baths: 2,
    area: 150,
    featured: false,
  },
  {
    id: 5,
    image: property1,
    title: "Casa Familiar con Jardín",
    location: "Barrio Residencial, Encarnación",
    price: 220000,
    priceDisplay: "USD 220.000",
    type: "Comprar",
    beds: 5,
    baths: 3,
    area: 400,
    featured: true,
  },
  {
    id: 6,
    image: property3,
    title: "Lote Esquinero",
    location: "Zona Este, Encarnación",
    price: 65000,
    priceDisplay: "USD 65.000",
    type: "Terrenos",
    beds: 0,
    baths: 0,
    area: 2000,
    featured: false,
  },
];

const categories = ["Todos", "Comprar", "Alquilar", "Inversión", "Terrenos"];

const Properties = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = allProperties.filter((property) => {
    const matchesCategory = activeCategory === "Todos" || property.type === activeCategory;
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Propiedades
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl">
              Selección exclusiva de propiedades en Encarnación. Calidad sobre cantidad.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-muted/30 border-b border-border sticky top-16 md:top-20 z-40">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-auto md:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar propiedades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-muted border border-border"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            {filteredProperties.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="group bg-card rounded-xl overflow-hidden border border-border hover-lift">
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
                      <p className="text-2xl font-bold text-gold mb-4">{property.priceDisplay}</p>
                      
                      {property.beds > 0 ? (
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
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground text-sm border-t border-border pt-4">
                          <Square className="w-4 h-4" />
                          {property.area} m² de terreno
                        </div>
                      )}
                      
                      <div className="mt-4 pt-4 border-t border-border flex gap-2">
                        <Button variant="default" className="flex-1">
                          Solicitar Info
                        </Button>
                        <Button variant="whatsapp">
                          WhatsApp
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No se encontraron propiedades con esos criterios.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Properties;
