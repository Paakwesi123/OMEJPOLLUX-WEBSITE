import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { 
      name: "Services", 
      path: "/services",
      dropdown: [
        { name: "Business Development", path: "/business-development" },
        { name: "Academic Consultancy", path: "/academic-consultancy" },
        { name: "Personal Development", path: "/personal-development" },
        { name: "General Merchandise", path: "/general-merchandise" }
      ]
    },
    { 
      name: "Projects", 
      path: "/projects",
      dropdown: [
        { name: "View All Projects", path: "/projects" },
        { name: "Current Projects", path: "/projects?filter=active" }
      ]
    },
    { 
      name: "Events", 
      path: "/events",
      dropdown: [
        { name: "Upcoming Events", path: "/events" },
        { name: "Past Events", path: "/events?filter=past" }
      ]
    },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
<div className="flex items-center space-x-2">
  <img 
    src="https://i.ibb.co/RGZjw0rD/Whats-App-Image-2025-08-02-at-19-09-25.jpg" 
    alt="OMEJ Pollux Logo" 
    className="w-8 h-8 rounded-lg object-cover"
  />
  <span className="text-xl font-heading font-bold text-primary">
    OMEJ Pollux
  </span>
</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.dropdown ? (
                <div key={item.name} className="relative group">
                  <Link
                    to={item.path}
                    className={`font-medium transition-colors duration-200 hover:text-accent flex items-center ${
                      isActive(item.path) ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Link>
                  <div className="absolute left-0 top-full mt-1 bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[200px]">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        to={dropdownItem.path}
                        className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors first:rounded-t-md last:rounded-b-md"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-medium transition-colors duration-200 hover:text-accent ${
                    isActive(item.path) ? "text-accent" : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    className={`block px-3 py-2 font-medium transition-colors duration-200 hover:text-accent ${
                      isActive(item.path) ? "text-accent" : "text-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-6 space-y-1">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.path}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-accent"
                          onClick={() => setIsOpen(false)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;