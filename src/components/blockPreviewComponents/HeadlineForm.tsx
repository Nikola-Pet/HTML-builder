import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { validateField, getCharacterCountStatus } from "@/utils/formValidation";
import { useState } from "react";

interface HeadlineFormProps {
  formData: Record<string, any>;
  updateFormData: (key: string, value: any) => void;
}

export const HeadlineForm = ({
  formData,
  updateFormData,
}: HeadlineFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (fieldName: string, value: string) => {
    updateFormData(fieldName, value);

    // Validate field
    const error = validateField("headline", fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error || "",
    }));
  };

  const status = getCharacterCountStatus(
    "headline",
    "text",
    formData.text || ""
  );

  return (
    <div className="space-y-2">
      <Label>
        Headline Text <span className="text-red-500">*</span>
      </Label>
      <Textarea
        value={formData.text || ""}
        onChange={(e) => handleFieldChange("text", e.target.value)}
        placeholder="Enter your headline"
        rows={3}
        className={errors.text ? "border-red-500" : ""}
      />
      {errors.text && <p className="text-sm text-red-500">{errors.text}</p>}
      {status && (
        <p
          className={`text-sm ${
            status.isOverLimit ? "text-red-500" : "text-gray-500"
          }`}
        >
          {status.current}/{status.max} characters
        </p>
      )}
    </div>
  );
};
