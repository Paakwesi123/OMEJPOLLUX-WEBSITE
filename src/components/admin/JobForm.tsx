import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface JobFormData {
  title: string;
  description: string;
  requirements: string[];
  application_deadline: string;
  application_instructions: string;
  location: string;
  employment_type: string;
  salary_range: string;
  is_published: boolean;
}

interface JobFormProps {
  onSuccess: () => void;
  initialData?: Partial<JobFormData>;
  jobId?: string;
  isEdit?: boolean;
}

const JobForm = ({ onSuccess, initialData, jobId, isEdit = false }: JobFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [newRequirement, setNewRequirement] = useState("");
  
  const [formData, setFormData] = useState<JobFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    requirements: initialData?.requirements || [],
    application_deadline: initialData?.application_deadline || "",
    application_instructions: initialData?.application_instructions || "",
    location: initialData?.location || "Cape Coast, Ghana",
    employment_type: initialData?.employment_type || "full-time",
    salary_range: initialData?.salary_range || "",
    is_published: initialData?.is_published ?? true,
  });

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, newRequirement.trim()]
      });
      setNewRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const jobData = {
        ...formData,
        application_deadline: formData.application_deadline || null,
      };

      if (isEdit && jobId) {
        const { error } = await supabase
          .from('jobs')
          .update(jobData)
          .eq('id', jobId);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Job updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('jobs')
          .insert([jobData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Job created successfully",
        });
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving job:', error);
      toast({
        title: "Error",
        description: "Failed to save job",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">
          {isEdit ? 'Edit Job' : 'Create New Job'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Senior Business Consultant"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employment_type">Employment Type</Label>
              <select
                id="employment_type"
                value={formData.employment_type}
                onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Cape Coast, Ghana"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="salary_range">Salary Range (Optional)</Label>
              <Input
                id="salary_range"
                value={formData.salary_range}
                onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                placeholder="e.g. GHS 3,000 - 5,000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="application_deadline">Application Deadline (Optional)</Label>
            <Input
              id="application_deadline"
              type="date"
              value={formData.application_deadline}
              onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed job description, responsibilities, and what we're looking for..."
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Requirements</Label>
            <div className="flex gap-2">
              <Input
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                placeholder="Add a requirement"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
              />
              <Button type="button" onClick={addRequirement} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {formData.requirements.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.requirements.map((req, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {req}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-auto p-0"
                      onClick={() => removeRequirement(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="application_instructions">Application Instructions</Label>
            <Textarea
              id="application_instructions"
              value={formData.application_instructions}
              onChange={(e) => setFormData({ ...formData, application_instructions: e.target.value })}
              placeholder="Special instructions for applicants (optional)"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_published"
              checked={formData.is_published}
              onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
            />
            <Label htmlFor="is_published">Publish job immediately</Label>
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Saving..." : isEdit ? "Update Job" : "Create Job"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobForm;