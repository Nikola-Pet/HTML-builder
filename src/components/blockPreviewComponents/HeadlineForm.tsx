import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface HeadlineFormProps {
  formData: Record<string, any>;
  updateFormData: (key: string, value: any) => void;
}

export const HeadlineForm = ({
  formData,
  updateFormData,
}: HeadlineFormProps) => {
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
};
