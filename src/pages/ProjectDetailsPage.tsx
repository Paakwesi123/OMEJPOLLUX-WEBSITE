import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Users, 
  Target, 
  MapPin, 
  DollarSign, 
  FileText, 
  Clock,
  CheckCircle,
  Award,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

const ProjectDetailsPage = () => {
  const { id } = useParams();

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .eq('is_published', true)
          .is('deleted_at', null)
          .single();

        if (error) throw error;
        setProject(data);
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  // Mock project data - fallback for development
  const mockProjects = {
    "1": {
      id: 1,
      title: "Ghana SME Market Research Initiative",
      description: "Comprehensive research study analyzing the small and medium enterprise landscape in Ghana, identifying opportunities and challenges for growth.",
      fullDescription: "This groundbreaking initiative represents a comprehensive examination of Ghana's small and medium enterprise ecosystem. Our research team has conducted extensive fieldwork across all 16 regions of Ghana, interviewing over 500 SME owners, government officials, and industry experts to understand the current landscape, challenges, and opportunities for growth.",
      category: "Research",
      status: "active",
      progress: 75,
      startDate: "October 2023",
      endDate: "March 2024",
      team: ["Emmanuel Omej", "Research Team", "Dr. Sarah Mensah", "Michael Asante"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      budget: "$150,000",
      location: "Nationwide, Ghana",
      client: "Ghana Ministry of Trade and Industry",
      objectives: [
        "Analyze current SME market trends across 16 regions",
        "Identify growth opportunities and barriers",
        "Develop actionable recommendations for policy makers",
        "Create a comprehensive database of SME statistics"
      ],
      deliverables: [
        "Comprehensive Market Analysis Report",
        "SME Database and Directory",
        "Policy Recommendation Document",
        "Training Manual for SME Support Organizations"
      ],
      methodology: [
        "Quantitative surveys with 500+ SME owners",
        "Qualitative interviews with industry experts",
        "Focus group discussions in major cities",
        "Desktop research and data analysis"
      ],
      impact: [
        "Direct impact on 10,000+ SMEs through policy changes",
        "Creation of 2,500+ jobs in the SME sector",
        "Improved access to financing for 15% of surveyed SMEs",
        "Enhanced government support programs"
      ],
      milestones: [
        { title: "Phase 1: Data Collection", completed: true, date: "November 2023" },
        { title: "Phase 2: Analysis & Insights", completed: true, date: "December 2023" },
        { title: "Phase 3: Report Drafting", completed: false, date: "February 2024" },
        { title: "Phase 4: Final Presentation", completed: false, date: "March 2024" }
      ]
    },
    "2": {
      id: 2,
      title: "Academic Publication Support Program",
      description: "Supporting local researchers and academics in publishing their work in international journals and conferences.",
      fullDescription: "Our Academic Publication Support Program is designed to bridge the gap between local research excellence and international recognition. We provide comprehensive support to Ghanaian researchers, from manuscript development to journal submission and revision processes.",
      category: "Academic",
      status: "active",
      progress: 60,
      startDate: "September 2023",
      endDate: "June 2024",
      team: ["Academic Consultancy Team", "Prof. Kwame Asante", "Dr. Akosua Frimpong"],
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
      budget: "$85,000",
      location: "Universities across Ghana",
      client: "Ghana Academy of Arts and Sciences",
      objectives: [
        "Mentor 20+ researchers in publication processes",
        "Publish 15 academic papers in international journals",
        "Build research networks with international institutions",
        "Conduct training workshops on academic writing"
      ],
      deliverables: [
        "15 Published research papers",
        "Training workshop materials",
        "Researcher networking platform",
        "Publication guideline handbook"
      ],
      methodology: [
        "One-on-one mentoring sessions",
        "Group workshops on academic writing",
        "Peer review and feedback sessions",
        "Journal submission support"
      ],
      impact: [
        "Enhanced international visibility of Ghanaian research",
        "Improved research collaboration networks",
        "Increased citation rates for local researchers",
        "Strengthened academic institutions"
      ],
      milestones: [
        { title: "Researcher Selection", completed: true, date: "October 2023" },
        { title: "Training Workshops", completed: true, date: "November 2023" },
        { title: "First Publications", completed: false, date: "March 2024" },
        { title: "Program Evaluation", completed: false, date: "June 2024" }
      ]
    },
    "3": {
      id: 3,
      title: "Business Incubation Program",
      description: "12-month intensive program supporting early-stage startups with mentorship, resources, and funding connections.",
      fullDescription: "Our flagship Business Incubation Program has successfully graduated three cohorts of promising startups. This comprehensive program provides early-stage entrepreneurs with the tools, mentorship, and networks needed to build sustainable businesses that create jobs and drive economic growth.",
      category: "Business Development",
      status: "completed",
      progress: 100,
      startDate: "January 2023",
      endDate: "December 2023",
      team: ["Business Development Team", "Emmanuel Omej", "Sarah Thompson", "Alex Boateng"],
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b",
      budget: "$250,000",
      location: "Accra Innovation Hub",
      client: "Ghana Venture Capital Trust Fund",
      objectives: [
        "Support 10 early-stage startups",
        "Create 50+ direct employment opportunities",
        "Generate $2M+ in startup revenue",
        "Establish sustainable business models"
      ],
      deliverables: [
        "10 Market-ready startup businesses",
        "Business plan development for each startup",
        "Investor pitch deck preparation",
        "Post-incubation support framework"
      ],
      methodology: [
        "12-month intensive mentorship program",
        "Weekly workshops on business fundamentals",
        "Monthly investor pitch sessions",
        "Peer-to-peer learning networks"
      ],
      impact: [
        "85 jobs created across 10 startups",
        "$3.2M in total revenue generated",
        "6 startups secured follow-up funding",
        "2 startups expanded to neighboring countries"
      ],
      milestones: [
        { title: "Startup Selection", completed: true, date: "February 2023" },
        { title: "Mid-program Review", completed: true, date: "June 2023" },
        { title: "Demo Day", completed: true, date: "November 2023" },
        { title: "Program Graduation", completed: true, date: "December 2023" }
      ]
    },
    "4": {
      id: 4,
      title: "Educational Technology Integration Study",
      description: "Research project examining the integration of technology in Ghanaian educational institutions and its impact on learning outcomes.",
      fullDescription: "This comprehensive study aims to understand how educational technology is being adopted across Ghana's educational landscape and its effectiveness in improving learning outcomes. The research will inform policy decisions and guide future investments in educational technology.",
      category: "Education",
      status: "planning",
      progress: 25,
      startDate: "February 2024",
      endDate: "August 2024",
      team: ["Research & Academic Teams", "Dr. Kwame Nkrumah", "Mary Adjei"],
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
      budget: "$120,000",
      location: "Educational institutions nationwide",
      client: "Ghana Education Service",
      objectives: [
        "Survey 100+ educational institutions",
        "Analyze technology adoption patterns",
        "Develop implementation framework",
        "Assess impact on learning outcomes"
      ],
      deliverables: [
        "Comprehensive technology adoption report",
        "Best practices implementation guide",
        "Policy recommendations document",
        "Technology integration framework"
      ],
      methodology: [
        "Institution surveys and assessments",
        "Student and teacher interviews",
        "Learning outcome analysis",
        "Technology infrastructure evaluation"
      ],
      impact: [
        "Improved technology integration strategies",
        "Enhanced learning outcomes measurement",
        "Better resource allocation decisions",
        "Strengthened digital literacy programs"
      ],
      milestones: [
        { title: "Research Design", completed: true, date: "March 2024" },
        { title: "Data Collection", completed: false, date: "May 2024" },
        { title: "Analysis Phase", completed: false, date: "July 2024" },
        { title: "Final Report", completed: false, date: "August 2024" }
      ]
    }
  };

  const displayProject = project || mockProjects[id as keyof typeof mockProjects];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading project...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!displayProject) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Research": return "bg-blue-100 text-blue-800";
      case "Academic": return "bg-green-100 text-green-800";
      case "Business Development": return "bg-purple-100 text-purple-800";
      case "Education": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "planning": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Badge className={getCategoryColor(displayProject.category)}>
                {displayProject.category}
              </Badge>
              <Badge className={getStatusColor(displayProject.status)}>
                {displayProject.status}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              {displayProject.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {displayProject.description}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Image */}
            {displayProject.image_url && (
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img
                  src={displayProject.image_url || displayProject.image}
                  alt={displayProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Project Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Project Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {displayProject.content || displayProject.fullDescription || displayProject.description}
                </p>
              </CardContent>
            </Card>

            {/* Objectives */}
            {(displayProject.objectives && displayProject.objectives.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Key Objectives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {displayProject.objectives.map((objective: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Methodology */}
            {(displayProject.methodologies && displayProject.methodologies.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Methodology
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {displayProject.methodologies.map((method: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Expected Impact */}
            {(displayProject.expected_impact && displayProject.expected_impact.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Expected Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {displayProject.expected_impact.map((impact: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                        <span>{impact}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="font-medium mr-2">Duration:</span>
                  <span>{displayProject.start_date} - {displayProject.end_date}</span>
                </div>
                {displayProject.budget && (
                  <div className="flex items-center text-sm">
                    <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="font-medium mr-2">Budget:</span>
                    <span>{displayProject.budget}</span>
                  </div>
                )}
                {displayProject.location && (
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="font-medium mr-2">Location:</span>
                    <span>{displayProject.location}</span>
                  </div>
                )}
                {displayProject.team_members && displayProject.team_members.length > 0 && (
                  <div className="flex items-start text-sm">
                    <Users className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <span className="font-medium">Team:</span>
                      <div className="mt-1">
                        {displayProject.team_members.map((member: string, index: number) => (
                          <div key={index} className="text-muted-foreground">{member}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Project Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>{displayProject.progress || displayProject.status === 'completed' ? 100 : 0}%</span>
                  </div>
                  <Progress value={displayProject.progress || (displayProject.status === 'completed' ? 100 : 0)} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Milestones */}
            {(displayProject.milestones && displayProject.milestones.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {displayProject.milestones.map((milestone: any, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 ${
                          milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${
                            milestone.completed ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {milestone.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{milestone.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Deliverables */}
            {(displayProject.deliverables && displayProject.deliverables.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Deliverables</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {displayProject.deliverables.map((deliverable: string, index: number) => (
                      <li key={index} className="text-sm flex items-start">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* CTA */}
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Interested in Collaboration?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Contact us to discuss how we can work together on similar projects.
                </p>
                <Button className="w-full" asChild>
                  <Link to="/projects/collaborate">Start a Project</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetailsPage;