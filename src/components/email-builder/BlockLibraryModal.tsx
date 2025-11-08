import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEmailBuilder, BlockData } from "@/contexts/EmailBuilderContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlockEditorModal } from "./BlockEditorModal";
import { ImageIcon, Layout, Type, Columns, FileText } from "lucide-react";
import { generateBlockPreviewHTML } from "@/utils/htmlGenerator";

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

function getDefaultContent(type: BlockData["type"]): Record<string, any> {
  switch (type) {
    case "image-text":
      return {
        imageUrl: "https://dummyimage.com/1280x720",
        imageLinkUrl: "https://www.example.com",
        headline: "Headline",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        buttonText: "Please click me",
        buttonUrl: "https://www.example.com/",
      };
    case "banner":
      return {
        imageUrl: "https://dummyimage.com/1280x720",
        linkUrl: "https://www.example.com/",
        altText: "Banner image [description]",
      };
    case "headline":
      return {
        text: "Lorem Ipsum is simply dummy text",
      };
    case "twin-teaser":
      return {
        leftImageUrl: "https://dummyimage.com/1280x720",
        leftImageLinkUrl: "https://www.example.com",
        leftHeadline: "Headline",
        leftText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        leftButtonText: "Please click me",
        leftButtonUrl: "https://www.example.com/",
        rightImageUrl: "https://dummyimage.com/1280x720",
        rightImageLinkUrl: "https://www.example.com",
        rightHeadline: "Headline",
        rightText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        rightButtonText: "Please click me",
        rightButtonUrl: "https://www.example.com/",
      };
    case "paragraph":
      return {
        greeting: "Hello,",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        buttonText: "Please click me",
        buttonUrl: "https://www.example.com/",
      };
    default:
      return {};
  }
}

export const BlockLibraryModal = ({ isOpen, onClose }: BlockLibraryModalProps) => {
  const [selectedType, setSelectedType] = useState<BlockData["type"] | null>(null);

  const handleSelectType = (type: BlockData["type"]) => {
    setSelectedType(type);
  };

  const handleCloseEditor = () => {
    setSelectedType(null);
    onClose();
  };

  const previewHTMLs = useMemo(() => {
    const htmls: Record<string, string> = {};
    blockTypes.forEach((blockType) => {
      const defaultBlock: BlockData = {
        id: "preview",
        type: blockType.type,
        content: getDefaultContent(blockType.type),
      };
      htmls[blockType.type] = generateBlockPreviewHTML(defaultBlock);
    });
    return htmls;
  }, []);

  return (
    <>
      <Dialog open={isOpen && !selectedType} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Add Content Block</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            {blockTypes.map((blockType) => {
              const Icon = blockType.icon;
              return (
                <Card
                  key={blockType.type}
                  className="p-6 hover:border-primary cursor-pointer transition-all hover:shadow-md fit-content"
                  style={{ maxHeight: "fit-content" }}
                  onClick={() => handleSelectType(blockType.type)}
                >
                  <div className="flex items-start gap-4 mb-4" >
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-lg flex items-center justify-center fit-content">
                      <Icon className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">{blockType.name}</h3>
                      <p className="text-sm text-muted-foreground">{blockType.description}</p>
                    </div>
                  </div>
                  
                  {/* Preview */}
                  <div className="mt-4 border rounded-lg bg-gray-50 overflow-hidden">
                    <div className="bg-gray-100 px-3 py-1 text-xs text-gray-600 border-b flex items-center justify-between">
                      <span>Desktop Preview</span>
                      <span className="text-gray-500">640px width</span>
                    </div>
                    <div className="relative bg-gray-100 p-4 flex justify-center"  style={{ maxHeight: "420px" }}>
                      <div 
                        className="bg-white shadow-lg rounded-sm flex-shrink-0"
                        style={{
                          width: "640px",
                          minWidth: "640px",
                          border: "1px solid #e5e7eb",
                          overflow: "hidden",
                          transform: "scale(0.5)",
                        }}
                      >
                        <iframe
                          srcDoc={previewHTMLs[blockType.type]}
                          className="w-full border-0"
                          style={{
                            height: "450px",
                            pointerEvents: "none",
                            display: "block",
                          }}
                          title={`Preview of ${blockType.name}`}
                          sandbox="allow-same-origin"
                          scrolling="no"
                        />
                      </div>
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
