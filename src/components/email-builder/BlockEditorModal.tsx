import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEmailBuilder, BlockData } from "@/contexts/EmailBuilderContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { generateBlockPreviewHTML } from "@/utils/htmlGenerator";

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
      case "twin-teaser":
        return (
          <>
            <div className="space-y-4 border-b pb-4">
              <h4 className="font-semibold">Left Column</h4>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={formData.leftImageUrl || ""}
                  onChange={(e) => updateFormData("leftImageUrl", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label>Image Link URL</Label>
                <Input
                  value={formData.leftImageLinkUrl || ""}
                  onChange={(e) => updateFormData("leftImageLinkUrl", e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Headline</Label>
                <Input
                  value={formData.leftHeadline || ""}
                  onChange={(e) => updateFormData("leftHeadline", e.target.value)}
                  placeholder="Enter headline"
                />
              </div>
              <div className="space-y-2">
                <Label>Text Content</Label>
                <Textarea
                  value={formData.leftText || ""}
                  onChange={(e) => updateFormData("leftText", e.target.value)}
                  placeholder="Enter text content"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input
                  value={formData.leftButtonText || ""}
                  onChange={(e) => updateFormData("leftButtonText", e.target.value)}
                  placeholder="Please click me"
                />
              </div>
              <div className="space-y-2">
                <Label>Button Link</Label>
                <Input
                  value={formData.leftButtonUrl || ""}
                  onChange={(e) => updateFormData("leftButtonUrl", e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>
            <div className="space-y-4 pt-4">
              <h4 className="font-semibold">Right Column</h4>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={formData.rightImageUrl || ""}
                  onChange={(e) => updateFormData("rightImageUrl", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label>Image Link URL</Label>
                <Input
                  value={formData.rightImageLinkUrl || ""}
                  onChange={(e) => updateFormData("rightImageLinkUrl", e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Headline</Label>
                <Input
                  value={formData.rightHeadline || ""}
                  onChange={(e) => updateFormData("rightHeadline", e.target.value)}
                  placeholder="Enter headline"
                />
              </div>
              <div className="space-y-2">
                <Label>Text Content</Label>
                <Textarea
                  value={formData.rightText || ""}
                  onChange={(e) => updateFormData("rightText", e.target.value)}
                  placeholder="Enter text content"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input
                  value={formData.rightButtonText || ""}
                  onChange={(e) => updateFormData("rightButtonText", e.target.value)}
                  placeholder="Please click me"
                />
              </div>
              <div className="space-y-2">
                <Label>Button Link</Label>
                <Input
                  value={formData.rightButtonUrl || ""}
                  onChange={(e) => updateFormData("rightButtonUrl", e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </>
        );
      case "paragraph":
        return (
          <>
            <div className="space-y-2">
              <Label>Greeting</Label>
              <Input
                value={formData.greeting || ""}
                onChange={(e) => updateFormData("greeting", e.target.value)}
                placeholder="Hello,"
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
                placeholder="Please click me"
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
      default:
        return null;
    }
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
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Block Settings</h3>
            {renderForm()}
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Live Preview</h3>
            <div className="border rounded-lg bg-gray-50 overflow-hidden">
              <div className="bg-gray-100 px-3 py-1 text-xs text-gray-600 border-b flex items-center justify-between">
                <span>Desktop Preview</span>
                <span className="text-gray-500">640px width</span>
              </div>
              <div className="relative bg-gray-100 p-4 flex justify-center overflow-auto" style={{ maxHeight: "680px" }}>
                <div 
                  className="bg-white shadow-lg rounded-sm flex-shrink-0"
                  style={{
                    width: "640px",
                    minWidth: "640px",
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                    transform: "scale(0.75)",
                    transformOrigin: "top center",
                  }}
                >
                  <iframe
                    srcDoc={previewHTML}
                    className="w-full border-0"
                    style={{
                      height: "600px",
                      maxHeight: "none",
                      pointerEvents: "none",
                      display: "block",
                    }}
                    title="Live Preview"
                    sandbox="allow-same-origin"
                    scrolling="no"
                  />
                </div>
              </div>
            </div>
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
