import { useState } from "react";
import { BlockData, useEmailBuilder } from "@/contexts/EmailBuilderContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  Copy,
  Trash2,
  ChevronUp,
  ChevronDown,
  MoreVertical,
  GripVertical,
} from "lucide-react";
import { BlockEditorModal } from "./BlockEditorModal";

interface BlockPreviewProps {
  block: BlockData;
  index: number;
}

export const BlockPreview = ({ block, index }: BlockPreviewProps) => {
  const { deleteBlock, duplicateBlock, moveBlock, blocks } = useEmailBuilder();
  const [isEditing, setIsEditing] = useState(false);

  const renderBlockContent = () => {
    switch (block.type) {
      case "image-text":
        return (
          <div className="flex gap-4 p-4">
            {block.content.imageUrl ? (
              <img 
                src={block.content.imageUrl} 
                alt={block.content.headline || "Image"} 
                className="w-1/2 h-40 object-cover rounded"
              />
            ) : (
              <div className="w-1/2 h-40 bg-muted rounded flex items-center justify-center text-muted-foreground text-sm">
                Bez slike
              </div>
            )}
            <div className="w-1/2 space-y-2">
              <h4 className="font-bold text-primary">{block.content.headline || "Bez naslova"}</h4>
              <p className="text-sm text-foreground line-clamp-3">{block.content.text || "Bez teksta"}</p>
              {block.content.buttonText && (
                <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded text-sm mt-2">
                  {block.content.buttonText}
                </div>
              )}
            </div>
          </div>
        );
      case "banner":
        return block.content.imageUrl ? (
          <img 
            src={block.content.imageUrl} 
            alt={block.content.altText || "Banner"} 
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-muted flex items-center justify-center text-muted-foreground">
            Bez slike
          </div>
        );
      case "headline":
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-primary uppercase">
              {block.content.text || "Bez naslova"}
            </h2>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="group relative bg-card mx-auto max-w-[640px] mb-2 rounded border hover:border-primary/50 transition-all">
        {/* Drag Handle */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
        </div>

        {/* Block Content */}
        <div className="relative">{renderBlockContent()}</div>

        {/* Actions Menu */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => duplicateBlock(block.id)}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => moveBlock(block.id, "up")}
                disabled={index === 0}
              >
                <ChevronUp className="h-4 w-4 mr-2" />
                Move Up
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => moveBlock(block.id, "down")}
                disabled={index === blocks.length - 1}
              >
                <ChevronDown className="h-4 w-4 mr-2" />
                Move Down
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteBlock(block.id)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Block Type Badge */}
        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-2 py-1 bg-secondary text-xs rounded text-secondary-foreground font-medium">
            {block.type}
          </span>
        </div>
      </div>

      <BlockEditorModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        block={block}
      />
    </>
  );
};
