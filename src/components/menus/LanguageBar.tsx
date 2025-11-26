import { useState, useEffect, useRef } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEmailBuilder } from "@/contexts/EmailBuilderContext";
import { BlockData } from "@/contexts/EmailBuilderContext";
import { toast } from "sonner";
import {
  saveDraft,
  getDraftByLanguage,
  deleteDraft,
  clearAllDrafts,
  publishAllDraftsAsOne,
  saveCurrentWorkAsDraft,
} from "@/utils/languageDraftStorage";

const AVAILABLE_LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "DE", label: "German" },
  { code: "FR", label: "French" },
];

export const LanguageTabsMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<string>("EN");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["EN"]);

  // Track session draft ID to update same draft
  const sessionDraftId = useRef<string | null>(null);

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
    setLanguage,
  } = useEmailBuilder();

  const isSwitchingLanguage = useRef(false);
  const previousLanguage = useRef<string>("EN");

  // Helper function for deep cloning to ensure complete independence
  const deepCloneBlocks = (blocks: BlockData[]): BlockData[] => {
    return blocks.map((block) => ({
      ...block,
      content: JSON.parse(JSON.stringify(block.content)),
    }));
  };

  // Save current language content as a draft in language_drafts array
  const saveCurrentLanguageDraft = () => {
    if (isSwitchingLanguage.current) return;

    const draftData = {
      language: activeLanguage,
      name: `${newsletterName || "Untitled"} [${activeLanguage}]`,
      subjectLine,
      preheader,
      header: { template, language: activeLanguage },
      blocks: deepCloneBlocks(blocks),
      footer: { template, language: activeLanguage },
    };

    try {
      saveDraft(draftData);
      console.log(`Saved draft for ${activeLanguage} to language_drafts array`);
    } catch (error) {
      console.error(`Error saving ${activeLanguage} draft:`, error);
    }
  };

  // Auto-save current language draft when content changes
  useEffect(() => {
    saveCurrentLanguageDraft();
  }, [blocks, subjectLine, preheader]);

  // Save all drafts before page unload AND save to saved_drafts
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Save current language to language_drafts
      saveCurrentLanguageDraft();

      // Save all work to saved_drafts array (update same draft if exists)
      const savedDraft = saveCurrentWorkAsDraft(
        newsletterName || "Untitled",
        template,
        sessionDraftId.current
      );

      if (savedDraft && !sessionDraftId.current) {
        sessionDraftId.current = savedDraft.id;
      }

      console.log("Saved all language drafts before page unload");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);

      // Auto-save on component unmount (when navigating away)
      saveCurrentLanguageDraft();

      // Save to saved_drafts array (update same draft if exists)
      const savedDraft = saveCurrentWorkAsDraft(
        newsletterName || "Untitled",
        template,
        sessionDraftId.current
      );

      if (savedDraft && !sessionDraftId.current) {
        sessionDraftId.current = savedDraft.id;
      }

      console.log("Saved work to saved_drafts on unmount");
    };
  }, [
    blocks,
    subjectLine,
    preheader,
    activeLanguage,
    newsletterName,
    template,
  ]);

  // Load content when switching languages
  useEffect(() => {
    if (previousLanguage.current !== activeLanguage) {
      const draft = getDraftByLanguage(activeLanguage);

      if (draft) {
        // Load existing draft from language_drafts array
        isSwitchingLanguage.current = true;
        console.log(
          `Loading ${activeLanguage} draft from language_drafts array`
        );

        setSubjectLine(draft.subjectLine || "");
        setPreheader(draft.preheader || "");
        overrideBlocks(deepCloneBlocks(draft.blocks || []));
        setLanguage(activeLanguage);

        previousLanguage.current = activeLanguage;

        setTimeout(() => {
          isSwitchingLanguage.current = false;
        }, 150);
      } else {
        // New language with no draft yet - keep current content
        console.log(`${activeLanguage} has no draft yet`);
        setLanguage(activeLanguage);
        previousLanguage.current = activeLanguage;
      }
    }
  }, [
    activeLanguage,
    setSubjectLine,
    setPreheader,
    overrideBlocks,
    setLanguage,
  ]);

  // Get available languages that haven't been added yet
  const getAvailableLanguagesToAdd = () => {
    return AVAILABLE_LANGUAGES.filter(
      (lang) => !selectedLanguages.includes(lang.code)
    );
  };

  // Clear all language drafts
  const clearAllLanguageDraftsHandler = () => {
    clearAllDrafts();
    setSelectedLanguages(["EN"]);
    setActiveLanguage("EN");
    console.log("Cleared all language drafts");
  };

  // Expose clear function and publish function to window
  useEffect(() => {
    (window as any).clearLanguageDrafts = clearAllLanguageDraftsHandler;
    (window as any).publishAllLanguageDraftsAsOne = (
      name: string,
      tmpl: string
    ) => {
      // Save current language before publishing
      saveCurrentLanguageDraft();

      // Publish all as one newsletter
      const newsletter = publishAllDraftsAsOne(name, tmpl);

      if (newsletter) {
        // Clear session draft ID after successful publish
        sessionDraftId.current = null;

        toast.success(
          `Published ${newsletter.languages.length} language(s) as one newsletter!`
        );
        return newsletter;
      } else {
        toast.error("Failed to publish newsletter");
        return null;
      }
    };

    return () => {
      delete (window as any).clearLanguageDrafts;
      delete (window as any).publishAllLanguageDraftsAsOne;
    };
  }, [
    blocks,
    subjectLine,
    preheader,
    activeLanguage,
    newsletterName,
    template,
  ]);

  // Add a new language tab - Create new draft from EN version
  const handleAddLanguage = (languageCode: string) => {
    setIsModalOpen(false);

    // Check if this language already has a draft in language_drafts array
    const existingDraft = getDraftByLanguage(languageCode);

    if (existingDraft) {
      // Language draft already exists, just switch to it
      console.log(
        `Language ${languageCode} draft already exists in language_drafts array`
      );
      setSelectedLanguages((prev) =>
        prev.includes(languageCode) ? prev : [...prev, languageCode]
      );
      setActiveLanguage(languageCode);
      toast.success(`Switched to ${languageCode} language`);
      return;
    }

    // Get EN draft to copy from
    const enDraft = getDraftByLanguage("EN");
    let enContent;

    if (enDraft) {
      enContent = enDraft;
    } else {
      // If no EN draft, use current content
      enContent = {
        language: "EN",
        name: `${newsletterName || "Untitled"} [EN]`,
        subjectLine,
        preheader,
        blocks,
        header: { template, language: "EN" },
        footer: { template, language: "EN" },
      };
    }

    // Create new draft for this language in language_drafts array
    const newDraftData = {
      language: languageCode,
      name: `${newsletterName || "Untitled"} [${languageCode}]`,
      subjectLine: enContent.subjectLine,
      preheader: enContent.preheader,
      header: { template, language: languageCode },
      blocks: deepCloneBlocks(enContent.blocks),
      footer: { template, language: languageCode },
    };

    saveDraft(newDraftData);
    console.log(
      `Created ${languageCode} draft from EN in language_drafts array`
    );

    setSelectedLanguages((prev) => [...prev, languageCode]);
    setActiveLanguage(languageCode);

    toast.success(`${languageCode} language added`);
  };

  // Remove a language tab and DELETE its draft
  const handleRemoveLanguage = (languageCode: string, e: React.MouseEvent) => {
    e.stopPropagation();

    // Don't allow removing EN
    if (languageCode === "EN") {
      toast.error("Cannot remove default language (EN)");
      return;
    }

    // Delete the draft from language_drafts array
    deleteDraft(languageCode);
    console.log(`Deleted ${languageCode} draft from language_drafts array`);

    // Remove from selected languages
    setSelectedLanguages((prev) =>
      prev.filter((lang) => lang !== languageCode)
    );

    // If removing active language, switch to EN
    if (activeLanguage === languageCode) {
      setActiveLanguage("EN");
    }

    toast.success(`${languageCode} draft deleted`);
  };

  const availableLanguagesToAdd = getAvailableLanguagesToAdd();

  return (
    <>
      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
        {/* Language Tabs */}
        {selectedLanguages.map((langCode) => {
          const language = AVAILABLE_LANGUAGES.find((l) => l.code === langCode);
          if (!language) return null;

          return (
            <div
              key={langCode}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-colors
                ${
                  activeLanguage === langCode
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }
              `}
              onClick={() => setActiveLanguage(langCode)}
            >
              <span className="text-sm font-medium">{langCode}</span>
              {langCode !== "EN" && (
                <button
                  className="hover:bg-gray-200 rounded p-0.5 transition-colors"
                  onClick={(e) => handleRemoveLanguage(langCode, e)}
                  aria-label={`Close ${language.label} tab`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          );
        })}

        {/* Add Tab Button */}
        {availableLanguagesToAdd.length > 0 && (
          <Button
            variant="neutraltertiary"
            small
            className="h-8 w-8 p-0 hover:bg-gray-200"
            onClick={() => setIsModalOpen(true)}
            aria-label="Add new language tab"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Language Selection Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Language</DialogTitle>
            <DialogDescription>
              Select a language for your newsletter.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2 mt-4">
            {availableLanguagesToAdd.map((language) => (
              <Button
                key={language.code}
                variant="neutralsecondary"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => handleAddLanguage(language.code)}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg w-8">{language.code}</span>
                  <span className="text-sm text-gray-600">
                    {language.label}
                  </span>
                </div>
              </Button>
            ))}

            {availableLanguagesToAdd.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                All available languages have been added.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
