import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, CheckCircle, ArrowRight, MessageCircle, Leaf, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WellnessPage = () => {
  const navigate = useNavigate();
  const services = [
    "Stress Management",
    "Work-Life Balance",
    "Emotional Intelligence",
    "Mindfulness & Meditation",
    "Mental Health Support",
    "Burnout Prevention"
  ];

  const programs = [
    {
      title: "Stress Management Program",
      duration: "8 weeks",
      description: "Learn proven techniques to manage stress and anxiety in daily life",
      features: ["Weekly 1-on-1 sessions", "Meditation training", "Stress tracking tools", "24/7 support"]
    },
    {
      title: "Mindfulness Training",
      duration: "6 weeks", 
      description: "Develop mindfulness practices for better mental clarity and peace",
      features: ["Daily meditation guides", "Mindfulness exercises", "Progress tracking", "Group sessions"]
    },
    {
      title: "Mental Health Support",
      duration: "6 weeks",
      description: "Professional support for mental health challenges and wellness",
      features: ["Licensed therapists", "Personalized treatment", "Crisis support", "Family involvement"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 bg-green-100 text-green-800">Wellness & Mental Health</Badge>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-6">
              Nurture Your <span className="text-green-600">Mind & Body</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Comprehensive wellness programs designed to help you achieve mental clarity, 
              emotional balance, and overall well-being through proven therapeutic approaches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => navigate('/booking')}>
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Your Wellness Journey
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50"
        onClick={() => navigate('/WellnessAssessmentPage')}>  
         Free Assessment
         <ArrowRight className="w-5 h-5 ml-2" />
</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12 text-center">
              Our Wellness Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {services.map((service, index) => (
                <Card key={service} className="card-hover border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <Heart className="w-6 h-6 text-green-600" />
                      <h3 className="font-semibold text-primary">{service}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-green-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12 text-center">
              Wellness Programs
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <Card key={program.title} className="card-hover">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        {index === 0 && <Brain className="w-6 h-6 text-green-600" />}
                        {index === 1 && <Leaf className="w-6 h-6 text-green-600" />}
                        {index === 2 && <Heart className="w-6 h-6 text-green-600" />}
                      </div>
                      <Badge className="bg-green-100 text-green-800">{program.duration}</Badge>
                    </div>
                    <CardTitle className="text-xl text-primary">{program.title}</CardTitle>
                    <p className="text-muted-foreground">{program.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {program.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-heading font-bold text-primary mb-6">
                  Transform Your Mental Well-being
                </h3>
                <div className="space-y-4">
                  {[
                    "Reduce stress and anxiety by up to 70%",
                    "Improve emotional regulation and resilience",
                    "Enhance focus and mental clarity",
                    "Better sleep quality and energy levels",
                    "Stronger relationships and communication",
                    "Increased life satisfaction and happiness"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                  <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                </Card>
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                  <p className="text-sm text-muted-foreground">Lives Improved</p>
                </Card>
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">70%</div>
                  <p className="text-sm text-muted-foreground">Stress Reduction</p>
                </Card>
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                  <p className="text-sm text-muted-foreground">Support Available</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Your Mental Health Matters
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Take the first step towards better mental health and overall wellness. 
            Our team of licensed professionals is here to support you.
          </p>
          <Button size="lg" variant="secondary" className="text-green-700"
          onClick={() => navigate('/booking')}>
            <Heart className="w-5 h-5 mr-2" />
            Book Your Free Consultation
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WellnessPage;