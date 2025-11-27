import React from "react";
import { NewsletterCard } from "@/components/cards/NewsletterCard";
import { getAllSavedDrafts } from "@/utils/languageDraftStorage";
import { generateHTML } from "@/utils/htmlGenerator";
import { getTemplateHeaderFooterData } from "@/utils/templateLanguages";

const Drafts: React.FC = () => {
	// Read all saved drafts from localStorage
	const [drafts, setDrafts] = React.useState<any[]>([]);

	React.useEffect(() => {
		setDrafts(getAllSavedDrafts());
	}, []);

	return (
		<div className="min-h-screen">
			<div className="container mx-auto py-8">
				<h1 className="text-2xl font-bold mb-6">Saved Drafts</h1>
				<div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{drafts.length === 0 ? (
					<div className="col-span-full text-center text-muted-foreground">No drafts found.</div>
				) : (
					drafts.map((draft) => {
						// Support both flat and nested language structure
						let subjectLine = draft.subjectLine;
						let preheader = draft.preheader;
						let blocks = draft.blocks;
						let template = draft.template || (draft.header && draft.header.template);
						// If languages array exists, extract EN version
						if (Array.isArray(draft.languages)) {
							const enLang = draft.languages.find((l: any) => l.language === "EN");
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
						return (
							<NewsletterCard
								key={draft.id}
								name={draft.name}
								keywords={draft.keywords}
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

export default Drafts;
