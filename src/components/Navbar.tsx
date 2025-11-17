import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { 
      name: "Services", 
      path: "/services",
      dropdown: [
        { name: "Business Development", path: "/business-development", icon: "💼" },
        { name: "Academic Consultancy", path: "/academic-consultancy", icon: "🎓" },
        { name: "Personal Development", path: "/personal-development", icon: "🌱" }
      ]
    },
    { 
      name: "General Merchandise", 
      path: "/general-merchandise",
      featured: true
    },
    { 
      name: "Projects", 
      path: "/projects",
      dropdown: [
        { name: "View All Projects", path: "/projects", icon: "📊" },
        { name: "Current Projects", path: "/projects?filter=active", icon: "⚡" }
      ]
    },
    { 
      name: "Events", 
      path: "/events",
      dropdown: [
        { name: "Upcoming Events", path: "/events", icon: "📅" },
        { name: "Past Events", path: "/events?filter=past", icon: "🕒" }
      ]
    },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-background/80 backdrop-blur-xl shadow-lg border-b border-border/50" 
            : "bg-background/95 backdrop-blur-sm border-b border-border/30"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo with Animation */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src="https://i.ibb.co/RGZjw0rD/Whats-App-Image-2025-08-02-at-19-09-25.jpg" 
                  alt="OMEJ Pollux Logo" 
                  className="relative w-10 h-10 rounded-xl object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  OMEJ Pollux
                </span>
                <span className="text-xs text-muted-foreground font-medium tracking-wide">Excellence & Innovation</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-0.5">
              {navItems.map((item, index) => (
                item.dropdown ? (
                  <div 
                    key={item.name} 
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={item.path}
                      className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-1 relative overflow-hidden group/link ${
                        isActive(item.path) 
                          ? "text-accent" 
                          : "text-foreground hover:text-accent"
                      }`}
                    >
                      <span className="relative z-10">{item.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      <span className="absolute inset-0 bg-accent/10 rounded-lg scale-0 group-hover/link:scale-100 transition-transform duration-300"></span>
                      {isActive(item.path) && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"></span>
                      )}
                    </Link>
                    
                    {/* Mega Dropdown Menu */}
                    <div 
                      className={`absolute left-0 top-full mt-2 transition-all duration-300 ${
                        activeDropdown === item.name 
                          ? 'opacity-100 visible translate-y-0' 
                          : 'opacity-0 invisible -translate-y-2'
                      }`}
                    >
                      <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden min-w-[280px]">
                        <div className="p-2">
                          {item.dropdown.map((dropdownItem, idx) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className="group/item flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent/10 transition-all duration-300 relative overflow-hidden"
                              style={{ animationDelay: `${idx * 50}ms` }}
                            >
                              <span className="text-2xl group-hover/item:scale-110 transition-transform duration-300">
                                {dropdownItem.icon}
                              </span>
                              <span className="font-medium text-sm group-hover/item:text-accent transition-colors duration-300">
                                {dropdownItem.name}
                              </span>
                              <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                            </Link>
                          ))}
                        </div>
                        {/* Decorative gradient line */}
                        <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
                      </div>
                    </div>
                  </div>
                ) : item.featured ? (
                  // Featured item (Merchandise) with special styling
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 relative overflow-hidden group/link flex items-center gap-1.5 ${
                      isActive(item.path) 
                        ? "text-accent bg-accent/10" 
                        : "text-foreground hover:text-accent"
                    }`}
                  >
                    <span className="text-base group-hover/link:scale-110 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg scale-0 group-hover/link:scale-100 transition-transform duration-300"></span>
                    {isActive(item.path) && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"></span>
                    )}
                  </Link>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 relative overflow-hidden group/link ${
                      isActive(item.path) 
                        ? "text-accent" 
                        : "text-foreground hover:text-accent"
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute inset-0 bg-accent/10 rounded-lg scale-0 group-hover/link:scale-100 transition-transform duration-300"></span>
                    {isActive(item.path) && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"></span>
                    )}
                  </Link>
                )
              ))}
              
              {/* CTA Button */}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="relative group"
              >
                <div className="relative">
                  {isOpen ? (
                    <X size={24} className="transition-transform duration-300 rotate-90" />
                  ) : (
                    <Menu size={24} className="transition-transform duration-300" />
                  )}
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div 
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-2 pt-2 pb-6 space-y-2">
              {navItems.map((item, index) => (
                <div 
                  key={item.name}
                  className="animate-slideIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive(item.path) 
                        ? "bg-accent/20 text-accent" 
                        : "text-foreground hover:bg-accent/10 hover:text-accent"
                    } ${item.featured ? 'bg-gradient-to-r from-accent/5 to-primary/5' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && <span className="text-lg">{item.icon}</span>}
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-4 mt-2 space-y-1">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.path}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-accent hover:bg-accent/5 transition-all duration-300"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="text-lg">{dropdownItem.icon}</span>
                          <span>{dropdownItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA */}
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/50 transition-all duration-300"
              >
                <span className="flex items-center gap-2 justify-center">
                  Get Started
                  <Sparkles className="w-4 h-4" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20"></div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default Navbar;