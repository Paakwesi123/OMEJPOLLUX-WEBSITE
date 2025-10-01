import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Target, 
  Heart, 
  Award, 
  Quote,
  Star,
  CheckCircle,
  Linkedin
} from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "We leverage cutting-edge methodologies and fresh perspectives to solve complex challenges and drive meaningful progress."
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Ethical practices, transparency, and honest communication form the foundation of all our client relationships."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We are committed to delivering outstanding results that exceed expectations in every project we undertake."
    },
    {
      icon: Target,
      title: "Impact",
      description: "Every solution we provide is designed to create lasting, positive change for our clients and the communities they serve."
    }
  ];

  const testimonials = [
    {
      content: "OMEJ Pollux provided exceptional academic consultancy services that transformed our curriculum development process. Their expertise and dedication are unmatched.",
      rating: 5
    },
    {
      content: "The business development guidance we received helped us scale from a startup to a thriving enterprise. OMEJ Pollux's strategic insights were invaluable.",
      rating: 5
    },
    {
      content: "Their personal development coaching completely changed my career trajectory. The assessment tools and guidance provided were exactly what I needed.",
      rating: 5
    },
    {
      content: "Working with OMEJ Pollux for our general merchandise needs has been seamless. Their PPA compliance and quality assurance are excellent.",
      rating: 5
    }
  ];

  const teamMembers = [
    {
      name: "Emmanuel Owusu Mintah",
      role: "Founder & CEO",
      bio: "Emmanuel is a dynamic Business Consultant and Strategic Advisor with a strong background in law, business administration, and organizational development. With experience across startups, agribusiness, logistics, non-profits, and professional services, he helps individuals and institutions unlock potential and scale sustainably. His work blends legal insight, administrative systems, and strategic planning to deliver practical, high-impact solutions. As Lead Consultant at OMEJ Pollux, he specializes in turning vision into viable ventures through business planning, mentorship, and transformative consulting.",
      image: "https://i.ibb.co/CKbM8PQ2/Emmanuel-Omej.jpghttps://i.ibb.co/8grdsY9c/photo-2025-07-23-14-24-46.jpg",
      linkedin: "https://www.linkedin.com/in/emmanuel-owusu-mintah-jnr-95b644135/",
      email: "emmanuel@omejpollux.com"
    },
    {
      name: "Raymond Marfo Pobi, FMVA",
      role: "Head of Finance & Audit",
      bio: "Raymond is a Chartered Accountant, Chartered Tax Practitioner, and Certified Financial Modeling & Valuation Analyst with solid experience in financial advisory, audit, risk management, and tax consulting. His expertise spans financial services, the public sector, business consulting, agribusiness, and non-profits. He helps organizations enhance financial performance, strengthen internal controls, manage risk, and ensure compliance. With a practical, solutions-driven approach, he delivers tailored strategies that create value and drive sustainable growth.",
      image: "https://i.ibb.co/rfcbQ939/photo-2025-07-23-16-29-42.jpg",
      linkedin: "#",
      email: "akosua@omejpollux.com"
    },
    {
      name: "Paa Kwesi Acquah-Payne, MGhIS",
      role: "Head of Estate Projects",
      bio: "Mr. Paa Kwesi Acquah-Payne is a results-driven Valuation and Estates Surveyor with extensive experience in land administration, asset management, and facilities operations. At Ghana Cocoa Board, he plays a key role in land acquisition, title perfection, and stakeholder engagement. A professional member of the Ghana Institution of Surveyors (GhIS), he is known for his precision, leadership, and proactive project execution. His expertise spans property valuation, asset register management, contractor coordination, and facilities management.",
      image: "https://i.ibb.co/cSdRCwJW/Whats-App-Image-2025-07-23-at-13-48-56.jpg",
      linkedin: "#",
      email: "kwame@omejpollux.com"
    },
    {
      name: "Paul B. Obeng",
      role: "Head of Agribusiness Projects",
      bio: "Mr. Obeng is a dedicated Agronomist and Agribusiness Consultant with over five years of field experience in crop production, soil management, and farm operations. He has served as a field agronomist and farm manager, gaining in-depth knowledge of cultivation practices and agricultural planning. His background also includes three years in the agrochemical industry, enhancing his expertise in integrated crop solutions. As Head of Agribusiness Projects at OMEJ Pollux, he leads sustainable agricultural initiatives and productivity-focused interventions across the value chain.",
      image: "https://i.ibb.co/N2HzBZgD/photo-2025-07-23-16-36-48.jpg",
      email: "efua@omejpollux.com"
    },
    {
      name: "Andy Teye",
      role: "Software Engineer | DevOps Engineer",
      bio: "DevOps engineer and software developer from Ghana with a strong focus on automation, cloud infrastructure, and secure systems. Andy is passionate about open-source intelligence (OSINT), backend development, and building scalable, reliable solutions that bridge technology and innovation.",
      image: "https://i.ibb.co/JW4q4dHQ/DAY-2-PLENARY-TICON-AFRICA-CONFERENCE-2025-2879.jpg",
      email: "isaac@omejpollux.com"
    },
    {
      name: "Petrina Mwintieme Yangme",
      role: "Frontend developer",
      bio: "Frontend developer passionate about crafting intuitive and visually engaging user experiences. Petrina specializes in React, modern UI frameworks, and responsive design, ensuring that applications are not only functional but also accessible and aesthetically refined.",
      image: "https://i.ibb.co/NnSqM79b/Whats-App-Image-2025-09-28-at-15-03-33.jpg",
      linkedin: "#",
      email: "ama@omejpollux.com"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 px-6 py-2 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
              About Us
            </Badge>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              About OMEJ Pollux
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Empowering Ghana's future through innovative consultancy services, 
              academic excellence, and strategic business solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story & Mission */}
      <section className="py-20 section-light">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="animate-fade-in">
                <h2 className="text-4xl font-heading font-bold text-primary mb-8">
                  Our Story & Mission
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                 OMEJ Pollux was founded with a clear vision to bridge the gap between academic support and business excellence. Rooted in a deep understanding of the challenges facing entrepreneurs, students, and institutions, we set out to provide practical, ethical, and timely solutions.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Since our inception in 2020, we have evolved from a single-focus consultancy into a comprehensive service provider, spanning business development, academic consultancy, personal development, and general merchandise supply. Our journey has been marked by strategic partnerships, strict compliance standards, and an unwavering commitment to excellence.
                  </p>
                  <div className="border-l-4 border-accent pl-6 bg-accent/5 p-4 rounded-r-lg">
                    <p className="text-lg font-medium text-primary italic">
                      "We believe that every business idea deserves expert guidance, 
                      and every student deserves academic excellence. Our mission is to be 
                      the catalyst that transforms potential into achievement."
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">- Emmanuel Owusu Mintah, Founder & CEO</p>
                  </div>
                </div>
              </div>
              <div className="animate-slide-in-right">
                <div className="relative">
                  <img
                    src="https://i.ibb.co/8grdsY9c/photo-2025-07-23-14-24-46.jpg"
                    alt="Professional team collaboration"
                    className="rounded-2xl shadow-2xl w-full object-cover h-96"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>

            {/* Mission, Vision & Values */}
            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              <Card className="card-hover border-0 bg-primary/5 animate-fade-in">
                <CardContent className="p-8">
                  <Target className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-2xl font-heading font-semibold text-primary mb-4">Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide practical, ethical, and timely solutions that empower entrepreneurs, institutions, and students both locally and internationally to achieve their goals through innovative consultancy services and strategic support.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover border-0 bg-accent/5 animate-fade-in animation-delay-200">
                <CardContent className="p-8">
                  <Heart className="w-12 h-12 text-accent mb-6" />
                  <h3 className="text-2xl font-heading font-semibold text-primary mb-4">Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                   To be a trusted global consultancy partner, recognized for transforming businesses, supporting academic excellence, and contributing to sustainable socio-economic development across nations.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover border-0 bg-secondary/5 animate-fade-in animation-delay-400">
                <CardContent className="p-8">
                  <Award className="w-12 h-12 text-secondary mb-6" />
                  <h3 className="text-2xl font-heading font-semibold text-primary mb-4">Purpose</h3>
                  <p className="text-muted-foreground leading-relaxed">
                   To create meaningful change in business and academia through expert guidance, innovative solutions, and an unwavering commitment to client success.
                  </p>
                </CardContent>
              </Card>
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
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">
                What Our Clients Say
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Don't just take our word for it. Here's what our valued clients have to say 
                about their experience working with OMEJ Pollux.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card 
                  key={index} 
                  className="card-hover border-0 bg-card/50 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <Quote className="w-8 h-8 text-accent mr-4" />
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

{/* Team Section - Hidden */}
      {/* <section className="py-20 section-light">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">
                Meet Our Expert Team
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Our diverse team of professionals brings together decades of combined 
                experience in business, academia, and strategic consulting.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card 
                  key={member.name} 
                  className="card-hover border-0 bg-card/50 group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="relative mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-full"></div>
                    </div>
                    
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-heading font-semibold text-primary mb-1">
                        {member.name}
                      </h3>
                      <p className="text-accent font-medium mb-3">{member.role}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                    
                    
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how OMEJ Pollux can help you achieve your business or academic goals. 
              Schedule a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-secondary"
                onClick={() => window.location.href = '/booking'}
              >
                Schedule Consultation
              </Button>
              <Button 
                size="lg" 
                
                className="btn-secondary"
                onClick={() => window.location.href = '/services'}
              >
                View Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;