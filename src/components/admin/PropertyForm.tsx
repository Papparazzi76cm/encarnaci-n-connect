import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

const propertySchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres").max(200),
  slug: z.string().min(3, "El slug debe tener al menos 3 caracteres").max(200).regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  location: z.string().min(3, "La ubicación debe tener al menos 3 caracteres").max(200),
  price: z.coerce.number().min(1, "El precio debe ser mayor a 0"),
  price_type: z.enum(["sale", "rent", "investment"]),
  property_type: z.string().min(2, "Selecciona un tipo de propiedad"),
  area: z.coerce.number().min(1, "El área debe ser mayor a 0"),
  beds: z.coerce.number().min(0).optional(),
  baths: z.coerce.number().min(0).optional(),
  description: z.string().max(2000).optional(),
  estimated_roi: z.coerce.number().min(0).max(100).optional().nullable(),
  rental_potential: z.coerce.number().min(0).optional().nullable(),
  featured: z.boolean().default(false),
  video_url: z.string().url().optional().or(z.literal("")),
  latitude: z.coerce.number().optional().nullable(),
  longitude: z.coerce.number().optional().nullable(),
  images: z.string().optional(),
  amenities: z.string().optional(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property?: Tables<"properties"> | null;
}

export const PropertyForm = ({ open, onOpenChange, property }: PropertyFormProps) => {
  const queryClient = useQueryClient();
  const isEditing = !!property;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      slug: "",
      location: "",
      price: 0,
      price_type: "sale",
      property_type: "casa",
      area: 0,
      beds: 0,
      baths: 0,
      description: "",
      estimated_roi: null,
      rental_potential: null,
      featured: false,
      video_url: "",
      latitude: null,
      longitude: null,
      images: "",
      amenities: "",
    },
  });

  useEffect(() => {
    if (property) {
      reset({
        title: property.title,
        slug: property.slug,
        location: property.location,
        price: Number(property.price),
        price_type: property.price_type as "sale" | "rent" | "investment",
        property_type: property.property_type,
        area: Number(property.area),
        beds: property.beds || 0,
        baths: property.baths || 0,
        description: property.description || "",
        estimated_roi: property.estimated_roi ? Number(property.estimated_roi) : null,
        rental_potential: property.rental_potential ? Number(property.rental_potential) : null,
        featured: property.featured || false,
        video_url: property.video_url || "",
        latitude: property.latitude ? Number(property.latitude) : null,
        longitude: property.longitude ? Number(property.longitude) : null,
        images: property.images?.join(", ") || "",
        amenities: property.amenities?.join(", ") || "",
      });
    } else {
      reset({
        title: "",
        slug: "",
        location: "",
        price: 0,
        price_type: "sale",
        property_type: "casa",
        area: 0,
        beds: 0,
        baths: 0,
        description: "",
        estimated_roi: null,
        rental_potential: null,
        featured: false,
        video_url: "",
        latitude: null,
        longitude: null,
        images: "",
        amenities: "",
      });
    }
  }, [property, reset]);

  const mutation = useMutation({
    mutationFn: async (data: PropertyFormData) => {
      const propertyData = {
        title: data.title,
        slug: data.slug,
        location: data.location,
        price: data.price,
        price_type: data.price_type,
        property_type: data.property_type,
        area: data.area,
        beds: data.beds || 0,
        baths: data.baths || 0,
        description: data.description || null,
        estimated_roi: data.estimated_roi || null,
        rental_potential: data.rental_potential || null,
        featured: data.featured,
        video_url: data.video_url || null,
        latitude: data.latitude || null,
        longitude: data.longitude || null,
        images: data.images ? data.images.split(",").map((s) => s.trim()).filter(Boolean) : [],
        amenities: data.amenities ? data.amenities.split(",").map((s) => s.trim()).filter(Boolean) : [],
      };

      if (isEditing && property) {
        const { error } = await supabase
          .from("properties")
          .update(propertyData)
          .eq("id", property.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("properties")
          .insert(propertyData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-properties"] });
      toast({
        title: isEditing ? "Propiedad actualizada" : "Propiedad creada",
        description: isEditing
          ? "La propiedad se ha actualizado correctamente."
          : "La propiedad se ha creado correctamente.",
      });
      onOpenChange(false);
      reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Ha ocurrido un error.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PropertyFormData) => {
    mutation.mutate(data);
  };

  const generateSlug = () => {
    const title = watch("title");
    if (title) {
      const slug = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setValue("slug", slug);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Propiedad" : "Nueva Propiedad"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input id="title" {...register("title")} placeholder="Ej: Casa moderna en centro" />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL) *</Label>
              <div className="flex gap-2">
                <Input id="slug" {...register("slug")} placeholder="casa-moderna-centro" />
                <Button type="button" variant="outline" size="sm" onClick={generateSlug}>
                  Generar
                </Button>
              </div>
              {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Ubicación *</Label>
              <Input id="location" {...register("location")} placeholder="Ej: Encarnación, Paraguay" />
              {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="property_type">Tipo de Propiedad *</Label>
              <Select
                value={watch("property_type")}
                onValueChange={(value) => setValue("property_type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="departamento">Departamento</SelectItem>
                  <SelectItem value="terreno">Terreno</SelectItem>
                  <SelectItem value="local">Local Comercial</SelectItem>
                  <SelectItem value="oficina">Oficina</SelectItem>
                </SelectContent>
              </Select>
              {errors.property_type && <p className="text-sm text-destructive">{errors.property_type.message}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Precio (USD) *</Label>
              <Input id="price" type="number" {...register("price")} placeholder="150000" />
              {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price_type">Tipo de Operación *</Label>
              <Select
                value={watch("price_type")}
                onValueChange={(value) => setValue("price_type", value as "sale" | "rent" | "investment")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">Venta</SelectItem>
                  <SelectItem value="rent">Alquiler</SelectItem>
                  <SelectItem value="investment">Inversión</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Área (m²) *</Label>
              <Input id="area" type="number" {...register("area")} placeholder="120" />
              {errors.area && <p className="text-sm text-destructive">{errors.area.message}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="beds">Habitaciones</Label>
              <Input id="beds" type="number" {...register("beds")} placeholder="3" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="baths">Baños</Label>
              <Input id="baths" type="number" {...register("baths")} placeholder="2" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimated_roi">ROI Estimado (%)</Label>
              <Input id="estimated_roi" type="number" step="0.1" {...register("estimated_roi")} placeholder="8.5" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rental_potential">Renta Potencial (USD)</Label>
              <Input id="rental_potential" type="number" {...register("rental_potential")} placeholder="800" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe la propiedad..."
              rows={4}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="images">URLs de Imágenes (separadas por coma)</Label>
              <Textarea
                id="images"
                {...register("images")}
                placeholder="https://ejemplo.com/img1.jpg, https://ejemplo.com/img2.jpg"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amenities">Amenidades (separadas por coma)</Label>
              <Textarea
                id="amenities"
                {...register("amenities")}
                placeholder="Piscina, Jardín, Garaje, Seguridad 24h"
                rows={2}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="video_url">URL de Video</Label>
              <Input id="video_url" {...register("video_url")} placeholder="https://youtube.com/watch?v=..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="latitude">Latitud</Label>
              <Input id="latitude" type="number" step="any" {...register("latitude")} placeholder="-27.3364" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="longitude">Longitud</Label>
              <Input id="longitude" type="number" step="any" {...register("longitude")} placeholder="-55.8675" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={watch("featured")}
              onCheckedChange={(checked) => setValue("featured", checked)}
            />
            <Label htmlFor="featured">Propiedad destacada</Label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isEditing ? "Actualizar" : "Crear"} Propiedad
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
