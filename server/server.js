import express from "express";
import cors from "cors";
import {
  readNewsletters,
  getNewsletterById,
  createNewsletter,
  updateNewsletter,
  deleteNewsletter,
  saveOrUpdateNewsletter,
  readDrafts,
  getDraftById,
  createDraft,
  updateDraft,
  deleteDraft,
  saveOrUpdateDraft,
} from "./storage.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Newsletter API is running" });
});

// Get all newsletters
app.get("/api/newsletters", async (req, res) => {
  try {
    const newsletters = await readNewsletters();
    res.json(newsletters);
  } catch (error) {
    console.error("Error getting newsletters:", error);
    res.status(500).json({ error: "Failed to retrieve newsletters" });
  }
});

// Get a single newsletter by ID
app.get("/api/newsletters/:id", async (req, res) => {
  try {
    const newsletter = await getNewsletterById(req.params.id);

    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter not found" });
    }

    res.json(newsletter);
  } catch (error) {
    console.error("Error getting newsletter:", error);
    res.status(500).json({ error: "Failed to retrieve newsletter" });
  }
});

// Create a new newsletter
app.post("/api/newsletters", async (req, res) => {
  try {
    const { name, subjectLine, preheader, header, blocks, footer, keywords } =
      req.body;

    // Basic validation
    if (!name || !subjectLine || !header || !footer) {
      return res.status(400).json({
        error: "Missing required fields: name, subjectLine, header, footer",
      });
    }

    const newsletterData = {
      name,
      subjectLine,
      preheader: preheader || "",
      header,
      blocks: blocks || [],
      footer,
      keywords: keywords || [],
    };

    const newNewsletter = await createNewsletter(newsletterData);
    res.status(201).json(newNewsletter);
  } catch (error) {
    console.error("Error creating newsletter:", error);
    res.status(500).json({ error: "Failed to create newsletter" });
  }
});

// Update an existing newsletter
app.put("/api/newsletters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Remove fields that shouldn't be updated via this endpoint
    delete updates.id;
    delete updates.createdAt;

    const updatedNewsletter = await updateNewsletter(id, updates);

    if (!updatedNewsletter) {
      return res.status(404).json({ error: "Newsletter not found" });
    }

    res.json(updatedNewsletter);
  } catch (error) {
    console.error("Error updating newsletter:", error);
    res.status(500).json({ error: "Failed to update newsletter" });
  }
});

// Delete a newsletter
app.delete("/api/newsletters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteNewsletter(id);

    if (!deleted) {
      return res.status(404).json({ error: "Newsletter not found" });
    }

    res.json({ success: true, message: "Newsletter deleted successfully" });
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    res.status(500).json({ error: "Failed to delete newsletter" });
  }
});

// Smart save/update newsletter (upsert)
app.post("/api/newsletters/save", async (req, res) => {
  try {
    const newsletterData = req.body;

    console.log("📝 Newsletter save request received:");
    console.log("  - name:", newsletterData.name);
    console.log("  - template:", newsletterData.template);
    console.log(
      "  - languages:",
      newsletterData.languages ? newsletterData.languages.length : "none"
    );
    console.log("  - has header:", !!newsletterData.header);
    console.log("  - has footer:", !!newsletterData.footer);

    // Basic validation for multi-language newsletter
    if (!newsletterData.name) {
      console.log("❌ Validation failed: Missing name");
      return res.status(400).json({
        error: "Missing required field: name",
      });
    }

    // Support both old single-language and new multi-language format
    if (newsletterData.languages) {
      // Multi-language format validation
      if (
        !newsletterData.template ||
        !Array.isArray(newsletterData.languages) ||
        newsletterData.languages.length === 0
      ) {
        console.log("❌ Validation failed: Multi-language format invalid");
        console.log("  - template:", newsletterData.template);
        console.log(
          "  - languages array:",
          Array.isArray(newsletterData.languages)
        );
        console.log("  - languages length:", newsletterData.languages?.length);
        return res.status(400).json({
          error:
            "Multi-language newsletter requires template and at least one language",
        });
      }
    } else {
      // Old single-language format validation
      if (!newsletterData.header || !newsletterData.footer) {
        console.log("❌ Validation failed: Single-language format invalid");
        return res.status(400).json({
          error: "Single-language newsletter requires header and footer",
        });
      }
    }

    console.log("✅ Validation passed, saving newsletter...");
    const savedNewsletter = await saveOrUpdateNewsletter(newsletterData);
    console.log("✅ Newsletter saved successfully:", savedNewsletter.id);
    res.json(savedNewsletter);
  } catch (error) {
    console.error("Error saving/updating newsletter:", error);
    res.status(500).json({ error: "Failed to save newsletter" });
  }
});

// ==================== DRAFT ENDPOINTS ====================

// Get all drafts
app.get("/api/drafts", async (req, res) => {
  try {
    const drafts = await readDrafts();
    res.json(drafts);
  } catch (error) {
    console.error("Error getting drafts:", error);
    res.status(500).json({ error: "Failed to retrieve drafts" });
  }
});

// Get a single draft by ID
app.get("/api/drafts/:id", async (req, res) => {
  try {
    const draft = await getDraftById(req.params.id);

    if (!draft) {
      return res.status(404).json({ error: "Draft not found" });
    }

    res.json(draft);
  } catch (error) {
    console.error("Error getting draft:", error);
    res.status(500).json({ error: "Failed to retrieve draft" });
  }
});

// Create a new draft
app.post("/api/drafts", async (req, res) => {
  try {
    const draftData = req.body;

    // Basic validation
    if (!draftData.name || !draftData.template) {
      return res.status(400).json({
        error: "Missing required fields: name, template",
      });
    }

    const newDraft = await createDraft(draftData);
    res.status(201).json(newDraft);
  } catch (error) {
    console.error("Error creating draft:", error);
    res.status(500).json({ error: "Failed to create draft" });
  }
});

// Update an existing draft
app.put("/api/drafts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Remove fields that shouldn't be updated via this endpoint
    delete updates.id;
    delete updates.createdAt;

    const updatedDraft = await updateDraft(id, updates);

    if (!updatedDraft) {
      return res.status(404).json({ error: "Draft not found" });
    }

    res.json(updatedDraft);
  } catch (error) {
    console.error("Error updating draft:", error);
    res.status(500).json({ error: "Failed to update draft" });
  }
});

// Delete a draft
app.delete("/api/drafts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🗑️  DELETE request for draft: ${id}`);

    const deleted = await deleteDraft(id);

    if (!deleted) {
      console.log(`❌ Draft not found: ${id}`);
      return res.status(404).json({ error: "Draft not found" });
    }

    console.log(`✅ Draft deleted successfully: ${id}`);
    res.json({ success: true, message: "Draft deleted successfully" });
  } catch (error) {
    console.error("Error deleting draft:", error);
    res.status(500).json({ error: "Failed to delete draft" });
  }
});

// Smart save/update draft (upsert) - Auto-save endpoint
app.post("/api/drafts/save", async (req, res) => {
  try {
    const draftData = req.body;

    // Basic validation
    if (!draftData.name || !draftData.template) {
      return res.status(400).json({
        error: "Missing required fields: name, template",
      });
    }

    const savedDraft = await saveOrUpdateDraft(draftData);
    res.json(savedDraft);
  } catch (error) {
    console.error("Error saving/updating draft:", error);
    res.status(500).json({ error: "Failed to save draft" });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Newsletter API server is running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
