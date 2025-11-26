import { BlockData } from "@/contexts/EmailBuilderContext";

// DeepL API configuration
// You'll need to set your DeepL API key as an environment variable
const DEEPL_API_KEY = import.meta.env.VITE_DEEPL_API_KEY || "";

// DeepL API endpoint (use free or pro based on your API key)
// Free API keys should use: https://api-free.deepl.com/v2/translate
// Pro API keys should use: https://api.deepl.com/v2/translate
// In development, use proxy to avoid CORS issues
const DEEPL_API_URL = import.meta.env.DEV
  ? "/api/deepl/v2/translate" // Use Vite proxy in development
  : import.meta.env.VITE_DEEPL_API_URL ||
    "https://api-free.deepl.com/v2/translate";

// Language code mapping (app code -> DeepL code)
const LANGUAGE_MAP: Record<string, string> = {
  EN: "EN-US",
  DE: "DE",
  FR: "FR",
};

// Source language mapping (for source_lang parameter)
const SOURCE_LANGUAGE_MAP: Record<string, string> = {
  EN: "EN",
  DE: "DE",
  FR: "FR",
};

/**
 * Call DeepL API to translate text
 */
const callDeepLAPI = async (
  texts: string[],
  targetLang: string,
  sourceLang: string
): Promise<string[]> => {
  if (!DEEPL_API_KEY) {
    throw new Error(
      "DeepL API key not found. Please set VITE_DEEPL_API_KEY in your .env file"
    );
  }

  // Check for placeholder key
  if (
    DEEPL_API_KEY === "your_deepl_api_key_here" ||
    DEEPL_API_KEY.length < 20
  ) {
    throw new Error(
      "Please replace the placeholder API key in .env with your actual DeepL API key from https://www.deepl.com/pro-api"
    );
  }

  console.log(
    `[DeepL API] Translating ${texts.length} text(s) from ${sourceLang} to ${targetLang}`
  );
  console.log(`[DeepL API] Using endpoint: ${DEEPL_API_URL}`);

  const params = new URLSearchParams();
  texts.forEach((text) => params.append("text", text));
  params.append("target_lang", targetLang);
  params.append("source_lang", sourceLang);

  try {
    const response = await fetch(DEEPL_API_URL, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    console.log(
      `[DeepL API] Response status: ${response.status} ${response.statusText}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[DeepL API] Error response:`, errorText);
      throw new Error(`DeepL API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(
      `[DeepL API] Success! Received ${
        data.translations?.length || 0
      } translation(s)`
    );
    return data.translations.map((t: any) => t.text);
  } catch (error) {
    console.error(`[DeepL API] Request failed:`, error);
    throw error;
  }
};

/**
 * Translate a single text string using DeepL
 */
export const translateText = async (
  text: string,
  targetLanguage: string,
  sourceLanguage: string = "EN"
): Promise<string> => {
  if (!text || text.trim() === "") {
    return text;
  }

  try {
    const targetLang = LANGUAGE_MAP[targetLanguage];
    const sourceLang = SOURCE_LANGUAGE_MAP[sourceLanguage] || "EN";

    if (!targetLang) {
      console.warn(
        `Language ${targetLanguage} not supported, returning original text`
      );
      return text;
    }

    const results = await callDeepLAPI([text], targetLang, sourceLang);
    return results[0];
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
};

/**
 * Recursively translate all string values in an object
 */
const translateObject = async (
  obj: Record<string, any>,
  targetLanguage: string,
  sourceLanguage: string = "EN"
): Promise<Record<string, any>> => {
  const translated: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string" && value.trim() !== "") {
      // Translate string values
      try {
        translated[key] = await translateText(
          value,
          targetLanguage,
          sourceLanguage
        );
      } catch (error) {
        console.error(`Failed to translate field ${key}:`, error);
        translated[key] = value; // Keep original on error
      }
    } else if (Array.isArray(value)) {
      // Handle arrays
      translated[key] = await Promise.all(
        value.map(async (item) => {
          if (typeof item === "string") {
            try {
              return await translateText(item, targetLanguage, sourceLanguage);
            } catch {
              return item;
            }
          } else if (typeof item === "object" && item !== null) {
            return await translateObject(item, targetLanguage, sourceLanguage);
          }
          return item;
        })
      );
    } else if (typeof value === "object" && value !== null) {
      // Recursively handle nested objects
      translated[key] = await translateObject(
        value,
        targetLanguage,
        sourceLanguage
      );
    } else {
      // Keep non-string values as-is
      translated[key] = value;
    }
  }

  return translated;
};

/**
 * Translate all content in a block
 */
export const translateBlock = async (
  block: BlockData,
  targetLanguage: string,
  sourceLanguage: string = "EN"
): Promise<BlockData> => {
  const translatedContent = await translateObject(
    block.content,
    targetLanguage,
    sourceLanguage
  );

  return {
    ...block,
    content: translatedContent,
  };
};

/**
 * Translate all blocks in an array
 */
export const translateBlocks = async (
  blocks: BlockData[],
  targetLanguage: string,
  sourceLanguage: string = "EN"
): Promise<BlockData[]> => {
  return await Promise.all(
    blocks.map((block) => translateBlock(block, targetLanguage, sourceLanguage))
  );
};

/**
 * Translate email metadata (subject line and preheader)
 */
export const translateEmailMetadata = async (
  subjectLine: string,
  preheader: string,
  targetLanguage: string,
  sourceLanguage: string = "EN"
): Promise<{ subjectLine: string; preheader: string }> => {
  try {
    const [translatedSubject, translatedPreheader] = await Promise.all([
      translateText(subjectLine, targetLanguage, sourceLanguage),
      translateText(preheader, targetLanguage, sourceLanguage),
    ]);

    return {
      subjectLine: translatedSubject,
      preheader: translatedPreheader,
    };
  } catch (error) {
    console.error("Failed to translate email metadata:", error);
    // Return originals on error
    return { subjectLine, preheader };
  }
};

/**
 * Translate complete email content (blocks, subject, preheader)
 */
export const translateEmailContent = async (
  blocks: BlockData[],
  subjectLine: string,
  preheader: string,
  targetLanguage: string,
  sourceLanguage: string = "EN"
): Promise<{
  blocks: BlockData[];
  subjectLine: string;
  preheader: string;
}> => {
  try {
    const [translatedBlocks, translatedMetadata] = await Promise.all([
      translateBlocks(blocks, targetLanguage, sourceLanguage),
      translateEmailMetadata(
        subjectLine,
        preheader,
        targetLanguage,
        sourceLanguage
      ),
    ]);

    return {
      blocks: translatedBlocks,
      ...translatedMetadata,
    };
  } catch (error) {
    console.error("Failed to translate email content:", error);
    throw error;
  }
};

/**
 * Check if DeepL API is configured
 */
export const isDeepLConfigured = (): boolean => {
  return !!DEEPL_API_KEY;
};
