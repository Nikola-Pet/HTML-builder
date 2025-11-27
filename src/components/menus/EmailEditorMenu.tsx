import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Undo,
  Redo,
  Download,
  FileSpreadsheet,
  FileText,
  Upload,
  Trash2,
} from "lucide-react";
import { BlockData } from "@/contexts/EmailBuilderContext";
import {
  handleDownloadHTML as downloadHTML,
  handleDownloadExcel as downloadExcel,
  handleImportExcel as importExcel,
} from "@/utils/emailExportImport";
import { saveNewsletter, updateNewsletter } from "@/utils/newsletterStorage";
import SaveModal from "@/components/modals/SaveModal";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
import { getTemplateHeaderFooterData } from "@/utils/templateLanguages";

interface EmailEditorMenuProps {
  blocks: BlockData[];
  subjectLine: string;
  preheader: string;
  newsletterId: string | null;
  newsletterName: string;
  template: string;
  language: string;
  setSubjectLine: (value: string) => void;
  setPreheader: (value: string) => void;
  overrideBlocks: (blocks: BlockData[]) => void;
  setNewsletterId: (id: string | null) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onDelete?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  canDelete?: boolean;
}

const EmailEditorMenu = ({
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
  onUndo,
  onRedo,
  onDelete,
  canUndo = false,
  canRedo = false,
  canDelete = false,
}: EmailEditorMenuProps) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [pendingNewsletterData, setPendingNewsletterData] = useState<any | null>(null);

  // Download HTML
  const handleDownloadHTMLClick = () => {
    try {
      console.log("📋 Template:", template, "Language:", language);
      // Always use masterTemplateBI for consistent translations
      const templateLangData = getTemplateHeaderFooterData(
        "masterTemplateBI",
        language
      );
      console.log("📋 Template Language Data:", templateLangData);
      downloadHTML(blocks, subjectLine, preheader, templateLangData);
      toast.success("HTML downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download HTML.");
      console.error(error);
    }
  };

  // Download Excel
  const handleDownloadExcelClick = () => {
    try {
      downloadExcel(blocks, subjectLine, preheader);
      toast.success("Excel downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download Excel.");
      console.error(error);
    }
  };

  // Import Excel
  const handleImportTrigger = () => {
    fileInputRef.current?.click();
  };

  const handleImportExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await importExcel(file);

      if (result.subjectLine) setSubjectLine(result.subjectLine);
      if (result.preheader) setPreheader(result.preheader);
      if (result.blocks.length > 0) {
        overrideBlocks(result.blocks);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success("Excel imported successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to import Excel."
      );
      console.error(error);
    }
  };

  // Open Briefing
  const handleOpenBriefing = () => {
    navigate("/briefing", {
      state: {
        blocks,
        subjectLine,
        preheader,
        language,
        template,
      },
    });
  };

  // Save Newsletter - Publish all language drafts as ONE newsletter
  const handleSaveNewsletter = () => {
    if (!subjectLine.trim()) {
      toast.error("Please add a subject line before saving.");
      return;
    }
    if (blocks.length === 0) {
      toast.error("Please add at least one block before saving.");
      return;
    }
    // Open SaveModal and pass current newsletter data
    setPendingNewsletterData({
      subjectLine,
      preheader,
      header: { template, language },
      blocks,
      footer: { template, language },
    });
    setIsSaveModalOpen(true);
  };

  const handleSaveModalSubmit = (name: string, keywords: string[]) => {
    try {
      const newsletterData = {
        ...pendingNewsletterData,
        name: name || "Untitled Newsletter",
        keywords,
      };
      if (newsletterId) {
        const updated = updateNewsletter(newsletterId, newsletterData);
        if (updated) {
          toast.success("Newsletter updated successfully!");
        } else {
          toast.error("Failed to update newsletter.");
        }
      } else {
        const saved = saveNewsletter(newsletterData);
        if (typeof setNewsletterId === "function") {
          setNewsletterId(saved.id);
        }
        toast.success("Newsletter saved successfully!");
      }
    } catch (error) {
      toast.error("Failed to save newsletter: " + (error instanceof Error ? error.message : String(error)));
    }
    setIsSaveModalOpen(false);
    setPendingNewsletterData(null);
  };

  // Open delete confirmation modal
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  // Delete all blocks and navigate to drafts
  const handleConfirmDelete = () => {
    overrideBlocks([]); // Clear all blocks
    setSubjectLine(""); // Clear subject line
    setPreheader(""); // Clear preheader
    toast.success("Newsletter deleted successfully!");
    navigate("/"); // Navigate to drafts page
  };

  return (
  <>
  <header className="w-full border-b bg-white sticky top-0 z-10">
        <div className="h-14 px-6 flex items-center justify-between w-full">
          {/* Left side - Undo/Redo */}
          <div className="flex items-center gap-2">
            <Button
              variant="tertiary"
              onClick={onUndo}
              disabled={!canUndo}
              title="Undo"
              icon="undo"
            ></Button>
            <Button
              variant="tertiary"
              onClick={onRedo}
              disabled={!canRedo}
              title="Redo"
              icon="redo"
            ></Button>
          </div>

          {/* Right side - Download buttons and Briefing */}
          <div className="flex items-center gap-2">
            <Button
              variant="tertiary"
              onClick={handleImportTrigger}
              title="Import Excel"
              icon="upload"
            >
              Import Excel
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleImportExcel}
              title="Import Excel briefing"
              aria-label="Import Excel briefing"
            />
            <Button
              variant="tertiary"
              onClick={handleDownloadExcelClick}
              disabled={blocks.length === 0}
              title="Download Excel"
              icon="document-xls"
            >
              Export Excel
            </Button>
            <Button
              variant="tertiary"
              onClick={handleDownloadHTMLClick}
              disabled={blocks.length === 0}
              title="Download HTML"
              icon="document-code-stack"
            >
              HTML
            </Button>
            <Button
              onClick={handleOpenBriefing}
              title="Open Briefing Page"
              icon="summary"
            >
              Briefing
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveNewsletter}
              disabled={blocks.length === 0}
              title="Save Newsletter"
              icon="save"
            >
              Save
            </Button>
            <Button
              variant="tertiary"
              onClick={handleDeleteClick}
              disabled={blocks.length === 0}
              title="Delete Newsletter"
              icon="delete"
            ></Button>
          </div>
        </div>
      </header>

      {/* Save Newsletter Modal */}
      <SaveModal
        isOpen={isSaveModalOpen}
        onClose={() => { setIsSaveModalOpen(false); setPendingNewsletterData(null); }}
        onSave={handleSaveModalSubmit}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Newsletter?"
        description="Are you sure you want to delete this newsletter? All blocks, subject line, and preheader will be permanently removed. This action cannot be undone."
        confirmText="Delete Newsletter"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
};

export default EmailEditorMenu;
