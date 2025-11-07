import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEmailBuilder, BlockData } from "@/contexts/EmailBuilderContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlockEditorModal } from "./BlockEditorModal";
import { ImageIcon, Layout, Type, Columns, FileText } from "lucide-react";

interface BlockLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const blockTypes = [
  {
    type: "image-text" as const,
    name: "LeftTeaser",
    description: "Image on left, text and CTA on right",
    icon: ImageIcon,
  },
  {
    type: "banner" as const,
    name: "Keyvisual",
    description: "Full-width banner image with link",
    icon: Layout,
  },
  {
    type: "headline" as const,
    name: "Headline",
    description: "Large centered headline text",
    icon: Type,
  },
  {
    type: "twin-teaser" as const,
    name: "TwinTeaser",
    description: "Two columns with image, headline, text and CTA",
    icon: Columns,
  },
  {
    type: "paragraph" as const,
    name: "Paragraph",
    description: "Text paragraph with CTA button",
    icon: FileText,
  },
];

export const BlockLibraryModal = ({ isOpen, onClose }: BlockLibraryModalProps) => {
  const [selectedType, setSelectedType] = useState<BlockData["type"] | null>(null);

  const handleSelectType = (type: BlockData["type"]) => {
    setSelectedType(type);
  };

  const handleCloseEditor = () => {
    setSelectedType(null);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !selectedType} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Add Content Block</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {blockTypes.map((blockType) => {
              const Icon = blockType.icon;
              return (
                <Card
                  key={blockType.type}
                  className="p-6 hover:border-primary cursor-pointer transition-all hover:shadow-md"
                  onClick={() => handleSelectType(blockType.type)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">{blockType.name}</h3>
                      <p className="text-sm text-muted-foreground">{blockType.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {selectedType && (
        <BlockEditorModal
          isOpen={true}
          onClose={handleCloseEditor}
          blockType={selectedType}
        />
      )}
    </>
  );
};
