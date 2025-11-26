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
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";

interface EmailEditorMenuProps {
  blocks: BlockData[];
  subjectLine: string;
  preheader: string;
  setSubjectLine: (value: string) => void;
  setPreheader: (value: string) => void;
  overrideBlocks: (blocks: BlockData[]) => void;
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
  setSubjectLine,
  setPreheader,
  overrideBlocks,
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

  // Download HTML
  const handleDownloadHTMLClick = () => {
    try {
      downloadHTML(blocks, subjectLine, preheader);
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
    navigate("/briefing");
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
              variant="ghost"
              size="sm"
              onClick={onUndo}
              disabled={!canUndo}
              title="Undo"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRedo}
              disabled={!canRedo}
              title="Redo"
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>

          {/* Right side - Download buttons and Briefing */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleImportTrigger}
              title="Import Excel"
            >
              <Upload className="h-4 w-4 mr-2" />
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
              variant="outline"
              size="sm"
              onClick={handleDownloadExcelClick}
              disabled={blocks.length === 0}
              title="Download Excel"
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadHTMLClick}
              disabled={blocks.length === 0}
              title="Download HTML"
            >
              <Download className="h-4 w-4 mr-2" />
              HTML
            </Button>
            <Button
              onClick={handleOpenBriefing}
              size="sm"
              title="Open Briefing Page"
            >
              <FileText className="h-4 w-4 mr-2" />
              Briefing
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteClick}
              disabled={blocks.length === 0}
              title="Delete Newsletter"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

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
