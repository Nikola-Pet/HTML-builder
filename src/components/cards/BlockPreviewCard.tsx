import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface BlockPreviewCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  previewHTML: string;
  onClick: () => void;
}

export const BlockPreviewCard = ({
  name,
  description,
  icon: Icon,
  previewHTML,
  onClick,
}: BlockPreviewCardProps) => {
  return (
    <Card
      className="p-6 hover:border-primary cursor-pointer transition-all hover:shadow-md fit-content"
      style={{ maxHeight: "fit-content" }}
      onClick={onClick}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-lg flex items-center justify-center fit-content">
          <Icon className="h-6 w-6 text-secondary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-foreground mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-4 border rounded-lg bg-gray-50 overflow-hidden">
        <div className="bg-gray-100 px-3 py-1 text-xs text-gray-600 border-b flex items-center justify-between">
          <span>Desktop Preview</span>
          <span className="text-gray-500">640px width</span>
        </div>
        <div
          className="relative bg-gray-100 p-4 flex justify-center"
          style={{
            maxHeight: "250px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="bg-white shadow-lg rounded-sm flex-shrink-0"
            style={{
              width: "640px",
              minWidth: "640px",
              border: "1px solid #e5e7eb",
              overflow: "hidden",
              transform: "scale(0.45)",
              minHeight: "min-content",
            }}
          >
            <iframe
              srcDoc={previewHTML}
              className="w-full border-0"
              style={{
                height: "400px",
                pointerEvents: "none",
                display: "block",
              }}
              title={`Preview of ${name}`}
              sandbox="allow-same-origin"
              scrolling="no"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
