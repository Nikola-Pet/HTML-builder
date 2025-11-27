import React from "react";
import { NewsletterCard } from "@/components/cards/NewsletterCard";
import { getAllNewsletters, Newsletter } from "@/utils/newsletterStorage";
import { generateHTML } from "@/utils/htmlGenerator";
import { getTemplateHeaderFooterData } from "@/utils/templateLanguages";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

const Newsletters: React.FC = () => {
  // Read all newsletters from localStorage
  const [newsletters, setNewsletters] = React.useState<any[]>([]);
  useBreadcrumbs([{ label: "Newsletters", href: "/newsletters" }]);

  React.useEffect(() => {
    setNewsletters(getAllNewsletters());
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">All Newsletters</h1>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {newsletters.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground">
              No newsletters found.
            </div>
          ) : (
            newsletters.map((newsletter) => {
              // Support both flat and nested language structure
              let subjectLine = newsletter.subjectLine;
              let preheader = newsletter.preheader;
              let blocks = newsletter.blocks;
              let template =
                newsletter.template ||
                (newsletter.header && newsletter.header.template);
              // If languages array exists, extract EN version
              if (Array.isArray(newsletter.languages)) {
                const enLang = newsletter.languages.find(
                  (l: any) => l.language === "EN"
                );
                if (enLang) {
                  subjectLine = enLang.subjectLine;
                  preheader = enLang.preheader;
                  blocks = enLang.blocks;
                }
              }
              const languageData = getTemplateHeaderFooterData(
                template || "masterTemplateBI",
                "EN"
              );
              const imageHtml = generateHTML(
                blocks || [],
                subjectLine || "",
                preheader || "",
                languageData
              );
              return (
                <NewsletterCard
                  key={newsletter.id}
                  id={newsletter.id}
                  name={newsletter.name}
                  keywords={newsletter.keywords}
                  imageHtml={imageHtml}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletters;
