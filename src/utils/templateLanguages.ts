import templatesData from "@/data/templates.json";

export interface TemplateLanguage {
  code: string;
  boschLogo: string;
  readOnline?: string;
  followUs: string;
  instagram: string;
  facebook: string;
  youtube: string;
}

export interface Template {
  name: string;
  marketingArea: string;
  region: string;
  languages: TemplateLanguage[];
}

type TemplatesData = {
  [key: string]: Template;
};

/**
 * Get template data by template name
 */
export const getTemplate = (templateName: string): Template | null => {
  const templates = templatesData as TemplatesData;
  return templates[templateName] || null;
};

/**
 * Get language-specific template data
 */
export const getTemplateLanguageData = (
  templateName: string,
  languageCode: string
): TemplateLanguage | null => {
  const template = getTemplate(templateName);
  if (!template) return null;

  const languageData = template.languages.find(
    (lang) => lang.code === languageCode
  );
  return languageData || null;
};

/**
 * Get header/footer data for a specific template and language
 * Always uses masterTemplateBI
 */
export const getTemplateHeaderFooterData = (
  templateName: string,
  languageCode: string
) => {
  // Always use masterTemplateBI for translations
  const biTemplate = "masterTemplateBI";
  console.log(
    `🎯 Getting header/footer data from ${biTemplate} for language: ${languageCode}`
  );

  const languageData = getTemplateLanguageData(biTemplate, languageCode);

  if (!languageData) {
    console.warn(
      `⚠️ No language data found for ${languageCode} in ${biTemplate}, falling back to EN`
    );
    // Fallback to English if language not found
    const fallbackData = getTemplateLanguageData(biTemplate, "EN");
    console.log(`✅ Using EN fallback data:`, fallbackData);
    return fallbackData;
  }

  console.log(`✅ Found language data for ${languageCode}:`, languageData);
  return languageData;
};

/**
 * Get all available languages for a template
 */
export const getTemplateLanguages = (templateName: string): string[] => {
  const template = getTemplate(templateName);
  if (!template) return [];

  return template.languages.map((lang) => lang.code);
};
