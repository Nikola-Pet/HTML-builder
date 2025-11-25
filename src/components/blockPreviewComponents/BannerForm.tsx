import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BannerFormProps {
  formData: Record<string, any>;
  updateFormData: (key: string, value: any) => void;
}

export const BannerForm = ({ formData, updateFormData }: BannerFormProps) => {
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
};
