import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEmailBuilder } from "@/contexts/EmailBuilderContext";
import { BlockLibraryModal } from "@/components/modals/BlockLibraryModal";
import { BlockCanvas } from "@/components/email-builder/BlockCanvas";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import {
  clearAllDrafts,
  getDraftByLanguage,
  getAllDrafts,
} from "@/utils/languageDraftStorage";

const EmailBuilder = () => {
  useBreadcrumbs([{ label: "Email Builder", href: "/builder" }]);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    blocks,
    language,
    setSubjectLine,
    setPreheader,
    overrideBlocks,
    setNewsletterId,
  } = useEmailBuilder();

  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  // Clear content and drafts only when coming from dashboard/home, not when returning from briefing
  useEffect(() => {
    const fromBriefing = location.state?.fromBriefing;

    // Only clear if NOT returning from briefing page
    if (!fromBriefing) {
      console.log("EmailBuilder mounted - Starting with clean template");

      // Clear context state
      setSubjectLine("");
      setPreheader("");
      overrideBlocks([]);
      setNewsletterId(null);

      // Clear any existing drafts (start fresh)
      clearAllDrafts();
      console.log("Cleared all previous drafts - Fresh start!");
    } else {
      console.log(
        "EmailBuilder mounted - Keeping existing content (returned from briefing)"
      );
      console.log("Current language:", language);
      console.log("Current blocks count:", blocks.length);

      // Log all available drafts for debugging
      const allDrafts = getAllDrafts();
      console.log(
        "Available drafts:",
        allDrafts.map((d) => `${d.language} (${d.blocks.length} blocks)`)
      );

      // Verify current language draft exists
      const currentDraft = getDraftByLanguage(language);
      if (currentDraft) {
        console.log(
          `✓ Draft for ${language} found with ${currentDraft.blocks.length} blocks`
        );
      } else {
        console.warn(`⚠ No draft found for current language ${language}`);
      }
    }
  }, []);

  return (
    <div className="h-screen flex flex-col">
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
