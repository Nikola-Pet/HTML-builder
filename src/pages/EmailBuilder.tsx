import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Download } from "lucide-react";
import { useEmailBuilder } from "@/contexts/EmailBuilderContext";
import { BlockLibraryModal } from "@/components/email-builder/BlockLibraryModal";
import { BlockCanvas } from "@/components/email-builder/BlockCanvas";
import { generateHTML } from "@/utils/htmlGenerator";
import { toast } from "sonner";

const EmailBuilder = () => {
  const navigate = useNavigate();
  const { blocks } = useEmailBuilder();
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const handleDownloadHTML = () => {
    const html = generateHTML(blocks);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `email-template-${new Date().toISOString().split("T")[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("HTML file downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-foreground">Email Builder</h1>
                <p className="text-xs text-muted-foreground">{blocks.length} blocks</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setIsLibraryOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Block
              </Button>
              <Button onClick={handleDownloadHTML} disabled={blocks.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                Download HTML
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <BlockCanvas onAddBlock={() => setIsLibraryOpen(true)} />
      </div>

      {/* Block Library Modal */}
      <BlockLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
      />
    </div>
  );
};

export default EmailBuilder;
