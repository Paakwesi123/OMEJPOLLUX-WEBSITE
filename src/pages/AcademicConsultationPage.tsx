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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, GraduationCap, BookOpen, FileText, Users, Target, Clock } from "lucide-react";

const AcademicConsultationPage = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    phone: "",
    nationality: "",
    currentLocation: "",
    
    // Academic Background
    currentLevel: "",
    institution: "",
    program: "",
    yearOfStudy: "",
    previousDegrees: "",
    gpa: "",
    
    // Consultation Focus
    consultationType: "",
    specificServices: [],
    researchArea: "",
    researchTopic: "",
    supervisorStatus: "",
    deadlines: "",
    
    // Project Details
    projectStage: "",
    projectDescription: "",
    methodology: "",
    dataCollection: "",
    analysisNeeds: "",
    writingSupport: "",
    
    // Challenges & Requirements
    challenges: "",
    previousSupport: "",
    budget: "",
    timeline: "",
    preferredMeetings: "",
    
    // Additional Information
    softwareNeeds: "",
    language: "",
    additionalInfo: "",
    urgency: "",
    
    // Agreements
    agreeToTerms: false,
    agreeToAssessment: false
  });

  const academicLevels = [
    "Undergraduate (Bachelor's)",
    "Graduate (Master's)",
    "Doctoral (PhD)",
    "Post-Doctoral",
    "Faculty/Staff",
    "Independent Researcher"
  ];

  const consultationTypes = [
    "Thesis/Dissertation Support",
    "Research Methodology Training",
    "Data Analysis & Statistics",
    "Academic Writing & Publishing",
    "Literature Review",
    "Proposal Development",
    "Comprehensive Academic Support",
    "Career Guidance"
  ];

  const specificServices = [
    "Topic Selection & Refinement",
    "Literature Review Strategy",
    "Research Design",
    "Methodology Development",
    "Questionnaire Design",
    "Interview Protocols",
    "Data Collection Planning",
    "SPSS Training",
    "Qualitative Analysis",
    "Statistical Analysis",
    "Academic Writing",
    "Citation & Referencing",
    "Proofreading & Editing",
    "Publication Support",
    "Presentation Skills",
    "Conference Preparation"
  ];

  const projectStages = [
    "Just Starting - Need Topic",
    "Topic Selected - Need Proposal",
    "Proposal Approved - Starting Research",
    "Data Collection Phase",
    "Data Analysis Phase",
    "Writing Phase",
    "Review & Revision Phase",
    "Final Submission Preparation",
    "Post-Submission Support"
  ];

  const urgencyLevels = [
    "Not Urgent - General Support",
    "Moderate - Within 3 months",
    "Urgent - Within 1 month", 
    "Very Urgent - Within 2 weeks",
    "Emergency - Within 1 week"
  ];

  // Updated handleSubmit function for your AcademicConsultationPage.tsx
