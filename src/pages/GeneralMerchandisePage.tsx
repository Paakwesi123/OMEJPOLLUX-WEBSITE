import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdinkraSymbol from "@/components/AdinkraSymbols";
import { CheckCircle, Package, Truck, Shield, ArrowRight, Building, FileCheck, Clock } from "lucide-react";
import generalMerchandiseImage from "@/assets/general-merchandise.jpg";
import { Link, useNavigate } from "react-router-dom";
import ContactForm from "@/components/forms/ContactForm";
import AdsRotator from "@/components/AdsRotator";

const GeneralMerchandisePage = () => {
  const navigate = useNavigate();
  const services = [
    {
      title: "Office Supplies & Equipment",
      description: "Complete range of office supplies, furniture, and technology equipment",
      features: ["Stationery & Supplies", "Office Furniture", "IT Equipment", "Communication Tools"],
      icon: Building
    },
    {
      title: "PPA Compliant Procurement", 
      description: "Fully compliant procurement services following Ghana's Public Procurement Act",
      features: ["Legal Compliance", "Documentation", "Tender Management", "Quality Assurance"],
      icon: FileCheck
    },
    {
      title: "Logistics & Delivery",
      description: "Reliable supply chain management and timely delivery services",
      features: ["Inventory Management", "Warehousing", "Distribution", "Tracking Systems"],
      icon: Truck
    },
    {
      title: "Maintenance & Support",
      description: "Ongoing support and maintenance for all supplied equipment",
      features: ["Technical Support", "Maintenance Plans", "Replacement Parts", "Training Services"],
      icon: Shield
    }
  ];

  const categories = [
    "Office Furniture & Fixtures",
    "Information Technology Equipment", 
    "Stationery & Office Supplies",
    "Medical & Health Equipment",
    "Educational Materials",
    "Security Systems",
    "Cleaning & Sanitation Supplies",
    "Construction Materials"
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="py-10 bg-background">
  <div className="container mx-auto px-4">
    <AdsRotator />
  </div>
</section>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 section-gradient opacity-20"></div>
        <div className="absolute top-10 right-10">
          <AdinkraSymbol symbol="adwo" size="lg" className="text-accent" />
        </div>
        <div className="absolute bottom-10 left-10">
          <AdinkraSymbol symbol="gye-nyame" size="lg" className="text-accent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-accent/20 text-accent border-accent">General Merchandise</Badge>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
          
              <span className="block text-gradient">PPA Compliance Guaranteed</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
             We ensure full compliance with procurement regulations and uphold international best practices in all transactions.
            </p>
            <Button size="lg" className="btn-secondary group" asChild>
              <Link to="/catalogue">
                <Package className="mr-2 w-5 h-5" />
                View Our Catalog
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Image Section */}
      

      {/* Services Grid */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-heading font-bold mb-4">Our Procurement Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete procurement solutions designed for efficiency and compliance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={service.title} className="card-gradient card-hover animate-fade-in relative overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="absolute top-4 right-4">
                  <AdinkraSymbol symbol="dwennimmen" className="text-orange-accent" />
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-3 bg-gradient-to-br from-orange-accent to-accent rounded-lg">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-accent" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-heading font-bold mb-4">Product Categories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Extensive range of products to meet all your organizational needs
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card 
                key={category} 
                className="card-gradient card-hover text-center animate-fade-in relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-2 right-2">
                  <AdinkraSymbol symbol="sankofa" size="sm" className="text-purple-accent" />
                </div>
                <CardContent className="p-6">
                  <Package className="w-8 h-8 text-accent mb-3 mx-auto" />
                  <h3 className="font-semibold text-lg">{category}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PPA Compliance Section */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mb-8">
              <AdinkraSymbol symbol="mate-masie" size="lg" className="text-accent mx-auto mb-4" />
              <h2 className="text-4xl font-heading font-bold mb-4">PPA Compliance Guarantee</h2>
              <p className="text-xl text-muted-foreground">
                We ensure full compliance with Ghana's Public Procurement Act for all transactions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: FileCheck,
                  title: "Legal Compliance",
                  description: "All procedures follow PPA guidelines and regulations"
                },
                {
                  icon: Clock,
                  title: "Timely Processing",
                  description: "Efficient procurement process with quick turnaround times"
                },
                {
                  icon: Shield,
                  title: "Quality Assurance",
                  description: "Rigorous quality control and vendor verification"
                }
              ].map((item, index) => (
                <div key={item.title} className="animate-slide-in-right" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="p-6 card-gradient rounded-lg">
                    <item.icon className="w-12 h-12 text-accent mb-4 mx-auto" />
                    <h3 className="text-xl font-heading font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl font-heading font-bold mb-6">Ready to Streamline Your Procurement?</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Partner with us for reliable, compliant, and efficient procurement solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContactForm
                trigger={
                  <Button size="lg" className="btn-secondary"
                   onClick={() => navigate('/contact')}>
                    Contact Us
                  </Button>
                }
              />
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={() => window.open('https://wa.me/233596316230', '_blank')}
              >
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GeneralMerchandisePage;