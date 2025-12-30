import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, DollarSign, Percent, Home } from "lucide-react";

const propertyTypes = [
  { value: "house", label: "Casa", avgRoi: 8.5, avgAppreciation: 12 },
  { value: "apartment", label: "Departamento", avgRoi: 7.2, avgAppreciation: 10 },
  { value: "land", label: "Terreno", avgRoi: 15, avgAppreciation: 18 },
  { value: "commercial", label: "Local Comercial", avgRoi: 10, avgAppreciation: 8 },
];

const ROICalculator = () => {
  const [propertyType, setPropertyType] = useState("house");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [holdingYears, setHoldingYears] = useState("5");
  const [results, setResults] = useState<{
    annualRoi: number;
    totalRentalIncome: number;
    appreciatedValue: number;
    totalReturn: number;
    totalReturnPercent: number;
  } | null>(null);

  const calculateROI = () => {
    const price = parseFloat(purchasePrice) || 0;
    const rent = parseFloat(monthlyRent) || 0;
    const years = parseInt(holdingYears) || 5;
    const selectedType = propertyTypes.find(t => t.value === propertyType);
    
    if (price <= 0) return;

    const annualRent = rent * 12;
    const annualRoi = price > 0 ? (annualRent / price) * 100 : 0;
    const totalRentalIncome = annualRent * years;
    
    // Calculate appreciation based on property type
    const appreciationRate = selectedType?.avgAppreciation || 10;
    const appreciatedValue = price * Math.pow(1 + appreciationRate / 100, years);
    const appreciationGain = appreciatedValue - price;
    
    const totalReturn = totalRentalIncome + appreciationGain;
    const totalReturnPercent = (totalReturn / price) * 100;

    setResults({
      annualRoi,
      totalRentalIncome,
      appreciatedValue,
      totalReturn,
      totalReturnPercent,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const selectedTypeData = propertyTypes.find(t => t.value === propertyType);

  return (
    <Card className="border-gold/20 bg-gradient-to-br from-card to-card/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 font-display text-2xl">
          <div className="p-2 bg-gold/10 rounded-lg">
            <Calculator className="w-6 h-6 text-gold" />
          </div>
          Calculadora de Rentabilidad
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Estima el retorno de tu inversión inmobiliaria en Encarnación
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="propertyType" className="flex items-center gap-2">
              <Home className="w-4 h-4 text-gold" />
              Tipo de Propiedad
            </Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tipo" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedTypeData && (
              <p className="text-xs text-muted-foreground">
                ROI promedio: {selectedTypeData.avgRoi}% | Apreciación anual: {selectedTypeData.avgAppreciation}%
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="purchasePrice" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gold" />
              Precio de Compra (USD)
            </Label>
            <Input
              id="purchasePrice"
              type="number"
              placeholder="Ej: 150000"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="border-border/50 focus:border-gold"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyRent" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gold" />
              Alquiler Mensual Estimado (USD)
            </Label>
            <Input
              id="monthlyRent"
              type="number"
              placeholder="Ej: 800"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(e.target.value)}
              className="border-border/50 focus:border-gold"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="holdingYears" className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-gold" />
              Años de Inversión
            </Label>
            <Select value={holdingYears} onValueChange={setHoldingYears}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 5, 7, 10].map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year} {year === 1 ? 'año' : 'años'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={calculateROI} variant="gold" className="w-full" size="lg">
          <Calculator className="w-5 h-5" />
          Calcular Rentabilidad
        </Button>

        {results && (
          <div className="mt-6 p-6 bg-primary/5 rounded-xl border border-gold/20 space-y-4 animate-fade-in">
            <h4 className="font-display font-bold text-lg text-foreground">
              Resultados de tu Inversión
            </h4>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-1">ROI Anual por Alquiler</p>
                <p className="text-2xl font-bold text-gold">{results.annualRoi.toFixed(2)}%</p>
              </div>
              
              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-1">Ingresos por Alquiler ({holdingYears} años)</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(results.totalRentalIncome)}</p>
              </div>
              
              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-1">Valor Apreciado ({holdingYears} años)</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(results.appreciatedValue)}</p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-gold/20 to-gold/5 rounded-lg border border-gold/30">
                <p className="text-sm text-muted-foreground mb-1">Retorno Total Estimado</p>
                <p className="text-2xl font-bold text-gold">{formatCurrency(results.totalReturn)}</p>
                <p className="text-sm text-gold/80">+{results.totalReturnPercent.toFixed(1)}%</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground italic">
              * Estos cálculos son estimaciones basadas en promedios del mercado de Encarnación. 
              Los resultados reales pueden variar. Contáctame para un análisis personalizado.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ROICalculator;
