import { BlockData } from "@/contexts/EmailBuilderContext";

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

/**
 * Save a newsletter to newsletters.json
 * Note: In a real application, this would make an API call to a backend.
 * For now, we'll simulate saving to localStorage and show how it would work with a JSON file.
 */
export const saveNewsletter = (
  newsletter: Omit<Newsletter, "id" | "createdAt" | "updatedAt"> & { keywords?: string[] }
): Newsletter => {
  console.log("saveNewsletter called with:", newsletter);
  const now = new Date().toISOString();

  const newNewsletter: Newsletter = {
    ...newsletter,
    id: `newsletter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: now,
    updatedAt: now,
    keywords: newsletter.keywords || [],
  };

  console.log("New newsletter object:", newNewsletter);

  // Get existing newsletters from localStorage
  const existingNewsletters = getNewslettersFromStorage();
  console.log("Existing newsletters:", existingNewsletters.length);

  // Add new newsletter
  const updatedNewsletters = [...existingNewsletters, newNewsletter];

  // Save to localStorage (simulating JSON file save)
  saveNewslettersToStorage(updatedNewsletters);
  console.log(
    "Newsletter saved to storage. Total newsletters:",
    updatedNewsletters.length
  );

  return newNewsletter;
};

/**
 * Update an existing newsletter
 */
export const updateNewsletter = (
  id: string,
  updates: Partial<Omit<Newsletter, "id" | "createdAt" | "updatedAt">>
): Newsletter | null => {
  const existingNewsletters = getNewslettersFromStorage();

  const index = existingNewsletters.findIndex((n) => n.id === id);
  if (index === -1) return null;

  const updatedNewsletter: Newsletter = {
    ...existingNewsletters[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  existingNewsletters[index] = updatedNewsletter;
  saveNewslettersToStorage(existingNewsletters);

  return updatedNewsletter;
};

/**
 * Get all newsletters
 */
export const getAllNewsletters = (): Newsletter[] => {
  return getNewslettersFromStorage();
};

/**
 * Get a single newsletter by ID
 */
export const getNewsletterById = (id: string): Newsletter | null => {
  const newsletters = getNewslettersFromStorage();
  return newsletters.find((n) => n.id === id) || null;
};

/**
 * Delete a newsletter
 */
export const deleteNewsletter = (id: string): boolean => {
  const existingNewsletters = getNewslettersFromStorage();
  const filteredNewsletters = existingNewsletters.filter((n) => n.id !== id);

  if (filteredNewsletters.length === existingNewsletters.length) {
    return false; // Newsletter not found
  }

  saveNewslettersToStorage(filteredNewsletters);
  return true;
};

// Helper functions for localStorage operations
const STORAGE_KEY = "newsletters";

function getNewslettersFromStorage(): Newsletter[] {
  try {
    console.log("Getting newsletters from localStorage...");
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log("Found newsletters in storage:", parsed.length);
      return parsed;
    }
    // If no data in localStorage, return empty array
    console.log("No newsletters in storage, returning empty array");
    return [];
  } catch (error) {
    console.error("Error reading newsletters from localStorage:", error);
    return [];
  }
}

function saveNewslettersToStorage(newsletters: Newsletter[]): void {
  try {
    console.log("Saving newsletters to localStorage:", newsletters.length);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newsletters, null, 2));
    console.log("Successfully saved to localStorage");
  } catch (error) {
    console.error("Error saving newsletters to localStorage:", error);
    throw new Error("Failed to save newsletter");
  }
}

/**
 * Export newsletters data as JSON file
 */
export const exportNewslettersJSON = (): void => {
  const newsletters = getNewslettersFromStorage();
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

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const newsletters = JSON.parse(content) as Newsletter[];

        // Validate the data structure
        if (!Array.isArray(newsletters)) {
          throw new Error(
            "Invalid file format: expected an array of newsletters"
          );
        }

        // Save to localStorage
        saveNewslettersToStorage(newsletters);
        console.log(`Imported ${newsletters.length} newsletters`);
        resolve(newsletters);
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
 * Clear all newsletters from storage
 */
export const clearAllNewsletters = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  console.log("All newsletters cleared from storage");
};

/**
 * Get newsletters count
 */
export const getNewslettersCount = (): number => {
  return getNewslettersFromStorage().length;
};

/**
 * Test function to verify localStorage is working
 */
export const testLocalStorage = (): boolean => {
  try {
    const testKey = "test_key";
    const testValue = "test_value";
    localStorage.setItem(testKey, testValue);
    const retrieved = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    console.log(
      "localStorage test:",
      retrieved === testValue ? "PASSED" : "FAILED"
    );
    return retrieved === testValue;
  } catch (error) {
    console.error("localStorage test FAILED:", error);
    return false;
  }
};
