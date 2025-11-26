import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { validateField, getCharacterCountStatus } from "@/utils/formValidation";
import { useState } from "react";

interface TwinTeaserFormProps {
  formData: Record<string, any>;
  updateFormData: (key: string, value: any) => void;
}

export const TwinTeaserForm = ({
  formData,
  updateFormData,
}: TwinTeaserFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (fieldName: string, value: string) => {
    updateFormData(fieldName, value);

    // Validate field
    const error = validateField("twin-teaser", fieldName, value);
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
      "twin-teaser",
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
      <div className="space-y-4 border-b pb-4">
        <h4 className="font-semibold">Left Column</h4>
        {renderField(
          "leftImageUrl",
          "Image URL",
          "https://example.com/image.jpg",
          true
        )}
        {renderField(
          "leftImageLinkUrl",
          "Image Link URL",
          "https://example.com",
          true
        )}
        {renderField("leftHeadline", "Headline", "Enter headline", true)}
        {renderField(
          "leftText",
          "Text Content",
          "Enter text content",
          true,
          true,
          3
        )}
        {renderField("leftButtonText", "Button Text", "Please click me", true)}
        {renderField(
          "leftButtonUrl",
          "Button Link",
          "https://example.com",
          true
        )}
      </div>
      <div className="space-y-4 pt-4">
        <h4 className="font-semibold">Right Column</h4>
        {renderField(
          "rightImageUrl",
          "Image URL",
          "https://example.com/image.jpg",
          true
        )}
        {renderField(
          "rightImageLinkUrl",
          "Image Link URL",
          "https://example.com",
          true
        )}
        {renderField("rightHeadline", "Headline", "Enter headline", true)}
        {renderField(
          "rightText",
          "Text Content",
          "Enter text content",
          true,
          true,
          3
        )}
        {renderField("rightButtonText", "Button Text", "Please click me", true)}
        {renderField(
          "rightButtonUrl",
          "Button Link",
          "https://example.com",
          true
        )}
      </div>
    </>
  );
};
