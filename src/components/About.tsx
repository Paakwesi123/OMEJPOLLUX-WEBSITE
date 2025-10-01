import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Award, TrendingUp } from "lucide-react";
import AdinkraSymbol from "@/components/AdinkraSymbols";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "Cutting-edge solutions tailored to modern challenges"
    },
    {
      icon: Users,
      title: "Integrity", 
      description: "Ethical practices that build trust and long-term relationships"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering outstanding results in every project"
    },
    {
      icon: TrendingUp,
      title: "Impact",
      description: "Creating meaningful change for Ghana's future"
    }
  ];

  return (
    <section className="py-20 section-light relative overflow-hidden">
      {/* Adinkra Symbols Background */}
      <div className="absolute top-20 left-10 text-primary">
        <AdinkraSymbol symbol="gye-nyame" size="lg" className="w-20 h-20 text-primary/20" />
      </div>
      <div className="absolute top-40 right-16 text-accent">
        <AdinkraSymbol symbol="sankofa" size="md" className="w-16 h-16 text-accent/30" />
      </div>
      <div className="absolute bottom-32 left-20 text-secondary">
        <AdinkraSymbol symbol="dwennimmen" size="lg" className="w-18 h-18 text-secondary/25" />
      </div>
      <div className="absolute bottom-40 right-10 text-primary">
        <AdinkraSymbol symbol="nyame-dua" size="md" className="w-14 h-14 text-primary/30" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              About OMEJ Pollux
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
             OMEJ Pollux is a forward-thinking consultancy firm dedicated to empowering entrepreneurs, institutions, and students with innovative solutions that drive growth and success. Headquartered in Ghana with a global outlook, we proudly serve clients both locally and across the diaspora including the UK, US, Canada, and other parts of Africa ensuring that distance is never a barrier to excellence.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column - Text Content */}
            <div className="animate-fade-in">
              <h3 className="text-3xl font-heading font-semibold text-primary mb-6">
                Our Mission & Vision
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-3">Mission</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide practical, ethical, and timely solutions that empower entrepreneurs, institutions, and students both locally and internationally to achieve their goals through innovative consultancy services and strategic support.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-3">Vision</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    To be a trusted global consultancy partner, recognized for transforming businesses, supporting academic excellence, and contributing to sustainable socio-economic development across nations.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="animate-slide-in-right">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                  alt="Professional team collaboration"
                  className="rounded-2xl shadow-2xl w-full object-cover h-96"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="animate-fade-in">
            <h3 className="text-3xl font-heading font-semibold text-primary text-center mb-12">
              Our Core Values
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={value.title} className="card-hover border-0 bg-card/50" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h4 className="text-xl font-heading font-semibold text-primary mb-3">
                      {value.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

        {/* What We Do */}
{/* What We Do */}
<div className="mt-20 text-center animate-fade-in">
  <h3 className="text-3xl font-heading font-semibold text-primary mb-8">
    What We Do & Why
  </h3>
  <div className="max-w-6xl mx-auto">
    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
     At OMEJ Pollux, we understand the diverse challenges facing businesses, institutions, and students across different contexts. Our comprehensive services are designed to bridge gaps, provide strategic guidance, and deliver practical solutions that create lasting impact both locally and internationally.
    </p>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
      <div className="bg-card/30 p-6 rounded-xl">
        <h4 className="text-xl font-semibold text-primary mb-3">Why Business Development?</h4>
        <p className="text-muted-foreground">
          Thriving economies are built on strong businesses. We provide the expertise and strategic guidance needed to navigate complexities and achieve sustainable growth.
        </p>
      </div>
      <div className="bg-card/30 p-6 rounded-xl">
        <h4 className="text-xl font-semibold text-primary mb-3">Why Academic Support?</h4>
        <p className="text-muted-foreground">
          Education is the foundation of progress. We empower students and institutions with tools, mentorship, and resources to foster academic excellence and global competitiveness.
        </p>
      </div>
      <div className="bg-card/30 p-6 rounded-xl">
        <h4 className="text-xl font-semibold text-primary mb-3">Why Personal Development?</h4>
        <p className="text-muted-foreground">
          Personal growth fuels collective success. We guide individuals in building skills, confidence, and vision to achieve their personal and professional goals.
        </p>
      </div>
      <div className="bg-card/30 p-6 rounded-xl">
        <h4 className="text-xl font-semibold text-primary mb-3">Why General Merchandise?</h4>
        <p className="text-muted-foreground">
          Reliable supply chains are essential for organizations and institutions. Our PPA-compliant procurement services ensure quality, efficiency, and compliance across markets.
        </p>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
    </section>
  );
};

export default About;