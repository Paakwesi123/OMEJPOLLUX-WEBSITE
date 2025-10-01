import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from 'react';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  Package,
  ArrowRight,
  CheckCircle,
  Star,
  Target,
  TrendingUp,
  Lightbulb
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ServicesPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

   const slideImages = [
    {
      url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1926&auto=format&fit=crop", // Business Development
      alt: "Business Development"
    },
    {
      url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop", // Academic Consultancy
      alt: "Academic Consultancy"
    },
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop", // Personal Development
      alt: "Personal Development"
    },
    {
      url: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?q=80&w=2070&auto=format&fit=crop", // General Merchandise
      alt: "General Merchandise"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [slideImages.length]);


  const services = [
    {
      id: 1,
      title: "Business Development",
      icon: Building2,
      description: "Strategic consulting to accelerate business growth and market expansion",
      shortDesc: "Transform your business potential into sustainable growth with our proven strategies.",
      features: [
        "Market Analysis & Strategy",
        "Financial Planning & Modeling",
        "Operations Optimization",
        "Digital Transformation",
        "Partnership Development"
      ],
      color: "from-blue-600 to-blue-800",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      path: "/business-development"
    },
    {
      id: 2,
      title: "Academic Consultancy",
      icon: GraduationCap,
      description: "Comprehensive academic guidance for students and educational institutions",
      shortDesc: "Unlock academic excellence with personalized guidance and institutional support.",
      features: [
        "Student Admission Guidance",
        "Curriculum Development",
        "Research Support",
        "Educational Technology",
        "Institutional Consulting"
      ],
      color: "from-emerald-600 to-emerald-800",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      iconColor: "text-emerald-600",
      path: "/academic-consultancy"
    },
    {
      id: 3,
      title: "Personal Development",
      icon: Users,
      description: "Comprehensive personal growth and professional development programs",
      shortDesc: "Elevate your personal and professional potential through tailored development programs.",
      features: [
        "Career Coaching",
        "Leadership Development",
        "Skills Assessment",
        "Wellness Programs",
        "Life Coaching"
      ],
      color: "from-purple-600 to-purple-800",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
      path: "/personal-development"
    },
    {
      id: 4,
      title: "General Merchandise",
      icon: Package,
      description: "Quality products and supplies for businesses and individuals",
      shortDesc: "Discover premium merchandise solutions tailored to your specific needs.",
      features: [
        "Office Supplies",
        "Educational Materials",
        "Technology Products",
        "Custom Solutions",
        "Bulk Procurement"
      ],
      color: "from-orange-600 to-orange-800",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      iconColor: "text-orange-600",
      path: "/general-merchandise"
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed", icon: Target },
    { number: "98%", label: "Client Satisfaction", icon: Star },
    { number: "5+", label: "Years Experience", icon: TrendingUp },
    { number: "50+", label: "Expert Consultants", icon: Lightbulb }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
   {/* Hero Section with Slideshow */}
<section className="pt-24 pb-20 relative overflow-hidden min-h-[70vh]">
  {/* Slideshow Background */}
  <div className="absolute inset-0">
    {slideImages.map((image, index) => (
      <div
        key={index}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          index === currentSlide ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          src={image.url}
          alt={image.alt}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
    
    {/* Gradient Overlay for better text readability */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-accent/70"></div>
    
    {/* Grid Pattern Overlay */}
    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
  </div>

  {/* Content */}
  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      <Badge className="mb-6 px-6 py-2 bg-white/20 text-white border-white/30 backdrop-blur-sm">
        Our Services
      </Badge>
      <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 animate-fade-in drop-shadow-lg">
        Comprehensive Solutions for <br />
        <span className="block text-white mt-2">Your Success</span>
      </h1>
      <p className="text-xl text-white/90 mb-8 leading-relaxed animate-fade-in animation-delay-200 drop-shadow-md">
        From business development to personal growth, we provide expert consulting 
        and quality solutions tailored to your unique needs.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
        <Button 
          size="lg" 
          className="bg-white text-primary hover:bg-white/90 shadow-lg"
          onClick={() => navigate('/booking')}
        >
          Get Free Consultation
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  </div>

  {/* Slide Indicators */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
    {slideImages.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          index === currentSlide
            ? 'bg-white shadow-lg scale-125' 
            : 'bg-white/50 hover:bg-white/70'
        }`}
      />
    ))}
  </div>
</section>

      {/* Services Grid */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                Our Service Divisions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Four specialized service areas designed to address every aspect of your 
                growth journey with precision and expertise.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-20">
              {services.map((service, index) => (
                <Card 
                  key={service.id} 
                  className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${service.borderColor} overflow-hidden animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                  
                  <CardHeader className={`${service.bgColor} relative`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-primary group-hover:text-accent transition-colors">
                            {service.title}
                          </CardTitle>
                          <p className="text-muted-foreground text-sm mt-1">
                            {service.shortDesc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-primary">Key Services:</h4>
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className={`w-4 h-4 ${service.iconColor} flex-shrink-0`} />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                      {service.features.length > 3 && (
                        <div className="text-sm text-muted-foreground ml-7">
                          +{service.features.length - 3} more services
                        </div>
                      )}
                    </div>

                    <Button 
                      className={`w-full bg-gradient-to-r ${service.color} text-white hover:shadow-lg transform transition-all duration-300 group-hover:scale-105`}
                      onClick={() => navigate(service.path)}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats Section */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <Card 
                  key={stat.label} 
                  className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              Why Choose OMEJ Pollux?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">Expert Team</h3>
                <p className="text-muted-foreground">
                  Seasoned professionals with deep industry knowledge and proven track records.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">Tailored Solutions</h3>
                <p className="text-muted-foreground">
                  Customized strategies and solutions designed specifically for your unique needs.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">Proven Results</h3>
                <p className="text-muted-foreground">
                  Consistent delivery of measurable outcomes that drive real growth and success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how our comprehensive services can help you achieve your goals 
            and unlock new opportunities for growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-primary"
              onClick={() => navigate('/booking')}
            >
              <Target className="w-5 h-5 mr-2" />
              Schedule Free Consultation
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-primary"
              onClick={() => navigate('/contact')}
            >
              Contact Our Team
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;