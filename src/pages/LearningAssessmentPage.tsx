import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  Brain, 
  TrendingUp, 
  Target, 
  Users, 
  Lightbulb,
  Calendar,
  Award,
  Zap,
  Clock,
  Star,
  Rocket,
  GraduationCap,
  Code,
  Briefcase,
  Globe,
  CheckCircle2,
  PlayCircle,
  Download,
  RefreshCw
} from "lucide-react";

const SkillsAssessmentPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const questions = [
    {
      question: "How often do you actively seek out new learning opportunities?",
      category: "Learning Mindset",
      difficulty: "Beginner",
      options: [
        { value: "daily", text: "Daily - I'm constantly learning something new", points: { curiosity: 4, initiative: 3, adaptability: 2, growth: 4 } },
        { value: "weekly", text: "Weekly - I regularly set aside time for learning", points: { curiosity: 3, initiative: 3, adaptability: 2, growth: 3 } },
        { value: "monthly", text: "Monthly - I learn new things when needed", points: { curiosity: 2, initiative: 2, adaptability: 1, growth: 2 } },
        { value: "rarely", text: "Rarely - Only when required by work or circumstances", points: { curiosity: 1, initiative: 1, adaptability: 1, growth: 1 } }
      ]
    },
    {
      question: "How do you prefer to acquire new skills?",
      category: "Learning Style",
      difficulty: "Beginner",
      options: [
        { value: "hands-on", text: "Hands-on practice and experimentation", points: { practical: 4, initiative: 3, adaptability: 3, creativity: 2 } },
        { value: "structured", text: "Structured courses and formal education", points: { discipline: 4, planning: 3, analytical: 3, growth: 2 } },
        { value: "social", text: "Learning from others through mentorship or collaboration", points: { collaboration: 4, communication: 3, networking: 3, growth: 2 } },
        { value: "self-directed", text: "Self-directed research and reading", points: { initiative: 4, discipline: 3, analytical: 3, curiosity: 3 } }
      ]
    },
    {
      question: "How comfortable are you with learning technologies that are completely new to you?",
      category: "Technology Adaptation",
      difficulty: "Intermediate",
      options: [
        { value: "excited", text: "Excited and eager to dive in immediately", points: { adaptability: 4, curiosity: 4, innovation: 3, growth: 3 } },
        { value: "comfortable", text: "Comfortable but prefer some guidance initially", points: { adaptability: 3, curiosity: 3, innovation: 2, growth: 3 } },
        { value: "cautious", text: "Cautious but willing to learn with proper support", points: { adaptability: 2, curiosity: 2, innovation: 1, growth: 2 } },
        { value: "reluctant", text: "Reluctant and prefer to stick with familiar tools", points: { adaptability: 1, curiosity: 1, innovation: 1, growth: 1 } }
      ]
    },
    {
      question: "When facing a challenging problem, what's your typical approach?",
      category: "Problem Solving",
      difficulty: "Intermediate",
      options: [
        { value: "research", text: "Research extensively and gather multiple perspectives", points: { analytical: 4, curiosity: 3, planning: 3, growth: 2 } },
        { value: "experiment", text: "Start experimenting and learn through trial and error", points: { practical: 4, adaptability: 3, creativity: 3, innovation: 2 } },
        { value: "collaborate", text: "Seek help from colleagues or experts", points: { collaboration: 4, communication: 3, networking: 3, growth: 2 } },
        { value: "systematic", text: "Break it down systematically and tackle piece by piece", points: { analytical: 4, planning: 4, discipline: 3, practical: 2 } }
      ]
    },
    {
      question: "How do you typically stay updated with industry trends and developments?",
      category: "Industry Awareness",
      difficulty: "Intermediate",
      options: [
        { value: "multiple-sources", text: "Multiple sources: blogs, podcasts, conferences, networks", points: { curiosity: 4, networking: 3, initiative: 3, growth: 4 } },
        { value: "formal-channels", text: "Formal channels: courses, certifications, official publications", points: { discipline: 4, planning: 3, analytical: 3, growth: 3 } },
        { value: "peer-networks", text: "Primarily through peer networks and discussions", points: { collaboration: 4, communication: 3, networking: 4, growth: 2 } },
        { value: "reactive", text: "Reactively when specific needs arise", points: { practical: 2, initiative: 1, adaptability: 2, growth: 1 } }
      ]
    },
    {
      question: "How effectively do you apply newly learned skills in real-world situations?",
      category: "Skill Application",
      difficulty: "Advanced",
      options: [
        { value: "immediate", text: "I immediately find ways to practice and implement", points: { practical: 4, initiative: 4, adaptability: 3, innovation: 3 } },
        { value: "planned", text: "I create specific plans for implementation", points: { planning: 4, discipline: 3, practical: 3, analytical: 2 } },
        { value: "gradual", text: "I gradually integrate them as opportunities arise", points: { adaptability: 3, practical: 2, planning: 2, growth: 2 } },
        { value: "struggle", text: "I often struggle to transfer learning to practice", points: { practical: 1, initiative: 1, adaptability: 1, growth: 1 } }
      ]
    },
    {
      question: "How do you handle feedback and criticism about your skills?",
      category: "Growth Mindset",
      difficulty: "Advanced",
      options: [
        { value: "embrace", text: "I actively seek it out and use it to improve", points: { growth: 4, adaptability: 4, communication: 3, discipline: 3 } },
        { value: "accept", text: "I accept it well and try to make improvements", points: { growth: 3, adaptability: 3, communication: 2, discipline: 2 } },
        { value: "defensive", text: "I can be defensive initially but eventually consider it", points: { growth: 2, adaptability: 2, communication: 1, discipline: 1 } },
        { value: "avoid", text: "I prefer to avoid critical feedback", points: { growth: 1, adaptability: 1, communication: 1, discipline: 1 } }
      ]
    },
    {
      question: "How do you share knowledge and teach others?",
      category: "Knowledge Sharing",
      difficulty: "Advanced",
      options: [
        { value: "proactive", text: "I proactively mentor, write, and present to share knowledge", points: { communication: 4, collaboration: 4, networking: 3, growth: 3 } },
        { value: "responsive", text: "I help when asked and enjoy explaining things", points: { communication: 3, collaboration: 3, networking: 2, growth: 2 } },
        { value: "selective", text: "I share with close colleagues but not more broadly", points: { communication: 2, collaboration: 2, networking: 1, growth: 1 } },
        { value: "minimal", text: "I prefer to keep knowledge to myself", points: { communication: 1, collaboration: 1, networking: 1, growth: 1 } }
      ]
    },
    {
      question: "How do you measure and track your skill development progress?",
      category: "Self-Assessment",
      difficulty: "Advanced",
      options: [
        { value: "systematic", text: "I use systematic methods like portfolios, metrics, and regular reviews", points: { planning: 4, discipline: 4, analytical: 3, growth: 4 } },
        { value: "project-based", text: "I track progress through successful project completions", points: { practical: 4, initiative: 3, planning: 2, growth: 3 } },
        { value: "feedback-driven", text: "I rely on feedback from others to gauge improvement", points: { collaboration: 3, communication: 3, growth: 3, adaptability: 2 } },
        { value: "informal", text: "I have an informal sense but don't actively track", points: { practical: 2, initiative: 1, planning: 1, growth: 2 } }
      ]
    },
    {
      question: "How do you balance learning new skills with maintaining existing expertise?",
      category: "Learning Strategy",
      difficulty: "Expert",
      options: [
        { value: "strategic", text: "I strategically allocate time based on career goals and market needs", points: { planning: 4, analytical: 4, initiative: 3, growth: 4 } },
        { value: "integrated", text: "I find ways to integrate new learning with current work", points: { practical: 4, adaptability: 3, innovation: 3, growth: 3 } },
        { value: "cyclical", text: "I alternate between deepening current skills and exploring new ones", points: { planning: 3, discipline: 3, adaptability: 2, growth: 3 } },
        { value: "reactive", text: "I focus on whatever seems most urgent at the time", points: { practical: 2, adaptability: 2, initiative: 1, growth: 1 } }
      ]
    },
    {
      question: "How do you approach learning in areas where you have no prior experience?",
      category: "Learning Courage",
      difficulty: "Expert",
      options: [
        { value: "systematic-exploration", text: "I systematically explore fundamentals before diving deeper", points: { analytical: 4, planning: 4, curiosity: 3, discipline: 3 } },
        { value: "immersive", text: "I immerse myself completely and learn by doing", points: { practical: 4, adaptability: 4, initiative: 3, creativity: 3 } },
        { value: "guided", text: "I seek expert guidance and structured learning paths", points: { collaboration: 4, communication: 3, networking: 3, growth: 3 } },
        { value: "hesitant", text: "I feel intimidated and prefer to avoid completely new areas", points: { curiosity: 1, adaptability: 1, initiative: 1, growth: 1 } }
      ]
    },
    {
      question: "What drives your continuous learning and development?",
      category: "Motivation",
      difficulty: "Expert",
      options: [
        { value: "growth-passion", text: "Pure passion for growth and intellectual curiosity", points: { curiosity: 4, growth: 4, initiative: 3, innovation: 3 } },
        { value: "career-advancement", text: "Career advancement and professional opportunities", points: { initiative: 4, planning: 3, networking: 3, growth: 3 } },
        { value: "problem-solving", text: "Desire to solve complex problems and create impact", points: { analytical: 4, innovation: 4, practical: 3, creativity: 3 } },
        { value: "external-pressure", text: "External pressures and requirements", points: { discipline: 2, adaptability: 2, initiative: 1, growth: 1 } }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => calculateResults(newAnswers), 500);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = (userAnswers: string[]) => {
    const scores = {
      curiosity: 0,
      adaptability: 0,
      practical: 0,
      analytical: 0,
      collaboration: 0,
      communication: 0,
      initiative: 0,
      planning: 0,
      discipline: 0,
      networking: 0,
      creativity: 0,
      innovation: 0,
      growth: 0
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

    // Calculate skill categories
    const skillCategories = {
      "Learning Agility": Math.round(((scores.curiosity + scores.adaptability + scores.growth) / 12) * 100),
      "Technical Skills": Math.round(((scores.practical + scores.analytical + scores.innovation) / 12) * 100),
      "Collaboration": Math.round(((scores.collaboration + scores.communication + scores.networking) / 12) * 100),
      "Self-Management": Math.round(((scores.initiative + scores.planning + scores.discipline) / 12) * 100),
      "Creative Thinking": Math.round(((scores.creativity + scores.innovation + scores.curiosity) / 12) * 100)
    };

    const overallScore = Math.round(Object.values(skillCategories).reduce((sum, score) => sum + score, 0) / 5);
    const learnerType = getLearnerType(skillCategories);
    const recommendations = getRecommendations(skillCategories, overallScore);
    const learningPath = getLearningPath(learnerType, skillCategories);
    const nextSteps = getNextSteps(skillCategories);
    const badges = getBadges(skillCategories, overallScore);

    setResults({
      scores: skillCategories,
      overallScore,
      learnerType,
      recommendations,
      learningPath,
      nextSteps,
      badges,
      completionTime: timeSpent,
      skillGaps: getSkillGaps(skillCategories)
    });
    setShowResults(true);
  };

  const getLearnerType = (scores: any) => {
    const topCategory = Object.entries(scores).reduce((max, [category, score]) => 
      (score as number) > (max[1] as number) ? [category, score] : max
    ) as [string, number];

    const types = {
      "Learning Agility": {
        type: "Adaptive Learner",
        description: "You thrive on change and continuously seek new knowledge",
        icon: Rocket,
        traits: ["Quick to adapt", "Curious mindset", "Growth-oriented", "Change embracer"]
      },
      "Technical Skills": {
        type: "Technical Expert",
        description: "You excel at mastering technical skills and practical applications",
        icon: Code,
        traits: ["Problem solver", "Detail-oriented", "Practical focus", "Innovation driver"]
      },
      "Collaboration": {
        type: "Social Learner",
        description: "You learn best through interaction and knowledge sharing with others",
        icon: Users,
        traits: ["Team player", "Knowledge sharer", "Network builder", "Communication focused"]
      },
      "Self-Management": {
        type: "Strategic Learner",
        description: "You approach learning with discipline and strategic planning",
        icon: Target,
        traits: ["Self-disciplined", "Goal-oriented", "Strategic thinker", "Organized approach"]
      },
      "Creative Thinking": {
        type: "Creative Innovator",
        description: "You combine creativity with learning to generate innovative solutions",
        icon: Lightbulb,
        traits: ["Creative thinker", "Innovation focused", "Original ideas", "Artistic approach"]
      }
    };

    return types[topCategory[0] as keyof typeof types];
  };

  const getRecommendations = (scores: any, overallScore: number) => {
    const recommendations = [];

    // Based on overall score
    if (overallScore >= 85) {
      recommendations.push({
        type: "Mentor Others",
        description: "Share your expertise by mentoring junior professionals",
        priority: "High",
        timeframe: "Ongoing"
      });
    }

    // Category-specific recommendations
    if (scores["Learning Agility"] < 70) {
      recommendations.push({
        type: "Develop Growth Mindset",
        description: "Practice embracing challenges and viewing failures as learning opportunities",
        priority: "High",
        timeframe: "3-6 months"
      });
    }

    if (scores["Technical Skills"] < 70) {
      recommendations.push({
        type: "Technical Skill Building",
        description: "Focus on hands-on projects and technical certifications",
        priority: "Medium",
        timeframe: "6-12 months"
      });
    }

    if (scores["Collaboration"] < 70) {
      recommendations.push({
        type: "Improve Collaboration Skills",
        description: "Join teams, attend networking events, and practice knowledge sharing",
        priority: "Medium",
        timeframe: "3-6 months"
      });
    }

    return recommendations.slice(0, 4);
  };

  const getLearningPath = (learnerType: any, scores: any) => {
    const basePaths = {
      "Adaptive Learner": [
        { step: "Explore emerging technologies", duration: "2-4 weeks", difficulty: "Intermediate" },
        { step: "Join innovation challenges", duration: "1-3 months", difficulty: "Advanced" },
        { step: "Lead change initiatives", duration: "3-6 months", difficulty: "Expert" }
      ],
      "Technical Expert": [
        { step: "Deep dive into specialization", duration: "3-6 months", difficulty: "Advanced" },
        { step: "Contribute to open source", duration: "Ongoing", difficulty: "Expert" },
        { step: "Obtain technical certifications", duration: "2-4 months", difficulty: "Intermediate" }
      ],
      "Social Learner": [
        { step: "Join professional communities", duration: "1-2 weeks", difficulty: "Beginner" },
        { step: "Attend conferences and workshops", duration: "Ongoing", difficulty: "Intermediate" },
        { step: "Start a knowledge sharing group", duration: "2-3 months", difficulty: "Advanced" }
      ],
      "Strategic Learner": [
        { step: "Create personal development plan", duration: "1-2 weeks", difficulty: "Beginner" },
        { step: "Set up learning metrics", duration: "2-4 weeks", difficulty: "Intermediate" },
        { step: "Design long-term career strategy", duration: "1-3 months", difficulty: "Advanced" }
      ],
      "Creative Innovator": [
        { step: "Explore creative learning methods", duration: "2-4 weeks", difficulty: "Beginner" },
        { step: "Work on innovation projects", duration: "2-6 months", difficulty: "Intermediate" },
        { step: "Build creative portfolio", duration: "3-12 months", difficulty: "Advanced" }
      ]
    };

    return basePaths[learnerType.type as keyof typeof basePaths] || basePaths["Strategic Learner"];
  };

  const getNextSteps = (scores: any) => {
    const steps = [];
    const lowestScores = Object.entries(scores)
      .sort(([,a], [,b]) => (a as number) - (b as number))
      .slice(0, 2);

    lowestScores.forEach(([category, score]) => {
      if ((score as number) < 70) {
        steps.push({
          category,
          action: `Focus on improving ${category.toLowerCase()} through targeted practice`,
          resources: getResourcesForCategory(category)
        });
      }
    });

    if (steps.length === 0) {
      steps.push({
        category: "Advanced Growth",
        action: "Consider mentoring others and taking on leadership roles in learning initiatives",
        resources: ["Leadership programs", "Mentoring platforms", "Speaking opportunities"]
      });
    }

    return steps;
  };

  const getResourcesForCategory = (category: string) => {
    const resources = {
      "Learning Agility": ["Growth mindset courses", "Adaptability workshops", "Change management training"],
      "Technical Skills": ["Online coding platforms", "Technical certifications", "Project-based learning"],
      "Collaboration": ["Team building workshops", "Communication courses", "Networking events"],
      "Self-Management": ["Project management courses", "Time management tools", "Goal setting frameworks"],
      "Creative Thinking": ["Design thinking workshops", "Innovation challenges", "Creative problem solving courses"]
    };
    return resources[category as keyof typeof resources] || ["General skill development resources"];
  };

  const getBadges = (scores: any, overallScore: number) => {
    const badges = [];
    
    if (overallScore >= 90) badges.push({ name: "Learning Champion", icon: Award, color: "text-yellow-600" });
    if (overallScore >= 80) badges.push({ name: "Skill Master", icon: Star, color: "text-purple-600" });
    if (scores["Learning Agility"] >= 85) badges.push({ name: "Adaptive Genius", icon: Zap, color: "text-blue-600" });
    if (scores["Technical Skills"] >= 85) badges.push({ name: "Tech Expert", icon: Code, color: "text-green-600" });
    if (scores["Collaboration"] >= 85) badges.push({ name: "Team Player", icon: Users, color: "text-orange-600" });
    
    return badges.slice(0, 3);
  };

  const getSkillGaps = (scores: any) => {
    return Object.entries(scores)
      .filter(([, score]) => (score as number) < 70)
      .map(([category, score]) => ({ category, score, severity: (score as number) < 50 ? "High" : "Medium" }));
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-100 pt-8 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Button 
                variant="outline" 
                className="mb-6 border-purple-200 hover:bg-purple-50"
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setAnswers([]);
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retake Assessment
              </Button>
              <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-700 text-white border-0">
                Assessment Complete • {formatTime(results.completionTime)}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Your Learning <span className="bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent">Profile Results</span>
              </h1>
            </div>
          </div>
        </div>

        <div className="py-20 -mt-10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Overall Score & Learner Type */}
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-purple-100 shadow-xl">
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-violet-100 text-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent">
                        {results.overallScore}
                      </span>
                    </div>
                    <CardTitle className="text-2xl text-gray-800 mb-2">Overall Learning Score</CardTitle>
                    <div className="flex justify-center space-x-2">
                      {results.badges.map((badge: any, index: number) => (
                        <div key={index} className="flex items-center space-x-1 bg-white px-3 py-1 rounded-full shadow">
                          <badge.icon className={`w-4 h-4 ${badge.color}`} />
                          <span className="text-xs font-medium text-gray-700">{badge.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                </Card>

                <Card className="border-purple-100 shadow-xl">
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-violet-100">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <results.learnerType.icon className="w-8 h-8 text-purple-600" />
                      </div>
                    </div>
                    <CardTitle className="text-center text-2xl text-gray-800 mb-2">
                      {results.learnerType.type}
                    </CardTitle>
                    <p className="text-center text-gray-600 mb-4">{results.learnerType.description}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {results.learnerType.traits.map((trait: string, index: number) => (
                        <Badge key={index} className="bg-white text-purple-700 border-purple-200">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              </div>

              {/* Skill Categories Breakdown */}
              <Card className="border-purple-100 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Brain className="w-6 h-6 mr-3 text-purple-600" />
                    Skills Assessment Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(results.scores).map(([category, score]) => {
                    const icons = {
                      "Learning Agility": Rocket,
                      "Technical Skills": Code,
                      "Collaboration": Users,
                      "Self-Management": Target,
                      "Creative Thinking": Lightbulb
                    };
                    const Icon = icons[category as keyof typeof icons];
                    
                    return (
                      <div key={category} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg flex items-center justify-center">
                              <Icon className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="font-semibold text-gray-800">{category}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`text-sm font-bold px-4 py-2 rounded-full ${
                              (score as number) >= 80 ? 'bg-green-100 text-green-700' :
                              (score as number) >= 65 ? 'bg-blue-100 text-blue-700' :
                              (score as number) >= 50 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {score as number}%
                            </span>
                            <div className="w-24 text-right">
                              <div className="text-xs text-gray-500">
                                {(score as number) >= 80 ? 'Expert' :
                                 (score as number) >= 65 ? 'Advanced' :
                                 (score as number) >= 50 ? 'Intermediate' : 'Developing'}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Progress 
                          value={score as number} 
                          className="h-3 bg-gray-100"
                        />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Personalized Learning Path */}
              <Card className="border-purple-100 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <GraduationCap className="w-6 h-6 mr-3 text-purple-600" />
                    Your Personalized Learning Path
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.learningPath.map((step: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-100">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-violet-700 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{step.step}</h4>
                            <div className="flex items-center space-x-2">
                              <Badge className={`text-xs ${
                                step.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                                step.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                step.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {step.difficulty}
                              </Badge>
                              <Badge className="bg-purple-100 text-purple-700 text-xs">
                                {step.duration}
                              </Badge>
                            </div>
                          </div>
                          <Progress value={(index + 1) * 25} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations & Next Steps */}
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-purple-100 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-800">
                      <Lightbulb className="w-6 h-6 mr-3 text-purple-600" />
                      Key Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {results.recommendations.map((rec: any, index: number) => (
                      <div key={index} className="p-4 border border-purple-100 rounded-lg hover:bg-purple-50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">{rec.type}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge className={`text-xs ${
                              rec.priority === 'High' ? 'bg-red-100 text-red-700' :
                              rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {rec.priority} Priority
                            </Badge>
                            <Badge className="bg-purple-100 text-purple-700 text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {rec.timeframe}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{rec.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-purple-100 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-800">
                      <TrendingUp className="w-6 h-6 mr-3 text-purple-600" />
                      Immediate Next Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {results.nextSteps.map((step: any, index: number) => (
                      <div key={index} className="p-4 border border-purple-100 rounded-lg">
                        <h4 className="font-semibold text-purple-700 mb-2">{step.category}</h4>
                        <p className="text-gray-700 text-sm mb-3">{step.action}</p>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-gray-600">Recommended Resources:</p>
                          <div className="flex flex-wrap gap-1">
                            {step.resources.map((resource: string, resIndex: number) => (
                              <Badge key={resIndex} variant="outline" className="text-xs border-purple-200 text-purple-700">
                                {resource}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Skill Gaps Analysis */}
              {results.skillGaps.length > 0 && (
                <Card className="border-red-100 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-800">
                      <Target className="w-6 h-6 mr-3 text-red-600" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {results.skillGaps.map((gap: any, index: number) => (
                        <div key={index} className={`p-4 rounded-lg border ${
                          gap.severity === 'High' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{gap.category}</h4>
                            <Badge className={`text-xs ${
                              gap.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {gap.severity} Priority
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm text-gray-600">Current Level:</span>
                            <span className="font-medium">{gap.score}%</span>
                          </div>
                          <Progress value={gap.score} className="h-2" />
                        </div>
                      ))}
                    </div>
                    <Alert className="mt-4 border-blue-200 bg-blue-50">
                      <Lightbulb className="w-4 h-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        Focus on these areas to significantly boost your overall learning effectiveness and career growth.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              )}

              {/* Action Center */}
              <Card className="border-purple-100 shadow-xl bg-gradient-to-br from-purple-50 to-violet-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Briefcase className="w-6 h-6 mr-3 text-purple-600" />
                    Take Action on Your Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-700 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Schedule Learning</h4>
                      <p className="text-xs text-gray-600">Block time for skill development</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-700 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Find Resources</h4>
                      <p className="text-xs text-gray-600">Curated learning materials</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-700 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Join Community</h4>
                      <p className="text-xs text-gray-600">Connect with other learners</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-700 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Track Progress</h4>
                      <p className="text-xs text-gray-600">Monitor your development</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" className="border-purple-200 hover:bg-purple-50 flex-1"
                    onClick={() => navigate('/booking')}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Coaching Session
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Tracking */}
              <Card className="border-purple-100 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <CheckCircle2 className="w-6 h-6 mr-3 text-purple-600" />
                    30-Day Learning Challenge
                  </CardTitle>
                  <p className="text-gray-600">Turn your results into action with our structured challenge</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 border border-purple-100 rounded-lg">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-purple-600">1</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Week 1-2: Foundation</h4>
                      <p className="text-sm text-gray-600">Set up your learning environment and start with basics</p>
                      
                    </div>
                    <div className="text-center p-6 border border-purple-100 rounded-lg">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-purple-600">2</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Week 3-4: Practice</h4>
                      <p className="text-sm text-gray-600">Apply new skills through hands-on projects</p>
                     
                    </div>
                    <div className="text-center p-6 border border-purple-100 rounded-lg">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-purple-600">3</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Week 5+: Mastery</h4>
                      <p className="text-sm text-gray-600">Share knowledge and tackle advanced challenges</p>
                      
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Notice */}
              <Alert className="border-blue-200 bg-blue-50">
                <Globe className="w-5 h-5 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Keep Learning:</strong> Skills evolve rapidly in today's world. Retake this assessment every 3-6 months to track your progress and adapt your learning strategy.
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
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-50 to-violet-100 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-700 text-white border-0">
              Skills Development Assessment
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Continuous Learning & <span className="bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent">Growth Assessment</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Discover your learning style, identify skill gaps, and get a personalized roadmap for continuous growth and professional development.
            </p>
            <div className="flex justify-center items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-purple-600" />
                <span>Time: {formatTime(timeSpent)}</span>
              </div>
              <div className="flex items-center">
                <Brain className="w-4 h-4 mr-1 text-purple-600" />
                <span>12 Questions</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-1 text-purple-600" />
                <span>Personalized Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Section */}
      <div className="py-20 -mt-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <Badge className="bg-purple-100 text-purple-700 text-xs">
                    {questions[currentQuestion].difficulty}
                  </Badge>
                </div>
                <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-3 bg-gray-100" />
            </div>

            {/* Question Category */}
            <div className="text-center mb-8">
              <Badge className="bg-gradient-to-r from-purple-600 to-violet-700 text-white px-4 py-2 text-sm">
                {questions[currentQuestion].category}
              </Badge>
              <div className="flex justify-center mt-2">
                <div className="text-xs text-gray-500 flex items-center">
                  <Target className="w-3 h-3 mr-1" />
                  {questions[currentQuestion].difficulty} Level
                </div>
              </div>
            </div>

            {/* Question */}
            <Card className="border-purple-100 shadow-2xl mb-8">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-100">
                <CardTitle className="text-2xl text-gray-800 text-center leading-relaxed">
                  {questions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <RadioGroup onValueChange={handleAnswer} className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={option.value} className="group">
                      <div className="flex items-center space-x-4 p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-violet-50 cursor-pointer transition-all duration-200 group-hover:shadow-md">
                        <RadioGroupItem 
                          value={option.value} 
                          id={option.value}
                          className="border-purple-300 text-purple-600 w-5 h-5"
                        />
                        <Label htmlFor={option.value} className="cursor-pointer flex-1 text-gray-700 text-base leading-relaxed">
                          {option.text}
                        </Label>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="w-5 h-5 text-purple-600" />
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="border-purple-200 hover:bg-purple-50 disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <div className="text-sm text-gray-500 flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <Brain className="w-4 h-4 mr-2 text-purple-600" />
                Your learning potential awaits
              </div>

              <div className="w-24"></div> {/* Spacer for alignment */}
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center space-x-2 mt-12">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index < currentQuestion 
                      ? 'bg-gradient-to-r from-purple-600 to-violet-700 scale-110' 
                      : index === currentQuestion 
                        ? 'bg-purple-400 scale-125 ring-2 ring-purple-200' 
                        : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Benefits */}
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 py-16 border-t border-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What You'll Discover</h2>
              <p className="text-gray-600">Unlock insights about your learning potential and growth opportunities</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto">
                  <Rocket className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Learning Style</h3>
                <p className="text-sm text-gray-600">Understand how you learn best and optimize your approach</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Skill Gaps</h3>
                <p className="text-sm text-gray-600">Identify areas for improvement and growth opportunities</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto">
                  <GraduationCap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Learning Path</h3>
                <p className="text-sm text-gray-600">Get a personalized roadmap for continuous development</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Achievement Tracking</h3>
                <p className="text-sm text-gray-600">Monitor progress and celebrate learning milestones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsAssessmentPage;