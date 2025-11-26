interface BlockLivePreviewProps {
  previewHTML: string;
}

export const BlockLivePreview = ({ previewHTML }: BlockLivePreviewProps) => {
  // Wrap the HTML content with scaling styles
  const scaledHTML = `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            width: 640px;
            transform: scale(0.69);
            transform-origin: top left;
          }
        </style>
      </head>
      <body>
        ${previewHTML}
      </body>
    </html>
  `;

  return (
    <div className="space-y-4 sticky top-0 h-fit">
      <h3 className="font-semibold text-foreground">Live Preview</h3>
      <div className="border rounded-lg bg-gray-50 overflow-hidden">
        <div className="bg-gray-100 px-3 py-1 text-xs text-gray-600 border-b flex items-center justify-between">
          <span>Desktop Preview</span>
          <span className="text-gray-500">640px width (scaled 75%)</span>
        </div>
        <div
          className="relative bg-gray-100 p-4 flex justify-center overflow-hidden"
          style={{ maxHeight: "680px" }}
        >
          <div
            className="bg-white shadow-lg rounded-sm"
            style={{
              width: "480px",
              maxWidth: "100%",
              border: "1px solid #e5e7eb",
              overflow: "hidden",
            }}
          >
            <iframe
              srcDoc={scaledHTML}
              className="w-full border-0"
              style={{
                minHeight: "300px",
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
