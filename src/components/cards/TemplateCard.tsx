import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TemplateCardProps {
  title: string;
  description: string;
  tags: string[];
  onSelect: () => void;
}

export const TemplateCard = ({
  title,
  description,
  tags,
  onSelect,
}: TemplateCardProps) => {
  return (
    <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary cursor-pointer">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-shrink-0 w-full md:w-48 h-64 bg-muted overflow-hidden  border-border">
          <div className="h-16 bg-primary"></div>
          <div className="p-4 space-y-3">
            <div className="h-3 bg-muted-foreground/20 rounded"></div>
            <div className="h-3 bg-muted-foreground/20 rounded w-4/5"></div>
            <div className="h-20 bg-muted-foreground/10 rounded mt-4"></div>
            <div className="h-3 bg-muted-foreground/20 rounded"></div>
            <div className="h-3 bg-muted-foreground/20 rounded w-3/5"></div>
          </div>
          <div className="h-12 bg-primary mt-auto"></div>
        </div>

        <div className="flex-1">
          <h4 className="text-xl font-bold text-foreground mb-2">{title}</h4>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <Button onClick={onSelect}>
            Use This Template
          </Button>
        </div>
      </div>
    </Card>
  );
};
