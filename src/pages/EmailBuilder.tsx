import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmailBuilder } from "@/contexts/EmailBuilderContext";
import { BlockLibraryModal } from "@/components/modals/BlockLibraryModal";
import { BlockCanvas } from "@/components/email-builder/BlockCanvas";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import EmailEditorMenu from "@/components/menus/EmailEditorMenu";

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

  // Debug: Check if setNewsletterId is available
  console.log(
    "EmailBuilder - setNewsletterId:",
    typeof setNewsletterId,
    setNewsletterId
  );

  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

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
