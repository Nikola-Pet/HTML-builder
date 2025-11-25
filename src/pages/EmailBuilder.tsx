import { useState } from "react";
import { useEmailBuilder } from "@/contexts/EmailBuilderContext";
import { BlockLibraryModal } from "@/components/email-builder/BlockLibraryModal";
import { BlockCanvas } from "@/components/email-builder/BlockCanvas";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import EmailBuilderMenu from "@/components/menus/EmailBuilderMenu";

const EmailBuilder = () => {
  useBreadcrumbs([{ label: "Email Builder", href: "/builder" }]);

  const {
    blocks,
    overrideBlocks,
    subjectLine,
    preheader,
    setSubjectLine,
    setPreheader,
  } = useEmailBuilder();
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/*<EmailBuilderMenu
        blocks={blocks}
        subjectLine={subjectLine}
        preheader={preheader}
        setSubjectLine={setSubjectLine}
        setPreheader={setPreheader}
        overrideBlocks={overrideBlocks}
        onAddBlock={() => setIsLibraryOpen(true)}
      />*/}
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
