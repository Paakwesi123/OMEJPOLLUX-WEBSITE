import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import AdinkraSymbol from "@/components/AdinkraSymbols";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary/90 text-primary-foreground overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern"></div>
      
      {/* Floating Elements & Adinkra Symbols */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-accent/20 rounded-full animate-float"></div>
      <div className="absolute bottom-32 left-16 w-16 h-16 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      
      {/* Adinkra Symbols */}
      <div className="absolute top-32 left-20 text-accent animate-pulse">
        <AdinkraSymbol symbol="gye-nyame" size="lg" className="w-16 h-16 text-accent/40" />
      </div>
      <div className="absolute bottom-40 right-32 text-secondary animate-float" style={{ animationDelay: '2s' }}>
        <AdinkraSymbol symbol="sankofa" size="md" className="w-12 h-12 text-secondary/50" />
      </div>
      <div className="absolute top-1/2 left-10 text-accent-foreground animate-pulse" style={{ animationDelay: '1.5s' }}>
        <AdinkraSymbol symbol="dwennimmen" size="lg" className="w-14 h-14 text-accent-foreground/40" />
      </div>
      <div className="absolute top-1/4 right-16 text-primary animate-float" style={{ animationDelay: '3s' }}>
        <AdinkraSymbol symbol="nyame-dua" size="md" className="w-10 h-10 text-primary/30" />
      </div>
      <div className="absolute bottom-1/4 left-32 text-secondary animate-pulse" style={{ animationDelay: '2.5s' }}>
        <AdinkraSymbol symbol="mate-masie" size="sm" className="w-8 h-8 text-secondary/40" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Hero Content */}
          <div className="animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight text-primary-foreground">
  Shaping The Future Through <br />
  <span className="text-accent drop-shadow-lg">Excellence & Innovation</span>
</h1>


            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Practical, Ethical, and Timely Solutions for Ghana's Entrepreneurs, 
              Institutions, and Students
            </p>

            {/* Key Benefits */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {[
                "PPA Compliant Services",
                "Ethics-Driven Approach", 
                "Affordable Solutions",
                "Scalable Results"
              ].map((benefit, index) => (
                <div key={benefit} className="flex items-center space-x-2 text-primary-foreground/90" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="btn-secondary group" onClick={() => window.location.href = '/services'}>
                Explore Our Services
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground hover:text-primary backdrop-blur-sm font-semibold"
                onClick={() => window.location.href = '/booking'}
              >
                Book Free Consultation
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-in-right">
            {[
              { number: "100+", label: "Projects Completed" },
              { number: "50+", label: "Happy Clients" },
              { number: "4", label: "Core Services" }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-4xl font-heading font-bold text-accent mb-2">{stat.number}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;