import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEmailBuilder, BlockData } from "@/contexts/EmailBuilderContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generateBlockPreviewHTML } from "@/utils/htmlGenerator";
import { BlockFormRenderer } from "@/components/email-builder/BlockFormRenderer";
import { BlockLivePreview } from "@/components/email-builder/BlockLivePreview";
import { getDefaultContent } from "@/constants/defaultBlockContent";

interface BlockEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  block?: BlockData;
  blockType?: BlockData["type"];
}

export const BlockEditorModal = ({
  isOpen,
  onClose,
  block,
  blockType,
}: BlockEditorModalProps) => {
  const { addBlock, updateBlock } = useEmailBuilder();
  const isEditing = !!block;
  const type = block?.type || blockType!;

  const [formData, setFormData] = useState<Record<string, any>>(
    block?.content || getDefaultContent(type)
  );

  useEffect(() => {
    if (block) {
      setFormData(block.content);
    } else if (blockType) {
      setFormData(getDefaultContent(blockType));
    }
  }, [block, blockType]);

  const handleSave = () => {
    if (isEditing) {
      updateBlock(block.id, formData);
      toast.success("Block updated successfully!");
    } else {
      const newBlock: BlockData = {
        id: `block-${Date.now()}-${Math.random()}`,
        type,
        content: formData,
      };
      addBlock(newBlock);
      toast.success("Block added successfully!");
    }
    onClose();
  };

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const previewHTML = useMemo(() => {
    const previewBlock: BlockData = {
      id: "preview",
      type,
      content: formData,
    };
    return generateBlockPreviewHTML(previewBlock);
  }, [type, formData]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Block" : "Configure Block"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 overflow-auto flex-1">
          {/* Form */}
          <div className="space-y-4 pl-2">
            <h3 className="font-semibold text-foreground">Block Settings</h3>
            <BlockFormRenderer
              type={type}
              formData={formData}
              updateFormData={updateFormData}
            />
          </div>

          {/* Preview */}
          <BlockLivePreview previewHTML={previewHTML} />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {isEditing ? "Update Block" : "Add Block"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
