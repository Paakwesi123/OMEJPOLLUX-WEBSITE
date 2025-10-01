import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdinkraSymbol from "@/components/AdinkraSymbols";
import { Shield, Eye, Lock, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 section-gradient opacity-20"></div>
        <div className="absolute top-10 right-10">
          <AdinkraSymbol symbol="gye-nyame" size="lg" className="text-accent" />
        </div>
        <div className="absolute bottom-10 left-10">
          <AdinkraSymbol symbol="dwennimmen" size="lg" className="text-accent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Shield className="w-16 h-16 text-accent mb-6 mx-auto" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-primary-foreground/90">
              Your privacy and data protection are our top priorities
            </p>
            <p className="text-sm text-primary-foreground/70 mt-4">
              Last updated: January 2024
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 section-gradient">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Introduction */}
          <Card className="card-gradient mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Eye className="w-6 h-6 text-accent" />
                <span>Introduction</span>
                <AdinkraSymbol symbol="mate-masie" className="text-teal-accent" />
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p>
                OMEJ Pollux ("we," "our," or "us") is committed to protecting your privacy and ensuring 
                the security of your personal information. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="card-gradient mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <UserCheck className="w-6 h-6 text-teal-accent" />
                <span>Information We Collect</span>
                <AdinkraSymbol symbol="sankofa" className="text-orange-accent" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Name, email address, and phone number</li>
                  <li>Business or institutional affiliation</li>
                  <li>Project requirements and specifications</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Device information and operating system</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="card-gradient mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Lock className="w-6 h-6 text-purple-accent" />
                <span>How We Use Your Information</span>
                <AdinkraSymbol symbol="nyame-dua" className="text-emerald-accent" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Service Delivery</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Providing consultancy services</li>
                    <li>Processing procurement requests</li>
                    <li>Delivering academic support</li>
                    <li>Customer service and support</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Communication</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Responding to inquiries</li>
                    <li>Sending project updates</li>
                    <li>Marketing communications (with consent)</li>
                    <li>Legal and regulatory compliance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card className="card-gradient mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-accent" />
                <span>Data Protection Measures</span>
                <AdinkraSymbol symbol="adwo" className="text-accent" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We implement appropriate technical and organizational security measures to protect your personal information:</p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: "Encryption", description: "Data encrypted in transit and at rest" },
                  { title: "Access Control", description: "Limited access on need-to-know basis" },
                  { title: "Regular Audits", description: "Security assessments and updates" }
                ].map((item, index) => (
                  <div key={item.title} className="p-4 bg-background/50 rounded-lg border">
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="card-gradient mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <UserCheck className="w-6 h-6 text-emerald-accent" />
                <span>Your Rights</span>
                <AdinkraSymbol symbol="dwennimmen" className="text-purple-accent" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Data Subject Rights</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Access to your personal data</li>
                    <li>Correction of inaccurate information</li>
                    <li>Deletion of your data</li>
                    <li>Data portability</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">How to Exercise Rights</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Email us at omejpollux@gmail.com</li>
                    <li>Call us at +233 59 631 6230</li>
                    <li>Written request to our office</li>
                    <li>Response within 30 days</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="card-gradient animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Eye className="w-6 h-6 text-teal-accent" />
                <span>Contact Us</span>
                <AdinkraSymbol symbol="gye-nyame" className="text-accent" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-background/50 rounded-lg border">
                  <h4 className="font-semibold mb-2">Email</h4>
                  <p className="text-sm">omejpollux@gmail.com</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg border">
                  <h4 className="font-semibold mb-2">Phone</h4>
                  <p className="text-sm">+233 59 631 6230</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg border">
                  <h4 className="font-semibold mb-2">Location</h4>
                  <p className="text-sm">Cape Coast, Ghana</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;