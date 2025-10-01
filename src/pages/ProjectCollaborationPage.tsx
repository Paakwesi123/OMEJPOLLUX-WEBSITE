import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Lightbulb, Target, Clock, DollarSign } from "lucide-react";


const ProjectCollaborationPage = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Contact Information
    name: "",
    email: "",
    phone: "",
    organization: "",
    position: "",
    
    // Project Details
    projectTitle: "",
    projectType: "",
    projectDescription: "",
    objectives: "",
    targetAudience: "",
    expectedDuration: "",
    budget: "",
    timeline: "",
    
    // Requirements
    expertise: [],
    resources: "",
    challenges: "",
    successMetrics: "",
    
    // Additional Information
    previousExperience: "",
    references: "",
    additionalInfo: "",
    
    // Agreements
    agreeToTerms: false,
    agreeToNDA: false
  });

  const projectTypes = [
    "Research Study",
    "Business Development",
    "Academic Publication",
    "Market Analysis",
    "Strategic Consulting",
    "Educational Program",
    "Technology Integration",
    "Policy Development",
    "Community Development",
    "Other"
  ];

  const expertiseAreas = [
    "Business Strategy",
    "Market Research",
    "Academic Writing",
    "Data Analysis",
    "Project Management",
    "Policy Analysis",
    "Financial Planning",
    "Technology Consulting",
    "Educational Design",
    "Community Engagement"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.agreeToTerms) {
    toast({
      title: "Terms Required",
      description: "Please agree to the terms and conditions to continue.",
      variant: "destructive"
    });
    return;
  }

  try {
    // Initialize auth first
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      await supabase.auth.signInWithPassword({
        email: 'omejpollux@gmail.com',
        password: 'Omej.pollux@1@2'
      });
    }

    // Submit to Supabase
    const { data, error } = await supabase.from('form_submissions').insert([
      {
        form_type: 'project_collaboration',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.projectDescription,
        additional_data: {
          organization: formData.organization,
          position: formData.position,
          projectTitle: formData.projectTitle,
          projectType: formData.projectType,
          objectives: formData.objectives,
          targetAudience: formData.targetAudience,
          expectedDuration: formData.expectedDuration,
          budget: formData.budget,
          timeline: formData.timeline,
          expertise: formData.expertise,
          resources: formData.resources,
          challenges: formData.challenges,
          successMetrics: formData.successMetrics,
          previousExperience: formData.previousExperience,
          references: formData.references,
          additionalInfo: formData.additionalInfo,
          agreeToNDA: formData.agreeToNDA
        }
      }
    ]);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    toast({
      title: "Proposal Submitted!",
      description: "Your collaboration proposal has been submitted. We'll review and get back to you within 48 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      organization: "",
      position: "",
      projectTitle: "",
      projectType: "",
      projectDescription: "",
      objectives: "",
      targetAudience: "",
      expectedDuration: "",
      budget: "",
      timeline: "",
      expertise: [],
      resources: "",
      challenges: "",
      successMetrics: "",
      previousExperience: "",
      references: "",
      additionalInfo: "",
      agreeToTerms: false,
      agreeToNDA: false
    });

  } catch (error) {
    console.error('Error submitting form:', error);
    toast({
      title: "Submission Failed",
      description: "There was an error submitting your proposal. Please try again.",
      variant: "destructive"
    });
  }
};
  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleExpertiseToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.includes(area)
        ? prev.expertise.filter(e => e !== area)
        : [...prev.expertise, area]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link to="/projects" className="inline-flex items-center text-primary hover:text-accent mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-heading font-bold text-primary mb-4">
                Start a Collaboration
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Let's work together to bring your project to life. Share your vision with us 
                and we'll help you develop a comprehensive plan for success.
              </p>
            </div>

            {/* Project Benefits */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {[
                {
                  icon: Lightbulb,
                  title: "Expert Guidance",
                  description: "Access to specialized knowledge and experience"
                },
                {
                  icon: Target,
                  title: "Strategic Planning",
                  description: "Comprehensive project planning and execution"
                },
                {
                  icon: Clock,
                  title: "Timely Delivery",
                  description: "Efficient project management and delivery"
                },
                {
                  icon: DollarSign,
                  title: "Value Creation",
                  description: "Focus on measurable outcomes and ROI"
                }
              ].map((benefit, index) => (
                <Card key={benefit.title} className="text-center">
                  <CardContent className="p-6">
                    <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Collaboration Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Project Collaboration Proposal</CardTitle>
                <p className="text-muted-foreground">
                  Please provide detailed information about your project to help us understand 
                  your needs and how we can best collaborate.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="position">Position/Title</Label>
                        <Input
                          id="position"
                          value={formData.position}
                          onChange={(e) => handleInputChange('position', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="organization">Organization/Company *</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => handleInputChange('organization', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Project Details</h3>
                    
                    <div>
                      <Label htmlFor="projectTitle">Project Title *</Label>
                      <Input
                        id="projectTitle"
                        value={formData.projectTitle}
                        onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="projectType">Project Type *</Label>
                      <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="projectDescription">Project Description *</Label>
                      <Textarea
                        id="projectDescription"
                        value={formData.projectDescription}
                        onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                        placeholder="Provide a detailed description of your project..."
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="objectives">Project Objectives *</Label>
                      <Textarea
                        id="objectives"
                        value={formData.objectives}
                        onChange={(e) => handleInputChange('objectives', e.target.value)}
                        placeholder="What are the main goals and objectives of this project?"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="targetAudience">Target Audience</Label>
                        <Input
                          id="targetAudience"
                          value={formData.targetAudience}
                          onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                          placeholder="Who will benefit from this project?"
                        />
                      </div>
                      <div>
                        <Label htmlFor="expectedDuration">Expected Duration</Label>
                        <Input
                          id="expectedDuration"
                          value={formData.expectedDuration}
                          onChange={(e) => handleInputChange('expectedDuration', e.target.value)}
                          placeholder="e.g., 3 months, 6 months"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="budget">Budget Range</Label>
                        <Input
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          placeholder="e.g., $5,000 - $10,000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="timeline">Preferred Timeline</Label>
                        <Input
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) => handleInputChange('timeline', e.target.value)}
                          placeholder="When would you like to start?"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expertise Required */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Expertise Required</h3>
                    
                    <div>
                      <Label>Areas of Expertise Needed</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {expertiseAreas.map((area) => (
                          <div key={area} className="flex items-center space-x-2">
                            <Checkbox
                              id={area}
                              checked={formData.expertise.includes(area)}
                              onCheckedChange={() => handleExpertiseToggle(area)}
                            />
                            <label htmlFor={area} className="text-sm">{area}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="resources">Resources Available</Label>
                      <Textarea
                        id="resources"
                        value={formData.resources}
                        onChange={(e) => handleInputChange('resources', e.target.value)}
                        placeholder="What resources do you already have for this project?"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="challenges">Expected Challenges</Label>
                      <Textarea
                        id="challenges"
                        value={formData.challenges}
                        onChange={(e) => handleInputChange('challenges', e.target.value)}
                        placeholder="What challenges do you anticipate?"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="successMetrics">Success Metrics</Label>
                      <Textarea
                        id="successMetrics"
                        value={formData.successMetrics}
                        onChange={(e) => handleInputChange('successMetrics', e.target.value)}
                        placeholder="How will you measure the success of this project?"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Additional Information</h3>
                    
                    <div>
                      <Label htmlFor="previousExperience">Previous Experience</Label>
                      <Textarea
                        id="previousExperience"
                        value={formData.previousExperience}
                        onChange={(e) => handleInputChange('previousExperience', e.target.value)}
                        placeholder="Tell us about any relevant previous projects or experience"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="references">References</Label>
                      <Textarea
                        id="references"
                        value={formData.references}
                        onChange={(e) => handleInputChange('references', e.target.value)}
                        placeholder="Provide references or portfolio links (optional)"
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                        placeholder="Any other information you'd like to share"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Agreements */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Agreements</h3>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                      />
                      <label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                        I agree to the <Link to="/terms" className="text-primary hover:underline">terms and conditions</Link> and understand that this is a preliminary proposal subject to further discussion and formal agreement. *
                      </label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToNDA"
                        checked={formData.agreeToNDA}
                        onCheckedChange={(checked) => handleInputChange('agreeToNDA', checked as boolean)}
                      />
                      <label htmlFor="agreeToNDA" className="text-sm">
                        I agree to sign a mutual non-disclosure agreement (NDA) if required during the collaboration discussion phase.
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <Button type="submit" className="w-full" size="lg">
                      Submit Collaboration Proposal
                    </Button>
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      We'll review your proposal and get back to you within 48 hours.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectCollaborationPage;