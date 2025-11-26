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

interface EmailEditorMenuProps {
  onUndo?: () => void;
  onRedo?: () => void;
  onDownloadHTML?: () => void;
  onDownloadExcel?: () => void;
  onOpenBriefing?: () => void;
  onImportExcel?: () => void;
  onDelete?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  canDownload?: boolean;
  canDelete?: boolean;
}

const EmailEditorMenu = ({
  onUndo,
  onRedo,
  onDownloadHTML,
  onDownloadExcel,
  onOpenBriefing,
  onImportExcel,
  onDelete,
  canUndo = false,
  canRedo = false,
  canDownload = true,
  canDelete = false,
}: EmailEditorMenuProps) => {
  return (
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
            onClick={onImportExcel}
            title="Import Excel"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDownloadExcel}
            disabled={!canDownload}
            title="Download Excel"
          >
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDownloadHTML}
            disabled={!canDownload}
            title="Download HTML"
          >
            <Download className="h-4 w-4 mr-2" />
            HTML
          </Button>
          <Button onClick={onOpenBriefing} size="sm" title="Open Briefing Page">
            <FileText className="h-4 w-4 mr-2" />
            Briefing
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            disabled={!canDelete}
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default EmailEditorMenu;
