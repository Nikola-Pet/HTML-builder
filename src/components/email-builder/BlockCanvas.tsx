import { useMemo } from "react";
import { useEmailBuilder } from "@/contexts/EmailBuilderContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  generateHeaderPreviewHTML,
  generateFooterPreviewHTML,
} from "@/utils/htmlGenerator";
import { EmailMetadataForm } from "@/components/blockCanvasComponents/EmailMetadataForm";
import { BlocksOrEmptyState } from "@/components/blockCanvasComponents/BlocksOrEmptyState";
import { BlockPreviewItem } from "@/components/blockCanvasComponents/BlockPreviewItem";
import { TemplateSection } from "@/components/blockCanvasComponents/TemplateSection";
import EmailEditorMenu from "../menus/EmailEditorMenu";
import { LanguageTabsMenu } from "../menus/LanguageBar";

interface BlockCanvasProps {
  onAddBlock: () => void;
}

export const BlockCanvas = ({ onAddBlock }: BlockCanvasProps) => {
  const {
    blocks,
    subjectLine,
    preheader,
    newsletterId,
    newsletterName,
    template,
    language,
    setSubjectLine,
    setPreheader,
    overrideBlocks,
    setNewsletterId,
  } = useEmailBuilder();

  const headerHTML = useMemo(() => {
    return generateHeaderPreviewHTML();
  }, []);

  const footerHTML = useMemo(() => {
    return generateFooterPreviewHTML();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      <div className="space-y-6">
        {/* Subject Line & Preheader */}
        <EmailMetadataForm
          subjectLine={subjectLine}
          preheader={preheader}
          onSubjectLineChange={setSubjectLine}
          onPreheaderChange={setPreheader}
        />

        {/* Email Template Preview - Stacked */}
        <div className="bg-card rounded-lg shadow-lg border overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b flex flex-col gap-2">
            <EmailEditorMenu
              blocks={blocks}
              subjectLine={subjectLine}
              preheader={preheader}
              newsletterId={newsletterId}
              newsletterName={newsletterName}
              template={template}
              language={language}
              setSubjectLine={setSubjectLine}
              setPreheader={setPreheader}
              overrideBlocks={overrideBlocks}
              setNewsletterId={setNewsletterId}
            />
            <LanguageTabsMenu />
          </div>
          <div className="bg-gray-100 p-4 space-y-0 overflow-visible">
            {/* Header */}
            <TemplateSection html={headerHTML} title="Header Preview" />

            {/* Blocks or Empty State */}
            <BlocksOrEmptyState
              blocks={blocks}
              onAddBlock={onAddBlock}
              renderBlock={(block, index) => (
                <BlockPreviewItem
                  key={block.id}
                  block={block}
                  index={index}
                  totalBlocks={blocks.length}
                />
              )}
            />

            {/* Add Block Button */}
            {blocks.length > 0 && (
              <div className="bg-gray-50 p-4 flex justify-center">
                <div
                  className="bg-white shadow-lg rounded-sm flex-shrink-0"
                  style={{
                    width: "640px",
                    minWidth: "640px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div className="flex flex-col items-center justify-center py-8 px-8">
                    <Button onClick={onAddBlock} icon="add">
                      Add Block
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <TemplateSection html={footerHTML} title="Footer Preview" />
          </div>
        </div>
      </div>
    </div>
  );
};
