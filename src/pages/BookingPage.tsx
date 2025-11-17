import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import emailjs from "@emailjs/browser";

const BookingPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submissionData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: `Service Type: ${formData.serviceType}\nPreferred Date: ${formData.preferredDate}\nPreferred Time: ${formData.preferredTime}\n\nMessage: ${formData.message}`,
        form_type: "consultation" as const,
        additional_data: {
          serviceType: formData.serviceType,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
        },
      };

      // Save in Supabase
      const { error } = await supabase.from("form_submissions").insert([submissionData]);
      if (error) throw error;

      // Fire email to client
      await emailjs.send(
        "service_x0fqa5s",        // 🔑 replace with EmailJS service ID
        "template_xgbinrn",     // 🔑 replace with client template ID
        {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          serviceType: formData.serviceType,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          message: formData.message,
        },
        "J5RxqIhrvaUY3iCYh"         // 🔑 replace with EmailJS public key
      );

      // Fire email to admin
      await emailjs.send(
        "service_x0fqa5s",        // 🔑 same service ID
        "template_pdueneh",      // 🔑 replace with admin template ID
        {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          serviceType: formData.serviceType,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          message: formData.message,
        },
        "J5RxqIhrvaUY3iCYh"
      );

      toast({
        title: "Consultation Booked!",
        description: "We'll contact you within 24 hours to confirm your appointment. A confirmation email has been sent.",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        serviceType: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error submitting booking form:", error);
      toast({
        title: "Submission failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <Navbar />

      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 opacity-5">
          <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full"></div>
        </div>
        <div className="absolute top-60 right-20 opacity-8">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg rotate-45"></div>
        </div>
        <div className="absolute bottom-40 left-20 opacity-6">
          <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl"></div>
        </div>
      </div>

      <div className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6">
                Book Your Free Consultation
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Let's discuss how OMEJ Pollux can help transform your vision into reality. 
                Schedule a free consultation with our experts today.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Consultation Benefits */}
              <div className="animate-slide-in-left">
                <Card className="card-hover border-0 bg-card/50 h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading text-primary mb-4">
                      What You'll Get
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      {
                        icon: CheckCircle,
                        title: "Expert Analysis",
                        description: "Professional assessment of your current situation and needs"
                      },
                      {
                        icon: CheckCircle,
                        title: "Strategic Roadmap",
                        description: "Clear pathway to achieve your business or academic goals"
                      },
                      {
                        icon: CheckCircle,
                        title: "Resource Planning",
                        description: "Detailed breakdown of resources and timeline required"
                      },
                      {
                        icon: CheckCircle,
                        title: "Next Steps",
                        description: "Actionable recommendations you can implement immediately"
                      }
                    ].map((benefit, index) => (
                      <div key={benefit.title} className="flex items-start space-x-4" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">{benefit.title}</h4>
                          <p className="text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Booking Form */}
              <div className="animate-slide-in-right">
                <Card className="card-hover border-0 bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading text-primary">
                      Schedule Your Consultation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor="fullName" className="flex items-center space-x-2">
                              <User className="w-4 h-4" />
                              <span>Full Name *</span>
                            </Label>
                            <Input
                              id="fullName"
                              value={formData.fullName}
                              onChange={(e) => handleInputChange("fullName", e.target.value)}
                              required
                              className="mt-2"
                              placeholder="Enter your full name"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email" className="flex items-center space-x-2">
                              <Mail className="w-4 h-4" />
                              <span>Email Address *</span>
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              required
                              className="mt-2"
                              placeholder="your.email@example.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="flex items-center space-x-2">
                              <Phone className="w-4 h-4" />
                              <span>Phone Number</span>
                            </Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              className="mt-2"
                              placeholder="+233 XXX XXX XXX"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Service Selection */}
                      <div>
                        <Label className="text-sm font-medium">Service Type *</Label>
                        <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="business-development">Business Development & Consultancy</SelectItem>
                            <SelectItem value="academic-consultancy">Academic Consultancy & Support</SelectItem>
                            <SelectItem value="general-merchandise">General Merchandise Supplies</SelectItem>
                            <SelectItem value="personal-development">Personal Development</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Scheduling */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="preferredDate" className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Preferred Date</span>
                          </Label>
                          <Input
                            id="preferredDate"
                            type="date"
                            value={formData.preferredDate}
                            onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="preferredTime" className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>Preferred Time</span>
                          </Label>
                          <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange("preferredTime", value)}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (12:00 PM - 5:00 PM)</SelectItem>
                              <SelectItem value="evening">Evening (5:00 PM - 8:00 PM)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <Label htmlFor="message" className="flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4" />
                          <span>Tell us about your project or needs</span>
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className="mt-2"
                          rows={4}
                          placeholder="Please describe your current challenges, goals, or any specific questions you'd like to discuss..."
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full btn-primary group"
                        disabled={loading}
                      >
                        {loading ? "Booking..." : "Schedule Free Consultation"}
                        <Calendar className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-16 text-center animate-fade-in">
              <Card className="card-hover border-0 bg-card/30 max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-heading font-semibold text-primary mb-4">
                    Prefer to call or WhatsApp?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    You can also reach out to us directly for immediate assistance
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-accent text-accent hover:bg-accent hover:text-white"
                      onClick={() => window.open('https://wa.me/233596316230', '_blank')}
                    >
                      <Phone className="mr-2 w-5 h-5" />
                      WhatsApp Us
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={() => window.location.href = 'mailto:omejpollux@gmail.com'}
                    >
                      <Mail className="mr-2 w-5 h-5" />
                      Email Us
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;
