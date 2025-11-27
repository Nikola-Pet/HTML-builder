import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NewsletterPreviewMenu } from "../menus/NewsletterPreviewMenu";
import { generateImageFromHtml } from "@/utils/generateImageFromHtml";


interface NewsletterCardProps {
	title?: string;
	listItems?: string[];
	imageHtml?: string;
}

export const NewsletterCard: React.FC<NewsletterCardProps> = ({ title, listItems, imageHtml }) => {
	const [imageSrc, setImageSrc] = React.useState<string | null>(null);

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

	return (
		<Card className="relative w-full max-w-md h-96 flex flex-col justify-between overflow-hidden">
			<CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
				<CardTitle className="text-lg font-bold">{title ?? "Untitled Newsletter"}</CardTitle>
				<NewsletterPreviewMenu />
			</CardHeader>
			<CardContent className="flex flex-row gap-4 p-4 pt-0 h-full">
				<div className="flex-1 flex flex-col justify-center">
					<ul className="list-disc pl-5 space-y-1">
						{(listItems ?? ["No details available"]).map((item, idx) => (
							<li key={idx} className="text-sm text-card-foreground">{item}</li>
						))}
					</ul>
				</div>
				<div className="flex-shrink-0 w-40 relative h-full overflow-visible">
					{imageHtml ? (
						imageSrc ? (
							<img
								src={imageSrc}
								alt="Newsletter preview"
								className="object-cover h-full w-full"
								style={{ objectFit: "cover", maxHeight: "none" }}
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center bg-muted">Loading...</div>
						)
					) : (
						<div className="w-full h-full flex items-center justify-center bg-muted">No preview available</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

