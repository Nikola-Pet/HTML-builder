import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateField, getCharacterCountStatus } from "@/utils/formValidation";
import { useState, useEffect } from "react";

interface BannerFormProps {
  formData: Record<string, any>;
  updateFormData: (key: string, value: any) => void;
}

export const BannerForm = ({ formData, updateFormData }: BannerFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (fieldName: string, value: string) => {
    updateFormData(fieldName, value);

    // Validate field
    const error = validateField("banner", fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error || "",
    }));
  };

  return (
    <>
      <div className="space-y-2">
        <Label>
          Image URL <span className="text-red-500">*</span>
        </Label>
        <Input
          value={formData.imageUrl || ""}
          onChange={(e) => handleFieldChange("imageUrl", e.target.value)}
          placeholder="https://example.com/banner.jpg"
          className={errors.imageUrl ? "border-red-500" : ""}
        />
        {errors.imageUrl && (
          <p className="text-sm text-red-500">{errors.imageUrl}</p>
        )}
        {(() => {
          const status = getCharacterCountStatus(
            "banner",
            "imageUrl",
            formData.imageUrl || ""
          );
          return status ? (
            <p
              className={`text-sm ${
                status.isOverLimit ? "text-red-500" : "text-gray-500"
              }`}
            >
              {status.current}/{status.max} characters
            </p>
          ) : null;
        })()}
      </div>
      <div className="space-y-2">
        <Label>
          Link URL <span className="text-red-500">*</span>
        </Label>
        <Input
          value={formData.linkUrl || ""}
          onChange={(e) => handleFieldChange("linkUrl", e.target.value)}
          placeholder="https://example.com"
          className={errors.linkUrl ? "border-red-500" : ""}
        />
        {errors.linkUrl && (
          <p className="text-sm text-red-500">{errors.linkUrl}</p>
        )}
        {(() => {
          const status = getCharacterCountStatus(
            "banner",
            "linkUrl",
            formData.linkUrl || ""
          );
          return status ? (
            <p
              className={`text-sm ${
                status.isOverLimit ? "text-red-500" : "text-gray-500"
              }`}
            >
              {status.current}/{status.max} characters
            </p>
          ) : null;
        })()}
      </div>
    </>
  );
};
