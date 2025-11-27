import { BlockData } from "@/contexts/EmailBuilderContext";

// Storage keys
const DRAFTS_KEY = "language_drafts"; // Temporary drafts while working (cleared on new session)
const SAVED_DRAFTS_KEY = "saved_drafts"; // Saved drafts when navigating away (persistent)
const NEWSLETTERS_KEY = "newsletters"; // Final published newsletters

// Single language version within a newsletter
export interface LanguageVersion {
  language: string;
  subjectLine: string;
  preheader: string;
  blocks: BlockData[];
}

// Newsletter with multiple language versions
export interface MultiLanguageNewsletter {
  id: string;
  name: string; // Base name without language suffix
  template: string;
  languages: LanguageVersion[]; // Array of language versions
  createdAt: string;
  updatedAt: string;
}

// Single language draft (for auto-save)
export interface LanguageDraft {
  id: string;
  language: string;
  name: string;
  subjectLine: string;
  preheader: string;
  blocks: BlockData[];
  header: {
    template: string;
    language: string;
  };
  footer: {
    template: string;
    language: string;
  };
  createdAt: string;
  updatedAt: string;
}

// ==================== DRAFT OPERATIONS ====================

/**
 * Get all language drafts (unsaved)
 */
export const getAllDrafts = (): LanguageDraft[] => {
  try {
    const draftsJson = localStorage.getItem(DRAFTS_KEY);
    return draftsJson ? JSON.parse(draftsJson) : [];
  } catch (error) {
    console.error("Error loading drafts:", error);
    return [];
  }
};

/**
 * Get draft by language code
 */
export const getDraftByLanguage = (language: string): LanguageDraft | null => {
  const drafts = getAllDrafts();
  return drafts.find((draft) => draft.language === language) || null;
};

/**
 * Save or update a language draft (unsaved)
 */