// This ensures all form data is properly recorded for the dashboard

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.agreeToTerms) {
    toast({
      title: "Terms Required",
      description: "Please agree to the terms and conditions to continue.",
      variant: "destructive"
    });
    return;
  }

  // Validate required fields
  const requiredFields = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    currentLevel: formData.currentLevel,
    institution: formData.institution,
    program: formData.program,
    challenges: formData.challenges,
    urgency: formData.urgency
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([key, value]) => !value || value.trim() === '')
    .map(([key]) => key);

  if (missingFields.length > 0) {
    toast({
      title: "Missing Required Fields",
      description: `Please fill in: ${missingFields.join(', ')}`,
      variant: "destructive"
    });
    return;
  }

  try {
    console.log('Starting form submission...', formData); // Debug log

    const submissionData = {
      form_type: 'academic_consultation', // Make sure this matches your enum
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone?.trim() || null,
      message: formData.challenges?.trim() || null, // Main message field
      submission_category: 'consultation', // Add category for filtering
      status: 'pending', // Explicit status
      additional_data: {
        // Personal Information
        nationality: formData.nationality?.trim() || null,
        currentLocation: formData.currentLocation?.trim() || null,
        
        // Academic Background
        currentLevel: formData.currentLevel?.trim() || null,
        institution: formData.institution?.trim() || null,
        program: formData.program?.trim() || null,
        yearOfStudy: formData.yearOfStudy?.trim() || null,
        previousDegrees: formData.previousDegrees?.trim() || null,
        gpa: formData.gpa?.trim() || null,
        
        // Consultation Focus
        consultationType: formData.consultationType?.trim() || null,
        specificServices: formData.specificServices || [], // Array of services
        researchArea: formData.researchArea?.trim() || null,
        researchTopic: formData.researchTopic?.trim() || null,
        supervisorStatus: formData.supervisorStatus?.trim() || null,
        deadlines: formData.deadlines?.trim() || null,
        urgency: formData.urgency?.trim() || null,
        
        // Project Details
        projectStage: formData.projectStage?.trim() || null,
        projectDescription: formData.projectDescription?.trim() || null,
        methodology: formData.methodology?.trim() || null,
        dataCollection: formData.dataCollection?.trim() || null,
        analysisNeeds: formData.analysisNeeds?.trim() || null,
        writingSupport: formData.writingSupport?.trim() || null,
        
        // Challenges & Requirements
        mainChallenges: formData.challenges?.trim() || null, // Duplicate for easy access
        previousSupport: formData.previousSupport?.trim() || null,
        budget: formData.budget?.trim() || null,
        timeline: formData.timeline?.trim() || null,
        preferredMeetings: formData.preferredMeetings?.trim() || null,
        softwareNeeds: formData.softwareNeeds?.trim() || null,
        language: formData.language?.trim() || 'english',
        
        // Additional Information
        additionalInfo: formData.additionalInfo?.trim() || null,
        
        // Agreements
        agreeToAssessment: formData.agreeToAssessment || false,
        agreeToTerms: formData.agreeToTerms || false,
        
        // Metadata for dashboard
        submissionDate: new Date().toISOString(),
        formVersion: '1.0',
        source: 'academic_consultation_form'
      }
    };

    console.log('Prepared submission data:', submissionData); // Debug log

    const { data, error } = await supabase
      .from('form_submissions')
      .insert([submissionData])
      .select(); // Get the inserted data back

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        submissionData: submissionData // Log the data that failed
      });
      throw error;
    }

    console.log('Form submitted successfully:', data); // Success log

    toast({
      title: "Consultation Request Submitted!",
      description: "Your academic consultation request has been submitted. Our team will review and contact you within 24 hours.",
    });

    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      nationality: "",
      currentLocation: "",
      currentLevel: "",
      institution: "",
      program: "",
      yearOfStudy: "",
      previousDegrees: "",
      gpa: "",
      consultationType: "",
      specificServices: [],
      researchArea: "",
      researchTopic: "",
      supervisorStatus: "",
      deadlines: "",
      projectStage: "",
      projectDescription: "",
      methodology: "",
      dataCollection: "",
      analysisNeeds: "",
      writingSupport: "",
      challenges: "",
      previousSupport: "",
      budget: "",
      timeline: "",
      preferredMeetings: "",
      softwareNeeds: "",
      language: "",
      additionalInfo: "",
      urgency: "",
      agreeToTerms: false,
      agreeToAssessment: false
    });

  } catch (error) {
    console.error('Form submission error:', error);
    
    // More specific error messages
    let errorMessage = "There was an error submitting your request. Please try again.";
    
    if (error.message?.includes('enum')) {
      errorMessage = "Invalid form type. Please refresh the page and try again.";
    } else if (error.message?.includes('policy')) {
      errorMessage = "Permission error. Please contact support.";
    } else if (error.message?.includes('network')) {
      errorMessage = "Network error. Please check your connection and try again.";
    }
    
    toast({
      title: "Submission Error",
      description: errorMessage,
      variant: "destructive"
    });
  }
};

// Additional helper function to test your form_type enum
const testEnumValues = async () => {
  try {
    const { data, error } = await supabase
      .rpc('get_form_type_enum_values') // You'll need to create this function
      .single();
    
    console.log('Available form_type values:', data);
  } catch (error) {
    console.log('Could not fetch enum values:', error);
  }
};

