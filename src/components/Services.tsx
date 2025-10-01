import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, Package, User, ArrowRight } from "lucide-react";
import AdinkraSymbol from "@/components/AdinkraSymbols";

const Services = () => {
  const services = [
    {
      icon: Briefcase,
      title: "Business Development & Consultancy",
      description: "Strategic guidance to transform your business vision into reality with comprehensive planning and execution support.",
      features: [
        "Startups and Operation",
        "Marketing", 
        "Workplace and Culture",
        "Sales and Services",
        "Financial",
        "Legal and Compliance",
        "People and Talent"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    },
    {
      icon: GraduationCap,
      title: "Academic Consultancy & Support",
      description: "Comprehensive academic support services for students and institutions to achieve educational excellence.",
      features: [
        "Thesis & Dissertation Support",
        "Research Methodology Guidance",
        "Academic Writing Assistance",
        "Statistical Analysis Support",
        "Institutional Curriculum Development",
        "Academic Project Management"
      ],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    },
    {
      icon: User,
      title: "Personal Development & Wellness",
      description: "Comprehensive personal growth services to help you unlock your potential and achieve your life goals.",
      features: [
        "Life Coaching & Mentorship",
        "Wellness & Mental Health",
        "Skills Development",
        "Career & Professional Growth",
        "Goal Setting & Achievement",
        "Mindfulness & Meditation"
      ],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978"
    },
    {
      icon: Package,
      title: "General Merchandise Supplies",
      description: "PPA-compliant procurement services ensuring quality supplies for institutions and organizations.",
      features: [
        "Public Procurement Compliance",
        "Office Supplies & Equipment",
        "Educational Materials",
        "IT Equipment & Solutions",
        "Facility Management Supplies",
        "Custom Procurement Solutions"
      ],
      image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?q=80&w=2070&auto=format&fit=crop" 
    }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Adinkra Symbols Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-accent animate-pulse">
          <AdinkraSymbol symbol="gye-nyame" size="lg" className="w-24 h-24 text-accent/50" />
        </div>
        <div className="absolute top-40 right-20 text-secondary animate-float">
          <AdinkraSymbol symbol="sankofa" size="lg" className="w-20 h-20 text-secondary/60" />
        </div>
        <div className="absolute top-1/2 left-6 text-primary animate-pulse" style={{ animationDelay: '1.5s' }}>
          <AdinkraSymbol symbol="dwennimmen" size="md" className="w-16 h-16 text-primary/40" />
        </div>
        <div className="absolute bottom-32 left-20 text-accent-foreground animate-pulse" style={{ animationDelay: '2s' }}>
          <AdinkraSymbol symbol="adwo" size="lg" className="w-22 h-22 text-accent-foreground/45" />
        </div>
        <div className="absolute bottom-20 right-10 text-secondary animate-float" style={{ animationDelay: '1s' }}>
          <AdinkraSymbol symbol="nyame-dua" size="md" className="w-18 h-18 text-secondary/55" />
        </div>
        <div className="absolute top-1/4 right-8 text-primary animate-pulse" style={{ animationDelay: '3s' }}>
          <AdinkraSymbol symbol="mate-masie" size="sm" className="w-12 h-12 text-primary/35" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Our Divisions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions across four key areas to support your growth, 
              learning, personal development, and operational needs.
            </p>
          </div>

          {/* Services Grid */}
          <div className="space-y-16">
            {services.map((service, index) => (
              <div 
                key={service.title} 
                className={`grid lg:grid-cols-2 gap-12 items-center animate-fade-in ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <Card className="card-hover border-0 bg-card/50 h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center">
                          <service.icon className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-heading text-primary">
                            {service.title}
                          </CardTitle>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mb-6">
                        <h4 className="text-lg font-semibold text-foreground">Key Services:</h4>
                        <ul className="grid grid-cols-1 gap-3">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-accent rounded-full"></div>
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button 
                        className="btn-primary group"
                        onClick={() => {
                          const serviceRoutes = {
                            'Business Development & Consultancy': '/business-development',
                            'Academic Consultancy & Support': '/academic-consultancy', 
                            'General Merchandise Supplies': '/general-merchandise',
                            'Personal Development & Wellness': '/personal-development'
                          };
                          window.location.href = serviceRoutes[service.title as keyof typeof serviceRoutes] || '/services';
                        }}
                      >
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="relative animate-slide-in-right" style={{ animationDelay: `${index * 0.2 + 0.1}s` }}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="rounded-2xl shadow-2xl w-full object-cover h-96"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Us Section */}
          <div className="mt-20 text-center animate-fade-in">
            <h3 className="text-3xl font-heading font-semibold text-primary mb-12">
              Why Choose OMEJ Pollux?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "PPA Compliant",
                  description: "Full compliance with Public Procurement Authority regulations"
                },
                {
                  title: "Ethics-Driven",
                  description: "Transparent, honest, and ethical approach to all services"
                },
                {
                  title: "Affordable",
                  description: "Cost-effective solutions without compromising on quality"
                },
                {
                  title: "Scalable",
                  description: "Solutions that grow with your needs and objectives"
                }
              ].map((reason, index) => (
                <Card key={reason.title} className="card-hover border-0 bg-secondary/30" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6 text-center">
                    <h4 className="text-xl font-heading font-semibold text-primary mb-3">
                      {reason.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;