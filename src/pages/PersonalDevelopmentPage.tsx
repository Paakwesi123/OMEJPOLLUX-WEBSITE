import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Brain, 
  Target, 
  Heart, 
  Star, 
  Clock, 
  Users, 
  Award,
  CheckCircle,
  ArrowRight,
  MessageCircle
} from "lucide-react";
import AdinkraSymbol from "@/components/AdinkraSymbols";
import { useNavigate } from "react-router-dom";

const PersonalDevelopmentPage = () => {
  const navigate = useNavigate();
  const serviceCategories = [
    {
      title: "Life Coaching & Mentorship",
      tagline: "Unlock Your Full Potential",
      icon: Target,
      services: [
        "Goal Setting & Achievement",
        "Life Planning & Strategy",
        "Personal Accountability",
        "Mindset Transformation",
        "Confidence Building",
        "Decision Making Skills"
      ],
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-100",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978"
    },
    {
      title: "Wellness & Mental Health",
      tagline: "Nurture Your Mind & Body",
      icon: Heart,
      services: [
        "Stress Management",
        "Work-Life Balance",
        "Emotional Intelligence",
        "Mindfulness & Meditation",
        "Mental Health Support",
        "Burnout Prevention"
      ],
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-100",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773"
    },
    {
      title: "Skills Development",
      tagline: "Continuous Learning & Growth",
      icon: Brain,
      services: [
        "Communication Skills",
        "Leadership Development",
        "Time Management",
        "Productivity Enhancement",
        "Creative Thinking",
        "Problem Solving"
      ],
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-100",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    },
    {
      title: "Career & Professional Growth",
      tagline: "Advance Your Professional Journey",
      icon: Award,
      services: [
        "Career Planning",
        "Professional Networking",
        "Interview Preparation",
        "Resume Enhancement",
        "Workplace Skills",
        "Performance Optimization"
      ],
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-100",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43"
    }
  ];

  const benefits = [
    "Personalized development plans tailored to your unique needs",
    "Evidence-based approaches backed by psychology and neuroscience",
    "Flexible scheduling including virtual and in-person sessions",
    "Certified and experienced personal development coaches",
    "Holistic approach addressing all aspects of personal growth",
    "Ongoing support and accountability throughout your journey"
  ];

  const processSteps = [
    {
      step: 1,
      title: "Initial Assessment",
      description: "Comprehensive evaluation of your current state, goals, and aspirations"
    },
    {
      step: 2,
      title: "Custom Plan Creation",
      description: "Develop a personalized roadmap tailored to your specific needs"
    },
    {
      step: 3,
      title: "Implementation & Coaching",
      description: "Regular sessions with expert coaches to guide your progress"
    },
    {
      step: 4,
      title: "Progress Tracking",
      description: "Monitor achievements and adjust strategies as you grow"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 text-accent animate-pulse">
            <AdinkraSymbol symbol="gye-nyame" size="lg" className="w-24 h-24 text-accent/30" />
          </div>
          <div className="absolute top-40 right-20 text-secondary animate-float">
            <AdinkraSymbol symbol="sankofa" size="lg" className="w-20 h-20 text-secondary/40" />
          </div>
          <div className="absolute bottom-20 left-20 text-primary animate-pulse">
            <AdinkraSymbol symbol="dwennimmen" size="md" className="w-16 h-16 text-primary/30" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 text-sm">Personal Development & Wellness</Badge>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-6">
              Transform Your Life,
              <span className="text-accent block">Unlock Your Potential</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Comprehensive personal development services designed to help you achieve your goals, 
              improve your well-being, and create the life you've always envisioned.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-primary"
               onClick={() => navigate('/contact')}>
                <MessageCircle className="w-5 h-5 mr-2" />
                Book a Consultation
              </Button>
              <Button size="lg" variant="outline">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                Our Personal Development Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive programs designed to support every aspect of your personal growth journey.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {serviceCategories.map((category, index) => (
                <Card key={category.title} className="card-hover overflow-hidden">
                  <div className={`h-48 ${category.bgColor} relative`}>
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <category.icon className="w-8 h-8 mb-2" />
                      <h3 className="text-xl font-heading font-bold">{category.title}</h3>
                      <p className="text-sm opacity-90">{category.tagline}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      {category.services.map((service) => (
                        <div key={service} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                          <span className="text-muted-foreground">{service}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="w-full btn-primary"
                      onClick={() => {
                        const serviceRoutes = {
                          'Life Coaching & Mentorship': '/personal-development/life-coaching',
                          'Wellness & Mental Health': '/personal-development/wellness',
                          'Skills Development': '/personal-development/skills-development',
                          'Career & Professional Growth': '/personal-development/career-growth'
                        };
                        window.location.href = serviceRoutes[category.title as keyof typeof serviceRoutes] || '/personal-development';
                      }}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                Our Development Process
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A structured approach to ensure your personal growth is sustainable and meaningful.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={step.step} className="card-hover text-center relative">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-accent">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 text-accent">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                Why Choose Our Personal Development Services?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {benefits.map((benefit, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground leading-relaxed">{benefit}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-accent mb-2">500+</div>
                <p className="text-muted-foreground">Lives Transformed</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">95%</div>
                <p className="text-muted-foreground">Success Rate</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">24/7</div>
                <p className="text-muted-foreground">Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Ready to Start Your Personal Development Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Take the first step towards becoming the best version of yourself. 
              Book a consultation today and let's create your personalized growth plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-primary">
                <MessageCircle className="w-5 h-5 mr-2" />
                Book Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Users className="w-5 h-5 mr-2" />
                Join Group Sessions
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PersonalDevelopmentPage;