import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle, Target, TrendingUp } from "lucide-react";

const CareerAssessmentPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);

  const questions = [
    {
      question: "What motivates you most in your work?",
      options: [
        { value: "problem-solving", text: "Solving complex problems and challenges", points: { analytical: 3, creative: 1, leadership: 1 } },
        { value: "helping-others", text: "Helping others and making a positive impact", points: { leadership: 2, communication: 3, analytical: 1 } },
        { value: "creating", text: "Creating something new and innovative", points: { creative: 3, entrepreneurial: 2, analytical: 1 } },
        { value: "leading", text: "Leading teams and driving results", points: { leadership: 3, communication: 2, entrepreneurial: 2 } }
      ]
    },
    {
      question: "How do you prefer to work?",
      options: [
        { value: "team", text: "Collaboratively in a team environment", points: { communication: 3, leadership: 2, analytical: 1 } },
        { value: "independent", text: "Independently with minimal supervision", points: { analytical: 2, creative: 2, entrepreneurial: 2 } },
        { value: "mentoring", text: "Mentoring and guiding others", points: { leadership: 3, communication: 3, analytical: 1 } },
        { value: "structured", text: "In a structured, process-driven environment", points: { analytical: 3, leadership: 1, communication: 1 } }
      ]
    },
    {
      question: "What type of challenges excite you most?",
      options: [
        { value: "technical", text: "Technical and analytical challenges", points: { analytical: 3, creative: 1, leadership: 1 } },
        { value: "people", text: "People management and relationship challenges", points: { leadership: 3, communication: 3, analytical: 1 } },
        { value: "strategic", text: "Strategic planning and business challenges", points: { leadership: 2, entrepreneurial: 3, analytical: 2 } },
        { value: "creative", text: "Creative and design challenges", points: { creative: 3, communication: 2, analytical: 1 } }
      ]
    },
    {
      question: "How do you handle pressure and deadlines?",
      options: [
        { value: "systematic", text: "I create systematic plans and follow them", points: { analytical: 3, leadership: 1, communication: 1 } },
        { value: "delegate", text: "I delegate tasks and coordinate with others", points: { leadership: 3, communication: 2, analytical: 1 } },
        { value: "innovate", text: "I find creative solutions to meet deadlines", points: { creative: 3, entrepreneurial: 2, analytical: 1 } },
        { value: "communicate", text: "I communicate frequently to ensure alignment", points: { communication: 3, leadership: 2, analytical: 1 } }
      ]
    },
    {
      question: "What do you value most in your career?",
      options: [
        { value: "stability", text: "Job security and stable income", points: { analytical: 2, leadership: 1, communication: 1 } },
        { value: "growth", text: "Continuous learning and skill development", points: { analytical: 2, creative: 2, leadership: 2 } },
        { value: "impact", text: "Making a meaningful impact on society", points: { leadership: 2, communication: 3, entrepreneurial: 2 } },
        { value: "autonomy", text: "Freedom and flexibility in how I work", points: { creative: 2, entrepreneurial: 3, analytical: 1 } }
      ]
    },
    {
      question: "How do you prefer to communicate ideas?",
      options: [
        { value: "presentations", text: "Through presentations and public speaking", points: { communication: 3, leadership: 2, creative: 1 } },
        { value: "writing", text: "Through detailed written reports", points: { analytical: 3, communication: 2, creative: 1 } },
        { value: "visual", text: "Through visual aids and creative formats", points: { creative: 3, communication: 2, analytical: 1 } },
        { value: "discussion", text: "Through one-on-one discussions", points: { communication: 2, leadership: 2, analytical: 2 } }
      ]
    },
    {
      question: "What role do you typically take in group projects?",
      options: [
        { value: "leader", text: "The leader who coordinates everyone", points: { leadership: 3, communication: 2, entrepreneurial: 2 } },
        { value: "researcher", text: "The researcher who gathers information", points: { analytical: 3, creative: 1, communication: 1 } },
        { value: "creative", text: "The creative one who generates ideas", points: { creative: 3, entrepreneurial: 2, analytical: 1 } },
        { value: "facilitator", text: "The facilitator who ensures smooth collaboration", points: { communication: 3, leadership: 2, analytical: 1 } }
      ]
    },
    {
      question: "What type of work environment energizes you?",
      options: [
        { value: "dynamic", text: "Fast-paced, dynamic startup environment", points: { entrepreneurial: 3, creative: 2, leadership: 2 } },
        { value: "corporate", text: "Structured corporate environment", points: { analytical: 2, leadership: 2, communication: 2 } },
        { value: "creative", text: "Creative agency or design studio", points: { creative: 3, communication: 2, entrepreneurial: 1 } },
        { value: "quiet", text: "Quiet, focused individual workspace", points: { analytical: 3, creative: 2, leadership: 1 } }
      ]
    },
    {
      question: "How do you approach learning new skills?",
      options: [
        { value: "systematic", text: "Through systematic courses and structured learning", points: { analytical: 3, leadership: 1, communication: 1 } },
        { value: "hands-on", text: "Through hands-on practice and experimentation", points: { creative: 2, entrepreneurial: 3, analytical: 1 } },
        { value: "mentorship", text: "Through mentorship and guidance from experts", points: { leadership: 2, communication: 3, analytical: 1 } },
        { value: "collaborative", text: "Through collaboration and peer learning", points: { communication: 3, leadership: 2, creative: 1 } }
      ]
    },
    {
      question: "What aspect of career advancement interests you most?",
      options: [
        { value: "expertise", text: "Becoming a subject matter expert", points: { analytical: 3, creative: 1, leadership: 1 } },
        { value: "management", text: "Moving into management and leadership roles", points: { leadership: 3, communication: 2, entrepreneurial: 2 } },
        { value: "entrepreneurship", text: "Starting my own business or venture", points: { entrepreneurial: 3, creative: 2, leadership: 2 } },
        { value: "influence", text: "Building influence and thought leadership", points: { communication: 3, leadership: 2, creative: 2 } }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (userAnswers: string[]) => {
    const scores = {
      analytical: 0,
      creative: 0,
      leadership: 0,
      communication: 0,
      entrepreneurial: 0
    };

    userAnswers.forEach((answer, index) => {
      const question = questions[index];
      const selectedOption = question.options.find(option => option.value === answer);
      if (selectedOption) {
        Object.entries(selectedOption.points).forEach(([skill, points]) => {
          scores[skill as keyof typeof scores] += points;
        });
      }
    });

    const totalPoints = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const percentages = Object.fromEntries(
      Object.entries(scores).map(([skill, score]) => [skill, Math.round((score / totalPoints) * 100)])
    );

    const topSkill = Object.entries(percentages).reduce((max, [skill, percentage]) => 
      percentage > (max[1] as number) ? [skill, percentage] : max
    ) as [string, number];

    const grade = getGrade(percentages[topSkill[0]]);
    const careerSuggestions = getCareerSuggestions(topSkill[0]);
    const feedback = getFeedback(topSkill[0], topSkill[1]);

    setResults({
      scores: percentages,
      topSkill: topSkill[0],
      topSkillPercentage: topSkill[1],
      grade,
      careerSuggestions,
      feedback
    });
    setShowResults(true);
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 35) return { letter: "A", description: "Excellent" };
    if (percentage >= 25) return { letter: "B", description: "Good" };
    if (percentage >= 20) return { letter: "C", description: "Average" };
    return { letter: "D", description: "Developing" };
  };

  const getCareerSuggestions = (topSkill: string) => {
    const suggestions = {
      analytical: ["Data Scientist", "Business Analyst", "Financial Analyst", "Research Scientist"],
      creative: ["UX/UI Designer", "Marketing Manager", "Content Creator", "Product Manager"],
      leadership: ["Team Lead", "Project Manager", "Operations Manager", "Executive Director"],
      communication: ["Sales Manager", "HR Manager", "Public Relations", "Training Coordinator"],
      entrepreneurial: ["Business Development", "Startup Founder", "Consultant", "Innovation Manager"]
    };
    return suggestions[topSkill as keyof typeof suggestions] || [];
  };

  const getFeedback = (topSkill: string, percentage: number) => {
    const feedbacks = {
      analytical: "You have strong analytical and problem-solving abilities. Consider roles that involve data analysis, research, and systematic thinking.",
      creative: "You excel at creative thinking and innovation. Look for opportunities that allow you to express creativity and develop new ideas.",
      leadership: "You show natural leadership potential. Focus on developing team management and strategic planning skills.",
      communication: "You have excellent communication skills. Consider roles that involve training, sales, or relationship building.",
      entrepreneurial: "You have an entrepreneurial mindset. Consider business development or starting your own venture."
    };
    return feedbacks[topSkill as keyof typeof feedbacks] || "";
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <section className="pt-24 pb-16 bg-gradient-to-br from-green-50 to-emerald-100">
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
              <Badge className="mb-6 px-4 py-2 bg-green-100 text-green-800">Assessment Complete</Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                Your Career <span className="text-green-600">Assessment Results</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Score Card */}
              <Card>
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-green-600">{results.grade.letter}</span>
                  </div>
                  <CardTitle className="text-2xl">
                    {results.grade.description} - Grade {results.grade.letter}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Your strongest skill area is <strong>{results.topSkill.charAt(0).toUpperCase() + results.topSkill.slice(1)}</strong> at {results.topSkillPercentage}%
                  </p>
                </CardHeader>
              </Card>

              {/* Skill Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Skill Assessment Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(results.scores).map(([skill, percentage]) => (
                    <div key={skill}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium capitalize">{skill}</span>
                        <span className="text-sm font-medium">{percentage as number}%</span>
                      </div>
                      <Progress value={percentage as number} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Career Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Recommended Career Paths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {results.careerSuggestions.map((career: string, index: number) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium">{career}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">Personalized Feedback:</h4>
                    <p className="text-muted-foreground">{results.feedback}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Based on your assessment results, here are some recommended next steps to advance your career:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-bold text-green-600">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Book a Career Consultation</h4>
                        <p className="text-sm text-muted-foreground">Get personalized guidance based on your assessment results</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-bold text-green-600">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Develop Your Strengths</h4>
                        <p className="text-sm text-muted-foreground">Focus on enhancing your top skill areas through targeted training</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-bold text-green-600">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Explore Career Paths</h4>
                        <p className="text-sm text-muted-foreground">Research the recommended career paths and required skills</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-6">
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => navigate('/contact')}
                    >
                      Book Consultation
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/personal-development/career-growth')}
                    >
                      View Career Services
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
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
            <Badge className="mb-6 px-4 py-2 bg-orange-100 text-orange-800">Career Assessment</Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Free Career <span className="text-orange-600">Assessment</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover your career strengths and get personalized recommendations in just 10 questions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{questions[currentQuestion].question}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup onValueChange={handleAnswer} className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={option.value} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="cursor-pointer flex-1">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Navigation */}
            {currentQuestion > 0 && (
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                >
                  Previous Question
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareerAssessmentPage;