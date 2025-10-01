import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Target, Award, CheckCircle, Globe, Shield, TrendingUp, Clock, Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CompanyPage = () => {
  const milestones = [
    { year: "2020", title: "Company Founded", description: "OMEJ Pollux established with a vision to bridge academic and business excellence" },
    { year: "2021", title: "First Major Project", description: "Successfully completed comprehensive business development project for startup company" },
    { year: "2022", title: "Academic Partnership", description: "Formed strategic partnerships with educational institutions for research support" },
    { year: "2023", title: "PPA Certification", description: "Achieved full compliance with Public Procurement Authority regulations" },
    { year: "2024", title: "Expanded Services", description: "Launched comprehensive general merchandise supply division" }
  ];

  const founder = {
    name: "Owusu-Mintah Emmanuel Jnr",
    position: "Lead Consultant – Business Development | Legal Strategy | Administration & Advisory",
    description: "Emmanuel is a dynamic Business Consultant and Strategic Advisor with a strong background in law, business administration, and organizational development. With experience across startups, agribusiness, logistics, non-profits, and professional services, he helps individuals and institutions unlock potential and scale sustainably. His work blends legal insight, administrative systems, and strategic planning to deliver practical, high-impact solutions. As Lead Consultant at OMEJ Pollux, he specializes in turning vision into viable ventures through business planning, mentorship, and transformative consulting.",
    image: "/lovable-uploads/aeae8b1e-307c-4005-b988-33dbf0d63877.png"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="mb-8 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                About OMEJ Pollux
              </h1>
              <p className="text-xl leading-relaxed max-w-3xl mx-auto">
                Empowering businesses and academic institutions through comprehensive 
                consultancy services, strategic guidance, and PPA-compliant procurement solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div>
                  <h2 className="text-4xl font-bold text-primary mb-6">
                    Our Story
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    OMEJ Pollux was founded with a vision to bridge the gap between 
                    academic excellence and business success. We understand that both 
                    educational institutions and businesses need specialized support 
                    to thrive in today's competitive environment.
                  </p>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Our multidisciplinary approach combines deep industry knowledge 
                    with academic rigor to deliver solutions that create lasting impact.
                    We pride ourselves on maintaining the highest standards of ethics, 
                    transparency, and compliance in all our operations.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-accent/10 rounded-lg">
                      <div className="text-2xl font-bold text-accent">50+</div>
                      <div className="text-sm text-muted-foreground">Projects Completed</div>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">100%</div>
                      <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902"
                    alt="Team collaboration"
                    className="rounded-2xl shadow-xl w-full object-cover h-96"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
                </div>
              </div>

              {/* Mission, Vision, Values */}
              <div className="grid md:grid-cols-3 gap-8 mb-20">
                <Card className="border-0 bg-gradient-to-br from-primary/5 to-accent/5 card-hover">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl text-primary">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      To provide comprehensive consultancy services that empower 
                      businesses and academic institutions to achieve their goals 
                      through strategic guidance, innovative solutions, and ethical practices.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-accent/5 to-secondary/5 card-hover">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="text-2xl text-primary">Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      To be the leading consultancy firm in Ghana that transforms ideas into 
                      sustainable success stories across business and academic sectors while 
                      maintaining the highest standards of integrity.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-secondary/5 to-primary/5 card-hover">
                  <CardHeader>
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-secondary" />
                    </div>
                    <CardTitle className="text-2xl text-primary">Our Values</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                        Excellence in service delivery
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                        Integrity and transparency
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                        Innovation and creativity
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                        Collaborative partnerships
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                        Ethical business practices
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Company Timeline */}
              <div className="mb-20">
                <h3 className="text-3xl font-bold text-primary text-center mb-12">Our Journey</h3>
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent"></div>
                  <div className="space-y-12">
                    {milestones.map((milestone, index) => (
                      <div key={milestone.year} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                          <Card className="card-hover border-0 bg-card/50">
                            <CardContent className="p-6">
                              <div className="text-2xl font-bold text-accent mb-2">{milestone.year}</div>
                              <h4 className="text-xl font-semibold text-primary mb-2">{milestone.title}</h4>
                              <p className="text-muted-foreground">{milestone.description}</p>
                            </CardContent>
                          </Card>
                        </div>
                        <div className="relative z-10">
                          <div className="w-4 h-4 bg-accent rounded-full border-4 border-background"></div>
                        </div>
                        <div className="w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Leadership & Expertise */}
              <div className="mb-20">
                <h3 className="text-3xl font-bold text-primary text-center mb-12">Leadership & Expertise</h3>
                <div className="max-w-4xl mx-auto">
                  <Card className="card-hover border-0 bg-gradient-to-br from-primary/5 to-accent/5">
                    <CardContent className="p-8">
                      <div className="grid md:grid-cols-3 gap-8 items-center">
                        <div className="text-center">
                          <img
                            src={founder.image}
                            alt={founder.name}
                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <h4 className="text-2xl font-bold text-primary mb-3">{founder.name}</h4>
                          <p className="text-accent font-semibold mb-4 text-lg">{founder.position}</p>
                          <p className="text-muted-foreground leading-relaxed">{founder.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Leadership Team */}
              <div className="mb-20">
                <h3 className="text-3xl font-bold text-primary text-center mb-12">Leadership Team</h3>
                <div className="max-w-4xl mx-auto">
                  <Card className="border-0 bg-gradient-to-br from-primary/5 to-accent/5">
                    <CardContent className="p-8">
                      <div className="grid md:grid-cols-3 gap-8 items-center">
                        <div className="text-center">
                          <img
                            src="/lovable-uploads/aeae8b1e-307c-4005-b988-33dbf0d63877.png"
                            alt="Emmanuel Omej - Founder & CEO"
                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <h4 className="text-2xl font-bold text-primary mb-3">Emmanuel Omej</h4>
                          <p className="text-accent font-semibold mb-4 text-lg">Founder & CEO</p>
                          <p className="text-muted-foreground leading-relaxed">
                            Emmanuel is a visionary leader with over a decade of experience in business development, 
                            academic research, and strategic consulting. His deep understanding of Ghana's economic 
                            landscape and educational sector drives OMEJ Pollux's mission to empower entrepreneurs 
                            and students across the country.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="mb-20">
                <h3 className="text-3xl font-bold text-primary text-center mb-12">Why Choose OMEJ Pollux?</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      icon: Shield,
                      title: "PPA Compliant",
                      description: "Full compliance with Public Procurement Authority regulations and standards"
                    },
                    {
                      icon: Award,
                      title: "Ethics-Driven",
                      description: "Transparent, honest, and ethical approach to all our business operations"
                    },
                    {
                      icon: TrendingUp,
                      title: "Results-Oriented",
                      description: "Proven track record of delivering measurable results and sustainable growth"
                    },
                    {
                      icon: Clock,
                      title: "Timely Delivery",
                      description: "Committed to meeting deadlines and exceeding client expectations consistently"
                    }
                  ].map((feature) => (
                    <Card key={feature.title} className="card-hover border-0 bg-gradient-to-br from-primary/5 to-accent/5 text-center">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <feature.icon className="w-6 h-6 text-accent" />
                        </div>
                        <h4 className="text-lg font-semibold text-primary mb-3">{feature.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-primary text-center mb-8">Get In Touch</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-primary mb-2">Phone</h4>
                    <p className="text-muted-foreground">+233243156093</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <h4 className="font-semibold text-primary mb-2">Email</h4>
                    <p className="text-muted-foreground">omejpollux@gmail.com</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-secondary" />
                    </div>
                    <h4 className="font-semibold text-primary mb-2">Location</h4>
                    <p className="text-muted-foreground">Accra, Ghana</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanyPage;