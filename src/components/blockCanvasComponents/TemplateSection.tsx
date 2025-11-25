import { useRef, useEffect, useState } from "react";

interface TemplateSectionProps {
  html: string;
  title: string;
}

export const TemplateSection = ({ html, title }: TemplateSectionProps) => {
  const [sectionHeight, setSectionHeight] = useState(300);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
    <div
      className="bg-gray-50 p-4 flex justify-center"
      style={{ minHeight: `${sectionHeight}px` }}
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
