import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, Target, ExternalLink, ImageIcon, Heart, Award } from "lucide-react";
import { Link } from "react-router-dom";
import DonationForm from "@/components/forms/DonationForm";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const ProjectsPage = () => {
  const slideImages = [
    {
      url: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1920&auto=format&fit=crop",
      alt: "Children learning in classroom - Quality Education"
    },
    {
      url: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1920&auto=format&fit=crop",
      alt: "Solar panels in rural area - Clean Energy"
    },
    {
      url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1920&auto=format&fit=crop",
      alt: "Farmer harvesting crops - Sustainable Agriculture"
    },
    {
      url: "https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=1920&auto=format&fit=crop",
      alt: "Lush forest - Climate Action"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const projectCategories = ["All", "Agribusiness", "Real Estate", "Industrial", "Research & Academic"];

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_published", true)
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error loading projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const getProjectImage = (project: any) => {
    if (project.image_url) return project.image_url;
    if (project.media_urls && Array.isArray(project.media_urls)) {
      const firstImage = project.media_urls.find((m: any) => m.type === "image");
      if (firstImage?.url) return firstImage.url;
    }
    if (project.image) return project.image;
    return "https://images.unsplash.com/photo-1551288049-bebda4e38f71";
  };

  const formatCategory = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      research_academic: "Research & Academic",
      business_development: "Business Development",
      agribusiness: "Agribusiness",
      real_estate: "Real Estate",
      industrial: "Industrial",
    };
    return categoryMap[category] || category;
  };

  const formatStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
      planning: "Planning",
      active: "Active",
      completed: "Completed",
      on_hold: "On Hold",
    };
    return statusMap[status] || status;
  };

  const getProjectProgress = (project: any) => {
    if (project.progress !== undefined) return project.progress;
    if (project.milestones?.length) {
      const completed = project.milestones.filter((m: any) => m.completed).length;
      return Math.round((completed / project.milestones.length) * 100);
    }
    switch (project.status) {
      case "completed": return 100;
      case "active": return 60;
      case "planning": return 20;
      case "on_hold": return 30;
      default: return 0;
    }
  };

  const getTeamMembers = (project: any) => {
    if (project.team_members) return project.team_members.slice(0, 3);
    if (project.team) return project.team.slice(0, 3);
    return [];
  };

  const getObjectives = (project: any) => {
    if (project.objectives) return project.objectives.slice(0, 3);
    return [];
  };

  const displayProjects = projects;

  const filteredProjects = selectedCategory === "All"
    ? displayProjects
    : displayProjects.filter((project) => {
        const projectCategory = formatCategory(project.category);
        return projectCategory === selectedCategory;
      });

  const getCategoryColor = (category: string) => {
    const displayCategory = formatCategory(category);
    switch (displayCategory) {
      case "Research & Academic": return "bg-blue-100 text-blue-800";
      case "Agribusiness": return "bg-green-100 text-green-800";
      case "Real Estate": return "bg-purple-100 text-purple-800";
      case "Industrial": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": 
      case "Active": return "bg-green-100 text-green-800";
      case "completed": 
      case "Completed": return "bg-blue-100 text-blue-800";
      case "planning": 
      case "Planning": return "bg-orange-100 text-orange-800";
      case "on_hold":
      case "On Hold": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section with Slideshow */}
      <section className="pt-24 pb-20 relative overflow-hidden min-h-[70vh]">
        <div className="absolute inset-0">
          {slideImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-accent/70"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 drop-shadow-lg">
              Our Projects
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed drop-shadow-md">
              Explore our ongoing and completed projects that drive business growth, 
              academic excellence, and innovation across Ghana
            </p>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slideImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white shadow-lg scale-125" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>
{/* Global Impact, Community First & Purpose */}
<section className="py-16 bg-background">
  <div className="container mx-auto px-4 text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
      Why We Do What We Do
    </h2>
    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
      Our work goes beyond projects. It’s about creating sustainable change, 
      empowering communities, and fulfilling a deeper purpose that leaves a 
      lasting legacy for generations to come.
    </p>
  </div>

  <div className="container mx-auto px-4">
    <div className="grid lg:grid-cols-3 gap-8 mb-20">
      {/* Global Impact */}
      <Card className="card-hover border-0 bg-primary/5 animate-fade-in">
        <CardContent className="p-8">
          <Target className="w-12 h-12 text-primary mb-6" />
          <h3 className="text-2xl font-heading font-semibold text-primary mb-4">Global Impact</h3>
          <p className="text-muted-foreground leading-relaxed">
            We design and implement projects that create measurable change worldwide, 
            aligning with the UN SDGs to drive progress across borders.
          </p>
        </CardContent>
      </Card>

      {/* Community First */}
      <Card className="card-hover border-0 bg-accent/5 animate-fade-in animation-delay-200">
        <CardContent className="p-8">
          <Heart className="w-12 h-12 text-accent mb-6" />
          <h3 className="text-2xl font-heading font-semibold text-primary mb-4">Community First</h3>
          <p className="text-muted-foreground leading-relaxed">
            Every initiative we undertake puts people and communities at the center, 
            ensuring that development is inclusive, fair, and sustainable.
          </p>
        </CardContent>
      </Card>

      {/* Purpose */}
      <Card className="card-hover border-0 bg-primary/5 animate-fade-in">
        <CardContent className="p-8">
          <Award className="w-12 h-12 text-primary mb-6" />
          <h3 className="text-2xl font-heading font-semibold text-primary mb-4">Purpose</h3>
          <p className="text-muted-foreground leading-relaxed">
            Our purpose is to create lasting value through innovation, 
            partnerships, and projects that inspire hope and transform lives.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</section>
{/* SDG Goals Section */}
<section className="py-12 bg-primary/5">
  <div className="container mx-auto px-4 text-center mb-8">
    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
      Driving Sustainable Development
    </h2>
    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
      We are committed to advancing <span className="font-semibold text-primary">9 out of the 17 United Nations Sustainable Development Goals (SDGs)</span>, 
      ensuring our projects deliver meaningful change where it matters most.
    </p>
  </div>

  <div className="container mx-auto px-4">
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      
      {/* No Poverty */}
      <Card className="card-hover border-0 bg-primary/5 animate-fade-in">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-heading font-semibold text-primary mb-3">No Poverty</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Supporting vulnerable communities with opportunities to break the cycle of poverty.
          </p>
        </CardContent>
      </Card>

      {/* Zero Hunger */}
      <Card className="card-hover border-0 bg-accent/5 animate-fade-in animation-delay-100">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-heading font-semibold text-accent mb-3">Zero Hunger</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Initiatives that promote food security and sustainable agriculture.
          </p>
        </CardContent>
      </Card>

      {/* Good Health & Well-Being */}
      <Card className="card-hover border-0 bg-primary/5 animate-fade-in">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-heading font-semibold text-primary mb-3">Good Health & Well-Being</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Healthcare projects that improve access and quality of life for all.
          </p>
        </CardContent>
      </Card>

      {/* Quality Education */}
      <Card className="card-hover border-0 bg-primary/5 animate-fade-in animation-delay-300">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-heading font-semibold text-primary mb-3">Quality Education</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Providing inclusive education opportunities to unlock human potential.
          </p>
        </CardContent>
      </Card>

      {/* Gender Equality */}
      <Card className="card-hover border-0 bg-accent/5 animate-fade-in animation-delay-400">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-heading font-semibold text-accent mb-3">Gender Equality</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Empowering women and girls to achieve equality and leadership.
          </p>
        </CardContent>
      </Card>

      {/* Clean Water & Sanitation */}
      <Card className="card-hover border-0 bg-primary/5 animate-fade-in">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-heading font-semibold text-primary mb-3">Clean Water & Sanitation</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Ensuring safe drinking water and sanitation for healthier communities.
          </p>
        </CardContent>
      </Card>

      {/* Affordable & Clean Energy */}
      <Card className="card-hover border-0 bg-primary/5 animate-fade-in animation-delay-600">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-heading font-semibold text-primary mb-3">Affordable & Clean Energy</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Promoting renewable energy for sustainable growth and climate resilience.
          </p>
        </CardContent>
      </Card>

      {/* Decent Work & Economic Growth */}
      <Card className="card-hover border-0 bg-accent/5 animate-fade-in animation-delay-700">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-heading font-semibold text-accent mb-3">Decent Work & Economic Growth</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Creating jobs and fostering inclusive, sustainable economies.
          </p>
        </CardContent>
      </Card>

      {/* Climate Action */}
      <Card className="card-hover border-0 bg-primary/5 animate-fade-in animation-delay-600">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-heading font-semibold text-primary mb-3">Climate Action</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Taking urgent steps to combat climate change and protect the planet.
          </p>
        </CardContent>
      </Card>

    </div>
  </div>
</section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
        Featured Projects
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
         Explore our most impactful initiatives that demonstrate how we turn 
      sustainable ideas into real change. Each project aligns with global goals 
      and reflects our commitment to community-first development.
      </p>
    </div>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {projectCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                {selectedCategory === "All" 
                  ? "We’re currently working on new initiatives. Please check back soon to see our latest projects."
                  : `No projects found in the ${selectedCategory} category. Check back later for updates.`
                }
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => {
                const projectImage = getProjectImage(project);
                const displayCategory = formatCategory(project.category);
                const displayStatus = formatStatus(project.status);
                const projectProgress = getProjectProgress(project);
                const teamMembers = getTeamMembers(project);
                const objectives = getObjectives(project);

                return (
                  <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img
                        src={projectImage}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback image if the cover image fails to load
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71";
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={getCategoryColor(project.category)}>
                          {displayCategory}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className={getStatusColor(project.status)}>
                          {displayStatus}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <p className="text-muted-foreground">{project.description}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{projectProgress}%</span>
                        </div>
                        <Progress value={projectProgress} className="h-2" />
                      </div>

                      {/* Project Details */}
                      <div className="space-y-2">
                        {(project.start_date || project.startDate) && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-2" />
                            {project.start_date || project.startDate} - {project.end_date || project.endDate || "Ongoing"}
                          </div>
                        )}
                        {teamMembers.length > 0 && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="w-4 h-4 mr-2" />
                            {teamMembers.join(", ")}
                            {(project.team_members?.length > 3 || project.team?.length > 3) && "..."}
                          </div>
                        )}
                      </div>

                      {/* Objectives */}
                      {objectives.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Target className="w-4 h-4 mr-2" />
                            Key Objectives
                          </h4>
                          <ul className="space-y-1">
                            {objectives.map((objective, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {objective}
                              </li>
                            ))}
                            {project.objectives?.length > 3 && (
                              <li className="text-sm text-muted-foreground italic">
                                +{project.objectives.length - 3} more objectives
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Action Button */}
                      <Button variant="outline" className="w-full" asChild>
                        <Link to={`/projects/${project.id}`}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">
              Project Impact
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our projects have made a significant impact across various sectors in Ghana
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{projects.filter(p => p.status === 'completed').length || '25'}+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Businesses Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Research Papers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Jobs Created</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">
            Partner With Us
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Ready to collaborate on a project that makes a difference? 
            Let's work together to drive innovation and growth.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/projects/collaborate">Start a Project</Link>
          </Button>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">
            Support Our Projects
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Help us create lasting impact in communities across Ghana. Your contribution 
            directly supports our mission to drive growth and innovation.
          </p>
          <DonationForm
            trigger={
              <Button size="lg" className="btn-primary">
                Donate Now
              </Button>
            }
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectsPage;