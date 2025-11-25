import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TwinTeaserFormProps {
  formData: Record<string, any>;
  updateFormData: (key: string, value: any) => void;
}

export const TwinTeaserForm = ({
  formData,
  updateFormData,
}: TwinTeaserFormProps) => {
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
            onChange={(e) =>
              updateFormData("rightImageLinkUrl", e.target.value)
            }
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
};
