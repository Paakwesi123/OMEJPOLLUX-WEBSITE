import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle, ArrowRight, MessageCircle, TrendingUp, Users, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CareerGrowthPage = () => {
  const navigate = useNavigate();
  const services = [
    "Career Planning",
    "Professional Networking", 
    "Interview Preparation",
    "Resume Enhancement",
    "Workplace Skills",
    "Performance Optimization"
  ];

  const careerPackages = [
    {
      title: "Career Kickstart",
      price: "GHS 1,500",
      duration: "4 weeks",
      target: "Recent Graduates",
      description: "Perfect for new graduates entering the job market",
      features: [
        "Professional resume writing",
        "LinkedIn profile optimization", 
        "Interview coaching (3 sessions)",
        "Job search strategy",
        "Personal branding workshop",
        "30-day follow-up support"
      ]
    },
    {
      title: "Career Transition", 
      price: "GHS 2,800",
      duration: "8 weeks",
      target: "Mid-Career Professionals",
      description: "For professionals looking to change careers or advance to leadership roles",
      features: [
        "Career assessment & planning",
        "Skills gap analysis",
        "Professional network building",
        "Executive resume & cover letter",
        "Salary negotiation training",
        "Leadership readiness assessment",
        "60-day mentorship program"
      ]
    },
    {
      title: "Executive Leadership",
      price: "GHS 4,500", 
      duration: "12 weeks",
      target: "Senior Professionals",
      description: "Comprehensive program for C-suite and senior executive positions",
      features: [
        "Executive presence coaching",
        "Strategic leadership development",
        "Board readiness preparation",
        "Executive search preparation",
        "Personal board of advisors setup",
        "Thought leadership development",
        "90-day executive coaching"
      ]
    }
  ];

  const successStories = [
    {
      name: "Sarah Mensah",
      role: "Marketing Director",
      company: "A Leading Bank",
      story: "Promoted to director level within 6 months of completing the Career Transition program",
      increase: "65% salary increase"
    },
    {
      name: "Kwame Asante", 
      role: "CEO",
      company: "A Tech Startup",
      story: "Successfully transitioned from corporate to entrepreneurship with executive coaching",
      increase: "Founded company valued at $50,000.00"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-orange-50 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 bg-orange-100 text-orange-800">Career & Professional Growth</Badge>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-6">
              Advance Your <span className="text-orange-600">Professional Journey</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Accelerate your career growth with strategic guidance, professional development, 
              and personalized coaching from industry experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white"
               onClick={() => navigate('/booking')}>
                <MessageCircle className="w-5 h-5 mr-2" />
                Book Consultation
              </Button>
              <Button 
          size="lg" 
          variant="outline" 
          className="border-orange-600 text-orange-600 hover:bg-orange-50"
          onClick={() => navigate('/personal-development/career-assessment')}
        >
          Free Career Assessment
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
              Career Development Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {services.map((service, index) => (
                <Card key={service} className="card-hover border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <Award className="w-6 h-6 text-orange-600" />
                      <h3 className="font-semibold text-primary">{service}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12 text-center">
              Success Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {successStories.map((story, index) => (
                <Card key={story.name} className="card-hover">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-primary">{story.name}</h3>
                        <p className="text-sm text-muted-foreground">{story.role} at {story.company}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{story.story}</p>
                    <Badge className="bg-orange-100 text-orange-800">{story.increase}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Career Stats */}
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <Card className="p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">85%</div>
                <p className="text-sm text-muted-foreground">Get Promoted Within 1 Year</p>
              </Card>
              <Card className="p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">$2K</div>
                <p className="text-sm text-muted-foreground">Average Salary Increase</p>
              </Card>
              <Card className="p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">1,200+</div>
                <p className="text-sm text-muted-foreground">Careers Advanced</p>
              </Card>
              <Card className="p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">92%</div>
                <p className="text-sm text-muted-foreground">Client Success Rate</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Career Resources */}
      <section className="py-20 bg-orange-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12 text-center">
              Career Tools & Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="card-hover text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Resume Template</h3>
                  <p className="text-muted-foreground mb-6">Professional resume template designed for Ghana's job market</p>
                  <Button 
                    variant="outline" 
                    className="border-orange-600 text-orange-600 hover:bg-orange-50"
                    onClick={() => window.open('/resume-template.docx', '_blank')}
                  >
                    Download Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-hover text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Interview Guide</h3>
                  <p className="text-muted-foreground mb-6">Comprehensive guide to ace your next interview</p>
                  <Button 
                    variant="outline" 
                    className="border-orange-600 text-orange-600 hover:bg-orange-50"
                    onClick={() => window.open('/interview-guide.pdf', '_blank')}
                  >
                    View Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-hover text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Salary Calculator</h3>
                  <p className="text-muted-foreground mb-6">Know your worth with our Ghana salary calculator</p>
                  <Button 
  variant="outline" 
  className="border-orange-600 text-orange-600 hover:bg-orange-50"
  onClick={() => navigate('/personal-development/salary-calculator')}
>
  Calculate Salary
</Button>
                </CardContent>
              </Card>
            </div>

            {/* Free Career Assessment */}
            <div className="mt-16 text-center">
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-10 h-10 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-primary mb-4">Free Career Assessment</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Take our comprehensive 10-question career assessment to discover your strengths, 
                    identify growth areas, and get personalized career recommendations.
                  </p>
                   <Button 
          size="lg" 
          variant="outline" 
          className="border-orange-600 text-orange-600 hover:bg-orange-50"
          onClick={() => navigate('/personal-development/career-assessment')}
        >
          Take Free Career Assessment
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-amber-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Take control of your professional future. Our career experts are ready to help you 
            reach new heights in your career journey.
          </p>
          <Button size="lg" variant="secondary" className="text-orange-700"
           onClick={() => navigate('/booking')}>
            <Award className="w-5 h-5 mr-2" />
            Start Your Career Transformation
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareerGrowthPage;