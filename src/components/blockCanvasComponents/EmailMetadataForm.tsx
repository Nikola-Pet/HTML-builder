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
    <div className="bg-card shadow border p-6">

      <div className="flex gap-4 ">
        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="subject-line">Subject line</Label>
          <Input
            id="subject-line"
            placeholder="Enter subject line"
            value={subjectLine}
            onChange={(event) => onSubjectLineChange(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="preheader">Preheader</Label>
          <Input
            id="preheader"
            placeholder="Enter preheader"
            value={preheader}
            onChange={(event) => onPreheaderChange(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
