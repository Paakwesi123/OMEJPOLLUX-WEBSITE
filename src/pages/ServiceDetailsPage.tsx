import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, ArrowLeft } from "lucide-react";

const fallbackServices = [
  {
    key: "Business Development & Consultancy",
    title: "Business Development & Consultancy",
    description:
      "Transform your business vision into reality with our comprehensive strategic guidance and execution support.",
    features: [
      "Business Plan Development",
      "Market Research & Analysis",
      "Financial Planning & Forecasting",
      "Strategic Consulting",
      "Business Process Optimization",
      "Growth Strategy Development",
    ],
    benefits: [
      "PPA-compliant procurement processes",
      "Proven track record with 100+ successful projects",
      "Industry-specific expertise across sectors",
      "Ongoing support throughout implementation",
    ],
  },
  {
    key: "Academic Consultancy & Support",
    title: "Academic Consultancy & Support",
    description:
      "Comprehensive academic support services for students and institutions to achieve educational excellence.",
    features: [
      "Thesis & Dissertation Support",
      "Research Methodology Guidance",
      "Academic Writing Assistance",
      "Statistical Analysis Support",
      "Institutional Curriculum Development",
      "Academic Project Management",
    ],
    benefits: [
      "PhD-level academic expertise",
      "Specialized support for multiple disciplines",
      "Flexible consultation schedules",
      "Quality assurance and review processes",
    ],
  },
  {
    key: "Personal Development",
    title: "Personal Development",
    description:
      "Empower yourself with comprehensive personal growth and wellness programs designed for holistic development.",
    features: [
      "Life Coaching Sessions",
      "Career Development Planning",
      "Wellness & Mental Health Support",
      "Skills Development Training",
      "Leadership Development",
      "Work-Life Balance Coaching",
    ],
    benefits: [
      "Certified personal development coaches",
      "Personalized development plans",
      "Flexible scheduling options",
      "Proven methodology for lasting change",
    ],
  },
  {
    key: "General Merchandise Supplies",
    title: "General Merchandise Supplies",
    description:
      "PPA-compliant procurement services ensuring quality supplies for institutions and organizations.",
    features: [
      "Public Procurement Compliance",
      "Office Supplies & Equipment",
      "Educational Materials",
      "IT Equipment & Solutions",
      "Facility Management Supplies",
      "Custom Procurement Solutions",
    ],
    benefits: [
      "100% PPA compliance guarantee",
      "Quality-assured products and suppliers",
      "Competitive pricing and transparent processes",
      "End-to-end procurement management",
    ],
  },
];

function toSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const isUuid = useMemo(() => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id || ""), [id]);

  useEffect(() => {
    const load = async () => {
      try {
        if (isUuid) {
          const { data, error } = await supabase
            .from("services")
            .select("*")
            .eq("id", id)
            .single();
          if (!error && data) {
            setService(data);
            return;
          }
        }
        // fallback to slug from title
        const fallback = fallbackServices.find((s) => toSlug(s.title) === toSlug(id || ""));
        setService(fallback || null);
      } catch (e) {
        console.error("Failed to load service", e);
        const fallback = fallbackServices.find((s) => toSlug(s.title) === toSlug(id || ""));
        setService(fallback || null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isUuid]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-10">
          <p className="text-muted-foreground">Loading service...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-10">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <h1 className="text-3xl font-heading font-bold text-primary mb-4">Service not found</h1>
          <p className="text-muted-foreground">We couldn’t find the service you’re looking for.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const features: any[] = Array.isArray(service.features)
    ? service.features
    : Array.isArray(service.detailedServices)
    ? service.detailedServices
    : [];
  const normalizedFeatures = features.map((f: any) => (typeof f === "string" ? { name: f, description: "" } : f));

  const benefits: any[] = Array.isArray(service.outcomes)
    ? service.outcomes
    : Array.isArray(service.benefits)
    ? service.benefits
    : [];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-primary-foreground/90">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{service.title}</h1>
          <p className="text-primary-foreground/90 max-w-3xl">{service.description}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Image */}
          {service.image_url && (
            <img src={service.image_url} alt={`${service.title} image`} className="w-full h-72 object-cover rounded-xl mb-10" />
          )}

          {/* Details grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-heading font-semibold text-primary mb-6">What We Offer</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {normalizedFeatures.map((item: any) => (
                  <Card key={item.name} className="card-hover border-0 bg-card/50">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-primary mb-3">{item.name}</h4>
                      {item.description && (
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {service.content && (
                <div className="mt-10">
                  <h3 className="text-2xl font-heading font-semibold text-primary mb-4">More About This Service</h3>
                  <div className="prose max-w-none text-muted-foreground">{service.content}</div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-2xl font-heading font-semibold text-primary mb-6">Key Benefits</h3>
              <Card className="card-hover border-0 bg-secondary/30">
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {benefits.map((b: any, idx: number) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground leading-relaxed">
                          {typeof b === "string" ? b : b?.name ?? ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button className="btn-primary w-full mt-6" onClick={() => navigate("/booking")}>Book a Consultation</Button>
                </CardContent>
              </Card>

              {/* Meta */}
              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                {service.duration && (
                  <div><span className="font-medium text-foreground">Duration:</span> {service.duration}</div>
                )}
                {service.pricing && typeof service.pricing === "object" && (
                  <div><span className="font-medium text-foreground">Pricing:</span> {JSON.stringify(service.pricing)}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetailsPage;
