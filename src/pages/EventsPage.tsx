import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Plus, Loader2, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const EventsPage = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("event_date", { ascending: true });

        if (error) {
          console.error("Error fetching events:", error);
          setEvents([]); // no mock data
          toast({
            title: "Error",
            description: "Could not fetch events. Please try again later.",
          });
        } else {
          setEvents(data ?? []); // only real data
        }
      } catch (error) {
        console.error("Error:", error);
        setEvents([]); // no fallback
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [toast]);

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isEventUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  const handleAddToCalendar = (event: any) => {
    const startDate =
      new Date(event.event_date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const endDate =
      new Date(new Date(event.event_date).getTime() + 8 * 60 * 60 * 1000)
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0] + "Z";

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(event.location)}`;

    window.open(calendarUrl, "_blank");

    toast({
      title: "Calendar Event",
      description: "Opening Google Calendar to add this event",
    });
  };

  const handleShare = (event: any, platform: string) => {
    const eventUrl = `${window.location.origin}/events?event=${event.id}`;
    const shareText = `Check out this event: ${event.title} - ${formatEventDate(event.event_date)} at ${event.location}`;
    
    let shareUrl = "";
    
    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + " " + eventUrl)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(eventUrl)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(shareText + "\n\n" + eventUrl)}`;
        break;
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(eventUrl);
        toast({
          title: "Link Copied",
          description: "Event link copied to clipboard",
        });
        return;
    }
    
    window.open(shareUrl, "_blank");
    
    toast({
      title: "Sharing Event",
      description: `Opening ${platform} to share this event`,
    });
  };

  const getStatusColor = (dateString: string) => {
    const isUpcoming = isEventUpcoming(dateString);
    return isUpcoming
      ? "bg-orange-100 text-orange-800"
      : "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Upcoming Events
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join our workshops, seminars, and networking events to accelerate
              your business and academic journey
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {events.length === 0 ? (
            <div className="text-center py-12 animate-fadeIn">
              <h3 className="text-xl font-semibold mb-4 animate-pulse">
                No events available
              </h3>
              <p className="text-muted-foreground">
                Check back soon for upcoming events!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={event.image_url || "/api/placeholder/400/300"}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className={getStatusColor(event.event_date)}>
                        {isEventUpcoming(event.event_date)
                          ? "Upcoming"
                          : "Completed"}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatEventDate(event.event_date)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        {formatEventTime(event.event_date)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      {event.max_participants && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="w-4 h-4 mr-2" />
                          {event.current_participants || 0}/
                          {event.max_participants} attendees
                        </div>
                      )}
                    </div>

                    {isEventUpcoming(event.event_date) && (
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          disabled={
                            event.max_participants &&
                            event.current_participants >=
                              event.max_participants
                          }
                          asChild
                        >
                          <Link to={`/events/register?event=${event.id}`}>
                            {event.max_participants &&
                            event.current_participants >=
                              event.max_participants
                              ? "Event Full"
                              : "Register"}
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleAddToCalendar(event)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleShare(event, "whatsapp")}>
                              Share on WhatsApp
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare(event, "twitter")}>
                              Share on Twitter
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare(event, "linkedin")}>
                              Share on LinkedIn
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare(event, "facebook")}>
                              Share on Facebook
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare(event, "email")}>
                              Share via Email
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare(event, "copy")}>
                              Copy Link
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">
            Stay Updated on Our Events
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't miss out on our upcoming workshops and seminars. Visit our
            website or follow us on social media for the latest event
            announcements.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventsPage;