import React from "react";
import { NewsletterCard } from "@/components/cards/NewsletterCard";
import { getAllNewsletters, Newsletter } from "@/utils/newsletterStorage";
import { generateHTML } from "@/utils/htmlGenerator";
import { getTemplateHeaderFooterData } from "@/utils/templateLanguages";


const Newsletters: React.FC = () => {
	// Read all newsletters from localStorage
	const [newsletters, setNewsletters] = React.useState<any[]>([]);

	React.useEffect(() => {
		setNewsletters(getAllNewsletters());
	}, []);

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-2xl font-bold mb-6">All Newsletters</h1>
			<div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{newsletters.length === 0 ? (
					<div className="col-span-full text-center text-muted-foreground">No newsletters found.</div>
				) : (
					newsletters.map((newsletter) => {
						// Support both flat and nested language structure
						let subjectLine = newsletter.subjectLine;
						let preheader = newsletter.preheader;
						let blocks = newsletter.blocks;
						let template = newsletter.template || (newsletter.header && newsletter.header.template);
						// If languages array exists, extract EN version
						if (Array.isArray(newsletter.languages)) {
							const enLang = newsletter.languages.find((l: any) => l.language === "EN");
							if (enLang) {
								subjectLine = enLang.subjectLine;
								preheader = enLang.preheader;
								blocks = enLang.blocks;
							}
						}
						const languageData = getTemplateHeaderFooterData(template || "masterTemplateBI", "EN");
						const imageHtml = generateHTML(
							blocks || [],
							subjectLine || "",
							preheader || "",
							languageData
						);
						// List items for display (e.g., subject, preheader, name)
						const listItems = [
							`Name: ${newsletter.name ?? "Untitled Newsletter"}`,
							`Subject: ${subjectLine ?? ""}`,
							`Preheader: ${preheader ?? ""}`,
							`Created: ${newsletter.createdAt ? new Date(newsletter.createdAt).toLocaleString() : ""}`,
						];
						return (
							<NewsletterCard
								key={newsletter.id}
								title={newsletter.name}
								listItems={listItems}
								imageHtml={imageHtml}
							/>
						);
					})
				)}
			</div>
		</div>
	);
};

export default Newsletters;
