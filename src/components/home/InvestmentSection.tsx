import ROICalculator from "@/components/ROICalculator";

const InvestmentSection = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            Herramientas para Inversores
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Calcula tu inversión
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Utiliza nuestra calculadora para estimar la rentabilidad de tu inversión inmobiliaria en Encarnación
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <ROICalculator />
        </div>
      </div>
    </section>
  );
};

export default InvestmentSection;
