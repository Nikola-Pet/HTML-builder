import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { generateHTML } from "@/utils/htmlGenerator";
import { BlockData } from "@/contexts/EmailBuilderContext";
import { getTemplateHeaderFooterData } from "@/utils/templateLanguages";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  blocks: BlockData[];
  subjectLine: string;
  preheader: string;
  language: string;
  template: string;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  blocks,
  subjectLine,
  preheader,
  language,
  template,
}) => {
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    if (!isOpen || !blocks) return;

    // Generate HTML with language-specific data
    const languageData = getTemplateHeaderFooterData(template, language);
    let html = generateHTML(blocks, subjectLine, preheader, languageData);

    // Extract only the body content (remove html, head, doctype tags)
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) {
      html = bodyMatch[1];
    }

    setHtmlContent(html);
  }, [isOpen, blocks, subjectLine, preheader, language, template]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Email Preview - {language}</DialogTitle>
        </DialogHeader>
        <div className="bg-gray-100 p-8 flex justify-center">
          <div
            className="bg-white shadow-lg max-w-2xl w-full"
            style={{
              fontFamily: "Arial, sans-serif",
              pointerEvents: "none", // Disable all interactions
            }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
