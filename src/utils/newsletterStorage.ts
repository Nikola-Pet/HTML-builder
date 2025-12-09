import { BlockData } from "@/contexts/EmailBuilderContext";

// API Base URL - can be configured via environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export interface Newsletter {
  id: string;
  name: string;
  subjectLine: string;
  preheader: string;
  header: {
    template: string;
    language: string;
  };
  blocks: BlockData[];
  footer: {
    template: string;
    language: string;
  };
  createdAt: string;
  updatedAt: string;
  keywords?: string[];
}

export interface MultiLanguageNewsletter {
  id: string;
  name: string;
  template: string;
  languages: Array<{
    language: string;
    subjectLine: string;
    preheader: string;
    blocks: BlockData[];
  }>;
  keywords?: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Save a newsletter via backend API (smart upsert)
 * If newsletter has an ID, updates it; otherwise creates new
 */
export const saveNewsletter = async (
  newsletter: Partial<Omit<Newsletter, "createdAt" | "updatedAt">> & {
    name: string;
    subjectLine: string;
    preheader: string;
    header: { template: string; language: string };
    blocks: BlockData[];
    footer: { template: string; language: string };
    keywords?: string[];
    id?: string;
  }
): Promise<Newsletter> => {
  console.log("saveNewsletter called with:", newsletter);

  try {
    const response = await fetch(`${API_BASE_URL}/api/newsletters/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newsletter),
    });

    if (!response.ok) {
      throw new Error(`Failed to save newsletter: ${response.statusText}`);
    }

    const savedNewsletter = await response.json();
    console.log("Newsletter saved successfully:", savedNewsletter);
    return savedNewsletter;
  } catch (error) {
    console.error("Error saving newsletter:", error);
    throw new Error("Failed to save newsletter");
  }
};

/**
 * Update an existing newsletter via backend API
 */
export const updateNewsletter = async (
  id: string,
  updates: Partial<Omit<Newsletter, "id" | "createdAt" | "updatedAt">>
): Promise<Newsletter | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/newsletters/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to update newsletter: ${response.statusText}`);
    }

    const updatedNewsletter = await response.json();
    console.log("Newsletter updated successfully:", updatedNewsletter);
    return updatedNewsletter;
  } catch (error) {
    console.error("Error updating newsletter:", error);
    throw new Error("Failed to update newsletter");
  }
};

/**
 * Get all newsletters from backend API
 */
export const getAllNewsletters = async (): Promise<Newsletter[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/newsletters`);

    if (!response.ok) {
      throw new Error(`Failed to fetch newsletters: ${response.statusText}`);
    }

    const newsletters = await response.json();
    console.log("Fetched newsletters:", newsletters.length);
    return newsletters;
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    return [];
  }
};

/**
 * Get a single newsletter by ID from backend API
 */
export const getNewsletterById = async (
  id: string
): Promise<Newsletter | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/newsletters/${id}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch newsletter: ${response.statusText}`);
    }

    const newsletter = await response.json();
    return newsletter;
  } catch (error) {
    console.error("Error fetching newsletter:", error);
    return null;
  }
};

/**
 * Delete a newsletter via backend API
 */
export const deleteNewsletter = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/newsletters/${id}`, {
      method: "DELETE",
    });

    if (response.status === 404) {
      return false;
    }

    if (!response.ok) {
      throw new Error(`Failed to delete newsletter: ${response.statusText}`);
    }

    console.log("Newsletter deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    return false;
  }
};

/**
 * Export newsletters data as JSON file
 */
export const exportNewslettersJSON = async (): Promise<void> => {
  const newsletters = await getAllNewsletters();
  const dataStr = JSON.stringify(newsletters, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });

  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `newsletters-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Import newsletters from a JSON file
 */
export const importNewslettersJSON = (file: File): Promise<Newsletter[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const newsletters = JSON.parse(content) as Newsletter[];

        // Validate the data structure
        if (!Array.isArray(newsletters)) {
          throw new Error(
            "Invalid file format: expected an array of newsletters"
          );
        }

        // Save each newsletter via API
        const savedNewsletters: Newsletter[] = [];
        for (const newsletter of newsletters) {
          const { id, createdAt, updatedAt, ...newsletterData } = newsletter;
          const saved = await saveNewsletter(newsletterData);
          savedNewsletters.push(saved);
        }

        console.log(`Imported ${savedNewsletters.length} newsletters`);
        resolve(savedNewsletters);
      } catch (error) {
        console.error("Error importing newsletters:", error);
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
};

/**
 * Clear all newsletters from storage (for admin/testing purposes)
 */
export const clearAllNewsletters = async (): Promise<void> => {
  const newsletters = await getAllNewsletters();
  for (const newsletter of newsletters) {
    await deleteNewsletter(newsletter.id);
  }
  console.log("All newsletters cleared from storage");
};

/**
 * Get newsletters count
 */
export const getNewslettersCount = async (): Promise<number> => {
  const newsletters = await getAllNewsletters();
  return newsletters.length;
};

// ==================== DRAFT OPERATIONS (Backend API) ====================

export interface Draft {
  id: string;
  name: string;
  template: string;
  languages: Array<{
    language: string;
    subjectLine: string;
    preheader: string;
    blocks: BlockData[];
  }>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get all drafts from backend API
 */
export const getAllDrafts = async (): Promise<Draft[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/drafts`);

    if (!response.ok) {
      throw new Error(`Failed to fetch drafts: ${response.statusText}`);
    }

    const drafts = await response.json();
    console.log("Fetched drafts:", drafts.length);
    return drafts;
  } catch (error) {
    console.error("Error fetching drafts:", error);
    return [];
  }
};

/**
 * Get a single draft by ID from backend API
 */
export const getDraftById = async (id: string): Promise<Draft | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/drafts/${id}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch draft: ${response.statusText}`);
    }

    const draft = await response.json();
    return draft;
  } catch (error) {
    console.error("Error fetching draft:", error);
    return null;
  }
};

/**
 * Save or update draft via backend API (smart upsert)
 * Auto-save functionality - if draft has ID, updates; otherwise creates
 */
export const saveDraft = async (
  draft: Partial<Omit<Draft, "createdAt" | "updatedAt">> & {
    name: string;
    template: string;
    languages: Array<{
      language: string;
      subjectLine: string;
      preheader: string;
      blocks: BlockData[];
    }>;
    id?: string;
  }
): Promise<Draft> => {
  console.log("saveDraft called with:", draft);

  try {
    const response = await fetch(`${API_BASE_URL}/api/drafts/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(draft),
    });

    if (!response.ok) {
      throw new Error(`Failed to save draft: ${response.statusText}`);
    }

    const savedDraft = await response.json();
    console.log("Draft saved/updated successfully:", savedDraft.id);
    return savedDraft;
  } catch (error) {
    console.error("Error saving draft:", error);
    throw new Error("Failed to save draft");
  }
};

/**
 * Delete a draft via backend API
 */
export const deleteDraft = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/drafts/${id}`, {
      method: "DELETE",
    });

    if (response.status === 404) {
      return false;
    }

    if (!response.ok) {
      throw new Error(`Failed to delete draft: ${response.statusText}`);
    }

    console.log("Draft deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting draft:", error);
    return false;
  }
};
