import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"; // ✅ Correct import for Vite + React apps

// Pages
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
import WellnessAssessmentPage from "./pages/WellnessAssessmentPage";
import LearningAssessmentPage from "./pages/LearningAssessmentPage";
import CareerAssessmentPage from "./pages/CareerAssessmentPage";
import SalaryCalculatorPage from "./pages/SalaryCalculatorPage";
import SupportPage from "./pages/SupportPage";
import FormDetailsPage from "./pages/FormDetailsPage";
import NotFound from "./pages/NotFound";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import LegalDisclaimerPage from "./pages/LegalDisclaimerPage";
import CareersPage from "./pages/CareersPage";
import JobDetailsPage from "./pages/JobDetailsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Services */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailsPage />} />

          {/* Business & Academic */}
          <Route path="/business-development" element={<BusinessDevelopmentPage />} />
          <Route path="/academic-consultancy" element={<AcademicConsultancyPage />} />
          <Route path="/academic-consultancy/consultation" element={<AcademicConsultationPage />} />
          <Route path="/general-merchandise" element={<GeneralMerchandisePage />} />

          {/* Personal Development */}
          <Route path="/personal-development" element={<PersonalDevelopmentPage />} />
          <Route path="/personal-development/life-coaching" element={<LifeCoachingPage />} />
          <Route path="/personal-development/wellness" element={<WellnessPage />} />
          <Route path="/personal-development/skills-development" element={<SkillsDevelopmentPage />} />
          <Route path="/personal-development/career-growth" element={<CareerGrowthPage />} />
          <Route path="/personal-development/career-assessment" element={<CareerAssessmentPage />} />
          <Route path="/personal-development/salary-calculator" element={<SalaryCalculatorPage />} />

          {/* Assessments */}
          <Route path="/WellnessAssessmentPage" element={<WellnessAssessmentPage />} />
          <Route path="/LearningAssessmentPage" element={<LearningAssessmentPage />} />

          {/* Projects */}
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/projects/collaborate" element={<ProjectCollaborationPage />} />

          {/* Events */}
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/register" element={<EventRegistrationPage />} />

          {/* Careers */}
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:id" element={<JobDetailsPage />} />

          {/* Auth & Admin */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/forms/:id" element={<FormDetailsPage />} />

          {/* Legal & Policies */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/legal-disclaimer" element={<LegalDisclaimerPage />} />

          {/* Miscellaneous */}
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/start-journey" element={<StartJourneyPage />} />
          <Route path="/support" element={<SupportPage />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {/* ✅ Add Vercel Analytics for deployment insights */}
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
