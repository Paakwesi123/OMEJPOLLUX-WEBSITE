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
import { Plus, X, Upload, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  service?: any;
}

export default function ServiceForm({ isOpen, onClose, onSuccess, service }: ServiceFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    content: service?.content || '',
    category: service?.category || 'personal_development',
    features: service?.features || [],
    pricing: service?.pricing || {},
    duration: service?.duration || '',
    requirements: service?.requirements || [],
    outcomes: service?.outcomes || [],
    image_url: service?.image_url || '',
    is_published: service?.is_published !== undefined ? service.is_published : true
  });

  const [newFeature, setNewFeature] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [newOutcome, setNewOutcome] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (service) {
        const { error } = await supabase
          .from('services')
          .update(formData)
          .eq('id', service.id);

        if (error) throw error;

        toast({
          title: "Service updated",
          description: "Service has been updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('services')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Service created",
          description: "New service has been created successfully.",
        });
      }

      onSuccess();
      onClose();
      setFormData({ 
        title: '', description: '', content: '', category: 'personal_development',
        features: [], pricing: {}, duration: '', requirements: [], outcomes: [],
        image_url: '', is_published: true
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

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36)}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('service-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('service-images')
        .getPublicUrl(fileName);

      setFormData(prev => ({
        ...prev,
        image_url: urlData.publicUrl
      }));

      toast({
        title: "Upload successful",
        description: "Service image uploaded successfully.",
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {service ? 'Edit Service' : 'Create New Service'}
          </DialogTitle>
          <DialogDescription>
            {service ? 'Update comprehensive service information' : 'Add a detailed new service to the system'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Features & Details</TabsTrigger>
              <TabsTrigger value="pricing">Pricing & Duration</TabsTrigger>
              <TabsTrigger value="publishing">Image & Publishing</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Core service details and categorization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Service Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter service title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Brief description that appears in service listings"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Detailed Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="Comprehensive service description and methodology"
                      rows={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal_development">Personal Development</SelectItem>
                        <SelectItem value="business_development">Business Development</SelectItem>
                        <SelectItem value="academic_consultancy">Academic Consultancy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Features */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Key Features</CardTitle>
                    <CardDescription>Main features and benefits of the service</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="Add service feature"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            setNewFeature(addArrayItem('features', newFeature, ''));
                          }
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setNewFeature(addArrayItem('features', newFeature, ''))}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {formData.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm flex-1">{feature}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeArrayItem('features', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Requirements</CardTitle>
                    <CardDescription>Prerequisites or requirements for the service</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                        placeholder="Add requirement"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            setNewRequirement(addArrayItem('requirements', newRequirement, ''));
                          }
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setNewRequirement(addArrayItem('requirements', newRequirement, ''))}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {formData.requirements.map((requirement: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm flex-1">{requirement}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeArrayItem('requirements', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Expected Outcomes */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Expected Outcomes</CardTitle>
                    <CardDescription>Results and benefits clients can expect</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newOutcome}
                        onChange={(e) => setNewOutcome(e.target.value)}
                        placeholder="Add expected outcome"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            setNewOutcome(addArrayItem('outcomes', newOutcome, ''));
                          }
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setNewOutcome(addArrayItem('outcomes', newOutcome, ''))}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {formData.outcomes.map((outcome: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm flex-1">{outcome}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeArrayItem('outcomes', index)}
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

            <TabsContent value="pricing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Duration Information</CardTitle>
                  <CardDescription>Service pricing structure and duration details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Service Duration</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        placeholder="e.g., 3 months, 10 sessions, etc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="base_price">Base Price</Label>
                      <Input
                        id="base_price"
                        value={formData.pricing.base || ''}
                        onChange={(e) => handleInputChange('pricing', { ...formData.pricing, base: e.target.value })}
                        placeholder="e.g., $1,500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="premium_price">Premium Price</Label>
                      <Input
                        id="premium_price"
                        value={formData.pricing.premium || ''}
                        onChange={(e) => handleInputChange('pricing', { ...formData.pricing, premium: e.target.value })}
                        placeholder="e.g., $2,500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="enterprise_price">Enterprise Price</Label>
                      <Input
                        id="enterprise_price"
                        value={formData.pricing.enterprise || ''}
                        onChange={(e) => handleInputChange('pricing', { ...formData.pricing, enterprise: e.target.value })}
                        placeholder="e.g., Contact for pricing"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pricing_notes">Pricing Notes</Label>
                    <Textarea
                      id="pricing_notes"
                      value={formData.pricing.notes || ''}
                      onChange={(e) => handleInputChange('pricing', { ...formData.pricing, notes: e.target.value })}
                      placeholder="Additional pricing information, discounts, payment terms, etc."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="publishing" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Service Image</CardTitle>
                    <CardDescription>Upload a representative image for the service</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Image URL (or upload)</Label>
                      <Input
                        value={formData.image_url}
                        onChange={(e) => handleInputChange('image_url', e.target.value)}
                        placeholder="Enter image URL or upload file"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Upload Image</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file);
                          }}
                          disabled={uploading}
                        />
                        <Button type="button" size="sm" disabled={uploading}>
                          <Image className="w-4 h-4 mr-1" />
                          {uploading ? 'Uploading...' : 'Upload'}
                        </Button>
                      </div>
                    </div>
                    {formData.image_url && (
                      <div className="mt-4">
                        <img
                          src={formData.image_url}
                          alt="Service preview"
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Publishing Options</CardTitle>
                    <CardDescription>Control service visibility and publication status</CardDescription>
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
                      <Label htmlFor="is_published">Publish service (visible to public)</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      When published, this service will be visible on the public services page. 
                      Unpublished services are only visible in the admin dashboard.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || uploading}>
              {loading ? 'Saving...' : (service ? 'Update Service' : 'Create Service')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}