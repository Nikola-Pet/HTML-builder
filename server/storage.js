import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NEWSLETTERS_FILE = path.join(__dirname, "data", "newsletters.json");
const DRAFTS_FILE = path.join(__dirname, "data", "drafts.json");

/**
 * Ensure the data directory and a specific file exist
 */
async function ensureDataFile(filePath) {
  try {
    const dataDir = path.dirname(filePath);
    await fs.mkdir(dataDir, { recursive: true });

    try {
      await fs.access(filePath);
    } catch {
      // File doesn't exist, create it with empty array
      await fs.writeFile(filePath, JSON.stringify([], null, 2));
    }
  } catch (error) {
    console.error("Error ensuring data file:", error);
    throw error;
  }
}

/**
 * Read all newsletters from JSON file
 */
export async function readNewsletters() {
  try {
    await ensureDataFile(NEWSLETTERS_FILE);
    const data = await fs.readFile(NEWSLETTERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading newsletters:", error);
    return [];
  }
}

/**
 * Write newsletters to JSON file
 */
export async function writeNewsletters(newsletters) {
  try {
    await ensureDataFile(NEWSLETTERS_FILE);
    await fs.writeFile(NEWSLETTERS_FILE, JSON.stringify(newsletters, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing newsletters:", error);
    throw error;
  }
}

/**
 * Get a single newsletter by ID
 */
export async function getNewsletterById(id) {
  const newsletters = await readNewsletters();
  return newsletters.find((n) => n.id === id) || null;
}

/**
 * Create a new newsletter
 */
export async function createNewsletter(newsletterData) {
  const newsletters = await readNewsletters();

  const now = new Date().toISOString();
  const newNewsletter = {
    ...newsletterData,
    id: `newsletter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: now,
    updatedAt: now,
    keywords: newsletterData.keywords || [],
  };

  newsletters.push(newNewsletter);
  await writeNewsletters(newsletters);

  return newNewsletter;
}

/**
 * Update an existing newsletter
 */
export async function updateNewsletter(id, updates) {
  const newsletters = await readNewsletters();
  const index = newsletters.findIndex((n) => n.id === id);

  if (index === -1) {
    return null;
  }

  const updatedNewsletter = {
    ...newsletters[index],
    ...updates,
    id: newsletters[index].id, // Ensure ID doesn't change
    createdAt: newsletters[index].createdAt, // Preserve creation date
    updatedAt: new Date().toISOString(),
  };

  newsletters[index] = updatedNewsletter;
  await writeNewsletters(newsletters);

  return updatedNewsletter;
}

/**
 * Delete a newsletter
 */
export async function deleteNewsletter(id) {
  const newsletters = await readNewsletters();
  const filteredNewsletters = newsletters.filter((n) => n.id !== id);

  if (filteredNewsletters.length === newsletters.length) {
    return false; // Newsletter not found
  }

  await writeNewsletters(filteredNewsletters);
  return true;
}

/**
 * Save or update newsletter (smart upsert)
 * If ID exists, update; otherwise create new
 */
export async function saveOrUpdateNewsletter(newsletterData) {
  const { id, ...data } = newsletterData;

  // If ID provided, try to update existing
  if (id) {
    const existing = await getNewsletterById(id);
    if (existing) {
      console.log(`📝 Updating existing newsletter: ${id}`);
      return await updateNewsletter(id, data);
    } else {
      console.log(
        `⚠️ Newsletter ID ${id} not found, creating as new with same ID`
      );
      // ID was provided but newsletter doesn't exist
      // Create new with the provided ID (useful for restoring from backup)
      const newsletters = await readNewsletters();
      const now = new Date().toISOString();

      const newNewsletter = {
        ...data,
        id: id,
        createdAt: now,
        updatedAt: now,
        keywords: data.keywords || [],
      };

      newsletters.push(newNewsletter);
      await writeNewsletters(newsletters);

      return newNewsletter;
    }
  }

  // No ID provided - create new with generated ID
  console.log(`✨ Creating new newsletter with generated ID`);
  const newsletters = await readNewsletters();
  const now = new Date().toISOString();

  const newNewsletter = {
    ...data,
    id: `newsletter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: now,
    updatedAt: now,
    keywords: data.keywords || [],
  };

  newsletters.push(newNewsletter);
  await writeNewsletters(newsletters);

  return newNewsletter;
}

// ==================== DRAFT OPERATIONS ====================

/**
 * Read all drafts from JSON file
 */
export async function readDrafts() {
  try {
    await ensureDataFile(DRAFTS_FILE);
    const data = await fs.readFile(DRAFTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading drafts:", error);
    return [];
  }
}

/**
 * Write drafts to JSON file
 */
export async function writeDrafts(drafts) {
  try {
    await ensureDataFile(DRAFTS_FILE);
    await fs.writeFile(DRAFTS_FILE, JSON.stringify(drafts, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing drafts:", error);
    throw error;
  }
}

/**
 * Get a single draft by ID
 */
export async function getDraftById(id) {
  const drafts = await readDrafts();
  return drafts.find((d) => d.id === id) || null;
}

/**
 * Create a new draft
 */
export async function createDraft(draftData) {
  const drafts = await readDrafts();

  const now = new Date().toISOString();
  const newDraft = {
    ...draftData,
    id: `draft-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: now,
    updatedAt: now,
  };

  drafts.push(newDraft);
  await writeDrafts(drafts);

  return newDraft;
}

/**
 * Update an existing draft
 */
export async function updateDraft(id, updates) {
  const drafts = await readDrafts();
  const index = drafts.findIndex((d) => d.id === id);

  if (index === -1) {
    return null;
  }

  const updatedDraft = {
    ...drafts[index],
    ...updates,
    id: drafts[index].id, // Ensure ID doesn't change
    createdAt: drafts[index].createdAt, // Preserve creation date
    updatedAt: new Date().toISOString(),
  };

  drafts[index] = updatedDraft;
  await writeDrafts(drafts);

  return updatedDraft;
}

/**
 * Delete a draft
 */
export async function deleteDraft(id) {
  const drafts = await readDrafts();
  const filteredDrafts = drafts.filter((d) => d.id !== id);

  if (filteredDrafts.length === drafts.length) {
    return false; // Draft not found
  }

  await writeDrafts(filteredDrafts);
  return true;
}

/**
 * Save or update draft (smart upsert)
 * If ID exists, update; otherwise create new
 */
export async function saveOrUpdateDraft(draftData) {
  const { id, ...data } = draftData;

  // If ID provided, try to update existing
  if (id) {
    const existing = await getDraftById(id);
    if (existing) {
      console.log(`📝 Updating existing draft: ${id}`);
      return await updateDraft(id, data);
    } else {
      console.log(`⚠️ Draft ID ${id} not found, creating as new with same ID`);
      // ID was provided but draft doesn't exist
      // Create new with the provided ID
      const drafts = await readDrafts();
      const now = new Date().toISOString();

      const newDraft = {
        ...data,
        id: id,
        createdAt: now,
        updatedAt: now,
      };

      drafts.push(newDraft);
      await writeDrafts(drafts);

      return newDraft;
    }
  }

  // No ID provided - create new with generated ID
  console.log(`✨ Creating new draft with generated ID`);
  const drafts = await readDrafts();
  const now = new Date().toISOString();

  const newDraft = {
    ...data,
    id: `draft-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: now,
    updatedAt: now,
  };

  drafts.push(newDraft);
  await writeDrafts(drafts);

  return newDraft;
}
