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
  getSavedDraftById,
  saveDraft,
} from "@/utils/languageDraftStorage";
import { getNewsletterById } from "@/utils/newsletterStorage";

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
    setDraftId,
    setNewsletterName,
    setTemplate,
    setLanguage,
  } = useEmailBuilder();

  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  // Clear content and drafts only when coming from dashboard/home, not when returning from briefing
  useEffect(() => {
    const fromBriefing = location.state?.fromBriefing;
    const newsletterId = location.state?.newsletterId;
    const draftId = location.state?.draftId;

    // If loading a saved draft, populate the editor with its data
    if (draftId) {
      console.log("Loading saved draft with ID:", draftId);

      const loadSavedDraft = async () => {
        const savedDraft = await getSavedDraftById(draftId);

        if (savedDraft) {
          console.log("Saved draft found:", savedDraft);

          // Clear any existing drafts first
          clearAllDrafts();

          // Set draft metadata FIRST (before saving drafts)
          setDraftId(savedDraft.id); // Track as draft, not newsletter
          setNewsletterName(savedDraft.name);
          setTemplate(savedDraft.template);

          // Load all language versions as drafts
          savedDraft.languages.forEach((langVersion) => {
            const draftData = {
              language: langVersion.language,
              name: `${savedDraft.name} [${langVersion.language}]`,
              subjectLine: langVersion.subjectLine,
              preheader: langVersion.preheader,
              blocks: langVersion.blocks,
              header: {
                template: savedDraft.template,
                language: langVersion.language,
              },
              footer: {
                template: savedDraft.template,
                language: langVersion.language,
              },
            };
            saveDraft(draftData);
          });

          console.log(
            `✅ Saved ${savedDraft.languages.length} language drafts`
          );

          // Load the first language version (or EN if available) into the editor
          const enVersion = savedDraft.languages.find(
            (l) => l.language === "EN"
          );
          const firstVersion = enVersion || savedDraft.languages[0];

          if (firstVersion) {
            setLanguage(firstVersion.language);
            setSubjectLine(firstVersion.subjectLine);
            setPreheader(firstVersion.preheader);
            overrideBlocks(firstVersion.blocks);
          }

          console.log(
            `Saved draft loaded successfully with ${savedDraft.languages.length} language(s)`
          );
        } else {
          console.error("Saved draft not found with ID:", draftId);
        }
      };

      loadSavedDraft();

      return;
    }

    // If loading a newsletter, populate the editor with its data
    if (newsletterId) {
      console.log("Loading newsletter with ID:", newsletterId);

      const loadNewsletter = async () => {
        const newsletter = await getNewsletterById(newsletterId);

        if (newsletter) {
          console.log("Newsletter found:", newsletter);

          // Check if it's a multi-language newsletter or old-style single language
          if (
            (newsletter as any).languages &&
            Array.isArray((newsletter as any).languages)
          ) {
            // Multi-language newsletter
            const multiLangNewsletter = newsletter as any;

            // Clear any existing drafts first
            clearAllDrafts();

            // Set newsletter metadata FIRST (before saving drafts)
            setNewsletterId(multiLangNewsletter.id);
            setDraftId(null); // Clear draft ID when loading newsletter
            setNewsletterName(multiLangNewsletter.name);
            setTemplate(multiLangNewsletter.template);

            // Load all language versions as drafts
            multiLangNewsletter.languages.forEach((langVersion: any) => {
              const draftData = {
                language: langVersion.language,
                name: `${multiLangNewsletter.name} [${langVersion.language}]`,
                subjectLine: langVersion.subjectLine,
                preheader: langVersion.preheader,
                blocks: langVersion.blocks,
                header: {
                  template: multiLangNewsletter.template,
                  language: langVersion.language,
                },
                footer: {
                  template: multiLangNewsletter.template,
                  language: langVersion.language,
                },
              };
              saveDraft(draftData);
            });

            console.log(
              `✅ Saved ${multiLangNewsletter.languages.length} language drafts`
            );

            // Load the first language version (or EN if available) into the editor
            const enVersion = multiLangNewsletter.languages.find(
              (l: any) => l.language === "EN"
            );
            const firstVersion = enVersion || multiLangNewsletter.languages[0];

            if (firstVersion) {
              setLanguage(firstVersion.language);
              setSubjectLine(firstVersion.subjectLine);
              setPreheader(firstVersion.preheader);
              overrideBlocks(firstVersion.blocks);
            }

            console.log(
              `Multi-language newsletter loaded successfully with ${multiLangNewsletter.languages.length} language(s)`
            );
          } else {
            // Old-style single language newsletter
            setNewsletterId(newsletter.id);
            setDraftId(null); // Clear draft ID when loading newsletter
            setNewsletterName(newsletter.name);
            setTemplate(newsletter.header.template);
            setLanguage(newsletter.header.language);

            // Load newsletter content
            setSubjectLine(newsletter.subjectLine);
            setPreheader(newsletter.preheader);
            overrideBlocks(newsletter.blocks);

            console.log("Newsletter loaded successfully");
          }
        } else {
          console.error("Newsletter not found with ID:", newsletterId);
        }
      };

      loadNewsletter();
      return;
    }

    // Only clear if NOT returning from briefing page
    if (!fromBriefing) {
      console.log("EmailBuilder mounted - Starting with clean template");

      // Clear context state
      setSubjectLine("");
      setPreheader("");
      overrideBlocks([]);
      setNewsletterId(null);
      setDraftId(null); // Clear draft ID for fresh start
      setLanguage("EN"); // Reset to English for new template

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
