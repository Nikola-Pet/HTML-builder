import { useState, useEffect, useRef } from "react";
import { X, Plus, Languages, RefreshCw } from "lucide-react";
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
  getAllDrafts,
} from "@/utils/languageDraftStorage";
import {
  translateEmailContent,
  isDeepLConfigured,
} from "@/utils/deeplTranslation";
import { getTemplateHeaderFooterData } from "@/utils/templateLanguages";

const AVAILABLE_LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "DE", label: "German" },
  { code: "FR", label: "French" },
];

export const LanguageTabsMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<string>("EN");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["EN"]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

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

  // Initialize language tabs from existing drafts on mount
  useEffect(() => {
    if (!isInitialized) {
      const existingDrafts = getAllDrafts();

      if (existingDrafts.length > 0) {
        // Get all unique language codes from existing drafts
        const existingLanguages = [
          ...new Set(existingDrafts.map((draft) => draft.language)),
        ];

        console.log("🌍 Detected existing language drafts:", existingLanguages);

        // Update selected languages to include all existing ones
        setSelectedLanguages(existingLanguages);

        // Set active language to the context language or first available
        const initialLanguage = language || existingLanguages[0];
        setActiveLanguage(initialLanguage);
        previousLanguage.current = initialLanguage;

        // Load the active language draft
        const activeDraft = getDraftByLanguage(initialLanguage);
        if (activeDraft) {
          isSwitchingLanguage.current = true;
          setSubjectLine(activeDraft.subjectLine || "");
          setPreheader(activeDraft.preheader || "");
          overrideBlocks(deepCloneBlocks(activeDraft.blocks || []));
          setLanguage(initialLanguage);

          setTimeout(() => {
            isSwitchingLanguage.current = false;
          }, 150);

          console.log(`✓ Loaded ${initialLanguage} draft on initialization`);
        }

        toast.success(`Loaded ${existingLanguages.length} language version(s)`);
      }

      setIsInitialized(true);
    }
  }, [isInitialized]);

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

    // Get template-specific language data for header/footer
    // Always use masterTemplateBI
    const templateLangData = getTemplateHeaderFooterData(
      "masterTemplateBI",
      activeLanguage
    );

    const draftData = {
      language: activeLanguage,
      name: `${newsletterName || "Untitled"} [${activeLanguage}]`,
      subjectLine,
      preheader,
      header: {
        template: "masterTemplateBI", // Always use BI template
        language: activeLanguage,
        data: templateLangData, // Include language-specific links and text
      },
      blocks: deepCloneBlocks(blocks),
      footer: {
        template: "masterTemplateBI", // Always use BI template
        language: activeLanguage,
        data: templateLangData, // Include language-specific links and text
      },
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
    setIsInitialized(false); // Reset initialization flag
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

  // Add a new language tab - Create new draft from EN version with translation
  const handleAddLanguage = async (languageCode: string) => {
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
      // If no EN draft, use current content with template data
      const enTemplateLangData = getTemplateHeaderFooterData(
        "masterTemplateBI",
        "EN"
      );

      enContent = {
        language: "EN",
        name: `${newsletterName || "Untitled"} [EN]`,
        subjectLine,
        preheader,
        blocks,
        header: {
          template: "masterTemplateBI",
          language: "EN",
          data: enTemplateLangData,
        },
        footer: {
          template: "masterTemplateBI",
          language: "EN",
          data: enTemplateLangData,
        },
      };
    }

    // Check if DeepL is configured and translate if available
    const shouldTranslate = isDeepLConfigured() && languageCode !== "EN";

    console.log(
      `[Translation] DeepL configured: ${isDeepLConfigured()}, Should translate: ${shouldTranslate}`
    );

    if (!isDeepLConfigured() && languageCode !== "EN") {
      console.warn(
        `[Translation] ⚠️ DeepL API key not configured! Translation disabled.`,
        `\nTo enable automatic translation:`,
        `\n1. Create .env file in project root`,
        `\n2. Add: VITE_DEEPL_API_KEY=your_api_key_here`,
        `\n3. Restart dev server`,
        `\nGet free API key at: https://www.deepl.com/pro-api`
      );
    }

    let translatedContent = {
      blocks: deepCloneBlocks(enContent.blocks),
      subjectLine: enContent.subjectLine,
      preheader: enContent.preheader,
    };

    if (shouldTranslate) {
      try {
        setIsTranslating(true);
        console.log(
          `[Translation] Starting translation from EN to ${languageCode}`
        );
        console.log(`[Translation] Source content:`, {
          blocksCount: enContent.blocks.length,
          subjectLine: enContent.subjectLine,
          preheader: enContent.preheader,
        });

        toast.info(`Translating content to ${languageCode}...`, {
          icon: <Languages className="h-4 w-4" />,
        });

        // Translate the content
        translatedContent = await translateEmailContent(
          enContent.blocks,
          enContent.subjectLine,
          enContent.preheader,
          languageCode,
          "EN"
        );

        console.log(`[Translation] Translation completed successfully!`);
        console.log(`[Translation] Translated content:`, {
          blocksCount: translatedContent.blocks.length,
          subjectLine: translatedContent.subjectLine,
          preheader: translatedContent.preheader,
        });

        toast.success(`Content translated to ${languageCode}!`);
      } catch (error) {
        console.error("[Translation] Translation failed:", error);
        toast.error(
          "Translation failed. Using original content. Please check your DeepL API key."
        );
        // Fall back to original content (already set above)
      } finally {
        setIsTranslating(false);
      }
    }

    // Get language-specific template data for header/footer
    // Always use masterTemplateBI for consistent translations
    console.log(
      `📋 Retrieving template data for ${languageCode} from masterTemplateBI`
    );
    const templateLangData = getTemplateHeaderFooterData(
      "masterTemplateBI",
      languageCode
    );
    console.log(`📋 Template data retrieved:`, templateLangData);

    // Create new draft for this language in language_drafts array
    const newDraftData = {
      language: languageCode,
      name: `${newsletterName || "Untitled"} [${languageCode}]`,
      subjectLine: translatedContent.subjectLine,
      preheader: translatedContent.preheader,
      header: {
        template: "masterTemplateBI", // Always use BI template
        language: languageCode,
        data: templateLangData, // Language-specific links and text from templates.json
      },
      blocks: translatedContent.blocks,
      footer: {
        template: "masterTemplateBI", // Always use BI template
        language: languageCode,
        data: templateLangData, // Language-specific links and text from templates.json
      },
    };

    saveDraft(newDraftData);
    console.log(
      `[Draft] Created ${languageCode} draft from EN in language_drafts array${
        shouldTranslate ? " with translation" : ""
      }`
    );
    console.log(`[Draft] Draft data saved:`, {
      language: languageCode,
      blocksCount: newDraftData.blocks.length,
      subjectLine: newDraftData.subjectLine,
    });

    setSelectedLanguages((prev) => [...prev, languageCode]);
    setActiveLanguage(languageCode);

    if (!shouldTranslate) {
      if (!isDeepLConfigured()) {
        toast.warning(
          `${languageCode} language added (no translation - DeepL API key not configured)`,
          {
            description:
              "Add VITE_DEEPL_API_KEY to .env file to enable automatic translation",
            duration: 5000,
          }
        );
      } else {
        toast.success(`${languageCode} language added`);
      }
    }
  };

  // Translate current content from EN to active language
  const handleTranslateCurrentContent = async () => {
    if (activeLanguage === "EN") {
      toast.error("Already viewing English version");
      return;
    }

    if (!isDeepLConfigured()) {
      toast.error("DeepL API key not configured", {
        description:
          "Add VITE_DEEPL_API_KEY to .env file to enable translation",
      });
      return;
    }

    // First, save the current state before translating
    saveCurrentLanguageDraft();

    // Get current language draft (which now includes any new blocks)
    const currentDraft = getDraftByLanguage(activeLanguage);

    // Get EN draft as source
    const enDraft = getDraftByLanguage("EN");
    if (!enDraft) {
      toast.error("English version not found. Please save EN content first.");
      return;
    }

    try {
      setIsTranslating(true);
      toast.info(`Translating from EN to ${activeLanguage}...`, {
        icon: <Languages className="h-4 w-4" />,
      });

      // Translate the EN content
      const translatedContent = await translateEmailContent(
        enDraft.blocks,
        enDraft.subjectLine,
        enDraft.preheader,
        activeLanguage,
        "EN"
      );

      // If there are blocks in current draft that don't exist in EN, translate them too
      const currentBlocks = currentDraft?.blocks || blocks;
      const translatedBlocks = translatedContent.blocks;

      // Merge: use translated blocks, but append any extra blocks from current version
      const mergedBlocks = [...translatedBlocks];

      // If current has more blocks than EN, translate and keep the extra ones
      if (currentBlocks.length > translatedBlocks.length) {
        const extraBlocks = currentBlocks.slice(translatedBlocks.length);

        // Translate the extra blocks
        console.log(
          `[Translation] Found ${extraBlocks.length} extra blocks to translate`
        );
        const extraTranslated = await translateEmailContent(
          extraBlocks,
          "", // No subject needed for extra blocks
          "", // No preheader needed
          activeLanguage,
          "EN" // Assuming extra blocks are in EN or need translation from EN
        );

        mergedBlocks.push(...extraTranslated.blocks);
      }

      // Update the current view with translated content
      setSubjectLine(translatedContent.subjectLine);
      setPreheader(translatedContent.preheader);
      overrideBlocks(mergedBlocks);

      // Save the translated content to draft
      const templateLangData = getTemplateHeaderFooterData(
        "masterTemplateBI",
        activeLanguage
      );

      const updatedDraft = {
        language: activeLanguage,
        name: `${newsletterName || "Untitled"} [${activeLanguage}]`,
        subjectLine: translatedContent.subjectLine,
        preheader: translatedContent.preheader,
        header: {
          template: "masterTemplateBI",
          language: activeLanguage,
          data: templateLangData,
        },
        blocks: mergedBlocks,
        footer: {
          template: "masterTemplateBI",
          language: activeLanguage,
          data: templateLangData,
        },
      };

      saveDraft(updatedDraft);

      toast.success(`Content translated to ${activeLanguage}!`);
    } catch (error) {
      console.error("[Translation] Failed:", error);
      toast.error("Translation failed. Please check your DeepL API key.");
    } finally {
      setIsTranslating(false);
    }
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
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          {/* Language Tabs - Only show languages that have drafts (or EN as default) */}
          {selectedLanguages
            .filter((langCode) => {
              // Always show EN (default language)
              if (langCode === "EN") return true;
              // For other languages, only show if they have a draft
              const draft = getDraftByLanguage(langCode);
              return draft !== null;
            })
            .map((langCode) => {
              const language = AVAILABLE_LANGUAGES.find(
                (l) => l.code === langCode
              );
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

        {/* Translate Button - Only show for non-EN languages */}
        {activeLanguage !== "EN" && (
          <Button
            variant="secondary"
            small
            className="gap-2"
            onClick={handleTranslateCurrentContent}
            disabled={isTranslating}
          >
            <RefreshCw
              className={`h-4 w-4 ${isTranslating ? "animate-spin" : ""}`}
            />
            {isTranslating ? "Translating..." : "Translate from EN"}
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
                variant="secondary"
                onClick={() => handleAddLanguage(language.code)}
              >
                {language.label} ({language.code})
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
