-- Create leads table for contact forms and lead magnet
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'contact', -- 'contact', 'lead_magnet', 'property'
  property_id TEXT,
  interested_in TEXT, -- 'invest', 'live', 'sell'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting leads (anyone can submit)
CREATE POLICY "Anyone can insert leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  price_type TEXT NOT NULL DEFAULT 'sale', -- 'sale', 'rent', 'investment'
  property_type TEXT NOT NULL, -- 'house', 'apartment', 'land', 'commercial'
  beds INTEGER DEFAULT 0,
  baths INTEGER DEFAULT 0,
  area DECIMAL(10,2) NOT NULL,
  featured BOOLEAN DEFAULT false,
  images TEXT[] DEFAULT '{}',
  video_url TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  amenities TEXT[] DEFAULT '{}',
  estimated_roi DECIMAL(5,2),
  rental_potential DECIMAL(12,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security for properties
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Anyone can view properties
CREATE POLICY "Anyone can view properties" 
ON public.properties 
FOR SELECT 
USING (true);

-- Insert sample properties
INSERT INTO public.properties (slug, title, description, location, price, price_type, property_type, beds, baths, area, featured, estimated_roi, rental_potential) VALUES
('casa-moderna-piscina', 'Casa Moderna con Piscina', 'Espectacular casa moderna con piscina privada, acabados de primera calidad y amplios espacios. Ideal para familias que buscan confort y exclusividad en una de las mejores zonas de Encarnación.', 'San Pedro, Encarnación', 285000, 'sale', 'house', 4, 3, 320, true, 8.5, 2200),
('departamento-vista-rio', 'Departamento Vista al Río', 'Moderno departamento con impresionantes vistas al río Paraná. Ubicación privilegiada en la costanera con acceso a todas las comodidades urbanas.', 'Costanera, Encarnación', 1200, 'rent', 'apartment', 2, 2, 95, false, NULL, NULL),
('terreno-potencial', 'Terreno con Potencial de Inversión', 'Excelente terreno en zona de desarrollo con alto potencial de valorización. Perfecto para proyectos de inversión a mediano plazo.', 'Zona Norte, Encarnación', 45000, 'sale', 'land', 0, 0, 1500, true, 15.2, NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();