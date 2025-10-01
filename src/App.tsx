import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CompanyPage from "./pages/CompanyPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import BusinessDevelopmentPage from "./pages/BusinessDevelopmentPage";
import AcademicConsultancyPage from "./pages/AcademicConsultancyPage";
import GeneralMerchandisePage from "./pages/GeneralMerchandisePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import BookingPage from "./pages/BookingPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AuthPage from "./pages/AuthPage";
import EventsPage from "./pages/EventsPage";
import EventRegistrationPage from "./pages/EventRegistrationPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ProjectCollaborationPage from "./pages/ProjectCollaborationPage";
import CataloguePage from "./pages/CataloguePage";
import StartJourneyPage from "./pages/StartJourneyPage";
import AcademicConsultationPage from "./pages/AcademicConsultationPage";
import PersonalDevelopmentPage from "./pages/PersonalDevelopmentPage";
import LifeCoachingPage from "./pages/personal-development/LifeCoachingPage";
import WellnessPage from "./pages/personal-development/WellnessPage";
import SkillsDevelopmentPage from "./pages/personal-development/SkillsDevelopmentPage";
import CareerGrowthPage from "./pages/personal-development/CareerGrowthPage";
import SupportPage from "./pages/SupportPage";
import FormDetailsPage from "./pages/FormDetailsPage";
import NotFound from "./pages/NotFound";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import LegalDisclaimerPage from "./pages/LegalDisclaimerPage";
import CareersPage from "./pages/CareersPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import EventDetailPage from "./pages/EventDetailPage";
import CustomChat from "./components/CustomChat";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/business-development"
            element={<BusinessDevelopmentPage />}
          />
          <Route
            path="/academic-consultancy"
            element={<AcademicConsultancyPage />}
          />
          <Route
            path="/general-merchandise"
            element={<GeneralMerchandisePage />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/legal-disclaimer" element={<LegalDisclaimerPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/forms/:id" element={<FormDetailsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/events/register" element={<EventRegistrationPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route
            path="/projects/collaborate"
            element={<ProjectCollaborationPage />}
          />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/start-journey" element={<StartJourneyPage />} />
          <Route
            path="/academic-consultancy/consultation"
            element={<AcademicConsultationPage />}
          />
          <Route
            path="/personal-development"
            element={<PersonalDevelopmentPage />}
          />
          <Route
            path="/personal-development/life-coaching"
            element={<LifeCoachingPage />}
          />
          <Route
            path="/personal-development/wellness"
            element={<WellnessPage />}
          />
          <Route
            path="/personal-development/skills-development"
            element={<SkillsDevelopmentPage />}
          />
          <Route
            path="/personal-development/career-growth"
            element={<CareerGrowthPage />}
          />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:id" element={<JobDetailsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CustomChat />
        <Toaster />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
