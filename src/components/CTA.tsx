import { Button } from "@/components/ui/button";
import { MessageSquare, Phone } from "lucide-react";
import AdinkraSymbol from "@/components/AdinkraSymbols";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground relative overflow-hidden">
      {/* Adinkra Symbols Background */}
      <div className="absolute top-16 left-12 text-accent">
        <AdinkraSymbol symbol="gye-nyame" size="lg" className="w-20 h-20 text-accent/30" />
      </div>
      <div className="absolute top-32 right-16 text-secondary">
        <AdinkraSymbol symbol="sankofa" size="md" className="w-16 h-16 text-secondary/40" />
      </div>
      <div className="absolute bottom-16 left-8 text-accent-foreground">
        <AdinkraSymbol symbol="dwennimmen" size="md" className="w-14 h-14 text-accent-foreground/35" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Need Help with Your Business Plan or Thesis?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Get expert guidance from our experienced consultants. We're here to help 
            you succeed in your business or academic journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="btn-secondary group"
              onClick={() => window.location.href = '/booking'}
            >
              <Phone className="mr-2 w-5 h-5" />
              Schedule Consultation
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground hover:text-primary backdrop-blur-sm font-semibold"
              onClick={() => window.location.href = '/services'}
            >
              <MessageSquare className="mr-2 w-5 h-5" />
              View Our Services
            </Button>
          </div>

          {/* Contact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-primary-foreground/20 pt-8">
            <div className="text-center">
              <div className="text-3xl font-heading font-bold text-accent mb-2">24/7</div>
              <div className="text-primary-foreground/80">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-heading font-bold text-accent mb-2">Free</div>
              <div className="text-primary-foreground/80">Initial Consultation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-heading font-bold text-accent mb-2">48hrs</div>
              <div className="text-primary-foreground/80">Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;