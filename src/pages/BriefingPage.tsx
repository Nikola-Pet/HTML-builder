import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy } from "lucide-react";
import { toast } from "sonner";
import { generateHTML } from "@/utils/htmlGenerator";
import { BlockData } from "@/contexts/EmailBuilderContext";
import { getTemplateHeaderFooterData } from "@/utils/templateLanguages";
import { CopyOptionsModal } from "@/components/modals/CopyOptionsModal";

interface BriefingPageState {
  blocks: BlockData[];
  subjectLine: string;
  preheader: string;
  language: string;
  template: string;
}

interface CopyModalData {
  type: "button" | "image";
  text?: string;
  link?: string;
  imageSrc?: string;
}

export const BriefingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<CopyModalData | null>(null);

  useEffect(() => {
    const state = location.state as BriefingPageState;

    if (!state || !state.blocks) {
      toast.error("No content to display. Redirecting back...");
      navigate(-1);
      return;
    }

    // Generate HTML with language-specific data
    const languageData = getTemplateHeaderFooterData(
      "masterTemplateBI",
      state.language
    );
    let html = generateHTML(
      state.blocks,
      state.subjectLine,
      state.preheader,
      languageData
    );

    // Extract only the body content (remove html, head, doctype tags)
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) {
      html = bodyMatch[1];
    }

    setHtmlContent(html);
  }, [location.state, navigate]);

  useEffect(() => {
    if (!contentRef.current || !htmlContent) return;

    const clickHandlers = new Map<Element, (e: Event) => void>();

    // Add click handlers for images
    const images = contentRef.current.querySelectorAll("img");
    images.forEach((img) => {
      img.style.cursor = "pointer";
      img.style.transition = "all 0.2s ease";
      img.style.border = "2px solid transparent";

      const handleMouseEnter = () => {
        img.style.border = "2px solid rgba(0, 123, 255, 0.5)";
        img.style.opacity = "0.9";
      };

      const handleMouseLeave = () => {
        img.style.border = "2px solid transparent";
        img.style.opacity = "";
      };

      const handleClick = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();

        const imgSrc = img.getAttribute("src") || "";
        const imgAlt = img.getAttribute("alt") || "";

        setModalData({
          type: "image",
          imageSrc: imgSrc,
          text: imgAlt,
        });
        setModalOpen(true);
      };

      img.addEventListener("mouseenter", handleMouseEnter);
      img.addEventListener("mouseleave", handleMouseLeave);
      img.addEventListener("click", handleClick);

      clickHandlers.set(img, handleClick);
    });

    // Add click handlers for buttons/CTAs (links with button styling or specific classes)
    const buttons = contentRef.current.querySelectorAll(
      'a[style*="background"], a[class*="button"], a[class*="cta"], a[class*="btn"]'
    );

    buttons.forEach((button) => {
      const htmlElement = button as HTMLElement;
      htmlElement.style.cursor = "pointer";
      htmlElement.style.transition = "all 0.2s ease";

      const handleMouseEnter = () => {
        htmlElement.style.outline = "2px solid rgba(0, 123, 255, 0.5)";
        htmlElement.style.opacity = "0.9";
      };

      const handleMouseLeave = () => {
        htmlElement.style.outline = "";
        htmlElement.style.opacity = "";
      };

      const handleClick = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();

        const link = htmlElement.getAttribute("href") || "";
        const text = htmlElement.innerText?.trim() || "";

        setModalData({
          type: "button",
          text: text,
          link: link,
        });
        setModalOpen(true);
      };

      htmlElement.addEventListener("mouseenter", handleMouseEnter);
      htmlElement.addEventListener("mouseleave", handleMouseLeave);
      htmlElement.addEventListener("click", handleClick);

      clickHandlers.set(button, handleClick);
    });

    // Add click-to-copy functionality to regular text elements
    const textElements = contentRef.current.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, span, td, div, li, strong, b, em, i"
    );

    textElements.forEach((element) => {
      const htmlElement = element as HTMLElement;

      // Skip if element has no text content or only whitespace
      const text = htmlElement.innerText?.trim();
      if (!text || text.length === 0) return;

      // Skip if this element is a button or contains a button
      if (
        htmlElement.closest(
          'a[style*="background"], a[class*="button"], a[class*="cta"], a[class*="btn"]'
        )
      ) {
        return;
      }

      // Add hover effect styling
      htmlElement.style.cursor = "pointer";
      htmlElement.style.transition = "all 0.2s ease";

      const handleMouseEnter = () => {
        htmlElement.style.backgroundColor = "rgba(0, 123, 255, 0.1)";
        htmlElement.style.opacity = "0.9";
      };

      const handleMouseLeave = () => {
        htmlElement.style.backgroundColor = "";
        htmlElement.style.opacity = "";
      };

      const handleClick = async (e: Event) => {
        e.preventDefault();
        e.stopPropagation();

        const textToCopy = htmlElement.innerText?.trim();

        if (textToCopy) {
          try {
            await navigator.clipboard.writeText(textToCopy);

            // Visual feedback
            htmlElement.style.backgroundColor = "rgba(34, 197, 94, 0.3)";

            // Show toast
            toast.success(
              `Copied: ${textToCopy.substring(0, 50)}${
                textToCopy.length > 50 ? "..." : ""
              }`
            );

            // Reset background after animation
            setTimeout(() => {
              htmlElement.style.backgroundColor = "";
            }, 500);
          } catch (err) {
            toast.error("Failed to copy text");
            console.error("Copy failed:", err);
          }
        }
      };

      htmlElement.addEventListener("mouseenter", handleMouseEnter);
      htmlElement.addEventListener("mouseleave", handleMouseLeave);
      htmlElement.addEventListener("click", handleClick);

      clickHandlers.set(element, handleClick);
    });

    // Cleanup function
    return () => {
      textElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        const handler = clickHandlers.get(element);

        htmlElement.removeEventListener("mouseenter", () => {});
        htmlElement.removeEventListener("mouseleave", () => {});
        if (handler) {
          htmlElement.removeEventListener("click", handler);
        }
      });
    };
  }, [htmlContent]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Copy Options Modal */}
      {modalData && (
        <CopyOptionsModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          type={modalData.type}
          text={modalData.text}
          link={modalData.link}
          imageSrc={modalData.imageSrc}
        />
      )}

      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                onClick={handleBack}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Editor
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Email Briefing Preview
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Click on any text element to copy it to clipboard
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Copy className="h-4 w-4" />
              <span>Click to Copy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">
                Interactive Email Preview
              </span>
              <span className="text-xs text-muted-foreground">
                Hover over text to highlight • Click to copy
              </span>
            </div>
          </div>

          <div className="bg-gray-100 p-8 flex justify-center">
            <div className="w-full max-w-[640px] bg-white shadow-lg">
              {htmlContent ? (
                <div
                  ref={contentRef}
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              ) : (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <Copy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading preview...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
