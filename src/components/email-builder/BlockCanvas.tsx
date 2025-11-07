import { useEmailBuilder } from "@/contexts/EmailBuilderContext";
import { BlockPreview } from "./BlockPreview";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface BlockCanvasProps {
  onAddBlock: () => void;
}

export const BlockCanvas = ({ onAddBlock }: BlockCanvasProps) => {
  const { blocks } = useEmailBuilder();

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="bg-card rounded-lg shadow-lg overflow-hidden border">
        {/* Header Preview */}
        <div className="bg-primary p-6">
          <div className="flex items-center justify-between max-w-[640px] mx-auto">
            <div className="h-8 w-32 bg-white/20 rounded"></div>
            <div className="text-white font-bold text-lg">PRO NEWS</div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-muted/30 min-h-[400px]">
          {blocks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="mx-auto w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                  <Plus className="h-10 w-10 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">No blocks yet</h3>
                <p className="text-muted-foreground max-w-md">
                  Start building your email by adding content blocks. Click the button below to get started.
                </p>
                <Button onClick={onAddBlock} size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Block
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-4">
              {blocks.map((block, index) => (
                <BlockPreview key={block.id} block={block} index={index} />
              ))}
              <div className="text-center py-8">
                <Button onClick={onAddBlock} variant="outline" size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Block
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Preview */}
        <div className="bg-primary p-6">
          <div className="text-center max-w-[640px] mx-auto">
            <p className="text-white font-bold mb-4">Follow us</p>
            <div className="flex justify-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-full"></div>
              <div className="w-10 h-10 bg-white/20 rounded-full"></div>
              <div className="w-10 h-10 bg-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
