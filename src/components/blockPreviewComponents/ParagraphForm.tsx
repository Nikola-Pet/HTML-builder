import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { validateField, getCharacterCountStatus } from "@/utils/formValidation";
import { useState } from "react";

interface ParagraphFormProps {
  formData: Record<string, any>;
  updateFormData: (key: string, value: any) => void;
}

export const ParagraphForm = ({
  formData,
  updateFormData,
}: ParagraphFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (fieldName: string, value: string) => {
    updateFormData(fieldName, value);

    // Validate field
    const error = validateField("paragraph", fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error || "",
    }));
  };

  const renderField = (
    fieldName: string,
    label: string,
    placeholder: string,
    required: boolean = false,
    isTextarea: boolean = false,
    rows?: number
  ) => {
    const status = getCharacterCountStatus(
      "paragraph",
      fieldName,
      formData[fieldName] || ""
    );
    const InputComponent = isTextarea ? Textarea : Input;

    return (
      <div className="space-y-2">
        <Label>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <InputComponent
          value={formData[fieldName] || ""}
          onChange={(e) => handleFieldChange(fieldName, e.target.value)}
          placeholder={placeholder}
          className={errors[fieldName] ? "border-red-500" : ""}
          {...(isTextarea && rows ? { rows } : {})}
        />
        {errors[fieldName] && (
          <p className="text-sm text-red-500">{errors[fieldName]}</p>
        )}
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

  return (
    <>
      {renderField("greeting", "Greeting", "Hello,", true)}
      {renderField("text", "Text Content", "Enter text content", true, true, 4)}
      {renderField("buttonText", "Button Text", "Please click me", true)}
      {renderField("buttonUrl", "Button Link", "https://example.com", true)}
    </>
  );
};
