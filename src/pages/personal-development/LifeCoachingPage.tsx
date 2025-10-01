import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, CheckCircle, ArrowRight, MessageCircle, Star, Clock } from "lucide-react";
const LifeCoachingPage = () => {
  const navigate = useNavigate();
  const services = [
    "Goal Setting & Achievement",
    "Life Planning & Strategy", 
    "Personal Accountability",
    "Mindset Transformation",
    "Confidence Building",
    "Decision Making Skills"
  ];

  const benefits = [
    "Personalized coaching approach tailored to your unique needs",
    "Proven strategies backed by psychology and behavioral science",
    "Weekly one-on-one sessions with certified life coaches",
    "Goal tracking system to monitor your progress",
    "24/7 support through our mobile app",
    "90% success rate in achieving client goals"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2">Life Coaching & Mentorship</Badge>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-6">
              Unlock Your <span className="text-accent">Full Potential</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Transform your life through personalized coaching that helps you set meaningful goals, 
              overcome obstacles, and create the life you've always envisioned.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-primary"
               onClick={() => navigate('/booking')}>
                <MessageCircle className="w-5 h-5 mr-2" />
                Book a Session
              </Button>
              <Button size="lg" variant="outline"
               onClick={() => navigate('/contact')}>
                Free Discovery Call
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12 text-center">
              What We Offer
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {services.map((service, index) => (
                <Card key={service} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <Target className="w-6 h-6 text-accent" />
                      <h3 className="font-semibold text-primary">{service}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-6">
                  Why Choose Our Life Coaching?
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="card-hover">
                <CardContent className="p-8 text-center">
                  <Star className="w-16 h-16 text-accent mx-auto mb-4" />
                  <div className="text-4xl font-bold text-accent mb-2">4.9/5</div>
                  <p className="text-muted-foreground mb-4">Average Client Rating</p>
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Life-changing experience that helped me achieve goals I never thought possible."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12">
              Our Coaching Process
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: 1, title: "Discovery Call", desc: "Free 30-minute consultation to understand your needs" },
                { step: 2, title: "Goal Setting", desc: "Define clear, achievable goals with timelines" },
                { step: 3, title: "Action Plan", desc: "Create a personalized roadmap to success" },
                { step: 4, title: "Weekly Coaching", desc: "Regular sessions to track progress and adjust strategies" }
              ].map((item, index) => (
                <Card key={item.step} className="card-hover">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-accent">{item.step}</span>
                    </div>
                    <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Take the first step towards achieving your goals and becoming the best version of yourself.
          </p>
          <Button size="lg" variant="secondary" className="text-primary"
          onClick={() => navigate('/contact')}>
            <Clock className="w-5 h-5 mr-2" />
            Schedule Your Free Discovery Call
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LifeCoachingPage;