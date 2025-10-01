// src/pages/EventDetailPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// Define Event interface to match Supabase schema
interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  current_participants?: number;
  max_participants?: number;
  registration_required: boolean;
  image_url: string;
  category?: string;
  content?: string;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
}

const EventDetailPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching event:", error);
        } else {
          // Fix: Cast data to Event type
          setEvent(data as Event);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleShare = async () => {
    if (!event) return;

    const shareData = {
      title: event.title,
      text: event.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied!",
          description: "Event link copied to clipboard",
        });
      }
    } catch (error) {
      console.log("Sharing cancelled");
    }
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

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Button asChild>
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const isUpcoming = new Date(event.event_date) > new Date();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/events">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <div>
              <Badge className="mb-4">
                {isUpcoming ? "Upcoming" : "Completed"}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
              <p className="text-muted-foreground">{event.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-muted-foreground" />
                <span>
                  {new Date(event.event_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-muted-foreground" />
                <span>
                  {new Date(event.event_date).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
              {event.max_participants && (
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-3 text-muted-foreground" />
                  <span>
                    {event.current_participants || 0}/{event.max_participants}{" "}
                    attendees
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              {isUpcoming && (
                <Button asChild>
                  <Link to={`/events/register?event=${event.id}`}>
                    Register Now
                  </Link>
                </Button>
              )}
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Event
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetailPage;
