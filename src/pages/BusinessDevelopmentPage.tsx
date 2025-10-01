import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, Users, TrendingUp, Target, Lightbulb, BarChart3, Shield, 
  Handshake, ArrowRight, CheckCircle, Phone, Mail, Calendar, Star,
  Building, Megaphone, Heart, DollarSign, Scale, UserPlus
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BusinessDevelopmentPage = () => {
  const serviceCategories = [
    {
      title: "Startups & Operations",
      tagline: "Streamline, scale, and stabilize your business systems",
      icon: Lightbulb,
      services: [
        "Startups and Operation",
        "Marketing", 
        "Workplace and Culture",
        "Sales and Services",
        "Financial",
        "Legal and Compliance",
        "People and Talent"
      ],
      color: "bg-gradient-to-br from-blue-500/10 to-blue-600/20",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    },
    {
      title: "Marketing Services", 
      tagline: "Amplify your visibility and customer connection",
      icon: Megaphone,
      services: [
        "Strategic Brand Promotion",
        "Social Media Management",
        "Graphic Design & Video Editing", 
        "Investor Pitch Development",
        "Brand Blueprint Development",
        "Web Development",
        "Case Study Development",
        "Email & SMS Marketing",
        "Market Analysis",
        "Grassroots Strategy",
        "Customer Feedback System",
        "Collaborative Marketing Strategy",
        "Conference Support"
      ],
      color: "bg-gradient-to-br from-green-500/10 to-green-600/20",
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b"
    },
    {
      title: "Workplace & Culture",
      tagline: "Build a unified, productive, and future-ready workplace", 
      icon: Heart,
      services: [
        "Culture Strategy Development",
        "Workplace Enhancement Strategy",
        "Employee Empowerment Strategy", 
        "Intergenerational Workforce Strategy"
      ],
      color: "bg-gradient-to-br from-purple-500/10 to-purple-600/20",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
    },
    {
      title: "Sales & Services",
      tagline: "Turn relationships into revenue, consistently",
      icon: Target,
      services: [
        "Sales Strategy Development",
        "Sales & CRM System Setup",
        "Referral Growth Strategy",
        "Strategic Partnership Growth"
      ],
      color: "bg-gradient-to-br from-orange-500/10 to-orange-600/20",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
    },
    {
      title: "Financial Consulting", 
      tagline: "Empowering financial clarity and confident growth",
      icon: DollarSign,
      services: [
        "Financial Modeling",
        "Business Cost Analysis",
        "Funding Support", 
        "Break-even Analysis",
        "Actionable Reporting & Insights"
      ],
      color: "bg-gradient-to-br from-emerald-500/10 to-emerald-600/20",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
    },
    {
      title: "Legal & Compliance",
      tagline: "Stay compliant. Build trust. Stay protected.",
      icon: Scale,
      services: [
        "Regulatory Compliance Strategy",
        "SOP & Policy Framework Development",
        "Cybersecurity Awareness Training",
        "Business Resilience Planning", 
        "Tabletop & Incident Response Planning",
        "Intellectual Property Protection"
      ],
      color: "bg-gradient-to-br from-red-500/10 to-red-600/20",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f"
    },
    {
      title: "People & Talent",
      tagline: "Find, grow, and retain the right people",
      icon: UserPlus,
      services: [
        "Strategic Workforce Planning",
        "Talent Acquisition & Staffing",
        "Onboarding Strategy",
        "Talent Development & Succession Planning",
        "Conflict Resolution",
        "Compensation & Benefits",
        "Training Video Content"
      ],
      color: "bg-gradient-to-br from-indigo-500/10 to-indigo-600/20",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
    }
  ];

  const benefits = [
    "PPA Compliant Services",
    "Local Market Expertise", 
    "Affordable Pricing",
    "Timely Delivery",
    "Ongoing Support",
    "Proven Track Record"
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />
      
      {/* Adinkra Symbols Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 text-9xl text-accent/5 animate-pulse">⚜</div>
        <div className="absolute top-60 right-20 text-7xl text-secondary/10 animate-float">◊</div>
        <div className="absolute bottom-40 left-20 text-8xl text-accent/8 animate-pulse" style={{ animationDelay: '2s' }}>☯</div>
        <div className="absolute bottom-20 right-10 text-6xl text-secondary/15 animate-float" style={{ animationDelay: '1s' }}>✦</div>
        <div className="absolute top-1/2 left-1/4 text-5xl text-accent/12 animate-pulse" style={{ animationDelay: '3s' }}>◈</div>
        <div className="absolute top-1/3 right-1/4 text-6xl text-secondary/20 animate-float" style={{ animationDelay: '4s' }}>❋</div>
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-accent/20 text-accent border-accent text-lg px-6 py-2">
              <Briefcase className="mr-2 w-5 h-5" />
              Business Development & Consultancy
            </Badge>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
              From Ideas to 
              <span className="block text-accent drop-shadow-lg">Impact</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Helping SMEs, NGOs, and startups scale with clarity through comprehensive 
              business development and strategic consultancy services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-secondary group"
                onClick={() => window.location.href = '/booking'}
              >
                <Calendar className="mr-2 w-5 h-5" />
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary-foreground bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground hover:text-primary backdrop-blur-sm font-semibold"
                onClick={() => window.open('https://wa.me/233243156093', '_blank')}
              >
                <Phone className="mr-2 w-5 h-5" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      <section className="py-20 bg-background relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Our Service Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive business development solutions across seven key areas 
              to support your complete organizational transformation.
            </p>
          </div>

          <div className="space-y-16">
            {serviceCategories.map((category, index) => (
              <div 
                key={category.title}
                className={`grid lg:grid-cols-2 gap-12 items-center animate-fade-in ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <Card className={`card-hover border-0 ${category.color} backdrop-blur-sm h-full`}>
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center">
                          <category.icon className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-heading text-primary">
                            {category.title}
                          </CardTitle>
                          <p className="text-accent font-medium italic">{category.tagline}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mb-6">
                        <h4 className="text-lg font-semibold text-foreground">Services Include:</h4>
                        <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                          {category.services.map((service) => (
                            <div key={service} className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{service}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button 
                        className="btn-primary group w-full"
                        onClick={() => window.location.href = '/booking'}
                      >
                        Get Started with {category.title}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="relative animate-slide-in-right" style={{ animationDelay: `${index * 0.2 + 0.1}s` }}>
                    <img
                      src={category.image}
                      alt={category.title}
                      className="rounded-2xl shadow-2xl w-full object-cover h-96"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-2xl"></div>
                    {/* Adinkra symbol overlay */}
                    <div className="absolute top-4 right-4 text-4xl text-accent/70 animate-pulse">⚜</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/30 via-background to-secondary/20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">Our Proven Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A systematic approach that ensures your business transformation success
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                step: "01", 
                title: "Discovery", 
                description: "Deep understanding of your vision, challenges, and market position",
                icon: Target
              },
              { 
                step: "02", 
                title: "Strategy", 
                description: "Developing customized solutions and actionable roadmaps",
                icon: Lightbulb
              },
              { 
                step: "03", 
                title: "Implementation", 
                description: "Executing with precision, monitoring progress, and adapting",
                icon: Building
              },
              { 
                step: "04", 
                title: "Growth", 
                description: "Ongoing optimization, support, and scaling for sustained success",
                icon: TrendingUp
              }
            ].map((item, index) => (
              <Card key={item.step} className="text-center card-hover border-0 bg-card/50 animate-slide-in-right" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-6">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-heading font-bold text-primary mb-4">Why Choose OMEJ Pollux?</h2>
              <p className="text-xl text-muted-foreground">
                Experience the difference of working with Ghana's trusted business development experts
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={benefit} className="card-hover border-0 bg-gradient-to-br from-accent/5 to-accent/10 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-accent" />
                    </div>
                    <span className="font-semibold text-foreground">{benefit}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl font-heading font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 text-primary-foreground/90 leading-relaxed">
              Let's discuss how we can help accelerate your business growth with our proven strategies 
              and comprehensive service offerings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-secondary group"
                onClick={() => window.location.href = '/booking'}
              >
                <Calendar className="mr-2 w-5 h-5" />
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground hover:text-primary backdrop-blur-sm font-semibold"
                onClick={() => window.open('https://wa.me/233243156093', '_blank')}
              >
                <Phone className="mr-2 w-5 h-5" />
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

export default BusinessDevelopmentPage;