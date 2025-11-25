import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Plus,
  Upload,
  Download,
  FileSpreadsheet,
} from "lucide-react";
import { BlockData } from "@/contexts/EmailBuilderContext";
import {
  handleDownloadHTML as downloadHTML,
  handleDownloadExcel as downloadExcel,
  handleImportExcel as importExcel,
} from "@/utils/emailExportImport";

interface EmailBuilderMenuProps {
  blocks: BlockData[];
  subjectLine: string;
  preheader: string;
  setSubjectLine: (value: string) => void;
  setPreheader: (value: string) => void;
  overrideBlocks: (blocks: BlockData[]) => void;
  onAddBlock: () => void;
}

const EmailBuilderMenu = ({
  blocks,
  subjectLine,
  preheader,
  setSubjectLine,
  setPreheader,
  overrideBlocks,
  onAddBlock,
}: EmailBuilderMenuProps) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Download HTML file
  const handleDownloadHTML = () => {
    downloadHTML(blocks, subjectLine, preheader);
  };

  // Download Excel file
  const handleDownloadExcel = () => {
    downloadExcel(blocks, subjectLine, preheader);
  };

  // Trigger file input
  const handleImportTrigger = () => {
    fileInputRef.current?.click();
  };

  // Import Excel file
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

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to import Excel file."
      );
    }
  };

  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="h-14 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div className="h-6 w-px bg-gray-300" />
          <h1 className="text-lg font-semibold">Email Builder</h1>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Button onClick={onAddBlock}>
              <Plus className="h-4 w-4 mr-2" />
              Add Block
            </Button>
            <Button variant="outline" onClick={handleImportTrigger}>
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
              placeholder="Excel file"
              aria-label="Import Excel briefing"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleDownloadHTML} disabled={blocks.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Download HTML
            </Button>
            <Button
              variant="secondary"
              onClick={handleDownloadExcel}
              disabled={blocks.length === 0}
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Download Excel
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EmailBuilderMenu;
