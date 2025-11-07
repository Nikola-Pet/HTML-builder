import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Sparkles } from "lucide-react";

const TemplatePicker = () => {
  const navigate = useNavigate();

  const handleSelectTemplate = () => {
    navigate("/builder");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Mail className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Email Template Builder</h1>
              <p className="text-xs text-muted-foreground">Create beautiful email campaigns</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/80 py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-black text-white mb-4">Start Building Your Email</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Select a master template and customize it with drag-and-drop blocks
          </p>
        </div>
      </div>

      {/* Template Selection */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Choose Your Master Template</h3>
          
          <div className="grid gap-6">
            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary cursor-pointer">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0 w-full md:w-48 h-64 bg-muted rounded-lg overflow-hidden border-2 border-border">
                  <div className="h-16 bg-primary"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-3 bg-muted-foreground/20 rounded"></div>
                    <div className="h-3 bg-muted-foreground/20 rounded w-4/5"></div>
                    <div className="h-20 bg-muted-foreground/10 rounded mt-4"></div>
                    <div className="h-3 bg-muted-foreground/20 rounded"></div>
                    <div className="h-3 bg-muted-foreground/20 rounded w-3/5"></div>
                  </div>
                  <div className="h-12 bg-primary mt-auto"></div>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-foreground mb-2">Professional Newsletter</h4>
                  <p className="text-muted-foreground mb-4">
                    Perfect for corporate communications and professional newsletters. Includes header with logo, 
                    content area for blocks, and footer with social media links.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">Fixed Header</span>
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">Fixed Footer</span>
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">Flexible Content</span>
                  </div>
                  <Button onClick={handleSelectTemplate} size="lg" className="w-full md:w-auto">
                    Use This Template
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePicker;
