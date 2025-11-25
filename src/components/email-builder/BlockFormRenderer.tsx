import { BlockData } from "@/contexts/EmailBuilderContext";
import { ImageTextForm } from "@/components/blockPreviewComponents/ImageTextForm";
import { BannerForm } from "@/components/blockPreviewComponents/BannerForm";
import { HeadlineForm } from "@/components/blockPreviewComponents/HeadlineForm";
import { TwinTeaserForm } from "@/components/blockPreviewComponents/TwinTeaserForm";
import { ParagraphForm } from "@/components/blockPreviewComponents/ParagraphForm";

interface BlockFormRendererProps {
  type: BlockData["type"];
  formData: Record<string, any>;
  updateFormData: (key: string, value: any) => void;
}

export const BlockFormRenderer = ({
  type,
  formData,
  updateFormData,
}: BlockFormRendererProps) => {
  switch (type) {
    case "image-text":
      return (
        <ImageTextForm formData={formData} updateFormData={updateFormData} />
      );
    case "banner":
      return <BannerForm formData={formData} updateFormData={updateFormData} />;
    case "headline":
      return (
        <HeadlineForm formData={formData} updateFormData={updateFormData} />
      );
    case "twin-teaser":
      return (
        <TwinTeaserForm formData={formData} updateFormData={updateFormData} />
      );
    case "paragraph":
      return (
        <ParagraphForm formData={formData} updateFormData={updateFormData} />
      );
    default:
      return null;
  }
};
