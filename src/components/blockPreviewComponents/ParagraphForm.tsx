import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ParagraphFormProps {
  formData: Record<string, any>;
  updateFormData: (key: string, value: any) => void;
}

export const ParagraphForm = ({
  formData,
  updateFormData,
}: ParagraphFormProps) => {
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
};
