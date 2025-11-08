import { useMemo, useRef, useEffect, useState } from "react";
import { useEmailBuilder } from "@/contexts/EmailBuilderContext";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Copy, Trash2, ChevronUp, ChevronDown, MoreVertical } from "lucide-react";
import { generateBlockPreviewHTML, generateHeaderPreviewHTML, generateFooterPreviewHTML } from "@/utils/htmlGenerator";
import { BlockData } from "@/contexts/EmailBuilderContext";
import { BlockEditorModal } from "./BlockEditorModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BlockCanvasProps {
  onAddBlock: () => void;
}

interface BlockPreviewItemProps {
  block: BlockData;
  index: number;
  totalBlocks: number;
}

const BlockPreviewItem = ({ block, index, totalBlocks }: BlockPreviewItemProps) => {
  const { deleteBlock, duplicateBlock, moveBlock } = useEmailBuilder();
  const [isEditing, setIsEditing] = useState(false);
  const [blockHeight, setBlockHeight] = useState(300);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const blockHTML = useMemo(() => {
    return generateBlockPreviewHTML(block);
  }, [block]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const adjustHeight = () => {
      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDocument) {
          const body = iframeDocument.body;
          const html = iframeDocument.documentElement;
          const height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
          );
          setBlockHeight(height);
          iframe.style.height = `${height}px`;
        }
      } catch (error) {
        setBlockHeight(300);
        iframe.style.height = "auto";
      }
    };

    iframe.onload = adjustHeight;
    const timeoutId = setTimeout(adjustHeight, 100);
    
    return () => clearTimeout(timeoutId);
  }, [blockHTML]);

  return (
    <>
      <div className="group relative bg-card rounded-lg border hover:border-primary/50 transition-all">
        {/* Actions Menu */}
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="h-8 w-8 bg-white shadow-md">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => duplicateBlock(block.id)}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => moveBlock(block.id, "up")}
                disabled={index === 0}
              >
                <ChevronUp className="h-4 w-4 mr-2" />
                Move Up
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => moveBlock(block.id, "down")}
                disabled={index === totalBlocks - 1}
              >
                <ChevronDown className="h-4 w-4 mr-2" />
                Move Down
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteBlock(block.id)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Block Preview */}
        <div className="bg-gray-50 p-4 flex justify-center" style={{ minHeight: `${blockHeight}px` }}>
          <div 
            className="bg-white shadow-lg rounded-sm flex-shrink-0"
            style={{
              width: "640px",
              minWidth: "640px",
              border: "1px solid #e5e7eb",
              overflow: "hidden",
            }}
          >
            <iframe
              ref={iframeRef}
              srcDoc={blockHTML}
              className="w-full border-0"
              style={{
                height: "auto",
                maxHeight: "none",
                minHeight: "auto",
                pointerEvents: "none",
                display: "block",
              }}
              title={`Block ${index + 1} Preview`}
              sandbox="allow-same-origin"
              scrolling="no"
            />
          </div>
        </div>

        {/* Block Type Badge */}
        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <span className="px-2 py-1 bg-white text-xs rounded text-foreground font-medium shadow-md">
            {block.type}
          </span>
        </div>
      </div>

      <BlockEditorModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        block={block}
      />
    </>
  );
};

interface TemplateSectionProps {
  html: string;
  title: string;
}

const TemplateSection = ({ html, title }: TemplateSectionProps) => {
  const [sectionHeight, setSectionHeight] = useState(300);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const adjustHeight = () => {
      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDocument) {
          const body = iframeDocument.body;
          const html = iframeDocument.documentElement;
          const height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
          );
          setSectionHeight(height);
          iframe.style.height = `${height}px`;
        }
      } catch (error) {
        setSectionHeight(300);
        iframe.style.height = "300px";
      }
    };

    iframe.onload = adjustHeight;
    const timeoutId = setTimeout(adjustHeight, 100);
    
    return () => clearTimeout(timeoutId);
  }, [html]);

  return (
    <div className="bg-gray-50 p-4 flex justify-center" style={{ minHeight: `${sectionHeight}px` }}>
      <div 
        className="bg-white shadow-lg rounded-sm flex-shrink-0"
        style={{
          width: "640px",
          minWidth: "640px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        <iframe
          ref={iframeRef}
          srcDoc={html}
          className="w-full border-0"
          style={{
            height: "auto",
            maxHeight: "none",
            minHeight: "auto",
            pointerEvents: "none",
            display: "block",
          }}
          title={title}
          sandbox="allow-same-origin"
          scrolling="no"
        />
      </div>
    </div>
  );
};

export const BlockCanvas = ({ onAddBlock }: BlockCanvasProps) => {
  const { blocks } = useEmailBuilder();

  const headerHTML = useMemo(() => {
    return generateHeaderPreviewHTML();
  }, []);

  const footerHTML = useMemo(() => {
    return generateFooterPreviewHTML();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      <div className="space-y-6">
        {/* Email Template Preview - Stacked */}
        <div className="bg-card rounded-lg shadow-lg border overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Email Template Preview</span>
            <span className="text-xs text-gray-500">Desktop View - 640px width</span>
          </div>
          <div className="bg-gray-100 p-4 space-y-0 overflow-visible">
            {/* Header */}
            <TemplateSection html={headerHTML} title="Header Preview" />
            
            {/* Blocks or Empty State */}
            {blocks.length === 0 ? (
              <div className="bg-gray-50 p-4 flex justify-center">
                <div className="bg-white shadow-lg rounded-sm flex-shrink-0" style={{ width: "640px", minWidth: "640px", border: "1px solid #e5e7eb" }}>
                  <div className="flex flex-col items-center justify-center py-20 px-8">
                    <div className="text-center space-y-4">
                      <div className="mx-auto w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                        <Plus className="h-10 w-10 text-secondary-foreground" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">No blocks yet</h3>
                      <p className="text-muted-foreground max-w-md">
                        Start building your email by adding content blocks. Click the button below to get started.
                      </p>
                      <Button onClick={onAddBlock} size="lg">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Block
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              blocks.map((block, index) => (
                <BlockPreviewItem
                  key={block.id}
                  block={block}
                  index={index}
                  totalBlocks={blocks.length}
                />
              ))
            )}
            
            {/* Footer */}
            <TemplateSection html={footerHTML} title="Footer Preview" />
          </div>
        </div>

        {/* Add Block Button */}
        {blocks.length > 0 && (
          <div className="text-center">
            <Button onClick={onAddBlock} variant="outline" size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Add Block
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
