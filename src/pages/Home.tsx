import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";


const Home = () => {
  const testimonials = [
    {
      content: "Working with OMEJ Pollux was a game-changer for our business. Their strategic guidance helped us expand into new markets successfully.",
      rating: 5
    },
    {
      content: "The academic consultation services provided by OMEJ Pollux exceeded our expectations. Professional, timely, and highly effective.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      
      {/* Testimonials Section */}
      <section className="py-20 section-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                What Our Clients Say
              </h2>
              <p className="text-xl text-muted-foreground">
                Trusted by businesses, institutions, and individuals across Ghana
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 card-hover" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="space-y-4">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;