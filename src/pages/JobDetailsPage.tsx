import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Briefcase, ArrowLeft, Upload, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AdinkraSymbol from "@/components/AdinkraSymbols";

interface Job {
  id: string;
  title: string;
  description: string;
  requirements: any;
  application_deadline: string;
  application_instructions: string;
  location: string;
  employment_type: string;
  salary_range: string;
}

interface ApplicationForm {
  name: string;
  email: string;
  phone: string;
  cover_letter: string;
}

const JobDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [formData, setFormData] = useState<ApplicationForm>({
    name: '',
    email: '',
    phone: '',
    cover_letter: ''
  });

  useEffect(() => {
    if (id) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .is('deleted_at', null)
        .single();

      if (error) throw error;
      setJob(data);
    } catch (error) {
      console.error('Error fetching job:', error);
      toast({
        title: "Error",
        description: "Job not found",
        variant: "destructive"
      });
      navigate('/careers');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document",
          variant: "destructive"
        });
        return;
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      
      setCvFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!job || !cvFile) {
      toast({
        title: "Missing information",
        description: "Please fill all fields and upload your CV",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);

    try {
      // First, upload CV to storage
      const fileExt = cvFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `applications/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
      .from('cvs')
      .upload(filePath, cvFile);
    
    if (uploadError) throw uploadError;
    
    // Don't get public URL - store the file path instead
    const cvStoragePath = filePath;

      // Save to form_submissions table
      const { error: submissionError } = await supabase
        .from('form_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.cover_letter,
          form_type: 'job_application',
          additional_data: {
            job_id: job.id,
            job_title: job.title,
            cv_storage_path: cvStoragePath,
            cv_filename: cvFile.name,
            cv_file_size: cvFile.size,
            cv_content_type: cvFile.type,
            employment_type: job.employment_type,
            location: job.location,
            salary_range: job.salary_range,
            application_deadline: job.application_deadline
          }
        });

      if (submissionError) throw submissionError;

      toast({
        title: "Application submitted!",
        description: "Thank you for your interest. We'll review your application and get back to you soon.",
      });
      
      // Reset form
      setFormData({ name: '', email: '', phone: '', cover_letter: '' });
      setCvFile(null);
      setShowApplication(false);
      
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading job details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  if (!job) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-primary mb-4">Job Not Found</h2>
            <Button onClick={() => navigate('/careers')}>
              View All Jobs
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 relative overflow-hidden">
        <div className="absolute top-10 right-10">
          <AdinkraSymbol symbol="gye-nyame" size="lg" className="w-20 h-20 text-primary/10" />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/careers')}
              className="text-muted-foreground hover:text-primary mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Careers
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                  {job.title}
                </h1>
                
                <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
                  {job.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {job.employment_type}
                  </div>
                  {job.application_deadline && (
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      Apply by {formatDate(job.application_deadline)}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Badge variant="secondary">{job.employment_type}</Badge>
                  {job.salary_range && (
                    <Badge variant="outline">{job.salary_range}</Badge>
                  )}
                </div>
              </div>
              
              <Button 
                size="lg"
                onClick={() => setShowApplication(true)}
                className="md:min-w-[200px]"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-20 section-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Description */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            {job.requirements && Array.isArray(job.requirements) && job.requirements.length > 0 && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Application Instructions */}
            {job.application_instructions && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Application Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {job.application_instructions}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-primary">Apply for {job.title}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowApplication(false)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cv">CV/Resume *</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      required
                    />
                    {cvFile && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        {cvFile.name}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cover_letter">Cover Letter *</Label>
                  <Textarea
                    id="cover_letter"
                    value={formData.cover_letter}
                    onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    rows={6}
                    required
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowApplication(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="flex-1"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default JobDetailsPage;