import { useNavigate } from "react-router-dom";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { TemplateCard } from "@/components/cards/TemplateCard";

const TemplatePicker = () => {
  const navigate = useNavigate();

  const handleSelectTemplate = () => {
    navigate("/builder");
  };

  useBreadcrumbs([{ label: "Dashboard", href: "/" }]);
  return (
    <div className="min-h-screen bg-background">
      {/* Template Selection */}
      <div className="container mx-auto px-6 py-12">
        <div style={{ display: "flex", gap: "3rem" }}>
          <div className="grid gap-6">
            <TemplateCard
              title="Professional Newsletter"
              description="Perfect for corporate communications and professional newsletters. Includes header with logo, content area for blocks, and footer with social media links."
              tags={["Fixed Header", "Fixed Footer", "Flexible Content"]}
              onSelect={handleSelectTemplate}
            />
          </div>

          <div className="grid gap-6">
            <TemplateCard
              title="Professional Newsletter"
              description="Perfect for corporate communications and professional newsletters. Includes header with logo, content area for blocks, and footer with social media links."
              tags={["Fixed Header", "Fixed Footer", "Flexible Content"]}
              onSelect={handleSelectTemplate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePicker;
