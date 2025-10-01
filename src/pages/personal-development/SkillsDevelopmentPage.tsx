import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle, ArrowRight, MessageCircle, BookOpen, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SkillsDevelopmentPage = () => {
  const navigate = useNavigate();

  const skillCategories = [
    {
      title: "Communication Skills",
      icon: Users,
      skills: ["Public Speaking", "Active Listening", "Presentation Skills", "Interpersonal Communication"],
      level: "Beginner to Advanced"
    },
    {
      title: "Leadership Development", 
      icon: Brain,
      skills: ["Team Management", "Strategic Thinking", "Conflict Resolution", "Decision Making"],
      level: "Intermediate to Expert"
    },
    {
      title: "Productivity & Time Management",
      icon: BookOpen,
      skills: ["Task Prioritization", "Goal Setting", "Workflow Optimization", "Stress Management"],
      level: "All Levels"
    }
  ];

  const courses = [
    {
      title: "Advanced Communication Mastery",
      duration: "12 weeks",
      format: "Online + In-Person",
      price: "GHS 2,500",
      description: "Master the art of effective communication in professional and personal settings",
      modules: ["Verbal Communication", "Non-Verbal Cues", "Public Speaking", "Negotiation Skills"]
    },
    {
      title: "Leadership Excellence Program",
      duration: "16 weeks", 
      format: "Hybrid Learning",
      price: "GHS 3,800",
      description: "Develop leadership skills that inspire teams and drive organizational success",
      modules: ["Leadership Styles", "Team Building", "Strategic Planning", "Change Management"]
    },
    {
      title: "Productivity Bootcamp",
      duration: "8 weeks",
      format: "Online",
      price: "GHS 1,800",
      description: "Boost your productivity and efficiency with proven time management techniques",
      modules: ["Time Blocking", "Goal Setting", "Digital Tools", "Work-Life Balance"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-50 to-violet-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 bg-purple-100 text-purple-800">Skills Development</Badge>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-6">
              Continuous Learning & <span className="text-purple-600">Growth</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Develop essential skills that propel your career forward and enhance your personal effectiveness 
              through our comprehensive training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => navigate('/contact')}>
                <MessageCircle className="w-5 h-5 mr-2" />
                Schedule a Sit-Down 
              </Button>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50"
              onClick={() => navigate('/LearningAssessmentPage')}>
                Free Skills Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12 text-center">
              Skill Categories
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {skillCategories.map((category, index) => (
                <Card key={category.title} className="card-hover border-purple-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <category.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl text-primary">{category.title}</CardTitle>
                    <Badge className="bg-purple-100 text-purple-800 w-fit">{category.level}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.skills.map((skill, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-muted-foreground">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Services */}
      <section className="py-20 bg-purple-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12 text-center">
              Skills Development Consultation
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-6">
                  Personalized Skills Assessment & Development
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-primary">Individual Skills Assessment</h4>
                      <p className="text-muted-foreground">Comprehensive evaluation of your current skills and identification of growth areas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-primary">Customized Development Plan</h4>
                      <p className="text-muted-foreground">Tailored roadmap with specific milestones and actionable steps for skill enhancement</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-primary">Expert Mentorship</h4>
                      <p className="text-muted-foreground">One-on-one guidance from industry professionals with proven track records</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-primary">Practical Application</h4>
                      <p className="text-muted-foreground">Real-world scenarios and hands-on exercises to reinforce learning</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-primary">Progress Tracking</h4>
                      <p className="text-muted-foreground">Regular assessments and feedback to monitor your development journey</p>
                    </div>
                  </div>
                </div>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => navigate('/booking')}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Book Consultation
                </Button>
              </div>
              <div className="space-y-6">
                <Card className="p-6 text-center border-purple-200">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-primary mb-2">Why Choose Our Consultation?</h4>
                  <p className="text-muted-foreground text-sm">
                    Our skills development consultation goes beyond generic training. We focus on your unique 
                    strengths and challenges to create a personalized growth strategy.
                  </p>
                </Card>
                <Card className="p-6 text-center border-purple-200">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-primary mb-2">Proven Results</h4>
                  <p className="text-muted-foreground text-sm">
                    Over 90% of our clients report significant improvement in their target skills within 
                    3 months of starting their development plan.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Approach */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-heading font-bold text-primary mb-6">
                  Our Learning Approach
                </h3>
                <div className="space-y-6">
                  {[
                    { title: "Interactive Learning", desc: "Hands-on exercises and real-world scenarios" },
                    { title: "Expert Instructors", desc: "Learn from industry professionals with years of experience" },
                    { title: "Personalized Feedback", desc: "Individual coaching and constructive feedback" },
                    { title: "Practical Application", desc: "Apply skills immediately in your work environment" },
                    { title: "Continuous Support", desc: "Ongoing mentorship beyond course completion" },
                    { title: "Certification", desc: "Receive recognized certificates upon completion" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-purple-600">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                  <p className="text-sm text-muted-foreground">Students Trained</p>
                </Card>
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                  <p className="text-sm text-muted-foreground">Expert Instructors</p>
                </Card>
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                </Card>
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">4.8/5</div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-violet-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Invest in Your Future Today
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have advanced their careers through our 
            comprehensive skills development programs.
          </p>
          <Button size="lg" variant="secondary" className="text-purple-700"
          onClick={() => navigate('/booking')}>
            <Brain className="w-5 h-5 mr-2" />
            Start Your Learning Journey
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SkillsDevelopmentPage;