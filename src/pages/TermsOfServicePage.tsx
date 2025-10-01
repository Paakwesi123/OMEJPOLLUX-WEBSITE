import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdinkraSymbol from "@/components/AdinkraSymbols";
import { FileText, Scale, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="relative py-16 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground overflow-hidden">
        <div className="absolute top-10 right-10">
          <AdinkraSymbol symbol="mate-masie" size="lg" className="text-accent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Scale className="w-16 h-16 text-accent mb-6 mx-auto" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-primary-foreground/90">
              Legal terms and conditions for using our services
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 section-gradient">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <Card className="card-gradient mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-accent" />
                <span>Service Agreement</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                By engaging OMEJ Pollux services, you agree to these terms and conditions. 
                We provide business development, academic consultancy, and procurement services 
                in compliance with Ghana's regulatory framework.
              </p>
            </CardContent>
          </Card>

          <Card className="card-gradient mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-teal-accent" />
                <span>Liability & Warranties</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our services are provided with professional care and expertise. We maintain 
                professional liability insurance and guarantee compliance with applicable 
                Ghanaian laws and regulations.
              </p>
            </CardContent>
          </Card>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfServicePage;