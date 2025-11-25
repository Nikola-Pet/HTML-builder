import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ImageTextFormProps {
  formData: Record<string, any>;
  updateFormData: (key: string, value: any) => void;
}

export const ImageTextForm = ({
  formData,
  updateFormData,
}: ImageTextFormProps) => {
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
};
