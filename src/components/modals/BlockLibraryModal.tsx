import { useState, useMemo } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEmailBuilder, BlockData } from "@/contexts/EmailBuilderContext";
import { BlockEditorModal } from "./BlockEditorModal";
import { BlockLibraryModalHeader } from "./BlockLibraryModalHeader";
import { BlockPreviewCard } from "@/components/cards/BlockPreviewCard";
import { ImageIcon, Layout, Type, Columns, FileText } from "lucide-react";
import { generateBlockPreviewHTML } from "@/utils/htmlGenerator";
import { BLOCK_DISPLAY_NAMES } from "@/constants/blockDisplayNames";
import { getDefaultContent } from "@/constants/defaultBlockContent";

interface BlockLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const blockTypes = [
  {
    type: "image-text" as const,
    name: BLOCK_DISPLAY_NAMES["image-text"],
    description: "Image on left, text and CTA on right",
    icon: ImageIcon,
  },
  {
    type: "banner" as const,
    name: BLOCK_DISPLAY_NAMES.banner,
    description: "Full-width banner image with link",
    icon: Layout,
  },
  {
    type: "headline" as const,
    name: BLOCK_DISPLAY_NAMES.headline,
    description: "Large centered headline text",
    icon: Type,
  },
  {
    type: "twin-teaser" as const,
    name: BLOCK_DISPLAY_NAMES["twin-teaser"],
    description: "Two columns with image, headline, text and CTA",
    icon: Columns,
  },
  {
    type: "paragraph" as const,
    name: BLOCK_DISPLAY_NAMES.paragraph,
    description: "Text paragraph with CTA button",
    icon: FileText,
  },
];

export const BlockLibraryModal = ({
  isOpen,
  onClose,
}: BlockLibraryModalProps) => {
  const [selectedType, setSelectedType] = useState<BlockData["type"] | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectType = (type: BlockData["type"]) => {
    setSelectedType(type);
  };

  const handleCloseEditor = () => {
    setSelectedType(null);
    onClose();
  };

  const filteredBlockTypes = useMemo(() => {
    if (!searchQuery.trim()) {
      return blockTypes;
    }
    const query = searchQuery.toLowerCase();
    return blockTypes.filter(
      (blockType) =>
        blockType.name.toLowerCase().includes(query) ||
        blockType.description.toLowerCase().includes(query) ||
        blockType.type.toLowerCase().includes(query)
    );
  }, [searchQuery]);

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
      <Dialog
        open={isOpen && !selectedType}
        onOpenChange={(open) => !open && onClose()}
      >
        <DialogContent className="max-w-6xl h-[90vh] overflow-hidden flex flex-col">
          <BlockLibraryModalHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <div className="flex-1 overflow-auto mt-4">
            {filteredBlockTypes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No blocks found matching "{searchQuery}"
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {filteredBlockTypes.map((blockType) => (
                  <BlockPreviewCard
                    key={blockType.type}
                    name={blockType.name}
                    description={blockType.description}
                    icon={blockType.icon}
                    previewHTML={previewHTMLs[blockType.type]}
                    onClick={() => handleSelectType(blockType.type)}
                  />
                ))}
              </div>
            )}
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