// SQL function to add to your Supabase (run in SQL Editor):
/*
CREATE OR REPLACE FUNCTION get_form_type_enum_values()
RETURNS text[]
LANGUAGE sql
AS $$
  SELECT array_agg(e.enumlabel)
  FROM pg_enum e
  JOIN pg_type t ON e.enumtypid = t.oid
  WHERE t.typname = 'form_type';
$$;
*/

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      specificServices: prev.specificServices.includes(service)
        ? prev.specificServices.filter(s => s !== service)
        : [...prev.specificServices, service]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Back Button */}
            <Link to="/academic-consultancy" className="inline-flex items-center text-primary hover:text-accent mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Academic Consultancy
            </Link>

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-heading font-bold text-primary mb-4">
                Academic Consultation Request
              </h1>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Start your journey to academic excellence. Share your academic goals and challenges 
                with us, and we'll create a personalized support plan to help you succeed.
              </p>
            </div>

            {/* Service Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: BookOpen,
                  title: "Comprehensive Support",
                  description: "From topic selection to final submission"
                },
                {
                  icon: Users,
                  title: "Expert Mentorship",
                  description: "Work with experienced academic consultants"
                },
                {
                  icon: Target,
                  title: "Personalized Approach",
                  description: "Tailored strategies for your specific needs"
                }
              ].map((service, index) => (
                <Card key={service.title} className="text-center">
                  <CardContent className="p-6">
                    <service.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Consultation Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <GraduationCap className="w-8 h-8 mr-3 text-primary" />
                  Academic Consultation Assessment
                </CardTitle>
                <p className="text-muted-foreground">
                  Please provide comprehensive information about your academic background, goals, 
                  and support needs. This will help us create the most effective consultation plan for you.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Personal Information
                    </h3>
                    
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

                    <div className="grid md:grid-cols-3 gap-4">
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
                        <Label htmlFor="nationality">Nationality</Label>
                        <Input
                          id="nationality"
                          value={formData.nationality}
                          onChange={(e) => handleInputChange('nationality', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="currentLocation">Current Location</Label>
                        <Input
                          id="currentLocation"
                          value={formData.currentLocation}
                          onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Academic Background */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2 flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Academic Background
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="currentLevel">Current Academic Level *</Label>
                        <Select value={formData.currentLevel} onValueChange={(value) => handleInputChange('currentLevel', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your current level" />
                          </SelectTrigger>
                          <SelectContent>
                            {academicLevels.map((level) => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="institution">Institution *</Label>
                        <Input
                          id="institution"
                          value={formData.institution}
                          onChange={(e) => handleInputChange('institution', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="program">Program/Field of Study *</Label>
                        <Input
                          id="program"
                          value={formData.program}
                          onChange={(e) => handleInputChange('program', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="yearOfStudy">Year of Study</Label>
                        <Input
                          id="yearOfStudy"
                          value={formData.yearOfStudy}
                          onChange={(e) => handleInputChange('yearOfStudy', e.target.value)}
                          placeholder="e.g., 2nd year, Final year"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gpa">Current GPA/Grade (if applicable)</Label>
                        <Input
                          id="gpa"
                          value={formData.gpa}
                          onChange={(e) => handleInputChange('gpa', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="previousDegrees">Previous Degrees/Qualifications</Label>
                      <Textarea
                        id="previousDegrees"
                        value={formData.previousDegrees}
                        onChange={(e) => handleInputChange('previousDegrees', e.target.value)}
                        placeholder="List your previous educational qualifications..."
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Consultation Focus */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Consultation Focus
                    </h3>
                    
                    <div>
                      <Label htmlFor="consultationType">Primary Consultation Type *</Label>
                      <Select value={formData.consultationType} onValueChange={(value) => handleInputChange('consultationType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select consultation type" />
                        </SelectTrigger>
                        <SelectContent>
                          {consultationTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Specific Services Needed</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                        {specificServices.map((service) => (
                          <div key={service} className="flex items-center space-x-2">
                            <Checkbox
                              id={service}
                              checked={formData.specificServices.includes(service)}
                              onCheckedChange={() => handleServiceToggle(service)}
                            />
                            <label htmlFor={service} className="text-xs">{service}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="researchArea">Research Area/Discipline</Label>
                        <Input
                          id="researchArea"
                          value={formData.researchArea}
                          onChange={(e) => handleInputChange('researchArea', e.target.value)}
                          placeholder="e.g., Business Administration, Education"
                        />
                      </div>
                      <div>
                        <Label htmlFor="urgency">Urgency Level *</Label>
                        <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="How urgent is your need?" />
                          </SelectTrigger>
                          <SelectContent>
                            {urgencyLevels.map((level) => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="researchTopic">Research Topic/Thesis Title (if applicable)</Label>
                      <Textarea
                        id="researchTopic"
                        value={formData.researchTopic}
                        onChange={(e) => handleInputChange('researchTopic', e.target.value)}
                        placeholder="Provide your research topic or working title..."
                        rows={2}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="supervisorStatus">Supervisor Status</Label>
                        <Input
                          id="supervisorStatus"
                          value={formData.supervisorStatus}
                          onChange={(e) => handleInputChange('supervisorStatus', e.target.value)}
                          placeholder="Do you have a supervisor? Are they supportive?"
                        />
                      </div>
                      <div>
                        <Label htmlFor="deadlines">Important Deadlines</Label>
                        <Input
                          id="deadlines"
                          value={formData.deadlines}
                          onChange={(e) => handleInputChange('deadlines', e.target.value)}
                          placeholder="e.g., Proposal due March 2024"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Project Details
                    </h3>
                    
                    <div>
                      <Label htmlFor="projectStage">Current Project Stage</Label>
                      <Select value={formData.projectStage} onValueChange={(value) => handleInputChange('projectStage', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="What stage are you currently at?" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectStages.map((stage) => (
                            <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="projectDescription">Project Description</Label>
                      <Textarea
                        id="projectDescription"
                        value={formData.projectDescription}
                        onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                        placeholder="Describe your research project, thesis, or academic work..."
                        rows={4}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="methodology">Research Methodology</Label>
                        <Textarea
                          id="methodology"
                          value={formData.methodology}
                          onChange={(e) => handleInputChange('methodology', e.target.value)}
                          placeholder="Quantitative, qualitative, mixed methods?"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dataCollection">Data Collection Plans</Label>
                        <Textarea
                          id="dataCollection"
                          value={formData.dataCollection}
                          onChange={(e) => handleInputChange('dataCollection', e.target.value)}
                          placeholder="Surveys, interviews, experiments, etc."
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="analysisNeeds">Data Analysis Needs</Label>
                        <Textarea
                          id="analysisNeeds"
                          value={formData.analysisNeeds}
                          onChange={(e) => handleInputChange('analysisNeeds', e.target.value)}
                          placeholder="What type of analysis do you need help with?"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="writingSupport">Writing Support Needed</Label>
                        <Textarea
                          id="writingSupport"
                          value={formData.writingSupport}
                          onChange={(e) => handleInputChange('writingSupport', e.target.value)}
                          placeholder="Academic writing, structure, style, etc."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Challenges & Requirements */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Challenges & Requirements
                    </h3>
                    
                    <div>
                      <Label htmlFor="challenges">Main Challenges/Difficulties *</Label>
                      <Textarea
                        id="challenges"
                        value={formData.challenges}
                        onChange={(e) => handleInputChange('challenges', e.target.value)}
                        placeholder="What specific challenges are you facing? What obstacles need to be overcome?"
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="previousSupport">Previous Academic Support</Label>
                        <Textarea
                          id="previousSupport"
                          value={formData.previousSupport}
                          onChange={(e) => handleInputChange('previousSupport', e.target.value)}
                          placeholder="Have you received academic support before? What worked/didn't work?"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="budget">Budget Range</Label>
                        <Input
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          placeholder="What's your budget for consultation services?"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="timeline">Preferred Timeline</Label>
                        <Input
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) => handleInputChange('timeline', e.target.value)}
                          placeholder="How long do you expect the consultation to last?"
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredMeetings">Preferred Meeting Style</Label>
                        <Select value={formData.preferredMeetings} onValueChange={(value) => handleInputChange('preferredMeetings', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="How would you like to meet?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="online">Online/Virtual</SelectItem>
                            <SelectItem value="in-person">In-Person</SelectItem>
                            <SelectItem value="hybrid">Hybrid (Both)</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="softwareNeeds">Software/Tools Needed</Label>
                        <Input
                          id="softwareNeeds"
                          value={formData.softwareNeeds}
                          onChange={(e) => handleInputChange('softwareNeeds', e.target.value)}
                          placeholder="SPSS, NVivo, EndNote, etc."
                        />
                      </div>
                      <div>
                        <Label htmlFor="language">Preferred Language</Label>
                        <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select preferred language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="twi">Twi</SelectItem>
                            <SelectItem value="ga">Ga</SelectItem>
                            <SelectItem value="ewe">Ewe</SelectItem>
                            <SelectItem value="dagaare">Dagaare</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Additional Information</h3>
                    
                    <div>
                      <Label htmlFor="additionalInfo">Additional Comments/Questions</Label>
                      <Textarea
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                        placeholder="Any other information you'd like to share or specific questions you have..."
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Agreements */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Agreements & Consent</h3>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                      />
                      <label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                        I agree to the <Link to="/terms" className="text-primary hover:underline">terms and conditions</Link> and <Link to="/privacy" className="text-primary hover:underline">privacy policy</Link>. I understand that this consultation request will be reviewed and a customized support plan will be provided. *
                      </label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToAssessment"
                        checked={formData.agreeToAssessment}
                        onCheckedChange={(checked) => handleInputChange('agreeToAssessment', checked as boolean)}
                      />
                      <label htmlFor="agreeToAssessment" className="text-sm">
                        I consent to an initial assessment call to discuss my needs and determine the best consultation approach.
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <Button type="submit" className="w-full" size="lg">
                      Submit Consultation Request
                    </Button>
                    <div className="text-center mt-4 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Our academic consultants will review your request and contact you within 24 hours.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Urgent requests will be prioritized and responded to within 4-6 hours.
                      </p>
                    </div>
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

export default AcademicConsultationPage;