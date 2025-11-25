interface BlockLivePreviewProps {
  previewHTML: string;
}

export const BlockLivePreview = ({ previewHTML }: BlockLivePreviewProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Live Preview</h3>
      <div className="border rounded-lg bg-gray-50 overflow-hidden">
        <div className="bg-gray-100 px-3 py-1 text-xs text-gray-600 border-b flex items-center justify-between">
          <span>Desktop Preview</span>
          <span className="text-gray-500">640px width</span>
        </div>
        <div
          className="relative bg-gray-100 p-4 flex justify-center overflow-auto"
          style={{ maxHeight: "680px" }}
        >
          <div
            className="bg-white shadow-lg rounded-sm flex-shrink-0"
            style={{
              width: "640px",
              minWidth: "640px",
              border: "1px solid #e5e7eb",
              overflow: "hidden",
              transform: "scale(0.75)",
              transformOrigin: "top center",
            }}
          >
            <iframe
              srcDoc={previewHTML}
              className="w-full border-0"
              style={{
                height: "600px",
                maxHeight: "none",
                pointerEvents: "none",
                display: "block",
              }}
              title="Live Preview"
              sandbox="allow-same-origin"
              scrolling="no"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
