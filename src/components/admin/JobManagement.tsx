import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Trash2, 
  Edit, 
  Plus, 
  Search, 
  Eye, 
  EyeOff,
  Calendar,
  Users,
  Briefcase
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import JobForm from "./JobForm";

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
  is_published: boolean;
  created_at: string;
}

interface JobApplication {
  id: string;
  job_id: string;
  name: string;
  email: string;
  phone: string;
  cv_url: string;
  cover_letter: string;
  status: string;
  created_at: string;
  job?: { title: string };
}

const JobManagement = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [showApplications, setShowApplications] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: "Failed to load jobs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          job:jobs(title)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const { error } = await supabase
        .from('jobs')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Job deleted successfully",
      });

      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      toast({
        title: "Error",
        description: "Failed to delete job",
        variant: "destructive"
      });
    }
  };

  const handleTogglePublished = async (job: Job) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update({ is_published: !job.is_published })
        .eq('id', job.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Job ${!job.is_published ? 'published' : 'unpublished'} successfully`,
      });

      fetchJobs();
    } catch (error) {
      console.error('Error updating job:', error);
      toast({
        title: "Error",
        description: "Failed to update job",
        variant: "destructive"
      });
    }
  };

  const handleUpdateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', applicationId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Application status updated",
      });

      fetchApplications();
    } catch (error) {
      console.error('Error updating application:', error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive"
      });
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.employment_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">
            {editingJob ? 'Edit Job' : 'Create New Job'}
          </h2>
          <Button
            variant="outline"
            onClick={() => {
              setShowForm(false);
              setEditingJob(null);
            }}
          >
            Back to Jobs
          </Button>
        </div>
        
        <JobForm
          onSuccess={() => {
            setShowForm(false);
            setEditingJob(null);
            fetchJobs();
          }}
          initialData={editingJob || undefined}
          jobId={editingJob?.id}
          isEdit={!!editingJob}
        />
      </div>
    );
  }

  if (showApplications) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">Job Applications</h2>
          <Button
            variant="outline"
            onClick={() => setShowApplications(false)}
          >
            Back to Jobs
          </Button>
        </div>

        <div className="grid gap-4">
          {applications.map((application) => (
            <Card key={application.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{application.name}</CardTitle>
                    <p className="text-muted-foreground">
                      Applied for: {application.job?.title}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      application.status === 'pending' ? 'secondary' :
                      application.status === 'reviewed' ? 'default' :
                      application.status === 'accepted' ? 'destructive' : 'outline'
                    }
                  >
                    {application.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <p><strong>Email:</strong> {application.email}</p>
                    <p><strong>Phone:</strong> {application.phone || 'Not provided'}</p>
                    <p><strong>Applied:</strong> {formatDate(application.created_at)}</p>
                  </div>
                  
                  <div>
                    <strong>Cover Letter:</strong>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {application.cover_letter.slice(0, 200)}...
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdateApplicationStatus(application.id, 'reviewed')}
                    >
                      Mark Reviewed
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdateApplicationStatus(application.id, 'accepted')}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdateApplicationStatus(application.id, 'rejected')}
                    >
                      Reject
                    </Button>
                    {application.cv_url && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          // This would need to be implemented with proper file access
                          toast({
                            title: "CV Download",
                            description: "CV download feature requires additional setup",
                          });
                        }}
                      >
                        View CV
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {applications.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No applications yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-primary">Job Management</h2>
        <div className="flex gap-3">
          <Button onClick={() => setShowApplications(true)} variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Applications ({applications.length})
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Job
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Jobs List */}
      <div className="grid gap-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className={!job.is_published ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.employment_type}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(job.created_at)}
                    </div>
                    {job.application_deadline && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Deadline: {formatDate(job.application_deadline)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={job.is_published ? "default" : "secondary"}>
                    {job.is_published ? "Published" : "Draft"}
                  </Badge>
                  {job.salary_range && (
                    <Badge variant="outline">{job.salary_range}</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {job.description?.slice(0, 150)}...
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Location: {job.location || 'Not specified'}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleTogglePublished(job)}
                  >
                    {job.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {job.is_published ? 'Unpublish' : 'Publish'}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingJob(job);
                      setShowForm(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteJob(job.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm ? 'No jobs found matching your search' : 'No jobs created yet'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JobManagement;