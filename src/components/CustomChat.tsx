import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface UserContext {
  name?: string;
  lastAskedAbout?: string;
  conversationCount: number;
  lastUserQuestion?: string;
}

const CustomChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! Welcome to Omej Pollux. I'm your virtual assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [userContext, setUserContext] = useState<UserContext>({
    conversationCount: 0,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Extract name from messages and track conversation
  useEffect(() => {
    const userName = extractUserNameFromMessages(messages);
    if (userName && userName !== userContext.name) {
      setUserContext((prev) => ({ ...prev, name: userName }));
    }

    // Track conversation count
    const userMessages = messages.filter((msg) => msg.sender === "user").length;
    if (userMessages !== userContext.conversationCount) {
      setUserContext((prev) => ({ ...prev, conversationCount: userMessages }));
    }
  }, [messages]);

  const extractUserNameFromMessages = (
    messages: Message[]
  ): string | undefined => {
    for (const message of messages) {
      if (message.sender === "user") {
        // Look for patterns like "my name is", "I am", etc.
        const text = message.text.toLowerCase();
        if (text.includes("my name is")) {
          const match = message.text.match(/my name is (\w+)/i);
          if (match) return match[1];
        }
        if (text.includes("i am") && text.split(" ").length < 6) {
          const match = message.text.match(/i am (\w+)/i);
          if (match) return match[1];
        }
        if (text.includes("call me")) {
          const match = message.text.match(/call me (\w+)/i);
          if (match) return match[1];
        }
      }
    }
    return undefined;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    // Update context with user's question
    setUserContext((prev) => ({
      ...prev,
      lastUserQuestion: inputMessage.toLowerCase(),
    }));

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    const userName = userContext.name;
    const greeting = userName ? `Hello ${userName}! ` : "Hello! ";

    // Personal greetings and conversations
    if (message.includes("how are you") || message.includes("how do you do")) {
      const responses = [
        "I'm doing great, thank you for asking! How are you doing today?",
        "I'm functioning perfectly! How about you?",
        "I'm doing well, thanks! How has your day been?",
        "All systems operational! How are you feeling today?",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (
      message.includes("i'm fine") ||
      message.includes("i am good") ||
      message.includes("doing well")
    ) {
      return "That's wonderful to hear! 😊 How can I assist you today?";
    }

    if (
      message.includes("not good") ||
      message.includes("not well") ||
      message.includes("feeling bad")
    ) {
      return "I'm sorry to hear that. Remember, every challenge is an opportunity for growth. Is there anything specific I can help you with to make your day better?";
    }

    // Enhanced greeting responses
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey") ||
      message.includes("good morning") ||
      message.includes("good afternoon") ||
      message.includes("good evening")
    ) {
      const greetings = [
        `${greeting}It's lovely to connect with you! How can I assist you today?`,
        `${greeting}Welcome back! What can I help you with?`,
        `${greeting}Great to see you! How may I be of service?`,
        `${greeting}Wonderful to hear from you! What brings you to Omej Pollux today?`,
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Location and Address
    if (
      message.includes("location") ||
      message.includes("address") ||
      message.includes("where are you") ||
      message.includes("find you") ||
      message.includes("visit you")
    ) {
      return `📍 **Our Location:**\n\nOmej Pollux Prime Solutions\nCape Coast, Ghana\n\nWe're based in the heart of Cape Coast, serving clients across Ghana and internationally. For exact directions or to schedule an in-person visit, please contact us at +233 59 631 6230 and we'll guide you!`;
    }

    // Donation and Support
    if (
      message.includes("donate") ||
      message.includes("support") ||
      message.includes("contribute") ||
      message.includes("fund") ||
      message.includes("sponsor")
    ) {
      return `💰 **Support Our Projects - 3 Easy Steps:**\n\n1️⃣ **Choose Project**: Browse our Projects page to see initiatives needing support\n\n2️⃣ **Contact Us**: Email info@omejpollux.org with:\n   - Project you want to support\n   - Donation amount/type (financial, equipment, expertise)\n   - Your contact details\n\n3️⃣ **Receive Guidance**: We'll send you:\n   - Official donation channels\n   - Tax documentation\n   - Project impact reports\n\nYour support empowers entrepreneurs and students across Ghana! 🌟`;
    }

    // Complete Services List
    if (
      message.includes("service") ||
      message.includes("offer") ||
      message.includes("do you provide") ||
      message.includes("what services") ||
      message.includes("help with")
    ) {
      return `🛠️ **Our Complete Services:**\n\n🚀 **Business Development**\n• Startup incubation & guidance\n• Business plan development\n• Market research & analysis\n• Funding proposal assistance\n• Growth strategy planning\n\n🎓 **Academic Research Support**\n• Thesis & dissertation writing\n• Research methodology design\n• Data analysis & interpretation\n• Literature review assistance\n• Academic editing & proofreading\n\n💼 **Professional Consulting**\n• Strategic business planning\n• Operational efficiency optimization\n• Digital transformation guidance\n• Market entry strategies\n• Performance improvement\n\n🛒 **General Merchandise**\n• Quality product sourcing\n• Supply chain management\n• Retail business support\n• Product development guidance\n\nWhich service area interests you most?`;
    }

    // Registration Assistance
    if (
      message.includes("register") ||
      message.includes("sign up") ||
      message.includes("join") ||
      message.includes("how to apply") ||
      message.includes("become a client")
    ) {
      return `📝 **Registration Process - 3 Simple Steps:**\n\n1️⃣ **Visit Registration Page**: Go to our website's registration section\n\n2️⃣ **Choose Service**: Select from:\n   - Business Development Program\n   - Academic Research Support\n   - Professional Consulting\n   - Event Registration\n\n3️⃣ **Submit Details**: Provide:\n   - Contact information\n   - Service preference\n   - Project description (if any)\n\n4️⃣ **Confirmation**: You'll receive:\n   - Welcome email\n   - Service coordinator assignment\n   - Initial consultation scheduling\n\nNeed help with specific registration? I can guide you to the right page!`;
    }

    // Event Sharing
    if (
      message.includes("event") ||
      message.includes("workshop") ||
      message.includes("seminar") ||
      message.includes("share event") ||
      message.includes("upcoming events")
    ) {
      return `📅 **Events & Sharing:**\n\n🎯 **Upcoming Events**: Check our Events page for workshops, seminars, and networking sessions\n\n📱 **Share Events**: Three ways to share:\n1. Click the 'Share' button on any event page\n2. Copy the event link and send to friends\n3. Use social media sharing options\n\n🔔 **Get Notified**: Register for events and opt-in for notifications about:\n- New workshop announcements\n- Early bird registration\n- Exclusive networking opportunities\n\nWant me to help you find a specific type of event?`;
    }

    // Projects List
    if (
      message.includes("project") ||
      message.includes("initiative") ||
      message.includes("program") ||
      message.includes("what projects") ||
      message.includes("current work")
    ) {
      return `🌟 **Our Current Projects & Initiatives:**\n\n🏢 **Business Projects**\n• Startup Accelerator Program\n• SME Growth Initiative\n• Women Entrepreneurship Support\n• Agricultural Business Development\n\n🎓 **Academic Projects**\n• Student Research Grant Program\n• Thesis Completion Support\n• Academic Writing Workshops\n• Research Methodology Training\n\n🌍 **Community Projects**\n• Youth Skills Development\n• Digital Literacy Program\n• Community Business Hub\n• Sustainable Development Initiatives\n\n💡 **Innovation Projects**\n• Tech Startup Incubation\n• Creative Industry Support\n• Green Business Initiatives\n• Digital Transformation Program\n\nInterested in any specific project? I can provide more details!`;
    }

    // Website information and services
    if (
      message.includes("what do you do") ||
      message.includes("what is this website") ||
      message.includes("tell me about") ||
      message.includes("who are you") ||
      message.includes("about omej pollux")
    ) {
      return `Omej Pollux is a premier consulting firm offering:\n\n🚀 **Business Development**: Startup guidance, market research, funding assistance\n🎓 **Academic Research**: Thesis support, data analysis, methodology design\n💼 **Professional Consulting**: Strategic planning, operational efficiency\n🛒 **General Merchandise**: Quality products and retail support\n\nWe empower entrepreneurs, students, and businesses to achieve their goals through expert guidance and comprehensive support services. What specific area interests you most?`;
    }

    if (
      message.includes("contact") ||
      message.includes("email") ||
      message.includes("phone") ||
      message.includes("address") ||
      message.includes("get in touch")
    ) {
      return "You can reach us at:\n📧 info@omejpollux.org\n📞 +233 59 631 6230\n📍 Cape Coast, Ghana\n🕗 Monday - Friday: 8:00 AM - 6:00 PM\n\nWould you like to schedule a specific time to talk?";
    }

    if (
      message.includes("price") ||
      message.includes("cost") ||
      message.includes("fee") ||
      message.includes("how much")
    ) {
      return "Our pricing varies based on the service and project scope. We believe in providing value-driven solutions. For detailed pricing tailored to your specific needs, please contact our team - they'll be happy to provide a customized quote!";
    }

    if (
      message.includes("business") ||
      message.includes("startup") ||
      message.includes("entrepreneur")
    ) {
      return "We provide comprehensive business development services including business planning, market research, funding assistance, and growth strategies specifically tailored for Ghanaian entrepreneurs and startups. Are you looking to start a new business or grow an existing one?";
    }

    if (
      message.includes("research") ||
      message.includes("academic") ||
      message.includes("thesis") ||
      message.includes("dissertation")
    ) {
      return "We offer complete academic research support including methodology design, data analysis, literature review, and thesis writing assistance for students and researchers at all levels. What specific research challenge are you facing?";
    }

    if (
      message.includes("consult") ||
      message.includes("advice") ||
      message.includes("guidance")
    ) {
      return "Our professional consulting services include strategic planning, market entry strategies, operational efficiency, digital transformation, and business optimization. We work closely with you to develop customized solutions. What aspect of your business needs attention?";
    }

    if (
      message.includes("hour") ||
      message.includes("time") ||
      message.includes("open") ||
      message.includes("available")
    ) {
      return "We are available:\n🕗 Monday - Friday: 8:00 AM - 6:00 PM\n🕘 Saturday: 9:00 AM - 2:00 PM\n📅 Sunday: Emergency services only\n\nWe're here to help during these hours!";
    }

    if (message.includes("thank") || message.includes("thanks")) {
      const responses = [
        "You're very welcome! Is there anything else I can help you with?",
        "My pleasure! Don't hesitate to ask if you need anything else.",
        "You're welcome! I'm here whenever you need assistance.",
        "Glad I could help! Feel free to reach out anytime.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (
      message.includes("bye") ||
      message.includes("goodbye") ||
      message.includes("see you")
    ) {
      const farewells = [
        "Thank you for chatting with Omej Pollux! Have a wonderful day!",
        "Goodbye! Remember we're here whenever you need us.",
        "It was great helping you! Wishing you all the best.",
        "Farewell! Don't hesitate to return if you have more questions.",
      ];
      return farewells[Math.floor(Math.random() * farewells.length)];
    }

    // Follow-up questions based on previous context
    if (
      userContext.lastUserQuestion &&
      (message.includes("yes") ||
        message.includes("sure") ||
        message.includes("okay") ||
        message === "ok")
    ) {
      if (userContext.lastUserQuestion.includes("service")) {
        return "Great! Which service area interests you most:\n\n• Business Development\n• Academic Research\n• Professional Consulting\n• General Merchandise\n\nOr would you like detailed information about all services?";
      }
      if (userContext.lastUserQuestion.includes("event")) {
        return "Excellent! You can browse all our events on the Events page. Would you like me to tell you about our most popular upcoming workshop, or do you have a specific type of event in mind?";
      }
      if (userContext.lastUserQuestion.includes("project")) {
        return "Wonderful! Our projects are categorized into Business, Academic, Community, and Innovation areas. Which category would you like to explore further?";
      }
    }

    // Default response with engagement
    const defaultResponses = [
      "That's an interesting question! Our team at Omej Pollux specializes in helping with various challenges. Could you tell me a bit more about what you're looking for?",
      "I'd love to help you with that! At Omej Pollux, we focus on business development, academic research, professional consulting, and merchandise. Which area aligns with your needs?",
      "Thank you for your message! To better assist you, could you let me know if you're interested in our business services, academic support, consulting solutions, or project support?",
      "I appreciate your question! We at Omej Pollux are dedicated to empowering growth and success. How can I direct you to the right solution today?",
    ];

    return defaultResponses[
      Math.floor(Math.random() * defaultResponses.length)
    ];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
        <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-green-500">
          <span className="text-xs">1</span>
        </Badge>
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-6 w-80 h-96 shadow-xl z-50 border-2">
          <CardHeader className="pb-3 bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <CardTitle className="text-lg">Omej Pollux Assistant</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 hover:bg-primary-foreground/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Badge
              variant="secondary"
              className="w-fit bg-green-500 text-white"
            >
              Online •
            </Badge>
          </CardHeader>

          <CardContent className="p-0 h-full flex flex-col bg-background">
            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-64">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted border"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">
                      {message.text}
                    </p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t bg-muted/30">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-background"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  size="icon"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Ask me about services, events, projects, or donations!
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CustomChat;
