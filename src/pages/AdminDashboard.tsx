import { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ProjectForm from "@/components/admin/ProjectForm";
import ServiceForm from "@/components/admin/ServiceForm";
import ProductForm from "@/components/admin/ProductForm";
import EventForm from "@/components/admin/EventForm";
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Package, 
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Briefcase,
  Upload,
  X,
  FileText,
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  
  // Data states
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [jobs, setJobs] = useState([]);
  
  // Modal states
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showSubmissionDetails, setShowSubmissionDetails] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  
  // Editing states
  const [editingProject, setEditingProject] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingJob, setEditingJob] = useState(null);

  // Add these states after the existing ones
const [contacts, setContacts] = useState([]);
const [showContactManager, setShowContactManager] = useState(false);

  // Job form states
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    requirements: '',
    deadline: '',
    instructions: '',
    location: '',
    employmentType: '',
    salaryRange: '',
    image: null
  });

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!adminLoggedIn) {
      navigate('/admin/login');
      return;
    }
    
    // Load and immediately clean expired items from localStorage
    initializeAuth();
    Promise.all([
      loadProjects(),
      loadServices(),
      loadProducts(),
      loadEvents(),
      loadFormSubmissions(),
      loadJobs()
    ]).finally(() => {
      setLoading(false);
    });
    
  }, [navigate]);

  const initializeAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        await supabase.auth.signInWithPassword({
          email: 'omejpollux@gmail.com',
          password: 'Omej.pollux@1@2'
        });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    }
  };
  const downloadCV = async (storagePath, filename) => {
    try {
      const { data, error } = await supabase.storage
        .from('cvs')
        .download(storagePath);
  
      if (error) throw error;
  
      // Create download link
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
  
      toast({ title: "CV downloaded successfully" });
    } catch (error) {
      console.error('Error downloading CV:', error);
      toast({ 
        title: "Download failed", 
        description: error.message, 
        variant: "destructive" 
      });
    }
  };
  const extractContactFromSubmission = (submission) => {
    return {
      name: submission.name,
      email: submission.email,
      phone: submission.phone || null,
      source: submission.form_type,
      firstContact: submission.created_at
    };
  };
  
  const addToContacts = (submission) => {
    const newContact = extractContactFromSubmission(submission);
    
    setContacts(prev => {
      // Check if contact already exists (by email)
      const existingIndex = prev.findIndex(contact => contact.email === newContact.email);
      
      if (existingIndex >= 0) {
        // Update existing contact if this submission is more recent
        const updated = [...prev];
        if (new Date(submission.created_at) > new Date(updated[existingIndex].firstContact)) {
          updated[existingIndex] = { ...updated[existingIndex], ...newContact };
        }
        return updated;
      } else {
        // Add new contact
        return [...prev, { ...newContact, id: Date.now() }];
      }
    });
  };
  
  const downloadContactsCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Source', 'First Contact'];
    const csvContent = [
      headers.join(','),
      ...contacts.map(contact => [
        `"${contact.name}"`,
        `"${contact.email}"`,
        `"${contact.phone || ''}"`,
        `"${contact.source}"`,
        `"${new Date(contact.firstContact).toLocaleDateString()}"`
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `contacts_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Loading functions (keeping existing ones)
  const loadProjects = async () => {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error loading projects:', error);
      } else {
        setProjects(data || []);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    }
  };

  const loadServices = async () => {
    try {
      const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error loading services:', error);
      } else {
        setServices(data || []);
      }
    } catch (error) {
      console.error('Error loading services:', error);
      setServices([]);
    }
  };

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error loading products:', error);
      } else {
        setProducts(data || []);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    }
  };

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error loading events:', error);
      } else {
        setEvents(data || []);
      }
    } catch (error) {
      console.error('Error loading events:', error);
      setEvents([]);
    }
  };

  const loadFormSubmissions = async () => {
    try {
      const { data, error } = await supabase.from('form_submissions').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error loading form submissions:', error);
      } else {
        setFormSubmissions(data || []);
        // Extract contacts from submissions
        (data || []).forEach(submission => {
          if (submission.name && submission.email) {
            addToContacts(submission);
          }
        });
      }
    } catch (error) {
      console.error('Error loading form submissions:', error);
      setFormSubmissions([]);
    }
  };

  const loadJobs = async () => {
    try {
      const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error loading jobs:', error);
      } else {
        setJobs(data || []);
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
      setJobs([]);
    }
  };

  // Job Management Functions
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = null;
      
      if (jobForm.image) {
        const fileExt = jobForm.image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('job-images')
          .upload(fileName, jobForm.image);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('job-images')
          .getPublicUrl(fileName);
        imageUrl = publicUrl;
      }

      // Parse requirements into array format
      const requirementsArray = jobForm.requirements
        .split('\n')
        .filter(req => req.trim())
        .map(req => req.trim());

      const jobData = {
        title: jobForm.title,
        description: jobForm.description,
        requirements: requirementsArray,
        application_deadline: jobForm.deadline || null,
        application_instructions: jobForm.instructions,
        location: jobForm.location || 'Cape Coast, Ghana',
        employment_type: jobForm.employmentType || 'Full-time',
        salary_range: jobForm.salaryRange || null,
        is_published: true,
        deleted_at: null
      };

      if (editingJob) {
        const { error } = await supabase.from('jobs').update(jobData).eq('id', editingJob.id);
        if (error) throw error;
        toast({ title: "Job updated successfully" });
      } else {
        const { error } = await supabase.from('jobs').insert([jobData]);
        if (error) throw error;
        toast({ title: "Job created successfully" });
      }

      setJobForm({
        title: '',
        description: '',
        requirements: '',
        deadline: '',
        instructions: '',
        location: '',
        employmentType: '',
        salaryRange: '',
        image: null
      });
      setShowJobForm(false);
      setEditingJob(null);
      loadJobs();
    } catch (error) {
      console.error('Error saving job:', error);
      toast({ 
        title: "Error saving job", 
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteJob = async (job) => {
    if (confirm('Are you sure you want to delete this job?')) {
      const { error } = await supabase.from('jobs').delete().eq('id', job.id);
      if (!error) {
        toast({ title: "Job deleted successfully" });
        loadJobs();
      }
    }
  };

  const handleDeleteSubmission = async (id) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      // Find the submission first
      const submission = formSubmissions.find(s => s.id === id);
      if (submission) {
        const { error } = await supabase.from('form_submissions').delete().eq('id', id);
        if (!error) {
          toast({ title: "Form submission deleted successfully" });
          loadFormSubmissions();
          setShowSubmissionDetails(false);
        }
      }
    }
  };

  // Delete functions (keeping existing ones)
  const handleDeleteProject = async (project) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const { error } = await supabase.from('projects').delete().eq('id', project.id);
      if (!error) {
        toast({ title: "Project deleted successfully" });
        loadProjects();
      }
    }
  };

  const handleDeleteService = async (service) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const { error } = await supabase.from('services').delete().eq('id', service.id);
      if (!error) {
        toast({ title: "Service deleted successfully" });
        loadServices();
      }
    }
  };

  const handleDeleteProduct = async (product) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const { error } = await supabase.from('products').delete().eq('id', product.id);
      if (!error) {
        toast({ title: "Product deleted successfully" });
        loadProducts();
      }
    }
  };
  const handleDeleteEvent = async (event) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const { error } = await supabase.from('events').delete().eq('id', event.id);
      if (!error) {
        toast({ title: "Event deleted successfully" });
        loadEvents();
      }
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminUser");
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of the admin dashboard.",
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminUser");
      navigate('/');
    }
  };

  // Kanban helper functions
  const getFormsByType = (type) => {
    return formSubmissions.filter(submission => submission.form_type === type);
  };

  const getFormTypeColor = (type) => {
    const colors = {
      project_collaboration: 'bg-indigo-50 border-indigo-200',
      consultation: 'bg-blue-50 border-blue-200',
      event_registration: 'bg-purple-50 border-purple-200',
      job_application: 'bg-green-50 border-green-200',
      contact: 'bg-orange-50 border-orange-200',
      support: 'bg-pink-50 border-pink-200',
      academic_consultation: 'bg-teal-50 border-teal-200'
    };
    return colors[type] || 'bg-gray-50 border-gray-200';
  };
  const getFormTypeTitle = (type) => {
    const titles = {
      project_collaboration: 'Project Collaborations',
      consultation: 'Consultations',
      event_registration: 'Event Registrations',
      job_application: 'Job Applications',
      contact: 'General Inquiries',
      support: 'Support/Donations',
      academic_consultation: 'Academic Consultations'
    };
    return titles[type] || 'Other';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Projects",
      value: projects.length.toString(),
      icon: BarChart3,
      color: "text-blue-600"
    },
    {
      title: "Active Services",
      value: services.length.toString(),
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Upcoming Events",
      value: events.filter(e => new Date(e.event_date) > new Date()).length.toString(),
      icon: Calendar,
      color: "text-purple-600"
    },
    {
      title: "Available Jobs",
      value: jobs.length.toString(),
      icon: Briefcase,
      color: "text-indigo-600"
    }
  ];

  const formTypes = [
    'project_collaboration',
    'consultation', 
    'event_registration', 
    'job_application', 
    'contact', 
    'support', 
    'academic_consultation'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-heading font-bold text-primary">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
         <Tabs defaultValue="overview" className="w-full">
<TabsList className="grid w-full grid-cols-9">
  <TabsTrigger value="overview">Overview</TabsTrigger>
  <TabsTrigger value="projects">Projects</TabsTrigger>
  <TabsTrigger value="services">Services</TabsTrigger>
  <TabsTrigger value="events">Events</TabsTrigger>
  <TabsTrigger value="catalog">Catalog</TabsTrigger>
  <TabsTrigger value="jobs">Jobs</TabsTrigger>
  <TabsTrigger value="submissions">Submissions</TabsTrigger>
  <TabsTrigger value="contacts">Contacts</TabsTrigger>
  <TabsTrigger value="academic">Academic</TabsTrigger>
</TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projects.slice(0, 3).map((project) => (
                      <div key={project.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{project.title}</p>
                          <p className="text-sm text-muted-foreground">{project.category}</p>
                        </div>
                        <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Form Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {formSubmissions.slice(0, 3).map((submission) => (
                      <div key={submission.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-medium">{submission.name}</p>
                          <span className="text-sm text-muted-foreground">{submission.form_type}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{submission.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Jobs</h2>
              <Button onClick={() => setShowJobForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Job
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.location || 'Not specified'}</TableCell>
                        <TableCell>{job.employment_type || 'Full-time'}</TableCell>
                        <TableCell>
                          {job.application_deadline ? new Date(job.application_deadline).toLocaleDateString() : 'Open'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={job.is_published ? 'default' : 'secondary'}>
                            {job.is_published ? 'Published' : 'Draft'}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(job.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingJob(job);
                                setJobForm({
                                  title: job.title,
                                  description: job.description,
                                  requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : job.requirements,
                                  deadline: job.application_deadline || '',
                                  instructions: job.application_instructions,
                                  location: job.location || '',
                                  employmentType: job.employment_type || '',
                                  salaryRange: job.salary_range || '',
                                  image: null
                                });
                                setShowJobForm(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteJob(job)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Form Submissions Kanban Tab */}
          <TabsContent value="submissions" className="space-y-6">
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold text-center">Form Submissions</h2>
  </div>
  
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
    {/* First Row - 3 columns */}
    {formTypes.slice(0, 3).map((type) => {
      const submissions = getFormsByType(type);
      return (
        <div key={type} className={`rounded-lg border-2 p-4 min-h-[400px] ${getFormTypeColor(type)}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">{getFormTypeTitle(type)}</h3>
            <Badge variant="secondary" className="text-sm">
              {submissions.length}
            </Badge>
          </div>
          
          <div className="space-y-3 overflow-y-auto max-h-80">
            {submissions.map((submission) => (
              <Card 
                key={submission.id} 
                className="cursor-pointer hover:shadow-md transition-shadow bg-white"
                onClick={() => {
                  setSelectedSubmission(submission);
                  setShowSubmissionDetails(true);
                }}
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{submission.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground truncate">
                      {submission.email}
                    </p>
                    
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {type === 'project_collaboration' 
                        ? submission.additional_data?.projectTitle || submission.message
                        : submission.message
                      }
                    </p>
                    
                    {submission.additional_data?.service && (
                      <Badge variant="outline" className="text-xs">
                        {submission.additional_data.service}
                      </Badge>
                    )}
                    
                    {type === 'project_collaboration' && submission.additional_data?.projectType && (
                      <Badge variant="outline" className="text-xs">
                        {submission.additional_data.projectType}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {submissions.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No submissions yet</p>
              </div>
            )}
          </div>
        </div>
      );
    })}
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-6">
    {/* Second Row - 4 columns */}
    {formTypes.slice(3).map((type) => {
      const submissions = getFormsByType(type);
      return (
        <div key={type} className={`rounded-lg border-2 p-4 min-h-[400px] ${getFormTypeColor(type)}`}>
          {/* Same structure as above */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">{getFormTypeTitle(type)}</h3>
            <Badge variant="secondary" className="text-sm">
              {submissions.length}
            </Badge>
          </div>
          
          <div className="space-y-3 overflow-y-auto max-h-80">
            {submissions.map((submission) => (
              <Card 
                key={submission.id} 
                className="cursor-pointer hover:shadow-md transition-shadow bg-white"
                onClick={() => {
                  setSelectedSubmission(submission);
                  setShowSubmissionDetails(true);
                }}
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{submission.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground truncate">
                      {submission.email}
                    </p>
                    
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {type === 'project_collaboration' 
                        ? submission.additional_data?.projectTitle || submission.message
                        : submission.message
                      }
                    </p>
                    
                    {submission.additional_data?.service && (
                      <Badge variant="outline" className="text-xs">
                        {submission.additional_data.service}
                      </Badge>
                    )}
                    
                    {type === 'project_collaboration' && submission.additional_data?.projectType && (
                      <Badge variant="outline" className="text-xs">
                        {submission.additional_data.projectType}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {submissions.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No submissions yet</p>
              </div>
            )}
          </div>
        </div>
      );
    })}
  </div>
</TabsContent>

          {/* Keep existing tabs - Projects, Services, Events, Catalog */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Projects</h2>
              <Button onClick={() => setShowProjectForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell>{project.category}</TableCell>
                        <TableCell>
                          <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                            {project.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingProject(project);
                                setShowProjectForm(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteProject(project)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Services</h2>
              <Button onClick={() => setShowServiceForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.title}</TableCell>
                        <TableCell>{service.category}</TableCell>
                        <TableCell>{new Date(service.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingService(service);
                                setShowServiceForm(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteService(service)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Events</h2>
              <Button onClick={() => setShowEventForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Registration</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>
                          {event.event_date ? new Date(event.event_date).toLocaleDateString() : 'TBD'}
                        </TableCell>
                        <TableCell>{event.location || 'TBD'}</TableCell>
                        <TableCell>
                          <Badge variant={event.registration_required ? 'default' : 'secondary'}>
                            {event.registration_required ? 'Required' : 'Open'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {event.current_participants || 0}
                          {event.max_participants ? ` / ${event.max_participants}` : ''}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingEvent(event);
                                setShowEventForm(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteEvent(event)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="catalog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Catalog</h2>
              <Button onClick={() => setShowProductForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          {product.price ? `GHS ${parseFloat(product.price).toFixed(2)}` : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={product.in_stock ? 'default' : 'destructive'}>
                            {product.in_stock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(product.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingProduct(product);
                                setShowProductForm(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteProduct(product)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

{/* Contacts Tab */}
<TabsContent value="contacts" className="space-y-6">
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold">Contact Management</h2>
    <Button onClick={downloadContactsCSV} disabled={contacts.length === 0}>
      Download CSV
    </Button>
  </div>
  
  <Card>
    <CardContent className="p-6">
      {contacts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No contacts yet</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>First Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone || 'N/A'}</TableCell>
                <TableCell className="capitalize">
                  <Badge variant="outline">
                    {contact.source.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(contact.firstContact).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </CardContent>
  </Card>
</TabsContent>
{/* Academic Consultations Tab */}
<TabsContent value="academic" className="space-y-6">
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold">Academic Consultations</h2>
  </div>
  
  <Card>
    <CardContent className="p-6">
      {getFormsByType('academic_consultation').length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <GraduationCap className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No academic consultation requests yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {getFormsByType('academic_consultation').map((submission) => (
            <Card 
              key={submission.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                setSelectedSubmission(submission);
                setShowSubmissionDetails(true);
              }}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{submission.name}</h3>
                    <p className="text-sm text-muted-foreground">{submission.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {submission.additional_data?.urgency || 'Standard'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Level:</p>
                    <p className="text-muted-foreground">{submission.additional_data?.currentLevel}</p>
                  </div>
                  <div>
                    <p className="font-medium">Institution:</p>
                    <p className="text-muted-foreground">{submission.additional_data?.institution}</p>
                  </div>
                  <div>
                    <p className="font-medium">Program:</p>
                    <p className="text-muted-foreground">{submission.additional_data?.program}</p>
                  </div>
                  <div>
                    <p className="font-medium">Consultation Type:</p>
                    <p className="text-muted-foreground">{submission.additional_data?.consultationType}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="font-medium text-sm">Main Challenge:</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{submission.message}</p>
                </div>
                
                {submission.additional_data?.specificServices?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {submission.additional_data.specificServices.slice(0, 3).map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {submission.additional_data.specificServices.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{submission.additional_data.specificServices.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
</TabsContent>
        </Tabs>
      </div>

      {/* Job Form Modal */}
      <Dialog open={showJobForm} onOpenChange={setShowJobForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingJob ? 'Edit Job' : 'Create New Job'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleJobSubmit} className="space-y-4">
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={jobForm.title}
                onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                rows={4}
                value={jobForm.description}
                onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="jobRequirements">Job Requirements (one per line)</Label>
              <Textarea
                id="jobRequirements"
                rows={4}
                value={jobForm.requirements}
                onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                required
                placeholder="• Bachelor's degree in relevant field&#10;• 3+ years of experience&#10;• Strong communication skills"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="jobLocation">Location</Label>
                <Input
                  id="jobLocation"
                  value={jobForm.location}
                  onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                  placeholder="e.g., Cape Coast, Ghana"
                />
              </div>

              <div>
                <Label htmlFor="employmentType">Employment Type</Label>
                <select
                  id="employmentType"
                  className="w-full p-2 border rounded-md"
                  value={jobForm.employmentType}
                  onChange={(e) => setJobForm({ ...jobForm, employmentType: e.target.value })}
                >
                  <option value="">Select type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="salaryRange">Salary Range (Optional)</Label>
              <Input
                id="salaryRange"
                value={jobForm.salaryRange}
                onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })}
                placeholder="e.g., GHS 3,000 - 5,000 per month"
              />
            </div>

            <div>
              <Label htmlFor="jobDeadline">Application Deadline</Label>
              <Input
                id="jobDeadline"
                type="date"
                value={jobForm.deadline}
                onChange={(e) => setJobForm({ ...jobForm, deadline: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="jobInstructions">Application Instructions</Label>
              <Textarea
                id="jobInstructions"
                rows={3}
                value={jobForm.instructions}
                onChange={(e) => setJobForm({ ...jobForm, instructions: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="jobImage">Job Image</Label>
              <Input
                id="jobImage"
                type="file"
                accept="image/*"
                onChange={(e) => setJobForm({ ...jobForm, image: e.target.files[0] })}
              />
              {editingJob && editingJob.image_url && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">Current image:</p>
                  <img 
                    src={editingJob.image_url} 
                    alt="Current job image" 
                    className="w-32 h-32 object-cover rounded mt-1"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowJobForm(false);
                  setEditingJob(null);
                  setJobForm({
                    title: '',
                    description: '',
                    requirements: '',
                    deadline: '',
                    instructions: '',
                    location: '',
                    employmentType: '',
                    salaryRange: '',
                    image: null
                  });
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingJob ? 'Update Job' : 'Create Job'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Submission Details Modal */}
      <Dialog open={showSubmissionDetails} onOpenChange={setShowSubmissionDetails}>
  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <div className="flex items-center justify-between">
        <DialogTitle>Form Submission Details</DialogTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSubmissionDetails(false)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </DialogHeader>
    
    {selectedSubmission && (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="font-semibold">Name</Label>
            <p className="mt-1 p-2 bg-gray-50 rounded">{selectedSubmission.name}</p>
          </div>
          
          <div>
            <Label className="font-semibold">Email</Label>
            <p className="mt-1 p-2 bg-gray-50 rounded">{selectedSubmission.email}</p>
          </div>
          
          <div>
            <Label className="font-semibold">Phone</Label>
            <p className="mt-1 p-2 bg-gray-50 rounded">
              {selectedSubmission.phone || 'Not provided'}
            </p>
          </div>
          
          <div>
            <Label className="font-semibold">Form Type</Label>
            <p className="mt-1">
              <Badge className="capitalize">
                {selectedSubmission.form_type.replace('_', ' ')}
              </Badge>
            </p>
          </div>
          
          <div>
            <Label className="font-semibold">Submitted On</Label>
            <p className="mt-1 p-2 bg-gray-50 rounded">
              {new Date(selectedSubmission.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        <div>
          <Label className="font-semibold">Message</Label>
          <p className="mt-1 p-3 bg-gray-50 rounded whitespace-pre-wrap">
            {selectedSubmission.message}
          </p>
        </div>

        
    {selectedSubmission.additional_data && Object.keys(selectedSubmission.additional_data).length > 0 && (
  <div>
    <Label className="font-semibold">Additional Information</Label>
    <div className="mt-1 p-3 bg-gray-50 rounded">
      {Object.entries(selectedSubmission.additional_data)
        .filter(([key]) => !key.startsWith('cv_')) // Exclude CV-related fields
        .map(([key, value]) => (
          <div key={key} className="flex justify-between py-1">
            <span className="font-medium capitalize">{key.replace('_', ' ')}:</span>
            <span>{Array.isArray(value) ? value.join(', ') : value || 'N/A'}</span>
          </div>
        ))}
    </div>
  </div>
)}

{/* CV Download for Job Applications */}
{selectedSubmission.form_type === 'job_application' && 
 selectedSubmission.additional_data?.cv_storage_path && (
  <div>
    <Label className="font-semibold">CV/Resume</Label>
    <div className="mt-1 p-3 bg-gray-50 rounded flex items-center justify-between">
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4" />
        <span className="text-sm">{selectedSubmission.additional_data.cv_filename}</span>
        <Badge variant="outline" className="text-xs">
          {(selectedSubmission.additional_data.cv_file_size / 1024 / 1024).toFixed(1)} MB
        </Badge>
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => downloadCV(
          selectedSubmission.additional_data.cv_storage_path,
          selectedSubmission.additional_data.cv_filename
        )}
      >
        Download CV
      </Button>
    </div>
  </div>
)}

        {selectedSubmission.form_type === 'project_collaboration' && selectedSubmission.additional_data && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="font-semibold">Organization</Label>
                <p className="mt-1 p-2 bg-gray-50 rounded">{selectedSubmission.additional_data.organization}</p>
              </div>
              <div>
                <Label className="font-semibold">Position</Label>
                <p className="mt-1 p-2 bg-gray-50 rounded">{selectedSubmission.additional_data.position || 'N/A'}</p>
              </div>
              <div>
                <Label className="font-semibold">Project Title</Label>
                <p className="mt-1 p-2 bg-gray-50 rounded">{selectedSubmission.additional_data.projectTitle}</p>
              </div>
              <div>
                <Label className="font-semibold">Project Type</Label>
                <p className="mt-1 p-2 bg-gray-50 rounded">{selectedSubmission.additional_data.projectType}</p>
              </div>
              <div>
                <Label className="font-semibold">Budget Range</Label>
                <p className="mt-1 p-2 bg-gray-50 rounded">{selectedSubmission.additional_data.budget || 'Not specified'}</p>
              </div>
              <div>
                <Label className="font-semibold">Timeline</Label>
                <p className="mt-1 p-2 bg-gray-50 rounded">{selectedSubmission.additional_data.timeline || 'Not specified'}</p>
              </div>
            </div>
            
            <div>
              <Label className="font-semibold">Project Objectives</Label>
              <p className="mt-1 p-3 bg-gray-50 rounded whitespace-pre-wrap">{selectedSubmission.additional_data.objectives}</p>
            </div>
            
            {selectedSubmission.additional_data.expertise && selectedSubmission.additional_data.expertise.length > 0 && (
              <div>
                <Label className="font-semibold">Required Expertise</Label>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selectedSubmission.additional_data.expertise.map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {selectedSubmission.additional_data.challenges && (
              <div>
                <Label className="font-semibold">Expected Challenges</Label>
                <p className="mt-1 p-3 bg-gray-50 rounded whitespace-pre-wrap">{selectedSubmission.additional_data.challenges}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="destructive"
            onClick={() => handleDeleteSubmission(selectedSubmission.id)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Submission
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              // Create mailto link
              const subject = encodeURIComponent(`Re: Your ${selectedSubmission.form_type.replace('_', ' ')} submission`);
              const body = encodeURIComponent(`Hi ${selectedSubmission.name},\n\nThank you for your submission. `);
              window.open(`mailto:${selectedSubmission.email}?subject=${subject}&body=${body}`);
            }}
          >
            Reply via Email
          </Button>
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>

      {/* Existing Form Modals */}
      <ProjectForm
        isOpen={showProjectForm}
        onClose={() => {
          setShowProjectForm(false);
          setEditingProject(null);
        }}
        onSuccess={() => {
          loadProjects();
          setEditingProject(null);
        }}
        project={editingProject}
      />

      <ServiceForm
        isOpen={showServiceForm}
        onClose={() => {
          setShowServiceForm(false);
          setEditingService(null);
        }}
        onSuccess={() => {
          loadServices();
          setEditingService(null);
        }}
        service={editingService}
      />

      <ProductForm
        isOpen={showProductForm}
        onClose={() => {
          setShowProductForm(false);
          setEditingProduct(null);
        }}
        onSuccess={() => {
          loadProducts();
          setEditingProduct(null);
        }}
        product={editingProduct}
      />

      <EventForm
        isOpen={showEventForm}
        onClose={() => {
          setShowEventForm(false);
          setEditingEvent(null);
        }}
        onSuccess={() => {
          loadEvents();
          setEditingEvent(null);
        }}
        event={editingEvent}
      />
    </div>
  );
}