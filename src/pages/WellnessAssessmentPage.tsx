import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft, 
  CheckCircle, 
  Heart, 
  Brain, 
  Activity, 
  Users, 
  Shield, 
  Lightbulb,
  Calendar,
  Phone,
  BookOpen,
  Zap
} from "lucide-react";

const WellnessAssessmentPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);

  const questions = [
    {
      question: "How would you describe your current stress level?",
      category: "Stress Management",
      options: [
        { value: "low", text: "Very manageable, I feel in control", points: { stress: 4, resilience: 3, emotional: 2 } },
        { value: "moderate", text: "Sometimes overwhelming but manageable", points: { stress: 2, resilience: 2, emotional: 2 } },
        { value: "high", text: "Often feels overwhelming", points: { stress: 1, resilience: 1, emotional: 1 } },
        { value: "very-high", text: "Constantly overwhelmed and anxious", points: { stress: 0, resilience: 0, emotional: 0 } }
      ]
    },
    {
      question: "How well do you sleep on average?",
      category: "Physical Wellness",
      options: [
        { value: "excellent", text: "7-9 hours, wake up refreshed", points: { physical: 4, emotional: 2, resilience: 2 } },
        { value: "good", text: "6-8 hours, mostly refreshed", points: { physical: 3, emotional: 2, resilience: 2 } },
        { value: "fair", text: "5-7 hours, sometimes tired", points: { physical: 2, emotional: 1, resilience: 1 } },
        { value: "poor", text: "Less than 5 hours or very restless", points: { physical: 1, emotional: 1, resilience: 1 } }
      ]
    },
    {
      question: "How often do you engage in physical activity?",
      category: "Physical Wellness",
      options: [
        { value: "daily", text: "Daily or almost daily", points: { physical: 4, resilience: 2, emotional: 2 } },
        { value: "regular", text: "3-4 times per week", points: { physical: 3, resilience: 2, emotional: 1 } },
        { value: "occasional", text: "1-2 times per week", points: { physical: 2, resilience: 1, emotional: 1 } },
        { value: "rarely", text: "Rarely or never", points: { physical: 1, resilience: 1, emotional: 1 } }
      ]
    },
    {
      question: "How satisfied are you with your social connections?",
      category: "Social Wellness",
      options: [
        { value: "very-satisfied", text: "I have strong, supportive relationships", points: { social: 4, emotional: 3, resilience: 2 } },
        { value: "satisfied", text: "I have good relationships but could be stronger", points: { social: 3, emotional: 2, resilience: 2 } },
        { value: "somewhat", text: "I have some connections but feel lonely sometimes", points: { social: 2, emotional: 1, resilience: 1 } },
        { value: "dissatisfied", text: "I often feel isolated and lonely", points: { social: 1, emotional: 1, resilience: 1 } }
      ]
    },
    {
      question: "How do you typically handle difficult emotions?",
      category: "Emotional Wellness",
      options: [
        { value: "healthy-coping", text: "I use healthy coping strategies like meditation or talking", points: { emotional: 4, resilience: 3, stress: 2 } },
        { value: "mixed-coping", text: "I try healthy strategies but sometimes struggle", points: { emotional: 3, resilience: 2, stress: 2 } },
        { value: "avoidance", text: "I tend to avoid or suppress difficult emotions", points: { emotional: 2, resilience: 1, stress: 1 } },
        { value: "overwhelmed", text: "I feel overwhelmed and don't know how to cope", points: { emotional: 1, resilience: 1, stress: 0 } }
      ]
    },
    {
      question: "How often do you practice mindfulness or relaxation techniques?",
      category: "Mental Wellness",
      options: [
        { value: "daily", text: "Daily practice (meditation, deep breathing, etc.)", points: { emotional: 4, stress: 3, resilience: 3 } },
        { value: "weekly", text: "Several times per week", points: { emotional: 3, stress: 2, resilience: 2 } },
        { value: "occasionally", text: "Occasionally when I remember", points: { emotional: 2, stress: 1, resilience: 1 } },
        { value: "never", text: "I don't practice any relaxation techniques", points: { emotional: 1, stress: 1, resilience: 1 } }
      ]
    },
    {
      question: "How would you rate your overall mood in the past two weeks?",
      category: "Mental Wellness",
      options: [
        { value: "positive", text: "Generally positive and optimistic", points: { emotional: 4, resilience: 2, social: 2 } },
        { value: "stable", text: "Stable with normal ups and downs", points: { emotional: 3, resilience: 2, social: 1 } },
        { value: "low", text: "Often sad, anxious, or irritable", points: { emotional: 2, resilience: 1, social: 1 } },
        { value: "very-low", text: "Consistently depressed or hopeless", points: { emotional: 1, resilience: 1, social: 1 } }
      ]
    },
    {
      question: "How well do you maintain work-life balance?",
      category: "Life Balance",
      options: [
        { value: "excellent", text: "I have clear boundaries and make time for myself", points: { stress: 3, emotional: 3, resilience: 2 } },
        { value: "good", text: "Generally good with occasional challenges", points: { stress: 2, emotional: 2, resilience: 2 } },
        { value: "poor", text: "Work often interferes with personal time", points: { stress: 1, emotional: 1, resilience: 1 } },
        { value: "very-poor", text: "Work consumes most of my time and energy", points: { stress: 0, emotional: 1, resilience: 1 } }
      ]
    },
    {
      question: "How comfortable are you seeking help when needed?",
      category: "Help-Seeking",
      options: [
        { value: "very-comfortable", text: "I readily seek help from friends, family, or professionals", points: { resilience: 4, social: 3, emotional: 2 } },
        { value: "somewhat-comfortable", text: "I can ask for help but sometimes hesitate", points: { resilience: 3, social: 2, emotional: 2 } },
        { value: "uncomfortable", text: "I prefer to handle things alone", points: { resilience: 2, social: 1, emotional: 1 } },
        { value: "very-uncomfortable", text: "I find it very difficult to ask for help", points: { resilience: 1, social: 1, emotional: 1 } }
      ]
    },
    {
      question: "How often do you engage in activities that bring you joy?",
      category: "Life Satisfaction",
      options: [
        { value: "regularly", text: "I regularly make time for hobbies and enjoyable activities", points: { emotional: 4, resilience: 2, physical: 1 } },
        { value: "sometimes", text: "Sometimes, when I have time", points: { emotional: 3, resilience: 2, physical: 1 } },
        { value: "rarely", text: "Rarely, I'm usually too busy or tired", points: { emotional: 2, resilience: 1, physical: 1 } },
        { value: "never", text: "I can't remember the last time I did something just for fun", points: { emotional: 1, resilience: 1, physical: 1 } }
      ]
    },
    {
      question: "How would you rate your eating habits?",
      category: "Physical Wellness",
      options: [
        { value: "excellent", text: "Balanced, nutritious meals with regular eating patterns", points: { physical: 4, emotional: 2, resilience: 1 } },
        { value: "good", text: "Generally healthy with occasional treats", points: { physical: 3, emotional: 2, resilience: 1 } },
        { value: "fair", text: "Inconsistent, sometimes skip meals or eat poorly", points: { physical: 2, emotional: 1, resilience: 1 } },
        { value: "poor", text: "Irregular eating, mostly processed or fast food", points: { physical: 1, emotional: 1, resilience: 1 } }
      ]
    },
    {
      question: "How confident do you feel about managing future challenges?",
      category: "Resilience",
      options: [
        { value: "very-confident", text: "I feel well-equipped to handle whatever comes my way", points: { resilience: 4, emotional: 3, stress: 2 } },
        { value: "confident", text: "I generally feel capable of handling challenges", points: { resilience: 3, emotional: 2, stress: 2 } },
        { value: "somewhat-confident", text: "I worry about my ability to cope with difficulties", points: { resilience: 2, emotional: 1, stress: 1 } },
        { value: "not-confident", text: "I feel unprepared and anxious about the future", points: { resilience: 1, emotional: 1, stress: 0 } }
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
      physical: 0,
      emotional: 0,
      social: 0,
      stress: 0,
      resilience: 0
    };

    userAnswers.forEach((answer, index) => {
      const question = questions[index];
      const selectedOption = question.options.find(option => option.value === answer);
      if (selectedOption) {
        Object.entries(selectedOption.points).forEach(([dimension, points]) => {
          scores[dimension as keyof typeof scores] += points;
        });
      }
    });

    const maxPossibleScores = {
      physical: 16, // Max possible for physical wellness
      emotional: 32, // Max possible for emotional wellness
      social: 12, // Max possible for social wellness
      stress: 20, // Max possible for stress management
      resilience: 24 // Max possible for resilience
    };

    const percentages = Object.fromEntries(
      Object.entries(scores).map(([dimension, score]) => [
        dimension, 
        Math.round((score / maxPossibleScores[dimension as keyof typeof maxPossibleScores]) * 100)
      ])
    );

    const overallScore = Math.round(
      Object.values(percentages).reduce((sum, score) => sum + score, 0) / 5
    );

    const wellnessLevel = getWellnessLevel(overallScore);
    const recommendations = getRecommendations(percentages);
    const resources = getResources(percentages);
    const priority = getPriorityAreas(percentages);

    setResults({
      scores: percentages,
      overallScore,
      wellnessLevel,
      recommendations,
      resources,
      priority
    });
    setShowResults(true);
  };

  const getWellnessLevel = (score: number) => {
    if (score >= 80) return { level: "Excellent", description: "Thriving", color: "text-green-700", bgColor: "bg-green-100" };
    if (score >= 65) return { level: "Good", description: "Flourishing", color: "text-green-600", bgColor: "bg-green-50" };
    if (score >= 50) return { level: "Fair", description: "Managing", color: "text-yellow-600", bgColor: "bg-yellow-50" };
    if (score >= 35) return { level: "Poor", description: "Struggling", color: "text-orange-600", bgColor: "bg-orange-50" };
    return { level: "Critical", description: "Needs Support", color: "text-red-600", bgColor: "bg-red-50" };
  };

  const getPriorityAreas = (scores: any) => {
    const sortedScores = Object.entries(scores)
      .sort(([,a], [,b]) => (a as number) - (b as number))
      .slice(0, 2);
    
    return sortedScores.map(([dimension]) => ({
      dimension: dimension.charAt(0).toUpperCase() + dimension.slice(1),
      score: scores[dimension]
    }));
  };

  const getRecommendations = (scores: any) => {
    const recommendations = [];
    
    if (scores.physical < 60) {
      recommendations.push({
        icon: Activity,
        title: "Improve Physical Wellness",
        description: "Focus on regular exercise, better sleep habits, and nutrition"
      });
    }
    
    if (scores.emotional < 60) {
      recommendations.push({
        icon: Heart,
        title: "Enhance Emotional Wellness",
        description: "Practice mindfulness, journaling, or consider counseling"
      });
    }
    
    if (scores.social < 60) {
      recommendations.push({
        icon: Users,
        title: "Strengthen Social Connections",
        description: "Reach out to friends, join groups, or volunteer in your community"
      });
    }
    
    if (scores.stress < 60) {
      recommendations.push({
        icon: Shield,
        title: "Better Stress Management",
        description: "Learn stress reduction techniques and set healthy boundaries"
      });
    }
    
    if (scores.resilience < 60) {
      recommendations.push({
        icon: Brain,
        title: "Build Resilience",
        description: "Develop coping strategies and seek support when needed"
      });
    }

    return recommendations.slice(0, 3); // Return top 3 recommendations
  };

  const getResources = (scores: any) => {
    const resources = [
      {
        icon: Phone,
        title: "Crisis Support",
        description: "24/7 helplines for immediate support",
        link: "tel:988",
        urgent: scores.emotional < 30 || scores.stress < 30
      },
      {
        icon: BookOpen,
        title: "Self-Help Resources",
        description: "Books, apps, and online tools for mental wellness",
        link: "#",
        urgent: false
      },
      {
        icon: Calendar,
        title: "Professional Support",
        description: "Find therapists, counselors, and wellness coaches",
        link: "#",
        urgent: scores.emotional < 40
      },
      {
        icon: Users,
        title: "Support Groups",
        description: "Connect with others facing similar challenges",
        link: "#",
        urgent: scores.social < 40
      }
    ];

    return resources.filter(resource => 
      resource.urgent || (!resources.some(r => r.urgent))
    ).slice(0, 4);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 pt-8 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Button 
                variant="outline" 
                className="mb-6 border-green-200 hover:bg-green-50"
                onClick={() => setShowResults(false)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retake Assessment
              </Button>
              <Badge className={`mb-6 px-4 py-2 ${results.wellnessLevel.bgColor} ${results.wellnessLevel.color} border-0`}>
                Assessment Complete
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Your Wellness <span className="text-green-600">Assessment Results</span>
              </h1>
            </div>
          </div>
        </div>

        <div className="py-20 -mt-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Overall Score Card */}
              <Card className="border-green-100 shadow-lg">
                <CardHeader className="text-center bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className={`text-4xl font-bold ${results.wellnessLevel.color}`}>
                      {results.overallScore}
                    </span>
                  </div>
                  <CardTitle className="text-2xl text-gray-800">
                    {results.wellnessLevel.level} Wellness - {results.wellnessLevel.description}
                  </CardTitle>
                  <p className="text-gray-600">
                    Overall Wellness Score: {results.overallScore}/100
                  </p>
                </CardHeader>
              </Card>

              {/* Priority Areas Alert */}
              {results.priority.some((area: any) => area.score < 50) && (
                <Alert className="border-orange-200 bg-orange-50">
                  <Lightbulb className="w-5 h-5 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Priority Areas:</strong> Focus on improving your {results.priority.map((area: any) => area.dimension.toLowerCase()).join(' and ')} wellness for better overall health.
                  </AlertDescription>
                </Alert>
              )}

              {/* Detailed Scores */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Activity className="w-5 h-5 mr-2 text-green-600" />
                    Wellness Dimensions Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(results.scores).map(([dimension, score]) => {
                    const dimensionNames = {
                      physical: "Physical Wellness",
                      emotional: "Emotional Wellness", 
                      social: "Social Wellness",
                      stress: "Stress Management",
                      resilience: "Resilience"
                    };
                    const icons = {
                      physical: Activity,
                      emotional: Heart,
                      social: Users,
                      stress: Shield,
                      resilience: Brain
                    };
                    const Icon = icons[dimension as keyof typeof icons];
                    
                    return (
                      <div key={dimension} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-gray-800">
                              {dimensionNames[dimension as keyof typeof dimensionNames]}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                              (score as number) >= 70 ? 'bg-green-100 text-green-700' :
                              (score as number) >= 50 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {score as number}%
                            </span>
                          </div>
                        </div>
                        <Progress 
                          value={score as number} 
                          className="h-3 bg-gray-100" 
                          style={{
                            background: 'rgb(243 244 246)'
                          }}
                        />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Personalized Recommendations */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Zap className="w-5 h-5 mr-2 text-green-600" />
                    Personalized Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-1 gap-6">
                    {results.recommendations.map((rec: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-100">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                          <rec.icon className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{rec.title}</h4>
                          <p className="text-gray-600 text-sm">{rec.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Resources */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                    Helpful Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {results.resources.map((resource: any, index: number) => (
                      <div key={index} className={`p-4 rounded-lg border ${
                        resource.urgent ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-start space-x-3">
                          <resource.icon className={`w-5 h-5 mt-1 ${
                            resource.urgent ? 'text-red-600' : 'text-green-600'
                          }`} />
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1">{resource.title}</h4>
                            <p className="text-sm text-gray-600">{resource.description}</p>
                            {resource.urgent && (
                              <Badge className="mt-2 bg-red-100 text-red-800 text-xs">
                                Recommended
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Steps */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-gray-800">Next Steps for Your Wellness Journey</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-6 bg-green-50 rounded-lg border border-green-100">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-lg font-bold text-green-600">1</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Start Small</h4>
                      <p className="text-sm text-gray-600">Choose one recommendation to focus on this week</p>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-lg border border-green-100">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-lg font-bold text-green-600">2</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Build Habits</h4>
                      <p className="text-sm text-gray-600">Create sustainable daily wellness practices</p>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-lg border border-green-100">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-lg font-bold text-green-600">3</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Track Progress</h4>
                      <p className="text-sm text-gray-600">Retake this assessment monthly to monitor improvement</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-6"
                  onClick={() => navigate('/booking')}>
                    <Button className="bg-green-600 hover:bg-green-700 text-white flex-1">
                      Book Wellness Consultation
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-green-200 hover:bg-green-50 flex-1"
                      onClick={() => setShowResults(false)}
                    >
                      Retake Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Important Notice */}
              <Alert className="border-blue-200 bg-blue-50">
                <Shield className="w-5 h-5 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Important:</strong> This assessment is for educational purposes only and is not a substitute for professional medical or mental health advice. If you're experiencing severe symptoms, please consult with a healthcare professional.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 bg-green-100 text-green-800 border-0">
              Wellness Assessment
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Free Wellness & <span className="text-green-600">Mental Health</span> Assessment
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Discover your current wellness state and receive personalized recommendations to improve your mental, physical, and emotional well-being.
            </p>
          </div>
        </div>
      </div>

      <div className="py-20 -mt-10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-3 bg-gray-100" />
            </div>

            {/* Question Category */}
            <div className="text-center mb-6">
              <Badge className="bg-green-100 text-green-700 px-3 py-1">
                {questions[currentQuestion].category}
              </Badge>
            </div>

            {/* Question */}
            <Card className="border-green-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-xl text-gray-800 text-center">
                  {questions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <RadioGroup onValueChange={handleAnswer} className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={option.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 cursor-pointer transition-colors">
                      <RadioGroupItem 
                        value={option.value} 
                        id={option.value}
                        className="border-green-300 text-green-600"
                      />
                      <Label htmlFor={option.value} className="cursor-pointer flex-1 text-gray-700">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              {currentQuestion > 0 ? (
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  className="border-green-200 hover:bg-green-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous Question
                </Button>
              ) : (
                <div></div>
              )}
              
              <div className="text-sm text-gray-500 flex items-center">
                <Heart className="w-4 h-4 mr-1 text-green-600" />
                Your privacy is protected
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="mt-8 flex justify-center space-x-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index < currentQuestion 
                      ? 'bg-green-500' 
                      : index === currentQuestion 
                        ? 'bg-green-300' 
                        : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800">100% Confidential</h3>
                <p className="text-sm text-gray-600">Your responses are private and secure</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Evidence-Based</h3>
                <p className="text-sm text-gray-600">Based on validated wellness frameworks</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Actionable Results</h3>
                <p className="text-sm text-gray-600">Get personalized recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessAssessmentPage;