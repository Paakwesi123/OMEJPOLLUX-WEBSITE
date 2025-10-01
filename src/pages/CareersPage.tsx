import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Briefcase, Users, ArrowLeft, Share2 } from "lucide-react";
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
  created_at: string;
}

const CareersPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_published', true)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: "Failed to load job listings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async (job: Job) => {
    const jobUrl = `${window.location.origin}/careers/${job.id}`;
    const shareText = `Check out this job opportunity: ${job.title} at our company!\n\n${job.description?.slice(0, 100)}...\n\nLocation: ${job.location}\nType: ${job.employment_type}`;

    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: shareText,
          url: jobUrl
        });
      } catch (error) {
        // User cancelled share or error occurred
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: Show share options
      showShareOptions(job, jobUrl, shareText);
    }
  };

  const showShareOptions = (job: Job, jobUrl: string, shareText: string) => {
    const encodedUrl = encodeURIComponent(jobUrl);
    const encodedText = encodeURIComponent(shareText);

    // WhatsApp
    const whatsappUrl = `https://wa.me/?text=${encodedText}%0A%0A${encodedUrl}`;
    
    // Email
    const emailSubject = encodeURIComponent(`Job Opportunity: ${job.title}`);
    const emailBody = encodeURIComponent(`${shareText}\n\nApply here: ${jobUrl}`);
    const emailUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`;

    // Create a temporary menu (you can customize this UI)
    const shareMenu = confirm('Choose sharing option:\n\nOK = WhatsApp\nCancel = Copy Link');
    
    if (shareMenu) {
      window.open(whatsappUrl, '_blank');
    } else {
      navigator.clipboard.writeText(jobUrl);
      toast({
        title: "Link Copied!",
        description: "Job link copied to clipboard"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading opportunities...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 overflow-hidden">
        {/* Background Adinkra Symbols */}
        <div className="absolute top-10 left-10">
          <AdinkraSymbol symbol="adwo" size="lg" className="w-24 h-24 text-primary/10" />
        </div>
        <div className="absolute bottom-10 right-10">
          <AdinkraSymbol symbol="nyame-dua" size="lg" className="w-20 h-20 text-accent/20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 animate-fade-in">
              Join Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Build your career with Ghana's leading consultancy firm. We're looking for passionate 
              individuals who share our commitment to excellence and innovation.
            </p>
            
            <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Users className="w-5 h-5" />
                <span className="font-medium">Collaborative Culture</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-primary">
                <Briefcase className="w-5 h-5" />
                <span className="font-medium">Career Growth</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-primary">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Cape Coast Based</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 section-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {jobs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">No Open Positions</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We don't have any open positions at the moment, but we're always looking for talented individuals. 
                  Check back soon or connect with us on LinkedIn.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-heading font-bold text-primary mb-4">
                    Current Opportunities
                  </h2>
                  <p className="text-muted-foreground">
                    {jobs.length} {jobs.length === 1 ? 'position' : 'positions'} available
                  </p>
                </div>
                
                {jobs.map((job, index) => (
                  <Card 
                    key={job.id} 
                    className="card-hover animate-fade-in" 
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <CardTitle className="text-2xl text-primary mb-2">{job.title}</CardTitle>
                          <CardDescription className="text-base">
                            {job.description?.slice(0, 150)}...
                          </CardDescription>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge variant="secondary" className="w-fit">
                            {job.employment_type}
                          </Badge>
                          {job.salary_range && (
                            <Badge variant="outline" className="w-fit">
                              {job.salary_range}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {job.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                        )}
                        {job.application_deadline && (
                          <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4" />
                            Apply by {formatDate(job.application_deadline)}
                          </div>
                        )}
                      </div>
                      
                      {job.requirements && Array.isArray(job.requirements) && job.requirements.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-primary mb-2">Key Requirements:</h4>
                          <ul className="space-y-1">
                            {job.requirements.slice(0, 3).map((req, reqIndex) => (
                              <li key={reqIndex} className="text-muted-foreground text-sm">
                                • {req}
                              </li>
                            ))}
                            {job.requirements.length > 3 && (
                              <li className="text-muted-foreground text-sm">
                                • And {job.requirements.length - 3} more...
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex gap-3 pt-4">
                        <Button 
                          onClick={() => navigate(`/careers/${job.id}`)}
                          className="flex-1"
                        >
                          View Details & Apply
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleShare(job)}
                          title="Share this job"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareersPage;