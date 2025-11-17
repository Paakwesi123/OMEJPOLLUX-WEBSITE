import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, GraduationCap, BookOpen, FileText, Users, Target, Clock, DollarSign, Shield, CreditCard, Upload, X } from "lucide-react";
import emailjs from "@emailjs/browser";

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
    
    // Form Mode
    formMode: "assignment", // "assignment" or "consultation"
    
    // Consultation Focus
    consultationType: "",
    specificServices: [],
    researchArea: "",
    researchTopic: "",
    supervisorStatus: "",
    deadlines: "",
    
    // Enhanced Assignment Fields
    typeOfWork: "",
    numberOfPages: 1,
    spacing: "double",
    sources: 0,
    assignmentTopic: "",
    assignmentInstructions: "",
    citationStyle: "",
    subject: "",
    urgency: "",
    uploadedFiles: [],
    
    // Additional Services for Assignment Orders
    plagiarismReport: false,
    topWriter: false,
    progressiveDelivery: false,
    
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
    
    // Agreements
    agreeToTerms: false,
    agreeToAssessment: false
  });

  const [pricing, setPricing] = useState({
    basePrice: 0,
    urgencyMultiplier: 1,
    additionalServices: 0,
    total: 0
  });

  const academicLevels = [
    "Doctoral (PhD)",
    "Faculty/Staff",
    "Graduate (Master's)",
    "Independent Researcher",
    "Post-Doctoral",
    "Undergraduate (Bachelor's)"
  ];

  const consultationTypes = [
    "Academic Writing & Publishing",
    "Career Guidance",
    "Comprehensive Academic Support",
    "Data Analysis & Statistics",
    "Literature Review",
    "Proposal Development",
    "Research Methodology Training",
    "Thesis/Dissertation Support"
  ];

  const specificServices = [
    "Academic Writing",
    "Citation & Referencing",
    "Conference Preparation",
    "Data Collection Planning",
    "Interview Protocols",
    "Literature Review Strategy",
    "Methodology Development",
    "Presentation Skills",
    "Proofreading & Editing",
    "Publication Support",
    "Qualitative Analysis",
    "Questionnaire Design",
    "Research Design",
    "SPSS Training",
    "Statistical Analysis",
    "Topic Selection & Refinement"
  ];

  const projectStages = [
    "Data Analysis Phase",
    "Data Collection Phase",
    "Final Submission Preparation",
    "Just Starting - Need Topic",
    "Post-Submission Support",
    "Proposal Approved - Starting Research",
    "Review & Revision Phase",
    "Topic Selected - Need Proposal",
    "Writing Phase"
  ];

  const urgencyLevelsRegular = [
    "Emergency - Within 1 week",
    "Moderate - Within 3 months",
    "Not Urgent - General Support",
    "Urgent - Within 1 month",
    "Very Urgent - Within 2 weeks"
  ];

  const typeOfWorkOptions = [
    "Admission Essay",
    "Annotated Bibliography",
    "Article Review",
    "Book Review",
    "Capstone Project",
    "Case Study",
    "Coursework",
    "Creative Writing",
    "Critical Thinking",
    "Dissertation",
    "Dissertation Chapter",
    "Essay (Any Type)",
    "Lab Report",
    "Literature Review",
    "Math Problems",
    "Movie Review",
    "Personal Statement",
    "PowerPoint Presentation",
    "Problem Solving",
    "Programming",
    "Research Paper",
    "Research Proposal",
    "Scholarship Essay",
    "Speech",
    "Statistics Project",
    "Term Paper",
    "Thesis",
    "Other"
  ];

  const urgencyOptionsAssignment = [
    "6 hours",
    "12 hours",
    "24 hours",
    "48 hours",
    "3 days",
    "5 days",
    "7 days",
    "10 days",
    "14 days"
  ];

  const citationStyles = [
    "AMA",
    "APA 6",
    "APA 7",
    "Chicago/Turabian",
    "Harvard",
    "IEEE",
    "MLA",
    "Not Applicable",
    "OSCOLA",
    "Vancouver"
  ];

  const subjectAreas = [
    "Accounting",
    "Anthropology",
    "Architecture",
    "Art",
    "Biology",
    "Business",
    "Chemistry",
    "Communication",
    "Computer Science",
    "Economics",
    "Education",
    "Engineering",
    "English",
    "Finance",
    "Geography",
    "Health Sciences",
    "History",
    "Law",
    "Literature",
    "Management",
    "Marketing",
    "Mathematics",
    "Medicine",
    "Nursing",
    "Philosophy",
    "Physics",
    "Political Science",
    "Psychology",
    "Sociology",
    "Statistics",
    "Other"
  ];

  // Pricing Configuration - GH₵ 250 per page base
  const basePricePerPage = {
    "Undergraduate (Bachelor's)": 250,
    "Graduate (Master's)": 300,
    "Doctoral (PhD)": 400,
    "Post-Doctoral": 400,
    "Faculty/Staff": 350,
    "Independent Researcher": 300
  };

  const urgencyMultipliers = {
    "14 days": 1.0,
    "10 days": 1.2,
    "7 days": 1.4,
    "5 days": 1.6,
    "3 days": 1.9,
    "48 hours": 2.3,
    "24 hours": 2.8,
    "12 hours": 3.5,
    "6 hours": 4.5
  };

  const isAssignmentConsultation = formData.formMode === "assignment";

  // Calculate pricing for assignment orders
  useEffect(() => {
    if (isAssignmentConsultation) {
      calculatePrice();
    }
  }, [
    formData.numberOfPages,
    formData.currentLevel,
    formData.urgency,
    formData.plagiarismReport,
    formData.topWriter,
    formData.progressiveDelivery,
    formData.spacing,
    isAssignmentConsultation
  ]);

  const calculatePrice = () => {
    if (!formData.currentLevel || !formData.urgency) {
      setPricing({ basePrice: 0, urgencyMultiplier: 1, additionalServices: 0, total: 0 });
      return;
    }

    const baseRate = basePricePerPage[formData.currentLevel] || 250;
    const pages = parseInt(formData.numberOfPages) || 1;
    const spacingMultiplier = formData.spacing === "single" ? 2 : 1;
    
    const basePrice = baseRate * pages * spacingMultiplier;
    const urgencyMult = urgencyMultipliers[formData.urgency] || 1;
    
    let additionalServices = 0;
    if (formData.plagiarismReport) additionalServices += 50;
    if (formData.topWriter) additionalServices += basePrice * 0.25;
    if (formData.progressiveDelivery) additionalServices += basePrice * 0.10;

    const subtotal = basePrice * urgencyMult;
    const total = subtotal + additionalServices;

    setPricing({
      basePrice: basePrice,
      urgencyMultiplier: urgencyMult,
      additionalServices: additionalServices,
      total: total
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB per file
    
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: `${file.name} exceeds 10MB limit`,
          variant: "destructive"
        });
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...validFiles]
      }));
      
      toast({
        title: "Files Added",
        description: `${validFiles.length} file(s) uploaded successfully`,
      });
    }
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }));
  };

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

    // For Assignment orders, require payment first
    if (isAssignmentConsultation) {
      if (pricing.total === 0) {
        toast({
          title: "Incomplete Order",
          description: "Please complete all required fields to calculate the price.",
          variant: "destructive"
        });
        return;
      }
      // Initiate payment
      initiatePayment();
      return;
    }

    // Regular consultation submission (non-assignment)
    const baseRequiredFields = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      currentLevel: formData.currentLevel,
      institution: formData.institution,
      program: formData.program,
      challenges: formData.challenges
    };

    const missingFields = Object.entries(baseRequiredFields)
      .filter(([_, value]) => !value || value.trim() === "")
      .map(([key]) => key);

    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill in: ${missingFields.join(", ")}`,
        variant: "destructive"
      });
      return;
    }

    try {
      await submitToSupabase();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    }
  };

  const initiatePayment = () => {
    const amountInGHS = pricing.total;
    const amountInPesewas = Math.round(amountInGHS * 100);

    // Validate required fields for assignment order
    const requiredFields = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      currentLevel: formData.currentLevel,
      institution: formData.institution,
      program: formData.program,
      typeOfWork: formData.typeOfWork,
      numberOfPages: formData.numberOfPages,
      urgency: formData.urgency,
      subject: formData.subject,
      assignmentTopic: formData.assignmentTopic,
      assignmentInstructions: formData.assignmentInstructions,
      citationStyle: formData.citationStyle
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value || value === "")
      .map(([key]) => key);

    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill in: ${missingFields.join(", ")}`,
        variant: "destructive"
      });
      return;
    }

    // Initialize Paystack Payment
    if (typeof window.PaystackPop === 'undefined') {
      alert('Payment system not loaded. Please add Paystack script to your HTML: <script src="https://js.paystack.co/v1/inline.js"></script>');
      return;
    }

    const handler = window.PaystackPop.setup({
      key: 'pk_live_f99ce79da6efbe6db9d958b9c4239049ad2021e3', // Replace with your Paystack public key
      email: formData.email,
      amount: amountInPesewas,
      currency: 'GHS',
      ref: 'ORD_' + Math.floor((Math.random() * 1000000000) + 1),
      metadata: {
        custom_fields: [
          {
            display_name: "Order Type",
            variable_name: "order_type",
            value: formData.typeOfWork
          },
          {
            display_name: "Academic Level",
            variable_name: "academic_level",
            value: formData.currentLevel
          },
          {
            display_name: "Pages",
            variable_name: "pages",
            value: formData.numberOfPages
          },
          {
            display_name: "Topic",
            variable_name: "topic",
            value: formData.assignmentTopic
          }
        ]
      },
      callback: function(response) {
        handlePaymentSuccess(response);
      },
      onClose: function() {
        toast({
          title: "Payment Cancelled",
          description: "Payment window was closed. Please try again when ready.",
        });
      }
    });
    handler.openIframe();
  };

  const handlePaymentSuccess = async (paymentResponse) => {
    try {
      // Add payment info to form data
      const orderData = {
        ...formData,
        pricing: pricing,
        paymentReference: paymentResponse.reference,
        paymentStatus: 'paid',
        orderType: 'assignment_order'
      };

      await submitToSupabase(orderData);

      toast({
        title: "Payment Successful!",
        description: "Your order has been placed successfully. Check your email for confirmation and login details.",
      });

      // Reset form
      resetForm();

    } catch (error) {
      console.error('Error processing order:', error);
      toast({
        title: "Order Processing Error",
        description: "Payment received but there was an error saving your order. Our team will contact you shortly.",
        variant: "destructive"
      });
    }
  };

  const submitToSupabase = async (orderData = null) => {
    const submissionData = {
      form_type: isAssignmentConsultation ? "assignment_order" : "academic_consultation",
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone?.trim() || null,
      message: isAssignmentConsultation 
        ? `Assignment Order: ${formData.assignmentTopic} - ${formData.typeOfWork}` 
        : formData.challenges?.trim() || null,
      submission_category: "consultation",
      status: isAssignmentConsultation ? "paid" : "pending",
      additional_data: orderData || {
        ...formData,
        submissionDate: new Date().toISOString(),
        formVersion: "1.0",
        source: "academic_consultation_form"
      }
    };

    const { data, error } = await supabase
      .from("form_submissions")
      .insert([submissionData])
      .select();

    if (error) throw error;

    // Send emails
    const serviceID = "service_x0fqa5s";
    const clientTemplateID = "template_xgbinrn";
    const adminTemplateID = "template_pdueneh";
    const publicKey = "J5RxqIhrvaUY3iCYh";

    await emailjs.send(serviceID, clientTemplateID, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    }, publicKey);

    await emailjs.send(serviceID, adminTemplateID, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    }, publicKey);

    if (!isAssignmentConsultation) {
      toast({
        title: "Consultation Request Submitted!",
        description: "Your request has been submitted successfully. A confirmation email has been sent to your inbox.",
      });
      resetForm();
    }
  };

  const resetForm = () => {
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
      formMode: "assignment",
      consultationType: "",
      specificServices: [],
      researchArea: "",
      researchTopic: "",
      supervisorStatus: "",
      deadlines: "",
      typeOfWork: "",
      numberOfPages: 1,
      spacing: "double",
      sources: 0,
      assignmentTopic: "",
      assignmentInstructions: "",
      citationStyle: "",
      subject: "",
      urgency: "",
      uploadedFiles: [],
      plagiarismReport: false,
      topWriter: false,
      progressiveDelivery: false,
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
      agreeToTerms: false,
      agreeToAssessment: false,
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (service) => {
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
            <Link to="/academic-consultancy" className="inline-flex items-center text-primary hover:text-accent mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Academic Consultancy
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-4xl font-heading font-bold text-primary mb-4">
                {isAssignmentConsultation ? "Place Your Assignment Order" : "Academic Consultation Request"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                {isAssignmentConsultation 
                  ? "Get professional help with your assignments. Fill out the form below to receive an instant quote and place your order."
                  : "Start your journey to academic excellence. Share your academic goals and challenges with us, and we'll create a personalized support plan to help you succeed."
                }
              </p>
            </div>

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
              ].map((service) => (
                <Card key={service.title} className="text-center">
                  <CardContent className="p-6">
                    <service.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className={isAssignmentConsultation ? "grid lg:grid-cols-3 gap-8" : ""}>
              <div className={isAssignmentConsultation ? "lg:col-span-2" : ""}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <GraduationCap className="w-8 h-8 mr-3 text-primary" />
                      {isAssignmentConsultation ? "Assignment Order Form" : "Academic Consultation Assessment"}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {isAssignmentConsultation 
                        ? "Complete the form below to get an instant quote and place your order. All fields marked with * are required."
                        : "Please provide comprehensive information about your academic background, goals, and support needs. This will help us create the most effective consultation plan for you."
                      }
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Mode Switcher - MOVED TO TOP */}
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                        <div className="text-center">
                          <p className="text-sm text-gray-700 mb-3">
                            {isAssignmentConsultation 
                              ? "Need long-term academic support instead?" 
                              : "Need help with a specific assignment?"}
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleInputChange('formMode', isAssignmentConsultation ? 'consultation' : 'assignment')}
                            className="w-full max-w-md"
                          >
                            {isAssignmentConsultation 
                              ? "Switch to Consultation Request" 
                              : "Switch to Assignment Order"}
                          </Button>
                        </div>
                      </div>

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
                            <Label htmlFor="gpa">Current GPA/Grade</Label>
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

                      {/* Assignment/Consultation Focus */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2 flex items-center">
                          <Target className="w-5 h-5 mr-2" />
                          {isAssignmentConsultation ? "Consulation Focus" : "Consultation Focus"}
                        </h3>
                        
                        {/* Assignment Order Fields - Always visible in assignment mode */}
                        {isAssignmentConsultation ? (
                          <div className="space-y-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-semibold text-lg text-blue-900 flex items-center">
                                <FileText className="w-5 h-5 mr-2" />
                                Order Information
                              </h4>
                              {pricing.total > 0 && (
                                <div className="text-right">
                                  <div className="text-sm text-gray-600">Estimated Price</div>
                                  <div className="text-2xl font-bold text-blue-600">
                                    GH₵ {pricing.total.toFixed(2)}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label>Type of Work *</Label>
                                <Select value={formData.typeOfWork} onValueChange={(value) => handleInputChange('typeOfWork', value)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type of work" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {typeOfWorkOptions.map((type) => (
                                      <SelectItem key={type} value={type}>{type}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label>Subject Area *</Label>
                                <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select subject" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {subjectAreas.map((subject) => (
                                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                              <div>
                                <Label>Number of Pages *</Label>
                                <Input
                                  type="number"
                                  min="1"
                                  value={formData.numberOfPages}
                                  onChange={(e) => handleInputChange('numberOfPages', e.target.value)}
                                />
                                <p className="text-xs text-gray-500 mt-1">275 words per page</p>
                              </div>

                              <div>
                                <Label>Spacing</Label>
                                <Select value={formData.spacing} onValueChange={(value) => handleInputChange('spacing', value)}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="double">Double (default)</SelectItem>
                                    <SelectItem value="single">Single (+100%)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label>Deadline *</Label>
                                <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select deadline" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {urgencyOptionsAssignment.map((option) => (
                                      <SelectItem key={option} value={option}>{option}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label>Citation Style *</Label>
                                <Select value={formData.citationStyle} onValueChange={(value) => handleInputChange('citationStyle', value)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select citation style" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {citationStyles.map((style) => (
                                      <SelectItem key={style} value={style}>{style}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label>Number of Sources/References</Label>
                                <Input
                                  type="number"
                                  min="0"
                                  value={formData.sources}
                                  onChange={(e) => handleInputChange('sources', e.target.value)}
                                  placeholder="0"
                                />
                              </div>
                            </div>

                            <div>
                              <Label>Assignment Topic/Title *</Label>
                              <Input
                                value={formData.assignmentTopic}
                                onChange={(e) => handleInputChange('assignmentTopic', e.target.value)}
                                placeholder="Enter your assignment topic"
                              />
                            </div>

                            <div>
                              <Label>Detailed Instructions *</Label>
                              <Textarea
                                value={formData.assignmentInstructions}
                                onChange={(e) => handleInputChange('assignmentInstructions', e.target.value)}
                                placeholder="Provide detailed instructions for your assignment. Include any specific requirements, formatting guidelines, or important points to cover..."
                                rows={6}
                              />
                            </div>

                            {/* File Upload Section */}
                            <div className="space-y-3">
                              <Label>Upload Files (Optional)</Label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                <input
                                  type="file"
                                  id="fileUpload"
                                  multiple
                                  onChange={handleFileUpload}
                                  className="hidden"
                                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.xls,.xlsx,.ppt,.pptx"
                                />
                                <label htmlFor="fileUpload" className="cursor-pointer">
                                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                                  <p className="text-sm font-medium text-gray-700">
                                    Click to upload or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    PDF, DOC, DOCX, TXT, Images, Excel, PowerPoint (Max 10MB per file)
                                  </p>
                                </label>
                              </div>
                              
                              {formData.uploadedFiles.length > 0 && (
                                <div className="space-y-2">
                                  <p className="text-sm font-medium">Uploaded Files:</p>
                                  {formData.uploadedFiles.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-white border rounded">
                                      <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm">{file.name}</span>
                                        <span className="text-xs text-gray-500">
                                          ({(file.size / 1024).toFixed(1)} KB)
                                        </span>
                                      </div>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFile(index)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Additional Services */}
                            <div className="space-y-3 pt-4 border-t">
                              <h5 className="font-semibold text-sm text-gray-700">Additional Services</h5>
                              
                              <div className="flex items-start space-x-3 p-3 bg-white border rounded-lg hover:bg-gray-50">
                                <Checkbox
                                  checked={formData.topWriter}
                                  onCheckedChange={(checked) => handleInputChange('topWriter', checked)}
                                />
                                <div className="flex-1">
                                  <div className="font-medium text-sm">Top Writer (+25%)</div>
                                  <p className="text-xs text-gray-600">
                                    Get your order assigned to one of our top-rated, most experienced writers
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3 p-3 bg-white border rounded-lg hover:bg-gray-50">
                                <Checkbox
                                  checked={formData.plagiarismReport}
                                  onCheckedChange={(checked) => handleInputChange('plagiarismReport', checked)}
                                />
                                <div className="flex-1">
                                  <div className="font-medium text-sm">Plagiarism Report (+GH₵ 50)</div>
                                  <p className="text-xs text-gray-600">
                                    Receive a detailed originality report from Turnitin or Copyscape
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3 p-3 bg-white border rounded-lg hover:bg-gray-50">
                                <Checkbox
                                  checked={formData.progressiveDelivery}
                                  onCheckedChange={(checked) => handleInputChange('progressiveDelivery', checked)}
                                />
                                <div className="flex-1">
                                  <div className="font-medium text-sm">Progressive Delivery (+10%)</div>
                                  <p className="text-xs text-gray-600">
                                    Receive your order in parts to review progress throughout the writing process
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Consultation Mode Fields
                          <div className="space-y-4">
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
                                    {urgencyLevelsRegular.map((level) => (
                                      <SelectItem key={level} value={level}>{level}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="researchTopic">Research Topic/Thesis Title</Label>
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
                                  placeholder="Do you have a supervisor?"
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
                        )}
                      </div>

                      {/* Project Details - Only for Consultation Mode */}
                      {!isAssignmentConsultation && formData.consultationType && (
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
                      )}

                      {/* Challenges & Requirements */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2 flex items-center">
                          <Clock className="w-5 h-5 mr-2" />
                          {isAssignmentConsultation ? "Additional Information" : "Challenges & Requirements"}
                        </h3>
                        
                        {!isAssignmentConsultation && (
                          <div>
                            <Label htmlFor="challenges">Main Challenges/Difficulties *</Label>
                            <Textarea
                              id="challenges"
                              value={formData.challenges}
                              onChange={(e) => handleInputChange('challenges', e.target.value)}
                              placeholder="What specific challenges are you facing? What obstacles need to be overcome?"
                              rows={4}
                            />
                          </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="previousSupport">Previous Academic Support</Label>
                            <Textarea
                              id="previousSupport"
                              value={formData.previousSupport}
                              onChange={(e) => handleInputChange('previousSupport', e.target.value)}
                              placeholder="Have you received academic support before?"
                              rows={3}
                            />
                          </div>
                          {!isAssignmentConsultation && (
                            <div>
                              <Label htmlFor="budget">Budget Range</Label>
                              <Input
                                id="budget"
                                value={formData.budget}
                                onChange={(e) => handleInputChange('budget', e.target.value)}
                                placeholder="What's your budget for consultation services?"
                              />
                            </div>
                          )}
                        </div>

                        {!isAssignmentConsultation && (
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
                        )}

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
                                <SelectItem value="french">French</SelectItem>
                                <SelectItem value="spanish">Spanish</SelectItem>
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
                            placeholder="Any other information you'd like to share..."
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
                            onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                          />
                          <label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                            I agree to the <Link to="/terms" className="text-primary hover:underline">terms and conditions</Link> and <Link to="/privacy" className="text-primary hover:underline">privacy policy</Link>. {isAssignmentConsultation && "I understand that this service is for research and reference purposes only."} *
                          </label>
                        </div>

                        {!isAssignmentConsultation && (
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="agreeToAssessment"
                              checked={formData.agreeToAssessment}
                              onCheckedChange={(checked) => handleInputChange('agreeToAssessment', checked)}
                            />
                            <label htmlFor="agreeToAssessment" className="text-sm">
                              I consent to an initial assessment call to discuss my needs.
                            </label>
                          </div>
                        )}
                      </div>

                      <div className="pt-6 border-t">
                        <Button 
                          type="submit"
                          className="w-full" 
                          size="lg"
                          disabled={!formData.agreeToTerms}
                        >
                          {isAssignmentConsultation ? (
                            <>
                              <CreditCard className="w-5 h-5 mr-2" />
                              Proceed to Payment
                            </>
                          ) : (
                            "Submit Consultation Request"
                          )}
                        </Button>
                        <div className="text-center mt-4 space-y-2">
                          {isAssignmentConsultation ? (
                            <>
                              <p className="text-sm text-muted-foreground">
                                Secure payment via Paystack. You'll receive login credentials to track your order after payment.
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Writer assigned within 2 hours • Unlimited free revisions • 24/7 support
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="text-sm text-muted-foreground">
                                Our academic consultants will review your request and contact you within 24 hours.
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Urgent requests will be prioritized and responded to within 4-6 hours.
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Price Summary Sidebar - Only for Assignment Orders */}
              {isAssignmentConsultation && (
                <div className="lg:col-span-1">
                  <div className="sticky top-4">
                    <Card className="border-2 border-blue-200">
                      <CardHeader className="bg-blue-50">
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="w-6 h-6 text-blue-600" />
                          Price Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Academic Level:</span>
                            <span className="font-medium">{formData.currentLevel || '-'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Pages:</span>
                            <span className="font-medium">{formData.numberOfPages} ({formData.spacing})</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Deadline:</span>
                            <span className="font-medium">{formData.urgency || '-'}</span>
                          </div>
                        </div>

                        <div className="border-t pt-3 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Base Price:</span>
                            <span>GH₵ {pricing.basePrice.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Urgency ({pricing.urgencyMultiplier}x):</span>
                            <span>GH₵ {(pricing.basePrice * (pricing.urgencyMultiplier - 1)).toFixed(2)}</span>
                          </div>
                          {pricing.additionalServices > 0 && (
                            <div className="flex justify-between text-sm">
                              <span>Additional Services:</span>
                              <span>GH₵ {pricing.additionalServices.toFixed(2)}</span>
                            </div>
                          )}
                        </div>

                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">Total:</span>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-blue-600">
                                GH₵ {pricing.total.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Shield className="w-4 h-4 text-green-600" />
                            <span>Secure payment via Paystack</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-green-600" />
                            <span>Writer assigned within 2 hours</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <BookOpen className="w-4 h-4 text-green-600" />
                            <span>Unlimited free revisions</span>
                          </div>
                        </div>

                      </CardContent>
                    </Card>

                    <Card className="mt-4">
                      <CardContent className="p-4">
                        <div className="text-center space-y-2">
                          <p className="text-xs font-semibold text-gray-700">TRUSTED BY 10,000+ STUDENTS</p>
                          <div className="flex justify-center gap-4 items-center">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">4.9/5</div>
                              <div className="text-xs text-gray-600">Rating</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">98%</div>
                              <div className="text-xs text-gray-600">On-Time</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">24/7</div>
                              <div className="text-xs text-gray-600">Support</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AcademicConsultationPage;