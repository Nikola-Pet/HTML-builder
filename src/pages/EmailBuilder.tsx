import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Plus,
  Download,
  FileSpreadsheet,
  Upload,
} from "lucide-react";
import { useEmailBuilder, BlockData } from "@/contexts/EmailBuilderContext";
import { BlockLibraryModal } from "@/components/email-builder/BlockLibraryModal";
import { BlockCanvas } from "@/components/email-builder/BlockCanvas";
import { generateHTML } from "@/utils/htmlGenerator";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { BLOCK_DISPLAY_NAMES } from "@/constants/blockDisplayNames";

type CellStyle = NonNullable<XLSX.CellObject["s"]>;

const toTitleCase = (label: string) =>
  label
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const blockNameToType: Record<string, BlockData["type"]> = (() => {
  const mapping: Record<string, BlockData["type"]> = {};

  (
    Object.entries(BLOCK_DISPLAY_NAMES) as [BlockData["type"], string][]
  ).forEach(([type, displayName]) => {
    mapping[displayName] = type;
    mapping[toTitleCase(displayName)] = type;
  });

  return mapping;
})();

const labelToKey = (label: string) => {
  const words = label
    .replace(/[_-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase());

  if (words.length === 0) return "";

  return (
    words[0] +
    words
      .slice(1)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("")
  );
};

const EmailBuilder = () => {
  const navigate = useNavigate();
  const {
    blocks,
    overrideBlocks,
    subjectLine,
    preheader,
    setSubjectLine,
    setPreheader,
  } = useEmailBuilder();
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadHTML = () => {
    const html = generateHTML(blocks, subjectLine, preheader);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `email-template-${
      new Date().toISOString().split("T")[0]
    }.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("HTML file downloaded successfully!");
  };

  const handleDownloadExcel = () => {
    const workbook = XLSX.utils.book_new();
    const now = new Date();

    const rows: (string | number)[][] = [["#", "Name Block", "Field", "Value"]];
    // Add metadata rows at the top for subject line and preheader
    rows.push(["", "__METADATA__", "Subject Line", subjectLine || ""]);
    rows.push(["", "__METADATA__", "Preheader", preheader || ""]);
    // Empty separator after metadata
    rows.push(["", "", "", ""]);
    const separatorRows: number[] = [];

    const formatValue = (value: unknown) => {
      if (value === null || value === undefined) return "";
      if (Array.isArray(value)) return value.join(", ");
      if (typeof value === "object") return JSON.stringify(value, null, 2);
      return String(value);
    };

    const formatLabel = (label: string) =>
      label
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_-]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase());

    blocks.forEach((block, index) => {
      const entries = Object.entries(block.content ?? {});
      const blockName =
        BLOCK_DISPLAY_NAMES[block.type] ?? formatLabel(block.type);

      if (entries.length === 0) {
        rows.push([index + 1, blockName, "No custom fields", ""]);
      } else {
        entries.forEach(([field, value], fieldIndex) => {
          rows.push([
            fieldIndex === 0 ? index + 1 : "",
            fieldIndex === 0 ? blockName : "",
            formatLabel(field),
            formatValue(value),
          ]);
        });
      }

      if (index !== blocks.length - 1) {
        rows.push(["", "", "", ""]);
        separatorRows.push(rows.length);
      }
    });

    const blocksSheet = XLSX.utils.aoa_to_sheet(rows);
    blocksSheet["!cols"] = [{ wch: 6 }, { wch: 24 }, { wch: 28 }, { wch: 60 }];

    const separatorStyle: CellStyle = {
      fill: { patternType: "solid", fgColor: { rgb: "FFCCE5FF" } },
    };

    const columns = ["A", "B", "C", "D"];
    separatorRows.forEach((rowNumber) => {
      columns.forEach((col) => {
        const cellAddress = `${col}${rowNumber}`;
        const cell = blocksSheet[cellAddress];
        if (cell) {
          cell.s = separatorStyle;
        } else {
          blocksSheet[cellAddress] = { t: "s", v: "", s: separatorStyle };
        }
      });
    });

    XLSX.utils.book_append_sheet(workbook, blocksSheet, "Blocks");

    const worksheetArray = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });

    const blob = new Blob([worksheetArray], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `email-briefing-${now.toISOString().split("T")[0]}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Excel briefing downloaded successfully!");
  };

  const handleImportTrigger = () => {
    fileInputRef.current?.click();
  };

  const handleImportExcel = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const worksheet =
        workbook.Sheets["Blocks"] || workbook.Sheets[workbook.SheetNames[0]];

      if (!worksheet) {
        throw new Error("Worksheet 'Blocks' not found");
      }

      interface ExcelRow {
        [key: string]: string | number | boolean | null | undefined;
      }
      const rows = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, {
        defval: "",
        blankrows: false,
      });

      if (rows.length === 0) {
        throw new Error("No data found in Excel file");
      }

      const newBlocks: BlockData[] = [];
      let currentBlock: BlockData | null = null;

      rows.forEach((row) => {
        const blockName = toTitleCase(String(row["Name Block"] || "").trim());
        const fieldLabel = String(row["Field"] || "").trim();
        const value = row["Value"];
        const isSeparator =
          !blockName && !fieldLabel && (value === "" || value === undefined);

        // Handle metadata rows
        if (row["Name Block"] === "__METADATA__") {
          if (fieldLabel === "Subject Line") {
            setSubjectLine(String(value || ""));
          } else if (fieldLabel === "Preheader") {
            setPreheader(String(value || ""));
          }
          return; // skip normal block parsing
        }

        if (blockName) {
          if (currentBlock) {
            newBlocks.push(currentBlock);
          }

          const blockType = blockNameToType[blockName];
          if (!blockType) {
            throw new Error(`Unknown block type: ${blockName}`);
          }

          currentBlock = {
            id: `block-${Date.now()}-${Math.random()}`,
            type: blockType,
            content: {},
          };
        }

        if (isSeparator) {
          if (currentBlock) {
            newBlocks.push(currentBlock);
            currentBlock = null;
          }
          return;
        }

        if (currentBlock && fieldLabel) {
          const key = labelToKey(fieldLabel);
          currentBlock.content[key] =
            typeof value === "string" ? value : value?.toString() ?? "";
        }
      });

      if (currentBlock) {
        newBlocks.push(currentBlock);
      }

      if (newBlocks.length === 0) {
        throw new Error("No blocks could be parsed from Excel");
      }

      overrideBlocks(newBlocks);
      toast.success("Excel briefing imported successfully!");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to import Excel. Please check the file format."
      );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Email Builder
                </h1>
                <p className="text-xs text-muted-foreground">
                  {blocks.length} blocks
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsLibraryOpen(true)}
                >
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
                <Button
                  onClick={handleDownloadHTML}
                  disabled={blocks.length === 0}
                >
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
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <BlockCanvas onAddBlock={() => setIsLibraryOpen(true)} />
      </div>

      {/* Block Library Modal */}
      <BlockLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
      />
    </div>
  );
};

export default EmailBuilder;