export const saveDraft = (
  draftData: Omit<LanguageDraft, "id" | "createdAt" | "updatedAt">
): LanguageDraft => {
  const drafts = getAllDrafts();
  const existingIndex = drafts.findIndex(
    (d) => d.language === draftData.language
  );

  const now = new Date().toISOString();

  if (existingIndex >= 0) {
    // Update existing draft
    drafts[existingIndex] = {
      ...drafts[existingIndex],
      ...draftData,
      updatedAt: now,
    };
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    console.log(`Updated draft for ${draftData.language}`);
    return drafts[existingIndex];
  } else {
    // Create new draft
    const newDraft: LanguageDraft = {
      ...draftData,
      id: `draft-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: now,
      updatedAt: now,
    };
    drafts.push(newDraft);
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    console.log(`Created new draft for ${draftData.language}`);
    return newDraft;
  }
};

/**
 * Delete a draft by language code
 */
export const deleteDraft = (language: string): boolean => {
  try {
    const drafts = getAllDrafts();
    const filtered = drafts.filter((d) => d.language !== language);
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(filtered));
    console.log(`Deleted draft for ${language}`);
    return true;
  } catch (error) {
    console.error(`Error deleting draft for ${language}:`, error);
    return false;
  }
};

/**
 * Clear all drafts
 */
export const clearAllDrafts = (): void => {
  localStorage.removeItem(DRAFTS_KEY);
  console.log("Cleared all drafts");
};

// ==================== NEWSLETTER OPERATIONS ====================

/**
 * Get all newsletters
 */
export const getAllNewsletters = (): MultiLanguageNewsletter[] => {
  try {
    const newslettersJson = localStorage.getItem(NEWSLETTERS_KEY);
    return newslettersJson ? JSON.parse(newslettersJson) : [];
  } catch (error) {
    console.error("Error loading newsletters:", error);
    return [];
  }
};

/**
 * Publish all drafts as ONE multi-language newsletter
 */
export const publishAllDraftsAsOne = (
  newsletterName: string,
  template: string
): MultiLanguageNewsletter | null => {
  try {
    const drafts = getAllDrafts();

    if (drafts.length === 0) {
      console.error("No drafts to publish");
      return null;
    }

    // Convert drafts to language versions
    const languageVersions: LanguageVersion[] = drafts.map((draft) => ({
      language: draft.language,
      subjectLine: draft.subjectLine,
      preheader: draft.preheader,
      blocks: draft.blocks,
    }));

    // Create multi-language newsletter
    const newsletter: MultiLanguageNewsletter = {
      id: `newsletter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: newsletterName || "Untitled Newsletter",
      template: template,
      languages: languageVersions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Get existing newsletters and add new one
    const newsletters = getAllNewsletters();
    newsletters.push(newsletter);
    localStorage.setItem(NEWSLETTERS_KEY, JSON.stringify(newsletters));

    // Clear all drafts after publishing
    clearAllDrafts();

    console.log(
      `Published ${languageVersions.length} language(s) as one newsletter:`,
      newsletter.id
    );
    console.log("Newsletter structure:", newsletter);

    return newsletter;
  } catch (error) {
    console.error("Error publishing drafts as newsletter:", error);
    return null;
  }
};

/**
 * Get newsletter by ID
 */
export const getNewsletterById = (
  id: string
): MultiLanguageNewsletter | null => {
  const newsletters = getAllNewsletters();
  return newsletters.find((n) => n.id === id) || null;
};

/**
 * Update existing newsletter
 */
export const updateNewsletter = (
  id: string,
  updates: Partial<Omit<MultiLanguageNewsletter, "id" | "createdAt">>
): MultiLanguageNewsletter | null => {
  try {
    const newsletters = getAllNewsletters();
    const index = newsletters.findIndex((n) => n.id === id);

    if (index === -1) {
      console.error(`Newsletter ${id} not found`);
      return null;
    }

    newsletters[index] = {
      ...newsletters[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(NEWSLETTERS_KEY, JSON.stringify(newsletters));
    console.log(`Updated newsletter:`, id);
    return newsletters[index];
  } catch (error) {
    console.error(`Error updating newsletter:`, error);
    return null;
  }
};

/**
 * Delete newsletter
 */
export const deleteNewsletter = (id: string): boolean => {
  try {
    const newsletters = getAllNewsletters();
    const filtered = newsletters.filter((n) => n.id !== id);
    localStorage.setItem(NEWSLETTERS_KEY, JSON.stringify(filtered));
    console.log(`Deleted newsletter:`, id);
    return true;
  } catch (error) {
    console.error(`Error deleting newsletter:`, error);
    return false;
  }
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Get count of drafts
 */
export const getDraftsCount = (): number => {
  return getAllDrafts().length;
};

/**
 * Check if draft exists for language
 */
export const hasDraft = (language: string): boolean => {
  return getDraftByLanguage(language) !== null;
};

/**
 * Get all draft languages
 */
export const getDraftLanguages = (): string[] => {
  return getAllDrafts().map((d) => d.language);
};

// ==================== SAVED DRAFTS OPERATIONS ====================

/**
 * Get all saved drafts
 */
export const getAllSavedDrafts = (): MultiLanguageNewsletter[] => {
  try {
    const savedDraftsJson = localStorage.getItem(SAVED_DRAFTS_KEY);
    return savedDraftsJson ? JSON.parse(savedDraftsJson) : [];
  } catch (error) {
    console.error("Error loading saved drafts:", error);
    return [];
  }
};

/**
 * Get a saved draft by ID
 */
export const getSavedDraftById = (
  id: string
): MultiLanguageNewsletter | null => {
  const savedDrafts = getAllSavedDrafts();
  return savedDrafts.find((draft) => draft.id === id) || null;
};

/**
 * Save current work as a saved draft (when navigating away)
 * This converts all language_drafts to one saved draft
 * Uses sessionDraftId to update same draft instead of creating new ones
 */
export const saveCurrentWorkAsDraft = (
  newsletterName: string,
  template: string,
  sessionDraftId?: string | null
): MultiLanguageNewsletter | null => {
  try {
    const currentDrafts = getAllDrafts();

    if (currentDrafts.length === 0) {
      console.log("No drafts to save");
      return null;
    }

    // Convert drafts to language versions
    const languageVersions: LanguageVersion[] = currentDrafts.map((draft) => ({
      language: draft.language,
      subjectLine: draft.subjectLine,
      preheader: draft.preheader,
      blocks: draft.blocks,
    }));

    const savedDrafts = getAllSavedDrafts();

    // Check if we should update existing draft
    if (sessionDraftId) {
      const existingIndex = savedDrafts.findIndex(
        (d) => d.id === sessionDraftId
      );

      if (existingIndex >= 0) {
        // Update existing draft
        savedDrafts[existingIndex] = {
          ...savedDrafts[existingIndex],
          name: newsletterName || "Untitled Draft",
          template: template,
          languages: languageVersions,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(SAVED_DRAFTS_KEY, JSON.stringify(savedDrafts));

        console.log(
          `Updated existing saved draft with ${languageVersions.length} language(s):`,
          sessionDraftId
        );

        return savedDrafts[existingIndex];
      }
    }

    // Create new saved draft
    const savedDraft: MultiLanguageNewsletter = {
      id: `draft-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: newsletterName || "Untitled Draft",
      template: template,
      languages: languageVersions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    savedDrafts.push(savedDraft);
    localStorage.setItem(SAVED_DRAFTS_KEY, JSON.stringify(savedDrafts));

    console.log(
      `Created new saved draft with ${languageVersions.length} language(s):`,
      savedDraft.id
    );

    return savedDraft;
  } catch (error) {
    console.error("Error saving work as draft:", error);
    return null;
  }
};

/**
 * Delete saved draft
 */
export const deleteSavedDraft = (id: string): boolean => {
  try {
    const savedDrafts = getAllSavedDrafts();
    const filtered = savedDrafts.filter((d) => d.id !== id);
    localStorage.setItem(SAVED_DRAFTS_KEY, JSON.stringify(filtered));
    console.log(`Deleted saved draft:`, id);
    return true;
  } catch (error) {
    console.error(`Error deleting saved draft:`, error);
    return false;
  }
};

/**
 * Clear all saved drafts
 */
export const clearAllSavedDrafts = (): void => {
  localStorage.removeItem(SAVED_DRAFTS_KEY);
  console.log("Cleared all saved drafts");
};
