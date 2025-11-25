import * as XLSX from "xlsx";
import { BlockData } from "@/contexts/EmailBuilderContext";
import { generateHTML } from "@/utils/htmlGenerator";
import { getDefaultContent } from "@/constants/defaultBlockContent";

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Converts a string to title case
 * @param str - The string to convert
 * @returns The title-cased string
 */
export const toTitleCase = (str: string): string => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Converts a display label to an internal key format
 * @param label - The display label to convert
 * @returns The internal key
 */
export const labelToKey = (label: string): string => {
  const keyMap: Record<string, string> = {
    Link: "link",
    Text: "text",
    Headline: "headline",
    Subheadline: "subheadline",
    Paragraph: "paragraph",
    "Image URL": "imageUrl",
    "Image Alt": "imageAlt",
    "CTA Text": "ctaText",
    "CTA Link": "ctaLink",
    "Left Image URL": "leftImageUrl",
    "Left Image Alt": "leftImageAlt",
    "Left Headline": "leftHeadline",
    "Left Subheadline": "leftSubheadline",
    "Left CTA Text": "leftCtaText",
    "Left CTA Link": "leftCtaLink",
    "Right Image URL": "rightImageUrl",
    "Right Image Alt": "rightImageAlt",
    "Right Headline": "rightHeadline",
    "Right Subheadline": "rightSubheadline",
    "Right CTA Text": "rightCtaText",
    "Right CTA Link": "rightCtaLink",
  };
  return keyMap[label] || label.toLowerCase().replace(/\s+/g, "_");
};

/**
 * Formats a value based on the field type
 * @param key - The field key
 * @param value - The value to format
 * @returns The formatted value (boolean for certain fields, string otherwise)
 */
export const formatValue = (key: string, value: string): string | boolean => {
  const booleanFields = ["ctaEnabled"];
  if (booleanFields.includes(key)) {
    const lower = value.toLowerCase();
    return lower === "true" || lower === "yes" || lower === "1";
  }
  return value;
};

/**
 * Converts an internal key to a display label
 * @param key - The internal key
 * @returns The formatted display label
 */
export const formatLabel = (key: string): string => {
  const labelMap: Record<string, string> = {
    link: "Link",
    text: "Text",
    headline: "Headline",
    subheadline: "Subheadline",
    paragraph: "Paragraph",
    imageUrl: "Image URL",
    imageAlt: "Image Alt",
    ctaText: "CTA Text",
    ctaLink: "CTA Link",
    ctaEnabled: "CTA Enabled",
    leftImageUrl: "Left Image URL",
    leftImageAlt: "Left Image Alt",
    leftHeadline: "Left Headline",
    leftSubheadline: "Left Subheadline",
    leftCtaText: "Left CTA Text",
    leftCtaLink: "Left CTA Link",
    rightImageUrl: "Right Image URL",
    rightImageAlt: "Right Image Alt",
    rightHeadline: "Right Headline",
    rightSubheadline: "Right Subheadline",
    rightCtaText: "Right CTA Text",
    rightCtaLink: "Right CTA Link",
  };
  return labelMap[key] || toTitleCase(key.replace(/_/g, " "));
};

// ============================================================================
// EXPORT HANDLERS
// ============================================================================

/**
 * Downloads the email template as an HTML file
 * @param blocks - Array of email blocks
 * @param subjectLine - Email subject line
 * @param preheader - Email preheader text
 */
export const handleDownloadHTML = (
  blocks: BlockData[],
  subjectLine: string,
  preheader: string
): void => {
  const htmlContent = generateHTML(blocks, subjectLine, preheader);

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${subjectLine || "email"}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Downloads the email template as an Excel briefing file
 * @param blocks - Array of email blocks
 * @param subjectLine - Email subject line
 * @param preheader - Email preheader text
 */
export const handleDownloadExcel = (
  blocks: BlockData[],
  subjectLine: string,
  preheader: string
): void => {
  const data: any[] = [];

  // Header row
  data.push(["Type", "Field", "Value"]);

  // Metadata rows
  data.push(["Metadata", "Subject Line", subjectLine]);
  data.push(["Metadata", "Preheader", preheader]);
  data.push([]);

  // Block data rows
  blocks.forEach((block, index) => {
    data.push([`Block ${index + 1}`, "Type", toTitleCase(block.type)]);

    Object.entries(block.content).forEach(([key, value]) => {
      const label = formatLabel(key);
      data.push([`Block ${index + 1}`, label, String(value)]);
    });

    data.push([]);
  });

  // Create worksheet and workbook
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Email Content");

  // Set column widths
  const colWidths = [{ wch: 15 }, { wch: 20 }, { wch: 50 }];
  ws["!cols"] = colWidths;

  // Write file
  XLSX.writeFile(wb, `${subjectLine || "email"}_briefing.xlsx`);
};

// ============================================================================
// IMPORT HANDLERS
// ============================================================================

export interface ImportResult {
  subjectLine: string;
  preheader: string;
  blocks: BlockData[];
}

/**
 * Imports email data from an Excel file
 * @param file - The Excel file to import
 * @returns Promise resolving to the imported email data
 */
export const handleImportExcel = (file: File): Promise<ImportResult> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, {
          header: 1,
        });

        let newSubjectLine = "";
        let newPreheader = "";
        const importedBlocks: BlockData[] = [];

        let i = 0;
        while (i < jsonData.length) {
          const row = jsonData[i];

          // Parse metadata rows
          if (row[0] === "Metadata") {
            if (row[1] === "Subject Line") newSubjectLine = row[2] || "";
            if (row[1] === "Preheader") newPreheader = row[2] || "";
            i++;
            continue;
          }

          // Parse block rows
          if (row[0]?.toString().startsWith("Block")) {
            if (row[1] === "Type") {
              const blockType = row[2]?.toString().toLowerCase() || "";
              const content = getDefaultContent(blockType as BlockData["type"]);

              i++;
              // Parse all fields for this block
              while (i < jsonData.length && jsonData[i][0] === row[0]) {
                const fieldRow = jsonData[i];
                const label = fieldRow[1]?.toString().trim();
                const value = fieldRow[2]?.toString().trim();

                if (label && value !== undefined) {
                  const key = labelToKey(label);
                  (content as any)[key] = formatValue(key, value);
                }
                i++;
              }

              importedBlocks.push({
                id: `block-${Date.now()}-${Math.random()}`,
                type: blockType as BlockData["type"],
                content,
              });
              continue;
            }
          }

          i++;
        }

        resolve({
          subjectLine: newSubjectLine,
          preheader: newPreheader,
          blocks: importedBlocks,
        });
      } catch (error) {
        console.error("Error importing Excel:", error);
        reject(
          new Error("Failed to import Excel file. Please check the format.")
        );
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read the file."));
    };

    reader.readAsArrayBuffer(file);
  });
};
