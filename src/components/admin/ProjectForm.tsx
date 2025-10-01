import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Upload, Image, Video, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  project?: any;
}

export default function ProjectForm({ isOpen, onClose, onSuccess, project }: ProjectFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    content: project?.content || '',
    category: project?.category || '',
    status: project?.status || 'planning',
    image_url: project?.image_url || '', // Cover image
    video_url: project?.video_url || '', // Cover video
    objectives: project?.objectives || [],
    methodologies: project?.methodologies || [],
    deliverables: project?.deliverables || [],
    expected_impact: project?.expected_impact || [],
    milestones: project?.milestones || [],
    team_members: project?.team_members || [],
    budget: project?.budget || '',
    location: project?.location || '',
    client: project?.client || '',
    start_date: project?.start_date || '',
    end_date: project?.end_date || '',
    media_urls: project?.media_urls || [],
    is_published: project?.is_published !== undefined ? project.is_published : true
  });

  const [newObjective, setNewObjective] = useState('');
  const [newMethodology, setNewMethodology] = useState('');
  const [newDeliverable, setNewDeliverable] = useState('');
  const [newImpact, setNewImpact] = useState('');
  const [newTeamMember, setNewTeamMember] = useState('');
  const [newMilestone, setNewMilestone] = useState({ title: '', date: '', completed: false });
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare the data for submission
      const submissionData = {
        ...formData,
        // If no cover image is set but we have media, use the first image as cover
        image_url: formData.image_url || (formData.media_urls.find((media: any) => media.type === 'image')?.url || ''),
        // If no cover video is set but we have media, use the first video as cover
        video_url: formData.video_url || (formData.media_urls.find((media: any) => media.type === 'video')?.url || ''),
      };

      if (project) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update(submissionData)
          .eq('id', project.id);

        if (error) throw error;

        toast({
          title: "Project updated",
          description: "Project has been updated successfully.",
        });
      } else {
        // Create new project
        const { error } = await supabase
          .from('projects')
          .insert([submissionData]);

        if (error) throw error;

        toast({
          title: "Project created",
          description: "New project has been created successfully.",
        });
      }

      onSuccess();
      onClose();
      setFormData({ 
        title: '', description: '', content: '', category: '', status: 'planning',
        image_url: '', video_url: '', objectives: [], methodologies: [], 
        deliverables: [], expected_impact: [], milestones: [], team_members: [], 
        budget: '', location: '', client: '', start_date: '', end_date: '', 
        media_urls: [], is_published: true
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (field: string, value: any, resetValue: any) => {
    if (!value || (typeof value === 'string' && !value.trim())) return;
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev] as any[], value]
    }));
    return resetValue;
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as any[]).filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = async (file: File, type: 'image' | 'video', isCover: boolean = false) => {
    setUploading(true);
    try {
      const bucket = type === 'image' ? 'project-images' : 'project-videos';
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36)}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      const mediaItem = {
        type,
        url: urlData.publicUrl,
        name: file.name
      };

      // If this is a cover image/video, set it in the respective field
      if (isCover) {
        if (type === 'image') {
          setFormData(prev => ({ ...prev, image_url: urlData.publicUrl }));
        } else {
          setFormData(prev => ({ ...prev, video_url: urlData.publicUrl }));
        }
      }

      // Also add to media_urls array
      setFormData(prev => ({
        ...prev,
        media_urls: [...prev.media_urls, mediaItem]
      }));

      toast({
        title: "Upload successful",
        description: `${type} uploaded successfully${isCover ? ' and set as cover' : ''}.`,
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const setCoverMedia = (mediaUrl: string, type: 'image' | 'video') => {
    if (type === 'image') {
      setFormData(prev => ({ ...prev, image_url: mediaUrl }));
    } else {
      setFormData(prev => ({ ...prev, video_url: mediaUrl }));
    }
    toast({
      title: "Cover updated",
      description: `${type} set as cover successfully.`,
    });
  };

  const removeMedia = (index: number) => {
    const mediaItem = formData.media_urls[index];
    
    // If this media was set as cover, remove it from cover field too
    if (mediaItem.type === 'image' && formData.image_url === mediaItem.url) {
      setFormData(prev => ({ ...prev, image_url: '' }));
    } else if (mediaItem.type === 'video' && formData.video_url === mediaItem.url) {
      setFormData(prev => ({ ...prev, video_url: '' }));
    }
    
    // Remove from media array
    removeArrayItem('media_urls', index);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {project ? 'Edit Project' : 'Create New Project'}
          </DialogTitle>
          <DialogDescription>
            {project ? 'Update project information with detailed breakdown' : 'Add a comprehensive new project to the system'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Project Details</TabsTrigger>
              <TabsTrigger value="team">Team & Timeline</TabsTrigger>
              <TabsTrigger value="progress">Progress & Milestones</TabsTrigger>
              <TabsTrigger value="media">Media & Publishing</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Core project details and categorization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter project title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Brief description that appears in project listings"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Project Overview</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="Detailed project overview and background information"
                      rows={6}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="agribusiness">Agribusiness</SelectItem>
                          <SelectItem value="real_estate">Real Estate</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="research_academic">Research & Academic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status *</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planning">Planning</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="on_hold">On Hold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Cover Image Preview */}
                  {formData.image_url && (
                    <div className="space-y-2">
                      <Label>Current Cover Image</Label>
                      <div className="relative inline-block">
                        <img
                          src={formData.image_url}
                          alt="Cover"
                          className="w-32 h-24 object-cover rounded border"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2"
                          onClick={() => handleInputChange('image_url', '')}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Objectives */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Key Objectives</CardTitle>
                    <CardDescription>Main goals and objectives of the project</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newObjective}
                        onChange={(e) => setNewObjective(e.target.value)}
                        placeholder="Add new objective"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            setNewObjective(addArrayItem('objectives', newObjective, ''));
                          }
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setNewObjective(addArrayItem('objectives', newObjective, ''))}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {formData.objectives.map((objective: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm flex-1">{objective}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeArrayItem('objectives', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Methodologies */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Methodologies</CardTitle>
                    <CardDescription>Approaches and methods used in the project</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newMethodology}
                        onChange={(e) => setNewMethodology(e.target.value)}
                        placeholder="Add methodology"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            setNewMethodology(addArrayItem('methodologies', newMethodology, ''));
                          }
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setNewMethodology(addArrayItem('methodologies', newMethodology, ''))}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {formData.methodologies.map((methodology: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm flex-1">{methodology}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeArrayItem('methodologies', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Deliverables */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Key Deliverables</CardTitle>
                    <CardDescription>Expected outputs and deliverables</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newDeliverable}
                        onChange={(e) => setNewDeliverable(e.target.value)}
                        placeholder="Add deliverable"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            setNewDeliverable(addArrayItem('deliverables', newDeliverable, ''));
                          }
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setNewDeliverable(addArrayItem('deliverables', newDeliverable, ''))}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {formData.deliverables.map((deliverable: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm flex-1">{deliverable}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeArrayItem('deliverables', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Expected Impact */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Expected Impact</CardTitle>
                    <CardDescription>Anticipated outcomes and benefits</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newImpact}
                        onChange={(e) => setNewImpact(e.target.value)}
                        placeholder="Add expected impact"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            setNewImpact(addArrayItem('expected_impact', newImpact, ''));
                          }
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setNewImpact(addArrayItem('expected_impact', newImpact, ''))}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {formData.expected_impact.map((impact: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm flex-1">{impact}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeArrayItem('expected_impact', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                    <CardDescription>Client, budget, location, and timeline details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="client">Client</Label>
                      <Input
                        id="client"
                        value={formData.client}
                        onChange={(e) => handleInputChange('client', e.target.value)}
                        placeholder="Client or organization name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget</Label>
                      <Input
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        placeholder="e.g., $150,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="Project location"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="start_date">Start Date</Label>
                        <Input
                          id="start_date"
                          value={formData.start_date}
                          onChange={(e) => handleInputChange('start_date', e.target.value)}
                          placeholder="e.g., January 2024"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end_date">End Date</Label>
                        <Input
                          id="end_date"
                          value={formData.end_date}
                          onChange={(e) => handleInputChange('end_date', e.target.value)}
                          placeholder="e.g., December 2024"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>Project team and key personnel</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newTeamMember}
                        onChange={(e) => setNewTeamMember(e.target.value)}
                        placeholder="Add team member"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            setNewTeamMember(addArrayItem('team_members', newTeamMember, ''));
                          }
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setNewTeamMember(addArrayItem('team_members', newTeamMember, ''))}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {formData.team_members.map((member: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm flex-1">{member}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeArrayItem('team_members', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Milestones</CardTitle>
                  <CardDescription>Track project progress with key milestones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Input
                      value={newMilestone.title}
                      onChange={(e) => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Milestone title"
                    />
                    <Input
                      value={newMilestone.date}
                      onChange={(e) => setNewMilestone(prev => ({ ...prev, date: e.target.value }))}
                      placeholder="Target date"
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (newMilestone.title.trim()) {
                          addArrayItem('milestones', newMilestone, { title: '', date: '', completed: false });
                          setNewMilestone({ title: '', date: '', completed: false });
                        }
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Milestone
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {formData.milestones.map((milestone: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded">
                        <div className="flex-1">
                          <div className="font-medium">{milestone.title}</div>
                          <div className="text-sm text-muted-foreground">{milestone.date}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={milestone.completed ? "default" : "secondary"}>
                            {milestone.completed ? "Completed" : "Pending"}
                          </Badge>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeArrayItem('milestones', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Cover Media Upload</CardTitle>
                    <CardDescription>Upload cover image and video for the project</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Upload Cover Image</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, 'image', true);
                          }}
                          disabled={uploading}
                        />
                        <Button type="button" size="sm" disabled={uploading}>
                          <Image className="w-4 h-4 mr-1" />
                          Cover Image
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Upload Cover Video</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="video/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, 'video', true);
                          }}
                          disabled={uploading}
                        />
                        <Button type="button" size="sm" disabled={uploading}>
                          <Video className="w-4 h-4 mr-1" />
                          Cover Video
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Additional Media Upload</CardTitle>
                    <CardDescription>Upload additional images and videos for the project gallery</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Upload Gallery Images</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            files.forEach(file => handleFileUpload(file, 'image', false));
                          }}
                          disabled={uploading}
                        />
                        <Button type="button" size="sm" disabled={uploading}>
                          <Image className="w-4 h-4 mr-1" />
                          Gallery Images
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Upload Gallery Videos</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="video/*"
                          multiple
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            files.forEach(file => handleFileUpload(file, 'video', false));
                          }}
                          disabled={uploading}
                        />
                        <Button type="button" size="sm" disabled={uploading}>
                          <Video className="w-4 h-4 mr-1" />
                          Gallery Videos
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Publishing Options</CardTitle>
                    <CardDescription>Control project visibility and publication status</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="is_published"
                        checked={formData.is_published}
                        onChange={(e) => handleInputChange('is_published', e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="is_published">Publish project (visible to public)</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      When published, this project will be visible on the public projects page. 
                      Unpublished projects are only visible in the admin dashboard.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Media Preview */}
              {formData.media_urls.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Uploaded Media</CardTitle>
                    <CardDescription>Click the star icon to set as cover image/video</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.media_urls.map((media: any, index: number) => {
                        const isCover = (media.type === 'image' && formData.image_url === media.url) || 
                                       (media.type === 'video' && formData.video_url === media.url);
                        
                        return (
                          <div key={index} className="relative group">
                            {media.type === 'image' ? (
                              <img
                                src={media.url}
                                alt={media.name}
                                className={`w-full h-24 object-cover rounded border-2 ${
                                  isCover ? 'border-yellow-400' : 'border-gray-200'
                                }`}
                              />
                            ) : (
                              <video
                                src={media.url}
                                className={`w-full h-24 object-cover rounded border-2 ${
                                  isCover ? 'border-yellow-400' : 'border-gray-200'
                                }`}
                                controls
                              />
                            )}
                            
                            {/* Cover indicator */}
                            {isCover && (
                              <div className="absolute top-1 left-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              </div>
                            )}
                            
                            {/* Action buttons */}
                            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                              {!isCover && (
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="secondary"
                                  className="p-1 h-6 w-6"
                                  onClick={() => setCoverMedia(media.url, media.type)}
                                  title={`Set as cover ${media.type}`}
                                >
                                  <Star className="w-3 h-3" />
                                </Button>
                              )}
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                className="p-1 h-6 w-6"
                                onClick={() => removeMedia(index)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || uploading}>
              {loading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}