import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock,
  Send,
  CheckCircle
} from "lucide-react";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
        form_type: 'contact' as const
      };

      const { error } = await supabase
        .from('form_submissions')
        .insert([submissionData]);

      if (error) throw error;

      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Ready to transform your business or academic journey? Get in touch with 
              our expert team today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="animate-fade-in">
                <Card className="card-hover border-0 bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-3xl font-heading text-primary mb-2">
                      Send Us a Message
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-foreground font-medium">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-2 bg-background"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-foreground font-medium">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-2 bg-background"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="phone" className="text-foreground font-medium">
                          Phone Number (Optional)
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-2 bg-background"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-foreground font-medium">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="mt-2 bg-background resize-none"
                          placeholder="Tell us about your project or how we can help you..."
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="btn-primary w-full group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="animate-slide-in-right space-y-8">
                {/* Contact Details */}
                <Card className="card-hover border-0 bg-secondary/30">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-heading font-semibold text-primary mb-6">
                      Get In Touch
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Office Location</h4>
                          <p className="text-muted-foreground">
                            Cape Coast, Ghana<br />
                            (Exact address provided upon appointment)
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                          <p className="text-muted-foreground">
                            +233 59 631 6230<br />
                            Available Mon-Fri, 8AM-6PM
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Mail className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Email</h4>
                          <p className="text-muted-foreground">
                           info@omejpollux.org<br />
                            24/7 email support
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">WhatsApp</h4>
                          <Button 
                            className="btn-secondary mt-2"
                            onClick={() => window.open('https://wa.me/233596316230', '_blank')}
                          >
                            Chat on WhatsApp
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card className="card-hover border-0 bg-secondary/30">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <Clock className="w-6 h-6 text-accent" />
                      <h3 className="text-2xl font-heading font-semibold text-primary">
                        Business Hours
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">Monday - Friday</span>
                        <span className="text-muted-foreground">8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">Saturday</span>
                        <span className="text-muted-foreground">9:00 AM - 2:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">Sunday</span>
                        <span className="text-muted-foreground">Emergency Only</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Response */}
                <Card className="card-hover border-0 bg-accent/5">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                      Quick Response Guarantee
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We respond to all inquiries within 24 hours. For urgent matters, 
                      please call us directly or use WhatsApp for immediate assistance.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default ContactPage;