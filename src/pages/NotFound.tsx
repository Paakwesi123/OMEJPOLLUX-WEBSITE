import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/90 text-primary-foreground flex items-center justify-center relative overflow-hidden">
      {/* Adinkra Symbols Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-9xl text-accent/10 animate-pulse">⚜</div>
        <div className="absolute top-60 right-20 text-7xl text-primary-foreground/10 animate-float">◊</div>
        <div className="absolute bottom-40 left-20 text-8xl text-accent/15 animate-pulse" style={{ animationDelay: '2s' }}>☯</div>
        <div className="absolute bottom-20 right-10 text-6xl text-primary-foreground/20 animate-float" style={{ animationDelay: '1s' }}>✦</div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-2xl mx-auto animate-fade-in">
          <h1 className="text-8xl md:text-9xl font-heading font-bold text-accent mb-6">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="btn-secondary group"
              onClick={() => navigate('/')}
            >
              <Home className="mr-2 w-5 h-5" />
              Go Home
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary-foreground bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground hover:text-primary backdrop-blur-sm font-semibold"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
