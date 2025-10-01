import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
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
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react";

const EventRegistrationPage = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('event');
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    position: "",
    dietaryRestrictions: "",
    accessibilityNeeds: "",
    emergencyContact: "",
    emergencyPhone: "",
    agreeToTerms: false,
    receiveUpdates: false
  });

  const [event, setEvent] = useState<any>(null);
  const [eventLoading, setEventLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      if (!eventId) return;
      
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', eventId)
          .eq('is_published', true)
          .is('deleted_at', null)
          .single();

        if (error) throw error;
        setEvent(data);
      } catch (error) {
        console.error('Error loading event:', error);
      } finally {
        setEventLoading(false);
      }
    };

    loadEvent();
  }, [eventId]);

  // Mock event data as fallback
  const mockEvent = {
    id: eventId || "1",
    title: "Business Development Workshop",
    description: "Learn the fundamentals of starting and growing your business in Ghana's dynamic market.",
    event_date: "2024-01-25T09:00:00",
    location: "Accra Conference Center",
    current_participants: 45,
    max_participants: 60,
    price: 0,
    image_url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd"
  };

  const displayEvent = event || mockEvent;

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

    setLoading(true);

    try {
      const submissionData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        message: `Event Registration Details:\n\nOrganization: ${formData.organization}\nPosition: ${formData.position}\nDietary Restrictions: ${formData.dietaryRestrictions}\nAccessibility Needs: ${formData.accessibilityNeeds}\nEmergency Contact: ${formData.emergencyContact} (${formData.emergencyPhone})\nReceive Updates: ${formData.receiveUpdates ? 'Yes' : 'No'}`,
        form_type: 'event_registration' as const,
        event_id: eventId,
        additional_data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          organization: formData.organization,
          position: formData.position,
          dietaryRestrictions: formData.dietaryRestrictions,
          accessibilityNeeds: formData.accessibilityNeeds,
          emergencyContact: formData.emergencyContact,
          emergencyPhone: formData.emergencyPhone,
          receiveUpdates: formData.receiveUpdates,
          eventTitle: displayEvent.title
        }
      };

      const { error } = await supabase
        .from('form_submissions')
        .insert([submissionData]);

      if (error) throw error;

      toast({
        title: "Registration Successful!",
        description: "You have been registered for the event. Check your email for confirmation.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        organization: "",
        position: "",
        dietaryRestrictions: "",
        accessibilityNeeds: "",
        emergencyContact: "",
        emergencyPhone: "",
        agreeToTerms: false,
        receiveUpdates: false
      });
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (eventLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading event...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link to="/events" className="inline-flex items-center text-primary hover:text-accent mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Link>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Event Details */}
              <div>
                {displayEvent.image_url && (
                  <div className="mb-6">
                    <img
                      src={displayEvent.image_url}
                      alt={displayEvent.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <h1 className="text-3xl font-heading font-bold text-primary mb-4">
                  {displayEvent.title}
                </h1>
                
                <p className="text-muted-foreground mb-6">
                  {displayEvent.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-3 text-primary" />
                    <span>{new Date(displayEvent.event_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-3 text-primary" />
                    <span>{new Date(displayEvent.event_date).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-3 text-primary" />
                    <span>{displayEvent.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-3 text-primary" />
                    <span>{displayEvent.current_participants}/{displayEvent.max_participants} registered</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <h3 className="font-semibold mb-2">What's Included:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Workshop materials and resources</li>
                    <li>• Networking lunch</li>
                    <li>• Certificate of participation</li>
                    <li>• Access to exclusive online community</li>
                  </ul>
                </div>
              </div>

              {/* Registration Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Registration</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Fill out the form below to register for this event.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Personal Information</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            required
                          />
                        </div>
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
                    </div>

                    {/* Professional Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Professional Information</h3>
                      
                      <div>
                        <Label htmlFor="organization">Organization/Company</Label>
                        <Input
                          id="organization"
                          value={formData.organization}
                          onChange={(e) => handleInputChange('organization', e.target.value)}
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

                    {/* Special Requirements */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Special Requirements</h3>
                      
                      <div>
                        <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                        <Textarea
                          id="dietaryRestrictions"
                          value={formData.dietaryRestrictions}
                          onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                          placeholder="Please specify any dietary restrictions or allergies"
                        />
                      </div>

                      <div>
                        <Label htmlFor="accessibilityNeeds">Accessibility Needs</Label>
                        <Textarea
                          id="accessibilityNeeds"
                          value={formData.accessibilityNeeds}
                          onChange={(e) => handleInputChange('accessibilityNeeds', e.target.value)}
                          placeholder="Please specify any accessibility requirements"
                        />
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Emergency Contact</h3>
                      
                      <div>
                        <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                        <Input
                          id="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                        <Input
                          id="emergencyPhone"
                          type="tel"
                          value={formData.emergencyPhone}
                          onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Agreements */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                        />
                        <label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                          I agree to the <Link to="/terms" className="text-primary hover:underline">terms and conditions</Link> and <Link to="/privacy" className="text-primary hover:underline">privacy policy</Link> *
                        </label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="receiveUpdates"
                          checked={formData.receiveUpdates}
                          onCheckedChange={(checked) => handleInputChange('receiveUpdates', checked as boolean)}
                        />
                        <label htmlFor="receiveUpdates" className="text-sm">
                          I would like to receive updates about future events and workshops
                        </label>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={loading}>
                      {loading ? "Registering..." : "Complete Registration"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventRegistrationPage;