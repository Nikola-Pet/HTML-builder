import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NewsletterPreviewMenu } from "../menus/NewsletterPreviewMenu";
import { generateImageFromHtml } from "@/utils/generateImageFromHtml";
import { useNavigate } from "react-router-dom";


interface NewsletterCardProps {
  name?: string;
  keywords?: string[];
  imageHtml?: string;
}


export const NewsletterCard: React.FC<NewsletterCardProps> = ({ name, keywords, imageHtml }) => {
	const [imageSrc, setImageSrc] = React.useState<string | null>(null);
	const navigate = useNavigate();

	React.useEffect(() => {
		let isMounted = true;
		if (imageHtml) {
			generateImageFromHtml(imageHtml).then((result) => {
				if (!isMounted) return;
				if (typeof result === "string") setImageSrc(result);
				else setImageSrc(URL.createObjectURL(result));
			});
		} else {
			setImageSrc(null);
		}
		return () => { isMounted = false; };
	}, [imageHtml]);

	const handleCardClick = () => {
		// Navigate to the newsletter or open it
		// You can customize this to navigate to the specific newsletter
		navigate("/builder");
	};

	return (
		<Card className="relative w-full max-w-md flex flex-col overflow-hidden" style={{  border: '1px solid var(--bosch-gray-90)' }}>
			<CardHeader className="flex flex-row items-center justify-between px-4 py-0 space-y-0 gap-2" style={{ alignItems: 'center', backgroundColor: 'var(--bosch-gray-85)' }}>
				<CardTitle className="text-lg font-bold leading-none flex items-center">{name ?? "Untitled Newsletter"}</CardTitle>
				<div className="flex items-center">
					<NewsletterPreviewMenu />
				</div>
			</CardHeader>
			<CardContent 
				className="flex flex-col p-4 pt-2 cursor-pointer hover:bg-muted/50 transition-colors"
				onClick={handleCardClick}
			>
				{/* Cropped horizontal image showing header and first block */}
				<div className="w-full h-48 overflow-hidden bg-muted mb-4 rounded border border-border">
					{imageHtml ? (
						imageSrc ? (
							<img
								src={imageSrc}
								alt="Newsletter preview"
								className="w-full h-full object-cover object-top"
								style={{ objectFit: "cover", objectPosition: "top" }}
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center">Loading...</div>
						)
					) : (
						<div className="w-full h-full flex items-center justify-center">No preview available</div>
					)}
				</div>

				{/* Keywords styled like TemplateCard tags */}
				<div className="flex flex-wrap gap-2">
					{keywords && keywords.length > 0 ? (
						keywords.map((kw, idx) => (
							<span
								key={idx}
								className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
							>
								{kw}
							</span>
						))
					) : (
						<span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
							No keywords available
						</span>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

