import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEmailBuilder, BlockData } from "@/contexts/EmailBuilderContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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

  const renderForm = () => {
    switch (type) {
      case "image-text":
        return (
          <>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={formData.imageUrl || ""}
                onChange={(e) => updateFormData("imageUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label>Image Link URL (optional)</Label>
              <Input
                value={formData.imageLinkUrl || ""}
                onChange={(e) => updateFormData("imageLinkUrl", e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Headline</Label>
              <Input
                value={formData.headline || ""}
                onChange={(e) => updateFormData("headline", e.target.value)}
                placeholder="Enter headline"
              />
            </div>
            <div className="space-y-2">
              <Label>Text Content</Label>
              <Textarea
                value={formData.text || ""}
                onChange={(e) => updateFormData("text", e.target.value)}
                placeholder="Enter text content"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input
                value={formData.buttonText || ""}
                onChange={(e) => updateFormData("buttonText", e.target.value)}
                placeholder="Click here"
              />
            </div>
            <div className="space-y-2">
              <Label>Button Link</Label>
              <Input
                value={formData.buttonUrl || ""}
                onChange={(e) => updateFormData("buttonUrl", e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </>
        );
      case "banner":
        return (
          <>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={formData.imageUrl || ""}
                onChange={(e) => updateFormData("imageUrl", e.target.value)}
                placeholder="https://example.com/banner.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label>Link URL</Label>
              <Input
                value={formData.linkUrl || ""}
                onChange={(e) => updateFormData("linkUrl", e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Alt Text</Label>
              <Input
                value={formData.altText || ""}
                onChange={(e) => updateFormData("altText", e.target.value)}
                placeholder="Banner description"
              />
            </div>
          </>
        );
      case "headline":
        return (
          <div className="space-y-2">
            <Label>Headline Text</Label>
            <Textarea
              value={formData.text || ""}
              onChange={(e) => updateFormData("text", e.target.value)}
              placeholder="Enter your headline"
              rows={3}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderPreview = () => {
    switch (type) {
      case "image-text":
        return (
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex gap-4">
              <div className="w-1/2 h-40 bg-muted rounded flex items-center justify-center text-muted-foreground text-sm">
                {formData.imageUrl ? "Image" : "No image"}
              </div>
              <div className="w-1/2 space-y-2">
                <h3 className="font-bold text-primary">{formData.headline || "Headline"}</h3>
                <p className="text-sm text-foreground">{formData.text || "Text content"}</p>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm">
                  {formData.buttonText || "Button"}
                </button>
              </div>
            </div>
          </div>
        );
      case "banner":
        return (
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="w-full h-48 bg-muted flex items-center justify-center text-muted-foreground">
              {formData.imageUrl ? "Banner Image" : "No image"}
            </div>
          </div>
        );
      case "headline":
        return (
          <div className="bg-card p-8 rounded-lg border text-center">
            <h2 className="text-2xl font-bold text-primary">
              {formData.text || "Headline text"}
            </h2>
          </div>
        );
      default:
        return null;
    }
  };

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
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Block Settings</h3>
            {renderForm()}
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Live Preview</h3>
            {renderPreview()}
          </div>
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
    default:
      return {};
  }
}
