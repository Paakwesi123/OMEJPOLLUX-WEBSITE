import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Facebook,
  Instagram,
  Linkedin,
  X,
  Send,
  Minimize2,
} from "lucide-react";
import AdinkraSymbol from "@/components/AdinkraSymbols";

const FAQ_DATABASE = [
  // ... keep your FAQ_DATABASE as-is ...
  {
    keywords: ["services", "offer", "provide", "what do you do", "offerings"],
    answer: "We provide three core services: Business Development & Consultancy (business plans, feasibility studies, compliance), Academic Consultancy & Support (SPSS analysis, thesis editing, research design), and General Merchandise Supplies (tender-based supplies to institutions)."
  },
  {
    keywords: ["business plan", "business development", "consultancy", "startup help"],
    answer: "Our Business Development services include investor-ready business plans, feasibility studies, regulatory compliance advisory, strategic planning workshops, NGO project design, and corporate documentation like policies and SOPs."
  },
  {
    keywords: ["academic", "thesis", "spss", "research", "student", "project", "editing"],
    answer: "We offer comprehensive academic support: research proposal development, SPSS & statistical analysis, thesis/project supervision, proofreading and editing, data collection instruments, and training workshops on research methodology."
  },
  {
    keywords: ["supplies", "procurement", "merchandise", "logistics", "ppa"],
    answer: "We're PPA-registered (Supplier ID: 313096) and provide office supplies, educational materials, agricultural inputs, ICT accessories, and logistics coordination for government agencies, schools, and NGOs."
  },
  {
    keywords: ["location", "where", "office", "address", "based"],
    answer: "We're headquartered in Cape Coast, Ghana, and serve clients across the Central, Greater Accra, and Ashanti Regions through our flexible hub-and-spoke model."
  },
  {
    keywords: ["contact", "reach", "call", "email", "phone"],
    answer: "You can reach us at: Email: info@omejpollux.org | Phone: +233 59 631 6230 | WhatsApp: +233 59 631 6230. We're available Monday-Friday, 8:30am-5:30pm."
  },
  {
    keywords: ["price", "cost", "fee", "pricing", "charge", "how much"],
    answer: "We use value-based pricing with tiered packages (basic, premium, express) for consultancy and academic services. For supply contracts, we use transparent cost-plus pricing. Contact us for specific quotes tailored to your needs."
  },
  {
    keywords: ["founder", "owner", "ceo", "who runs", "management", "emmanuel"],
    answer: "OMEJ Pollux was founded and is led by Emmanuel Owusu-Mintah, who brings over 5 years of experience in development studies, research methodology, and policy consulting."
  },
  {
    keywords: ["registration", "registered", "legal", "compliance", "certified"],
    answer: "We're fully registered with Business Registration No. BN292842018, VAT-registered (P0011614706), and listed on the PPA Supplier Database (Supplier ID: 313096)."
  },
  {
    keywords: ["payment", "pay", "billing", "invoice"],
    answer: "We accept bank transfers and mobile money payments. For larger projects, we offer milestone-based billing. All transactions are formalized with contracts and proper invoicing."
  },
  {
    keywords: ["turnaround", "timeline", "how long", "duration", "delivery time"],
    answer: "Timelines vary by service: Business plans (1-3 weeks), Academic editing (3-7 days), SPSS analysis (5-10 days), Supply contracts (per tender terms). We offer express services for urgent needs."
  },
  {
    keywords: ["workshop", "training", "seminar", "learn"],
    answer: "Yes! We conduct training workshops on SPSS, research methodology, business planning, and proposal writing. These can be customized for institutions or individual groups."
  },
  {
    keywords: ["ngo", "nonprofit", "organization", "donor"],
    answer: "We specialize in NGO support including project design, donor proposals, grant applications, strategic planning, and compliance documentation. We understand the unique needs of nonprofit organizations."
  },
  {
    keywords: ["student", "university", "college", "undergraduate", "postgraduate"],
    answer: "We support students from diploma to PhD level with research proposals, data analysis, thesis writing, editing, and SPSS training. All services maintain strict academic integrity standards."
  },
  {
    keywords: ["ethics", "ethical", "plagiarism", "integrity"],
    answer: "We maintain strict ethical standards: no plagiarism, confidentiality agreements, data integrity, anti-ghostwriting policies, and compliance with academic institutional requirements."
  },
  {
    keywords: ["remote", "online", "virtual", "distance"],
    answer: "Yes! We provide remote services via Zoom, WhatsApp, email, and cloud-based collaboration tools. Most of our academic and consultancy work can be delivered entirely online."
  },
  {
    keywords: ["government", "ministry", "public sector", "institutional"],
    answer: "We work with government agencies, ministries, schools, and public institutions for supply contracts, capacity building, and consultancy services. We're fully PPA-compliant for public procurement."
  },
  {
    keywords: ["sme", "small business", "entrepreneur", "msme"],
    answer: "We're startup-friendly! Our modular packages include the Startup Pack, business model development, regulatory guidance, and investor pitch preparation - all designed for early-stage businesses."
  },
  {
    keywords: ["partnership", "collaborate", "work together", "joint venture"],
    answer: "We're open to strategic partnerships with institutions, consultancies, and organizations. We offer institutional rates and can develop customized service agreements."
  },
  {
    keywords: ["mission", "vision", "values", "purpose"],
    answer: "Our mission is to deliver practical, ethical, and timely solutions for entrepreneurs, institutions, and students. We're guided by innovation, integrity, excellence, and impact."
  },
  {
    keywords: ["experience", "track record", "portfolio", "clients"],
    answer: "Since 2018, we've served startups, SMEs, NGOs, students, and institutions across Ghana. We've delivered business plans, academic support, and supply contracts with a focus on quality and compliance."
  },
  {
    keywords: ["social media", "facebook", "instagram", "linkedin", "follow"],
    answer: "Follow us on Facebook, Instagram (@omejpollux), and LinkedIn (OMEJ Pollux). We share updates, tips, and opportunities regularly!"
  },
  {
    keywords: ["revenue", "income", "sales", "financial", "projection"],
    answer: "Our 5-year financial projection shows growth from GHS 75,000 in Year 1 to GHS 600,000 by Year 5, with cumulative revenue of GHS 1.45M. We project break-even by mid-Year 2 with operating margins of 40-45%."
  },
  {
    keywords: ["investment", "funding", "capital", "investor", "equity"],
    answer: "We're seeking GHS 30,000 in strategic funding for digital infrastructure, marketing, procurement logistics, and service expansion. We offer flexible investment options including equity (10% stake) or convertible note structures."
  },
  {
    keywords: ["feasibility study", "market research", "analysis"],
    answer: "We conduct comprehensive feasibility studies and market research for startups, SMEs, and NGOs. Our analysis includes market sizing, competitive landscape, financial projections, and strategic recommendations to help you make informed business decisions."
  },
  {
    keywords: ["proposal writing", "grant", "donor", "application"],
    answer: "We specialize in writing compelling proposals for grants, donors, and tenders. Our team helps NGOs and businesses craft winning applications that meet institutional requirements and effectively communicate your project's impact and value."
  },
  {
    keywords: ["data analysis", "statistics", "quantitative", "survey"],
    answer: "Our data analysis services include SPSS processing, survey design, questionnaire development, statistical interpretation, and data visualization. We work with students and researchers to ensure rigorous, academically sound analysis."
  },
  {
    keywords: ["editing", "proofreading", "format", "thesis editing"],
    answer: "We provide professional editing and proofreading services for academic papers, theses, dissertations, and research proposals. Our editors ensure proper formatting, grammar, clarity, and compliance with your institution's guidelines."
  },
  {
    keywords: ["strategic planning", "strategy", "business strategy"],
    answer: "We offer strategic planning workshops and consulting to help organizations develop clear roadmaps, set measurable goals, and create actionable implementation plans. Our approach is practical and tailored to your specific context."
  },
  {
    keywords: ["compliance", "regulatory", "rgd", "gra", "documentation"],
    answer: "We assist with regulatory compliance including RGD registration, GRA tax registration, PPA supplier registration, and development of corporate policies, SOPs, and governance documentation to keep your business compliant."
  },
  {
    keywords: ["office supplies", "stationery", "equipment"],
    answer: "Through our General Merchandise division, we supply office equipment, stationery, furniture, and consumables to government agencies, schools, NGOs, and private firms. All supplies are delivered with proper invoicing and documentation."
  },
  {
    keywords: ["agricultural", "farm", "inputs", "tools"],
    answer: "We supply agricultural inputs including farming tools, seeds, protective equipment, and farm consumables. Our procurement team ensures quality products delivered on time to support agricultural projects and institutions."
  },
  {
    keywords: ["ict", "technology", "computers", "accessories"],
    answer: "We provide ICT accessories and basic equipment for institutions including computers, printers, projectors, networking accessories, and other technology supplies through our PPA-compliant procurement services."
  },
  {
    keywords: ["tender", "bid", "quotation", "procurement process"],
    answer: "We actively participate in public and private tenders, providing competitive quotations backed by proper documentation (VAT, PPA registration). Our tender response includes transparent pricing and reliable delivery commitments."
  },
  {
    keywords: ["diploma", "undergraduate", "masters", "phd", "degree"],
    answer: "We support students at all academic levels - from diploma to PhD. Our services are tailored to the complexity and requirements of each level, ensuring appropriate academic rigor and institutional compliance."
  },
  {
    keywords: ["research methodology", "research design", "methods"],
    answer: "We provide guidance on research methodology including study design, sampling techniques, data collection methods, and analysis frameworks. We also conduct training workshops for individuals and institutional groups."
  },
  {
    keywords: ["confidentiality", "privacy", "nda", "data protection"],
    answer: "We take confidentiality seriously. All client engagements are protected by signed NDAs and confidentiality agreements. Your data, documents, and project information are stored securely and never shared without permission."
  },
  {
    keywords: ["institutional", "partnership", "school", "university collaboration"],
    answer: "We offer institutional partnerships with schools, universities, and colleges for bulk academic support services, training workshops, and supply contracts. We provide special institutional rates and customized service agreements."
  },
  {
    keywords: ["neip", "youstart", "gea", "startup support"],
    answer: "We help entrepreneurs prepare for startup programs like NEIP, YouStart, and GEA by developing compliant business plans, financial projections, and documentation that meet program requirements and improve approval chances."
  },
  {
    keywords: ["break even", "profitability", "profit", "margin"],
    answer: "Based on our financial model, we expect to reach break-even by mid-Year 2 with projected operating margins of 40-45%. Our lean operating model keeps costs low while maintaining service quality and scalability."
  },
  {
    keywords: ["tools", "software", "technology", "systems"],
    answer: "We use professional tools including SPSS for analysis, Grammarly and Turnitin for editing, Google Workspace for collaboration, Trello for project management, and Zoho Books for financial tracking - ensuring quality and efficiency."
  },
  {
    keywords: ["delivery", "shipping", "logistics", "transport"],
    answer: "We coordinate timely delivery through third-party logistics partners and direct delivery for supply contracts. For documents and academic work, we use email, cloud sharing, and courier services to meet your deadlines."
  },
    {
    keywords: ["appointment", "schedule", "meeting", "consultation"],
    answer: "You can schedule appointments or consultations by contacting us via email, WhatsApp, or phone. We offer flexible slots Monday through Friday."
  },
  {
    keywords: ["feedback", "suggestion", "review", "comment"],
    answer: "We value your feedback! You can share suggestions or reviews through our contact form or WhatsApp, and our team will respond promptly."
  },
  {
    keywords: ["refund", "return", "cancellation", "policy"],
    answer: "For cancellations or refund requests, please contact us within 24 hours of service confirmation. Refunds are processed according to the terms of service."
  },
  {
    keywords: ["support", "help", "customer service", "assistance"],
    answer: "Our support team is available Monday to Friday, 8:30am-5:30pm via WhatsApp, email, or phone for any assistance you may need."
  },
  {
    keywords: ["team", "staff", "employees", "consultants"],
    answer: "Our team comprises business consultants, academic advisors, research specialists, and procurement experts, all with proven experience in their respective fields."
  },
  {
    keywords: ["career", "job", "internship", "vacancy"],
    answer: "We occasionally offer internships and job opportunities. Please check our social media channels or contact us for current openings."
  },
  {
    keywords: ["newsletter", "updates", "subscribe", "mailing list"],
    answer: "You can subscribe to our newsletter on our website to receive updates, tips, and news about our services and training programs."
  },
  {
    keywords: ["certificate", "accreditation", "proof", "document"],
    answer: "We provide official certificates and documentation for completed workshops, training, and approved projects upon request."
  },
  {
    keywords: ["discount", "offer", "promotion", "deal"],
    answer: "We occasionally offer discounts for bulk services, students, or early registrations. Contact us to find out about current promotions."
  },
  {
    keywords: ["custom", "tailored", "personalized", "bespoke"],
    answer: "All our services can be customized to meet specific client requirements, including academic support, business consultancy, and supply contracts."
  },
  {
    keywords: ["online payment", "mobile money", "card", "transfer"],
    answer: "We accept payments via mobile money, bank transfers, and debit/credit cards. Payment details are provided in your invoice."
  },
  {
    keywords: ["invoice", "receipt", "billing statement"],
    answer: "All payments are formalized with proper invoices and receipts, ensuring transparent and traceable transactions."
  },
  {
    keywords: ["reviews", "testimonials", "experience", "feedback"],
    answer: "You can read client testimonials on our website and social media. We pride ourselves on delivering high-quality, ethical services."
  },
  {
    keywords: ["hours", "working time", "open", "close", "availability"],
    answer: "Our office hours are Monday to Friday, 8:30am-5:30pm. Remote consultations can be scheduled outside these hours by request."
  },
  {
    keywords: ["referral", "recommend", "partner", "introduce"],
    answer: "We welcome referrals! If you refer a client or partner, please contact us so we can acknowledge your referral."
  },
  {
    keywords: ["events", "seminar", "conference", "webinar"],
    answer: "We organize and participate in workshops, seminars, and webinars related to business development, research, and academic training."
  },
  {
    keywords: ["templates", "documents", "forms", "samples"],
    answer: "We provide templates and sample documents for business plans, proposals, and academic projects upon request as part of our consultancy services."
  },
  {
    keywords: ["collaboration", "joint project", "cooperate"],
    answer: "We collaborate with institutions, NGOs, and businesses on joint projects, research, and training programs."
  },
  {
    keywords: ["report", "analysis", "evaluation", "assessment"],
    answer: "We provide detailed reports and evaluations for academic research, business feasibility studies, and project assessments."
  },
  {
    keywords: ["work from home", "remote job", "freelance"],
    answer: "Remote work arrangements are possible for specific consultancy and academic services. Contact us to discuss your requirements."
  },
  {
    keywords: ["training materials", "slides", "manuals"],
    answer: "For our training workshops, participants receive comprehensive materials, including manuals, templates, and access to digital resources."
  },
  {
    keywords: ["guidelines", "rules", "instructions", "procedure"],
    answer: "We provide clear guidelines and step-by-step procedures for all our services to ensure clients understand each stage of the process."
  },
  {
    keywords: ["updates", "changes", "announcement"],
    answer: "We regularly post updates and announcements about our services, pricing, and events on our social media channels and website."
  },
  {
    keywords: ["part-time", "temporary", "short-term", "project-based"],
    answer: "We offer part-time and project-based support for consultancy, academic work, and supply contracts based on client needs."
  },
  {
    keywords: ["evaluation", "feedback form", "survey", "assessment"],
    answer: "We use surveys and feedback forms to improve our services and measure client satisfaction after project completion."
  },
  {
    keywords: ["digital tools", "software", "platform", "cloud"],
    answer: "Our remote services utilize cloud-based platforms like Google Workspace, Zoom, Trello, and SPSS for smooth collaboration and service delivery."
  },
  {
    keywords: ["partnership benefits", "advantages", "collaborate", "synergy"],
    answer: "Strategic partnerships with us provide access to specialized services, bulk discounts, training programs, and priority support."
  },
  {
    keywords: ["certificate verification", "authenticity", "proof"],
    answer: "All issued certificates and documents are verifiable. Contact us to confirm authenticity if required."
  },
  {
    keywords: ["emergency support", "urgent", "rush service"],
    answer: "We provide urgent or express services for clients who need faster turnaround, including academic editing, SPSS analysis, and business plan delivery."
  },
  {
    keywords: ["networking", "connect", "community", "clients"],
    answer: "By working with us, clients can access a growing network of entrepreneurs, researchers, and institutions for collaboration and learning opportunities."
  }
];

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I'm Pollux AI, your OMEJ Pollux assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    const match = FAQ_DATABASE.find(faq =>
      faq.keywords.some(keyword => lowerQuestion.includes(keyword))
    );
    return match
      ? match.answer
      : "I don't have specific information about that. For detailed inquiries, please contact our CEO directly on WhatsApp at +233 59 631 6230 or email us at info@omejpollux.org.";
  };

  const handleSend = () => {
  if (!input.trim()) return;

  const userMessage = input.trim();
  setMessages(prev => [...prev, { from: "user", text: userMessage }]);
  setInput("");
  setIsTyping(true);

  setTimeout(() => {
    let answer = "";

    // Handle hi/hello specifically
    const lowerMsg = userMessage.toLowerCase();
    if (lowerMsg === "hi") {
      answer = "Hello! How may I help you today?";
    } else if (lowerMsg === "hello") {
      answer = "Hi! How may I help you today?";
    } else {
      // Default FAQ lookup
      answer = findAnswer(userMessage);
    }

    setMessages(prev => [...prev, { from: "bot", text: answer }]);
    setIsTyping(false);
  }, 800);
};

  const quickQuestions = [
    "What services do you offer?",
    "How can I contact you?",
    "What are your prices?",
    "Where are you located?",
  ];

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Adinkra Symbols */}
      <div className="absolute top-16 left-8 text-accent">
        <AdinkraSymbol symbol="adwo" size="lg" className="w-16 h-16 text-accent/40" />
      </div>
      <div className="absolute top-32 right-12 text-secondary">
        <AdinkraSymbol symbol="mate-masie" size="md" className="w-12 h-12 text-secondary/50" />
      </div>
      <div className="absolute bottom-20 left-16 text-accent-foreground">
        <AdinkraSymbol symbol="sankofa" size="md" className="w-14 h-14 text-accent-foreground/40" />
      </div>

      {/* Footer Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="font-bold text-primary text-sm">OP</span>
              </div>
              <span className="text-xl font-heading font-bold">OMEJ Pollux</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Practical, ethical, and timely solutions for entrepreneurs, institutions, and
              students. Your trusted partner for growth and success locally and globally.
            </p>
            <div className="flex space-x-4">
              <Button
                size="sm"
                className="btn-secondary"
                onClick={() => window.open("https://wa.me/233596316230", "_blank")}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Contact", path: "/contact" },
              ].map(link => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {[
                { name: "Business Development", path: "/business-development" },
                { name: "Academic Consultancy", path: "/academic-consultancy" },
                { name: "Personal Development", path: "/personal-development" },
                { name: "General Merchandise", path: "/general-merchandise" },
              ].map(service => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">Cape Coast, Ghana</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">+233 59 631 6230</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">info@omejpollux.org</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-4">
                <div
                  className="cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={() => window.open("https://www.facebook.com/share/1DpS73Trsw/?mibextid=wwXIfr", "_blank")}
                  title="Follow us on Facebook"
                >
                  <Facebook className="w-6 h-6 text-blue-500 hover:text-blue-400" />
                </div>
                <div
                  className="cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={() => window.open("https://www.instagram.com/invites/contact/?igsh=l3sozvt7sz6s&utm_content=ysbbbcc", "_blank")}
                  title="Follow us on Instagram"
                >
                  <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-400" />
                </div>
                <div
                  className="cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={() => window.open("https://www.linkedin.com/company/omej-pollux/", "_blank")}
                  title="Follow us on LinkedIn"
                >
                  <Linkedin className="w-6 h-6 text-blue-600 hover:text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/60 text-sm">
              © 2025 OMEJ Pollux. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-primary-foreground/60 hover:text-accent">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-primary-foreground/60 hover:text-accent">Terms of Service</Link>
              <Link to="/cookie-policy" className="text-primary-foreground/60 hover:text-accent">Cookie Policy</Link>
              <Link to="/legal-disclaimer" className="text-primary-foreground/60 hover:text-accent">Legal & Cautionary Disclaimer</Link>
              <Link to="/admin/login" className="text-primary-foreground/60 hover:text-accent opacity-50 hover:opacity-100">•</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Widget */}
      {open && (
        <div className="fixed bottom-24 right-6 w-96 h-[32rem] bg-gray-100 rounded-2xl shadow-2xl flex flex-col border border-gray-300 z-50 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.67-.33-3.82-.91l-.27-.15-2.91.49.49-2.91-.15-.27C4.33 14.67 4 13.38 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
                  <circle cx="8.5" cy="12" r="1"/>
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="15.5" cy="12" r="1"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Pollux AI</h3>
                <p className="text-xs text-white/80">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-100">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.from === "user"
                    ? "bg-green-500 text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-200"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-white p-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
{/* Quick Questions */}
{messages.length <= 1 && (
  <div className="px-4 pb-2 bg-gray-200 rounded-t-xl">
    <p className="text-xs text-gray-700 mb-2 font-medium">Quick questions:</p>
    <div className="flex flex-wrap gap-2">
      {quickQuestions.map((q, i) => (
        <button
          key={i}
          onClick={() => handleQuickQuestion(q)}
        className="text-xs bg-white text-black border border-gray-300 hover:bg-gray-100 hover:text-black px-3 py-1.5 rounded-full transition-all duration-200"
        >
          {q}
        </button>
      ))}
    </div>
  </div>
)}


          {/* Input */}
          <div className="p-4 bg-gray-100 border-t border-gray-300">
            <div className="flex gap-2">
              <input
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by OMEJ Pollux AI
            </p>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
<button
  onClick={() => setOpen(!open)}
  className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full w-16 h-16 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
>
  {open ? (
    <X className="w-7 h-7 transition-transform group-hover:rotate-90 duration-300" />
  ) : (
    <div className="relative">
      <MessageSquare className="w-7 h-7 transition-transform group-hover:scale-110 duration-300" />
    </div>
  )}
</button>
    </footer>
  );
};

export default Footer;
