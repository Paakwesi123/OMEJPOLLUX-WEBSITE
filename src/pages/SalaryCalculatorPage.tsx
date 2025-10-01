import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calculator, TrendingUp, DollarSign } from "lucide-react";

const SalaryCalculatorPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: "",
    experience: "",
    education: "",
    industry: "",
    location: "",
    companySize: ""
  });
  const [result, setResult] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  const jobTitles = [
    "Software Engineer", "Marketing Manager", "Sales Representative", "Accountant", 
    "Teacher", "Nurse", "Project Manager", "HR Manager", "Data Analyst", 
    "Business Analyst", "Operations Manager", "Finance Manager", "Other"
  ];

  const industries = [
    "Banking & Finance", "Information Technology", "Healthcare", "Education",
    "Manufacturing", "Telecommunications", "Oil & Gas", "Retail", "Agriculture",
    "Construction", "Government", "NGO/Non-Profit", "Other"
  ];

  const locations = [
    "Accra", "Kumasi", "Tamale", "Cape Coast", "Sekondi-Takoradi", "Ho", "Koforidua", "Other"
  ];

  const calculateSalary = () => {
    // Base salary calculation logic for Ghana market
    let baseSalary = 0;
    
    // Job title base
    const titleMultipliers: { [key: string]: number } = {
      "Software Engineer": 8000,
      "Marketing Manager": 6000,
      "Sales Representative": 3500,
      "Accountant": 4500,
      "Teacher": 2500,
      "Nurse": 3000,
      "Project Manager": 7000,
      "HR Manager": 5500,
      "Data Analyst": 6500,
      "Business Analyst": 6000,
      "Operations Manager": 6500,
      "Finance Manager": 7500,
      "Other": 4000
    };

    baseSalary = titleMultipliers[formData.jobTitle] || 4000;

    // Experience multiplier
    const experienceMultipliers: { [key: string]: number } = {
      "0-1": 1.0,
      "2-3": 1.3,
      "4-5": 1.6,
      "6-10": 2.0,
      "10+": 2.5
    };

    // Education multiplier
    const educationMultipliers: { [key: string]: number } = {
      "High School": 1.0,
      "Diploma": 1.2,
      "Bachelor's": 1.4,
      "Master's": 1.7,
      "PhD": 2.0
    };

    // Location multiplier
    const locationMultipliers: { [key: string]: number } = {
      "Accra": 1.2,
      "Kumasi": 1.0,
      "Tamale": 0.8,
      "Cape Coast": 0.9,
      "Sekondi-Takoradi": 0.95,
      "Ho": 0.85,
      "Koforidua": 0.9,
      "Other": 0.85
    };

    // Industry multiplier
    const industryMultipliers: { [key: string]: number } = {
      "Banking & Finance": 1.3,
      "Information Technology": 1.4,
      "Oil & Gas": 1.5,
      "Telecommunications": 1.3,
      "Healthcare": 1.1,
      "Manufacturing": 1.0,
      "Education": 0.8,
      "Government": 0.9,
      "NGO/Non-Profit": 0.7,
      "Other": 1.0
    };

    // Company size multiplier
    const companySizeMultipliers: { [key: string]: number } = {
      "Startup (1-10)": 0.9,
      "Small (11-50)": 1.0,
      "Medium (51-200)": 1.2,
      "Large (201-1000)": 1.4,
      "Enterprise (1000+)": 1.6
    };

    const experienceMultiplier = experienceMultipliers[formData.experience] || 1.0;
    const educationMultiplier = educationMultipliers[formData.education] || 1.0;
    const locationMultiplier = locationMultipliers[formData.location] || 1.0;
    const industryMultiplier = industryMultipliers[formData.industry] || 1.0;
    const companySizeMultiplier = companySizeMultipliers[formData.companySize] || 1.0;

    const calculatedSalary = baseSalary * experienceMultiplier * educationMultiplier * 
                           locationMultiplier * industryMultiplier * companySizeMultiplier;

    const minSalary = Math.round(calculatedSalary * 0.8);
    const maxSalary = Math.round(calculatedSalary * 1.2);
    const avgSalary = Math.round(calculatedSalary);

    setResult({
      min: minSalary,
      max: maxSalary,
      average: avgSalary,
      monthly: Math.round(avgSalary / 12)
    });
    setShowResults(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateSalary();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-orange-50 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Button 
              variant="outline" 
              className="mb-6"
              onClick={() => navigate('/personal-development/career-growth')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Career Growth
            </Button>
            <Badge className="mb-6 px-4 py-2 bg-orange-100 text-orange-800">Salary Calculator</Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Ghana Salary <span className="text-orange-600">Calculator</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover your market value with our comprehensive salary calculator tailored for Ghana's job market.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    Salary Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Select onValueChange={(value) => setFormData({...formData, jobTitle: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your job title" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTitles.map((title) => (
                            <SelectItem key={title} value={title}>{title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Select onValueChange={(value) => setFormData({...formData, experience: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="2-3">2-3 years</SelectItem>
                          <SelectItem value="4-5">4-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="education">Education Level</Label>
                      <Select onValueChange={(value) => setFormData({...formData, education: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High School">High School</SelectItem>
                          <SelectItem value="Diploma">Diploma/Certificate</SelectItem>
                          <SelectItem value="Bachelor's">Bachelor's Degree</SelectItem>
                          <SelectItem value="Master's">Master's Degree</SelectItem>
                          <SelectItem value="PhD">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Select onValueChange={(value) => setFormData({...formData, industry: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Select onValueChange={(value) => setFormData({...formData, location: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>{location}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select onValueChange={(value) => setFormData({...formData, companySize: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Startup (1-10)">Startup (1-10 employees)</SelectItem>
                          <SelectItem value="Small (11-50)">Small (11-50 employees)</SelectItem>
                          <SelectItem value="Medium (51-200)">Medium (51-200 employees)</SelectItem>
                          <SelectItem value="Large (201-1000)">Large (201-1000 employees)</SelectItem>
                          <SelectItem value="Enterprise (1000+)">Enterprise (1000+ employees)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                      disabled={!formData.jobTitle || !formData.experience || !formData.education || !formData.industry || !formData.location || !formData.companySize}
                    >
                      Calculate Salary
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Results */}
              <div>
                {showResults && result ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-orange-600">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Your Estimated Salary Range
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">
                          GHS {result.min.toLocaleString()} - GHS {result.max.toLocaleString()}
                        </div>
                        <p className="text-muted-foreground">Annual Salary Range</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">
                            GHS {result.average.toLocaleString()}
                          </div>
                          <p className="text-sm text-muted-foreground">Average Annual</p>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">
                            GHS {result.monthly.toLocaleString()}
                          </div>
                          <p className="text-sm text-muted-foreground">Average Monthly</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-primary mb-2">Note:</h4>
                        <p className="text-sm text-muted-foreground">
                          This is an estimate based on market data and various factors. Actual salaries may vary 
                          based on company policies, negotiation skills, additional benefits, and current market conditions.
                        </p>
                      </div>

                      <Button 
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                        onClick={() => navigate('/personal-development/career-growth')}
                      >
                        Explore Career Growth Services
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <DollarSign className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-primary mb-4">Ready to Calculate?</h3>
                      <p className="text-muted-foreground">
                        Fill out the form to get your personalized salary estimate based on Ghana's current job market.
                      </p>
                    </CardContent>
                  </Card>
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

export default SalaryCalculatorPage;