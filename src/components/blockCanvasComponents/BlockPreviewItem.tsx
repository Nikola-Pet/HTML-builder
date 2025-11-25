import { useMemo, useRef, useEffect, useState } from "react";
import { useEmailBuilder, BlockData } from "@/contexts/EmailBuilderContext";
import { generateBlockPreviewHTML } from "@/utils/htmlGenerator";
import { BlockEditorModal } from "@/components/email-builder/BlockEditorModal";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { BlockEditingMenu } from "@/components/menus/BlockEditingMenu";

interface BlockPreviewItemProps {
  block: BlockData;
  index: number;
  totalBlocks: number;
}

export const BlockPreviewItem = ({
  block,
  index,
  totalBlocks,
}: BlockPreviewItemProps) => {
  const { deleteBlock, duplicateBlock, moveBlock } = useEmailBuilder();
  const [isEditing, setIsEditing] = useState(false);
  const [blockHeight, setBlockHeight] = useState(300);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useBreadcrumbs([{ label: "Email Builder", href: "/builder" }]);

  const blockHTML = useMemo(() => {
    return generateBlockPreviewHTML(block);
  }, [block]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const adjustHeight = () => {
      try {
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow?.document;
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
        <BlockEditingMenu
          blockId={block.id}
          index={index}
          totalBlocks={totalBlocks}
          onEdit={() => setIsEditing(true)}
          onDuplicate={duplicateBlock}
          onMove={moveBlock}
          onDelete={deleteBlock}
        />

        {/* Block Preview */}
        <div
          className="bg-gray-50 p-4 flex justify-center"
          style={{ minHeight: `${blockHeight}px` }}
        >
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
