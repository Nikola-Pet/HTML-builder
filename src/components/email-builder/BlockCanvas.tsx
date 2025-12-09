import { useMemo, useEffect, useState } from "react";
import { useEmailBuilder } from "@/contexts/EmailBuilderContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  generateHeaderPreviewHTML,
  generateFooterPreviewHTML,
} from "@/utils/htmlGenerator";
import { getTemplateHeaderFooterData } from "@/utils/templateLanguages";
import { EmailMetadataForm } from "@/components/blockCanvasComponents/EmailMetadataForm";
import { BlocksOrEmptyState } from "@/components/blockCanvasComponents/BlocksOrEmptyState";
import { BlockPreviewItem } from "@/components/blockCanvasComponents/BlockPreviewItem";
import { TemplateSection } from "@/components/blockCanvasComponents/TemplateSection";
import EmailEditorMenu from "../menus/EmailEditorMenu";
import { LanguageTabsMenu } from "../menus/LanguageBar";
import { useUndoRedo } from "@/hooks/useUndoRedo";

interface BlockCanvasProps {
  onAddBlock: () => void;
}

export const BlockCanvas = ({ onAddBlock }: BlockCanvasProps) => {
  const {
    blocks,
    subjectLine,
    preheader,
    newsletterId,
    draftId,
    newsletterName,
    template,
    language,
    setSubjectLine,
    setPreheader,
    overrideBlocks,
    setNewsletterId,
    setDraftId,
  } = useEmailBuilder();

  const [isInitialized, setIsInitialized] = useState(false);

  // Undo/Redo functionality
  const { undo, redo, canUndo, canRedo, saveState } = useUndoRedo({
    blocks,
    subjectLine,
    preheader,
    setSubjectLine,
    setPreheader,
    overrideBlocks,
  });

  // Mark as initialized after mount
  useEffect(() => {
    setTimeout(() => {
      setIsInitialized(true);
    }, 100);
  }, []);

  // Save state whenever blocks, subject, or preheader change
  // Use a timeout to debounce rapid changes
  useEffect(() => {
    if (!isInitialized) return;

    const timeout = setTimeout(() => {
      saveState();
    }, 300); // 300ms debounce

    return () => clearTimeout(timeout);
  }, [blocks, subjectLine, preheader, isInitialized, saveState]);

  // Get language-specific data and regenerate header/footer when language changes
  const headerHTML = useMemo(() => {
    const languageData = getTemplateHeaderFooterData(
      "masterTemplateBI",
      language
    );
    console.log(
      `🎨 BlockCanvas: Generating header preview for ${language}`,
      languageData
    );
    return generateHeaderPreviewHTML(languageData);
  }, [language]);

  const footerHTML = useMemo(() => {
    const languageData = getTemplateHeaderFooterData(
      "masterTemplateBI",
      language
    );
    console.log(
      `🎨 BlockCanvas: Generating footer preview for ${language}`,
      languageData
    );
    return generateFooterPreviewHTML(languageData);
  }, [language]);

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
        <div className="bg-card shadow-lg border overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b flex flex-col gap-2">
            <EmailEditorMenu
              blocks={blocks}
              subjectLine={subjectLine}
              preheader={preheader}
              newsletterId={newsletterId}
              draftId={draftId}
              newsletterName={newsletterName}
              template={template}
              language={language}
              setSubjectLine={setSubjectLine}
              setPreheader={setPreheader}
              overrideBlocks={overrideBlocks}
              setNewsletterId={setNewsletterId}
              setDraftId={setDraftId}
              onUndo={undo}
              onRedo={redo}
              canUndo={canUndo}
              canRedo={canRedo}
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
                  className="bg-white shadow-lg flex-shrink-0"
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
