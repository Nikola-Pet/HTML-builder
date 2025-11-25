import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailMetadataFormProps {
  subjectLine: string;
  preheader: string;
  onSubjectLineChange: (value: string) => void;
  onPreheaderChange: (value: string) => void;
}

export const EmailMetadataForm = ({
  subjectLine,
  preheader,
  onSubjectLineChange,
  onPreheaderChange,
}: EmailMetadataFormProps) => {
  return (
    <div className="bg-card rounded-lg shadow border p-6">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-foreground">
          Master Template Metadata
        </h2>
        <p className="text-sm text-muted-foreground">
          Subject line i preheader su sastavni deo master template-a.
        </p>
      </div>
      <div className="grid gap-4 ">
        <div className="flex flex-col gap-2">
          <Label htmlFor="subject-line">Subject line</Label>
          <Input
            id="subject-line"
            placeholder="Unesite subject line"
            value={subjectLine}
            onChange={(event) => onSubjectLineChange(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="preheader">Preheader</Label>
          <Input
            id="preheader"
            placeholder="Unesite preheader"
            value={preheader}
            onChange={(event) => onPreheaderChange(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
