import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageSquare, Facebook, Instagram, Linkedin } from "lucide-react";
import AdinkraSymbol from "@/components/AdinkraSymbols";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Adinkra Symbols Background */}
      <div className="absolute top-16 left-8 text-accent">
        <AdinkraSymbol symbol="adwo" size="lg" className="w-16 h-16 text-accent/40" />
      </div>
      <div className="absolute top-32 right-12 text-secondary">
        <AdinkraSymbol symbol="mate-masie" size="md" className="w-12 h-12 text-secondary/50" />
      </div>
      <div className="absolute bottom-20 left-16 text-accent-foreground">
        <AdinkraSymbol symbol="sankofa" size="md" className="w-14 h-14 text-accent-foreground/40" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="font-bold text-primary text-sm">OP</span>
              </div>
              <span className="text-xl font-heading font-bold">OMEJ Pollux</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Practical, ethical, and timely solutions for entrepreneurs, institutions, and students. Your trusted partner for growth and success locally and globally.
            </p>
            <div className="flex space-x-4">
              <Button 
                size="sm" 
                className="btn-secondary"
                 onClick={() => window.open('https://wa.me/233596316230', '_blank')}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Contact", path: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {[
                { name: "Business Development", path: "/business-development" },
                { name: "Academic Consultancy", path: "/academic-consultancy" },
                { name: "Personal Development", path: "/personal-development" },
                { name: "General Merchandise", path: "/general-merchandise" }
              ].map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  Cape Coast, Ghana
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                 <span className="text-primary-foreground/80 text-sm">
                   +233 59 631 6230
                 </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  info@omejpollux.org
                </span>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-4">
                <div 
                  className="cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={() => window.open('https://www.facebook.com/share/1DpS73Trsw/?mibextid=wwXIfr', '_blank')}
                  title="Follow us on Facebook"
                >
                  <Facebook className="w-6 h-6 text-blue-500 hover:text-blue-400" />
                </div>
                <div 
                  className="cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={() => window.open('https://www.instagram.com/invites/contact/?igsh=l3sozvt7sz6s&utm_content=ysbbbcc', '_blank')}
                  title="Follow us on Instagram"
                >
                  <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-400" />
                </div>
                <div 
                  className="cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={() => window.open('https://www.linkedin.com/company/omej-pollux/', '_blank')}
                  title="Follow us on LinkedIn"
                >
                  <Linkedin className="w-6 h-6 text-blue-600 hover:text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/60 text-sm">
              © 2024 OMEJ Pollux. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-primary-foreground/60 hover:text-accent cursor-pointer transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-primary-foreground/60 hover:text-accent cursor-pointer transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-primary-foreground/60 hover:text-accent cursor-pointer transition-colors">
                Cookie Policy
              </Link>
              <Link to="/legal-disclaimer" className="text-primary-foreground/60 hover:text-accent cursor-pointer transition-colors">
                Legal & Cautionary Disclaimer
              </Link>
              <Link to="/admin/login" className="text-primary-foreground/60 hover:text-accent cursor-pointer transition-colors opacity-50 hover:opacity-100">
                •
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-2xl animate-float"
          onClick={() => window.open('https://wa.me/233596316230', '_blank')}
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>
    </footer>
  );
};

export default Footer;