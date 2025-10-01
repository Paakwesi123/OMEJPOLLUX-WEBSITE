import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdinkraSymbol from "@/components/AdinkraSymbols";
import { Cookie, Settings, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="relative py-16 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground overflow-hidden">
        <div className="absolute top-10 right-10">
          <AdinkraSymbol symbol="sankofa" size="lg" className="text-accent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Cookie className="w-16 h-16 text-accent mb-6 mx-auto" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Cookie Policy</h1>
            <p className="text-xl text-primary-foreground/90">
              How we use cookies to improve your experience
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 section-gradient">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <Card className="card-gradient mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Settings className="w-6 h-6 text-accent" />
                <span>What Are Cookies</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Cookies are small text files stored on your device when you visit our website. 
                They help us provide a better user experience and analyze website performance.
              </p>
            </CardContent>
          </Card>

          <Card className="card-gradient animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Eye className="w-6 h-6 text-teal-accent" />
                <span>How We Use Cookies</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We use essential cookies for website functionality and analytics cookies 
                to understand how visitors use our site. You can control cookie preferences 
                through your browser settings.
              </p>
            </CardContent>
          </Card>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CookiePolicyPage;