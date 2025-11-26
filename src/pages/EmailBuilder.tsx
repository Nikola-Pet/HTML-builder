import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEmailBuilder } from "@/contexts/EmailBuilderContext";
import { BlockLibraryModal } from "@/components/modals/BlockLibraryModal";
import { BlockCanvas } from "@/components/email-builder/BlockCanvas";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import EmailEditorMenu from "@/components/menus/EmailEditorMenu";
import { clearAllDrafts } from "@/utils/languageDraftStorage";

const EmailBuilder = () => {
  useBreadcrumbs([{ label: "Email Builder", href: "/builder" }]);
  const navigate = useNavigate();

  const {
    blocks,
    subjectLine,
    preheader,
    newsletterId,
    newsletterName,
    template,
    language,
    setSubjectLine,
    setPreheader,
    overrideBlocks,
    setNewsletterId,
  } = useEmailBuilder();

  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  // Clear content and drafts when component mounts (start fresh)
  useEffect(() => {
    console.log("EmailBuilder mounted - Starting with clean template");

    // Clear context state
    setSubjectLine("");
    setPreheader("");
    overrideBlocks([]);
    setNewsletterId(null);

    // Clear any existing drafts (start fresh)
    clearAllDrafts();
    console.log("Cleared all previous drafts - Fresh start!");
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
