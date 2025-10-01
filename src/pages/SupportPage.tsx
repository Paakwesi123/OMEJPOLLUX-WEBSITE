import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Heart, CreditCard, Smartphone, Building2, CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const SupportPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
    projectSupport: "",
    amount: ""
  });

  const projects = [
    "Ghana SME Market Research Initiative",
    "Academic Publication Support Program", 
    "Business Incubation Program",
    "Educational Technology Integration Study",
    "Agricultural Innovation Project",
    "Real Estate Development Initiative",
    "Industrial Automation Research",
    "General Support Fund"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('form_submissions')
        .insert([{
          form_type: 'support_donation',
          name: formData.fullName,
          email: formData.email,
          message: formData.message,
          additional_data: { 
            project_support: formData.projectSupport,
            amount: formData.amount 
          }
        }]);

      if (error) throw error;

      toast.success("Thank you for your support! We'll be in touch soon.");
      setFormData({
        fullName: "",
        email: "",
        message: "",
        projectSupport: "",
        amount: ""
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to submit form");
    }
  };

  const impactStats = [
    { number: "25+", label: "Projects Funded", icon: Building2 },
    { number: "500+", label: "Lives Impacted", icon: Heart },
    { number: "GHS 2M+", label: "Total Support Raised", icon: CreditCard },
    { number: "15", label: "Communities Reached", icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2">Support Our Mission</Badge>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-6">
              Make a <span className="text-accent">Difference</span> Today
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Your support enables us to continue our mission of driving business growth, 
              academic excellence, and community development across Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => (
                <Card key={stat.label} className="text-center card-hover">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-8 h-8 text-accent" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Form */}
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Support Our Work</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below to show your support for our projects and initiatives.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Project to Support
                      </label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, projectSupport: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a project to support" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map((project) => (
                            <SelectItem key={project} value={project}>
                              {project}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Support Amount (Optional)
                      </label>
                      <Input
                        type="text"
                        value={formData.amount}
                        onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="Enter amount (e.g., GHS 100)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message/Reason for Support
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us why you want to support our work..."
                        rows={4}
                      />
                    </div>

                    <Button type="submit" className="w-full btn-primary">
                      <Heart className="w-5 h-5 mr-2" />
                      Submit Support Form
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Payment Information</CardTitle>
                  <p className="text-muted-foreground">
                    Use any of the following methods to make your contribution.
                  </p>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Bank Details */}
                  <div>
                    <h3 className="font-semibold text-primary mb-4 flex items-center">
                      <Building2 className="w-5 h-5 mr-2" />
                      Bank Transfer
                    </h3>
                    <div className="space-y-3 bg-secondary/20 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bank Name:</span>
                        <span className="font-medium">Ghana Commercial Bank</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Name:</span>
                        <span className="font-medium">OMEJ Pollux Limited</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Number:</span>
                        <span className="font-medium font-mono">1234567890</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sort Code:</span>
                        <span className="font-medium">GCB-123-456</span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Money */}
                  <div>
                    <h3 className="font-semibold text-primary mb-4 flex items-center">
                      <Smartphone className="w-5 h-5 mr-2" />
                      Mobile Money
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-secondary/20 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">MTN Mobile Money:</span>
                          <span className="font-medium font-mono">024-123-4567</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name:</span>
                          <span className="font-medium">Emmanuel Omej</span>
                        </div>
                      </div>
                      <div className="bg-secondary/20 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Vodafone Cash:</span>
                          <span className="font-medium font-mono">020-987-6543</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name:</span>
                          <span className="font-medium">Emmanuel Omej</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Note */}
                  <div className="bg-accent/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> After making your payment, please send us a message 
                      through the form with your transaction reference for proper acknowledgment.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12 text-center">
              Current Projects Seeking Support
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Agricultural Innovation Project",
                  description: "Supporting small-scale farmers with modern farming techniques and technology.",
                  target: "GHS 50,000",
                  raised: "GHS 32,000",
                  progress: 64,
                  supporters: 45
                },
                {
                  title: "Educational Technology Program",
                  description: "Bringing digital learning tools to rural schools across Ghana.",
                  target: "GHS 75,000", 
                  raised: "GHS 28,000",
                  progress: 37,
                  supporters: 28
                },
                {
                  title: "Youth Entrepreneurship Fund",
                  description: "Providing startup capital and mentorship for young entrepreneurs.",
                  target: "GHS 100,000",
                  raised: "GHS 85,000",
                  progress: 85,
                  supporters: 92
                }
              ].map((project, index) => (
                <Card key={project.title} className="card-hover">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-3">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary/30 rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{project.raised} raised</span>
                        <span>{project.target} goal</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {project.supporters} supporters
                      </div>
                    </div>

                    <Button className="w-full btn-primary">
                      Support This Project
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Thank You for Your Support
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Every contribution, no matter the size, makes a meaningful impact in our mission 
            to drive positive change across Ghana.
          </p>
          <div className="flex justify-center space-x-8 text-white/90">
            <div className="text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Tax Deductible</p>
            </div>
            <div className="text-center">
              <Heart className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">100% Transparent</p>
            </div>
            <div className="text-center">
              <Building2 className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Direct Impact</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SupportPage;