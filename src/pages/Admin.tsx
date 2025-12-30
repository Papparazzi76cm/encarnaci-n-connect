import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { 
  LogOut, Home, Users, Building2, Mail, Phone, Calendar,
  Trash2, Loader2, AlertCircle
} from "lucide-react";

const Admin = () => {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/auth");
      } else if (!isAdmin) {
        toast({
          title: "Acceso denegado",
          description: "No tienes permisos de administrador.",
          variant: "destructive",
        });
        navigate("/");
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  // Fetch leads
  const { data: leads, isLoading: leadsLoading } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  // Fetch properties
  const { data: properties, isLoading: propertiesLoading } = useQuery({
    queryKey: ["admin-properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  // Delete lead mutation
  const deleteLeadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-leads"] });
      toast({ title: "Lead eliminado correctamente" });
    },
    onError: () => {
      toast({ title: "Error al eliminar el lead", variant: "destructive" });
    },
  });

  // Delete property mutation
  const deletePropertyMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("properties").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-properties"] });
      toast({ title: "Propiedad eliminada correctamente" });
    },
    onError: () => {
      toast({ title: "Error al eliminar la propiedad", variant: "destructive" });
    },
  });

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case "lead_magnet":
        return <Badge variant="secondary">Guía</Badge>;
      case "property":
        return <Badge className="bg-gold text-primary">Propiedad</Badge>;
      default:
        return <Badge variant="outline">Contacto</Badge>;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Acceso Denegado</h2>
            <p className="text-muted-foreground mb-4">
              No tienes permisos para acceder a esta página.
            </p>
            <Button onClick={() => navigate("/")}>Volver al inicio</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8" />
            <div>
              <h1 className="font-display text-xl font-bold">Panel de Administración</h1>
              <p className="text-sm opacity-80">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-primary-foreground hover:bg-primary-foreground/10">
              <Home className="w-4 h-4" />
              Ver sitio
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gold/10 rounded-lg">
                  <Users className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-3xl font-bold">{leads?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Propiedades</p>
                  <p className="text-3xl font-bold">{properties?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Leads Guía</p>
                  <p className="text-3xl font-bold">
                    {leads?.filter((l) => l.source === "lead_magnet").length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Leads Propiedades</p>
                  <p className="text-3xl font-bold">
                    {leads?.filter((l) => l.source === "property").length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList>
            <TabsTrigger value="leads" className="gap-2">
              <Users className="w-4 h-4" />
              Leads ({leads?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="properties" className="gap-2">
              <Building2 className="w-4 h-4" />
              Propiedades ({properties?.length || 0})
            </TabsTrigger>
          </TabsList>

          {/* Leads Tab */}
          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle>Leads Recibidos</CardTitle>
              </CardHeader>
              <CardContent>
                {leadsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : leads && leads.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Teléfono</TableHead>
                          <TableHead>Origen</TableHead>
                          <TableHead>Mensaje</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leads.map((lead) => (
                          <TableRow key={lead.id}>
                            <TableCell className="whitespace-nowrap">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                {formatDate(lead.created_at)}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{lead.name}</TableCell>
                            <TableCell>
                              <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                                {lead.email}
                              </a>
                            </TableCell>
                            <TableCell>
                              {lead.phone ? (
                                <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-primary hover:underline">
                                  <Phone className="w-3 h-3" />
                                  {lead.phone}
                                </a>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell>{getSourceBadge(lead.source)}</TableCell>
                            <TableCell className="max-w-[200px] truncate" title={lead.message || ""}>
                              {lead.message || "-"}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteLeadMutation.mutate(lead.id)}
                                disabled={deleteLeadMutation.isPending}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No hay leads todavía</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Propiedades</CardTitle>
              </CardHeader>
              <CardContent>
                {propertiesLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : properties && properties.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Título</TableHead>
                          <TableHead>Ubicación</TableHead>
                          <TableHead>Precio</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Destacada</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {properties.map((property) => (
                          <TableRow key={property.id}>
                            <TableCell className="font-medium">{property.title}</TableCell>
                            <TableCell>{property.location}</TableCell>
                            <TableCell>
                              ${Number(property.price).toLocaleString()}
                              {property.price_type === "rent" && "/mes"}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {property.price_type === "rent" ? "Alquiler" : 
                                 property.price_type === "sale" ? "Venta" : "Inversión"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {property.featured ? (
                                <Badge className="bg-gold text-primary">Sí</Badge>
                              ) : (
                                <span className="text-muted-foreground">No</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deletePropertyMutation.mutate(property.id)}
                                disabled={deletePropertyMutation.isPending}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No hay propiedades todavía</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
