import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdinkraSymbol from "@/components/AdinkraSymbols";
import { CheckCircle, BookOpen, Users, Target, ArrowRight, GraduationCap, FileText, Search } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";

const AcademicConsultancyPage = () => {
  const navigate = useNavigate();
  const services = [
    {
    title: "Thesis & Dissertation Support",
    description: "Expert guidance for undergraduate and graduate research projects",
    features: ["Topic Selection", "Literature Review", "Methodology Design", "Data Analysis"],
    icon: FileText,
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop" // Students researching
  },
 {
    title: "Research Methodology Training",
    description: "Comprehensive training on quantitative and qualitative research methods",
    features: ["SPSS Training", "Qualitative Analysis", "Survey Design", "Statistical Methods"],
    icon: Search,
    image: "https://images.unsplash.com/photo-1588618319407-948d4424befd?w=600&auto=format&fit=crop" // Research lab
  },
   {
    title: "Academic Writing Services",
    description: "Professional writing support for academic papers and publications",
    features: ["Paper Writing", "Editing & Proofreading", "Citation Management", "Publication Support"],
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&auto=format&fit=crop" // Writing desk
  },
      {
    title: "Educational Consulting",
    description: "Strategic guidance for educational institutions and programs",
    features: ["Curriculum Development", "Assessment Design", "Program Evaluation", "Accreditation Support"],
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop" // Teamwork
  }
  ];

  const specializations = [
    "Business Administration",
    "Public Administration", 
    "Development Studies",
    "Economics",
    "Social Sciences",
    "Management Studies",
    "Political Science",
    "International Relations"
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section 
  className="relative py-20 text-primary-foreground overflow-hidden bg-cover bg-center" 
  style={{ 
    backgroundImage: `url('https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop')` 
  }}
>
  {/* Dark overlay for readability */}
  <div className="absolute inset-0 bg-black/50"></div>

  <div className="absolute top-10 right-10 z-10">
    <AdinkraSymbol symbol="mate-masie" size="lg" className="text-accent" />
  </div>
  <div className="absolute bottom-10 left-10 z-10">
    <AdinkraSymbol symbol="sankofa" size="lg" className="text-accent" />
  </div>
  
  <div className="container mx-auto px-4 relative z-20">
    <div className="max-w-4xl mx-auto text-center animate-fade-in">
      <Badge className="mb-6 bg-accent/20 text-accent border-accent">Academic Consultancy</Badge>
      <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
        Academic Excellence 
        <span className="block text-gradient">& Research Support</span>
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
        Empowering students and institutions with expert academic consultancy, 
        research support, and educational excellence across the globe.
      </p>
      <Button size="lg" className="btn-secondary group" asChild>
        <Link to="/academic-consultancy/consultation">
          <GraduationCap className="mr-2 w-5 h-5" />
          Start Your Journey
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </div>
  </div>
</section>

      {/* Services Grid */}
<section className="py-20 section-gradient bg-green-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16 animate-fade-in">
      <h2 className="text-4xl font-heading font-bold mb-4">Our Academic Services</h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Comprehensive support for your academic and research endeavors
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {services.map((service, index) => (
        <Card
          key={service.title}
          className="relative overflow-hidden rounded-2xl shadow-lg animate-fade-in"
          style={{
            animationDelay: `${index * 0.1}s`,
            backgroundImage: `url(${service.image})`, // use Unsplash background
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Card content */}
          <div className="relative z-10">
            <div className="absolute top-4 right-4">
              <AdinkraSymbol symbol="nyame-dua" className="text-teal-accent" />
            </div>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-3 bg-gradient-to-br from-teal-accent to-emerald-accent rounded-lg">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white">{service.title}</CardTitle>
              </div>
              <CardDescription className="text-base leading-relaxed text-white/90">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-accent" />
                    <span className="text-sm text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  </div>
</section>


      {/* Specializations */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-heading font-bold mb-4">Our Areas of Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide specialized support across multiple academic disciplines
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {specializations.map((specialization, index) => (
              <div 
                key={specialization} 
                className="p-4 card-gradient rounded-lg text-center hover:shadow-lg transition-all duration-300 animate-fade-in relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-2 right-2">
                  <AdinkraSymbol symbol="adwo" size="sm" className="text-purple-accent" />
                </div>
                <h3 className="font-semibold text-lg">{specialization}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-heading font-bold mb-4">Our Academic Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A structured approach to academic excellence
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Assessment", description: "Evaluating your academic needs and goals" },
              { step: "02", title: "Planning", description: "Creating a customized research strategy" },
              { step: "03", title: "Support", description: "Providing ongoing guidance and mentorship" },
              { step: "04", title: "Success", description: "Achieving your academic objectives" }
            ].map((item, index) => (
              <div key={item.step} className="text-center animate-slide-in-right" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-accent to-emerald-accent rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto animate-pulse-glow">
                    {item.step}
                  </div>
                  <AdinkraSymbol symbol="dwennimmen" className="absolute -top-2 -right-2 text-accent" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl font-heading font-bold mb-6">Ready to Excel Academically?</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Let our expert consultants guide you toward academic success and research excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-secondary"
               onClick={() => navigate('/booking')}>
                Book Consultation
              </Button>
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

export default AcademicConsultancyPage;